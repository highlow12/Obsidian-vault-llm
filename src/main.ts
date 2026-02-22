import { Notice, Plugin, normalizePath, TFile } from "obsidian";
import type { ConversationTurn } from "./conversation";
import { saveConversationFromTurns } from "./conversationStore";
import { OvlApiClient } from "./api";
import { appendErrorLog } from "./logging";
import { SaveConversationModal, SaveConversationForm } from "./modals/saveConversationModal";
import { parseTurns } from "./parseTurns";
import { OvlSettingTab } from "./settings";
import { DEFAULT_SETTINGS, OvlSettings, EMBEDDING_PRESETS } from "./types";
import { ChatView, VIEW_TYPE_OVL_CHAT } from "./views/chatView";
import { Indexer } from "./indexing/indexer";
import { VaultWatcher } from "./vaultWatcher";
import { join } from "path";

export default class OvlPlugin extends Plugin {
  public settings: OvlSettings = { ...DEFAULT_SETTINGS };
  private lastSavedSettings: OvlSettings = { ...DEFAULT_SETTINGS };
  private apiClient: OvlApiClient | null = null;
  private indexer: Indexer | null = null;
  private vaultWatcher: VaultWatcher | null = null;
  private indexingEventsRegistered: boolean = false;

  async onload(): Promise<void> {
    await this.loadSettings();

    // API 호출 로직을 분리해 상태를 유지합니다.
    this.apiClient = new OvlApiClient(
      () => this.settings,
      (context: string, detail: unknown) =>
        appendErrorLog(this.app, this.manifest, context, detail)
    );

    // 인덱싱 초기화
    if (this.settings.indexingEnabled) {
      await this.initializeIndexing();
    }

    // 사이드바 채팅 뷰 등록
    this.registerView(VIEW_TYPE_OVL_CHAT, (leaf) => new ChatView(leaf, this));

    this.addRibbonIcon("message-circle", "OVL 대화 열기", () => {
      void this.openChatView();
    });

    this.addCommand({
      id: "ovl-open-chat",
      name: "OVL 대화 창 열기",
      callback: () => {
        void this.openChatView();
      }
    });

    this.addCommand({
      id: "ovl-save-conversation",
      name: "대화 JSON에서 마크다운 저장",
      callback: () => {
        new SaveConversationModal(this, (form) => {
          void this.handleSaveConversation(form);
        }).open();
      }
    });

    this.addCommand({
      id: "ovl-index-vault",
      name: "볼트 인덱싱 시작",
      callback: () => {
        void this.startIndexing();
      }
    });

    this.addSettingTab(new OvlSettingTab(this));
  }

  onunload(): void {
    this.app.workspace.getLeavesOfType(VIEW_TYPE_OVL_CHAT).forEach((leaf) => {
      leaf.detach();
    });

    // 인덱서 정리
    if (this.indexer) {
      this.indexer.close();
    }
  }

  /**
   * 인덱싱 시스템 초기화
   */
  private async initializeIndexing(): Promise<void> {
    try {
      if (this.indexer) {
        this.indexer.close();
        this.indexer = null;
      }

      // 데이터 디렉토리 경로
      const dataDir = join(
        // @ts-ignore - Obsidian API의 내부 속성 사용
        this.app.vault.adapter.basePath,
        ".obsidian",
        "plugins",
        this.manifest.id
      );

      const metaStorePath = join(dataDir, "meta.json");
      const vectorStorePath = join(dataDir, "vectors.json");

      // 인덱서 생성
      this.indexer = new Indexer({
        chunkSize: this.settings.chunkSize,
        chunkOverlap: this.settings.chunkOverlap,
        topK: this.settings.topK,
        vectorIndexEngine: "json",
        embeddingProvider: this.settings.embeddingProvider,
        embeddingModel: this.settings.embeddingModel,
        embeddingApiKey: this.settings.embeddingApiKey || this.settings.apiKey,
        embeddingApiUrl: this.getEmbeddingApiUrl(),
        metaStorePath,
        vectorStorePath,
      });

      await this.indexer.initialize();

      // 볼트 워처 설정
      this.vaultWatcher = new VaultWatcher(this.app.vault);
      this.vaultWatcher.setIndexer(this.indexer);

      if (!this.indexingEventsRegistered) {
        // 파일 이벤트 리스너 등록
        this.registerEvent(
          this.app.vault.on("create", (file) => {
            if (file instanceof TFile) {
              void this.vaultWatcher?.onFileCreate(file);
            }
          })
        );

        this.registerEvent(
          this.app.vault.on("modify", (file) => {
            if (file instanceof TFile) {
              void this.vaultWatcher?.onFileModify(file);
            }
          })
        );

        this.registerEvent(
          this.app.vault.on("delete", (file) => {
            if (file instanceof TFile) {
              this.vaultWatcher?.onFileDelete(file);
            }
          })
        );

        this.registerEvent(
          this.app.vault.on("rename", (file, oldPath) => {
            if (file instanceof TFile) {
              void this.vaultWatcher?.onFileRename(file, oldPath);
            }
          })
        );
        this.indexingEventsRegistered = true;
      }

      console.log("인덱싱 시스템 초기화 완료");
    } catch (error) {
      console.error("인덱싱 시스템 초기화 실패:", error);
      new Notice("인덱싱 시스템 초기화에 실패했습니다");
    }
  }

  /**
   * 볼트 인덱싱 시작
   */
  private async startIndexing(): Promise<void> {
    if (!this.settings.indexingEnabled) {
      new Notice("먼저 설정에서 인덱싱을 활성화해 주세요");
      return;
    }

    if (!this.indexer) {
      await this.initializeIndexing();
    }

    if (!this.vaultWatcher) {
      new Notice("인덱싱 시스템이 초기화되지 않았습니다");
      return;
    }

    try {
      await this.vaultWatcher.indexVault();
    } catch (error) {
      console.error("볼트 인덱싱 실패:", error);
      new Notice("볼트 인덱싱에 실패했습니다");
    }
  }

  /**
   * 벡터 검색 수행
   */
  public async search(query: string): Promise<Array<{ chunk: any; note: any; score: number }>> {
    if (!this.indexer) {
      throw new Error("인덱싱이 활성화되지 않았습니다");
    }

    const searchResults = await this.indexer.search(query);
    return this.indexer.getSearchResultsWithMetadata(searchResults);
  }

  private async openChatView(): Promise<void> {
    const existingLeaf = this.app.workspace.getLeavesOfType(VIEW_TYPE_OVL_CHAT)[0];
    const leaf = existingLeaf ?? this.app.workspace.getRightLeaf(false);
    if (!leaf) {
      new Notice("대화 창을 열 수 없습니다.");
      return;
    }

    await leaf.setViewState({ type: VIEW_TYPE_OVL_CHAT, active: true });
    this.app.workspace.revealLeaf(leaf);
  }

  public async requestAssistantReply(turns: ConversationTurn[]): Promise<string> {
    if (!this.apiClient) {
      throw new Error("API 클라이언트를 초기화할 수 없습니다.");
    }
    return this.apiClient.requestAssistantReply(turns);
  }

  public async requestTitleReply(prompt: string): Promise<string> {
    if (!this.apiClient) {
      throw new Error("API 클라이언트를 초기화할 수 없습니다.");
    }
    return this.apiClient.requestTitleReply(prompt);
  }

  public async saveConversationFromTurns(
    sessionId: string,
    turns: ConversationTurn[],
    outputFolder: string
  ): Promise<string> {
    return saveConversationFromTurns(this.app.vault, sessionId, turns, outputFolder);
  }

  private async loadSettings(): Promise<void> {
    this.settings = { ...DEFAULT_SETTINGS, ...(await this.loadData()) };

    let changed = false;
    if (this.settings.embeddingProvider === "local") {
      this.settings.embeddingProvider = "gemini";
      this.settings.embeddingModel = EMBEDDING_PRESETS.gemini.model;
      this.settings.embeddingApiUrl = EMBEDDING_PRESETS.gemini.apiUrl || "";
      changed = true;
    }

    if (changed) {
      await this.saveSettings();
    }

    this.lastSavedSettings = { ...this.settings };
  }

  public async saveSettings(): Promise<void> {
    const previousSettings = { ...this.lastSavedSettings };
    await this.saveData(this.settings);
    this.lastSavedSettings = { ...this.settings };

    if (previousSettings.indexingEnabled !== this.settings.indexingEnabled) {
      if (!this.settings.indexingEnabled) {
        this.indexer?.close();
        this.indexer = null;
        this.vaultWatcher?.setIndexer(null);
        this.vaultWatcher = null;
      } else {
        await this.initializeIndexing();
      }
      return;
    }

    if (!this.settings.indexingEnabled || !this.indexer) {
      return;
    }

    if (this.shouldReinitializeIndexing(previousSettings, this.settings)) {
      await this.initializeIndexing();
      new Notice("임베딩 설정이 변경되어 재인덱싱이 필요합니다. 설정에서 전체 임베딩을 실행해 주세요.");
    }
  }

  private async handleSaveConversation(form: SaveConversationForm): Promise<void> {
    try {
      if (!form.inputPath) {
        new Notice("JSON 파일 경로를 입력해 주세요.");
        return;
      }
      if (!form.sessionId) {
        new Notice("세션 ID를 입력해 주세요.");
        return;
      }

      const jsonPath = normalizePath(form.inputPath).replace(/^\/+/, "");
      const jsonExists = await this.app.vault.adapter.exists(jsonPath);
      if (!jsonExists) {
        new Notice("JSON 파일을 찾을 수 없습니다.");
        return;
      }
      const jsonContent = await this.app.vault.adapter.read(jsonPath);
      const turns = parseTurns(jsonContent);

      const outputFolder = form.outputFolder
        ? normalizePath(form.outputFolder).replace(/^\/+/, "")
        : "";
      const targetPath = await saveConversationFromTurns(
        this.app.vault,
        form.sessionId,
        turns,
        outputFolder
      );
      new Notice(`대화 저장 완료: ${targetPath}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      new Notice(`저장 실패: ${message}`);
    }
  }

  /**
   * 전체 볼트를 임베딩합니다 (스캔 후 재인덱싱)
   */
  public async indexVaultAll(): Promise<void> {
    if (!this.settings.indexingEnabled) {
      throw new Error("인덱싱이 활성화되지 않았습니다");
    }

    if (!this.indexer) {
      await this.initializeIndexing();
    }

    if (!this.vaultWatcher) {
      throw new Error("인덱싱 시스템이 초기화되지 않았습니다");
    }

    try {
      console.log("전체 볼트 임베딩 시작...");
      await this.vaultWatcher.indexVault();
      console.log("전체 볼트 임베딩 완료");
    } catch (error) {
      console.error("전체 임베딩 실패:", error);
      throw error;
    }
  }

  /**
   * 신규 노트만 임베딩합니다 (증분 인덱싱)
   */
  public async indexNewFilesOnly(): Promise<void> {
    if (!this.settings.indexingEnabled) {
      throw new Error("인덱싱이 활성화되지 않았습니다");
    }

    if (!this.indexer) {
      await this.initializeIndexing();
    }

    if (!this.vaultWatcher) {
      throw new Error("인덱싱 시스템이 초기화되지 않았습니다");
    }

    const indexer = this.indexer;
    if (!indexer) {
      throw new Error("인덱싱 시스템이 초기화되지 않았습니다");
    }

    try {
      console.log("신규 파일 임베딩 시작...");
      
      // 볼트의 모든 마크다운 파일 가져오기
      const allFiles = this.app.vault.getMarkdownFiles();
      let indexed = 0;

      for (const file of allFiles) {
        try {
          const content = await this.app.vault.cachedRead(file);
          // 각 파일을 인덱싱 (이미 인덱싱된 파일은 indexer에서 확인)
          await indexer.indexFile(file.path, content);
          indexed++;
        } catch (error) {
          console.warn(`파일 임베딩 실패: ${file.path}`, error);
        }
      }

      console.log(`신규 파일 임베딩 완료: ${indexed}개 파일 처리`);
    } catch (error) {
      console.error("신규 임베딩 실패:", error);
      throw error;
    }
  }

  /**
   * 임베딩 API URL 가져오기
   */
  private getEmbeddingApiUrl(): string | undefined {
    if (this.settings.embeddingApiUrl?.trim()) {
      return this.settings.embeddingApiUrl.trim();
    }

    const preset = EMBEDDING_PRESETS[this.settings.embeddingProvider];
    return preset?.apiUrl;
  }

  /**
   * 인덱서 재초기화가 필요한 설정 변경인지 확인
   */
  private shouldReinitializeIndexing(previous: OvlSettings, current: OvlSettings): boolean {
    return (
      previous.embeddingProvider !== current.embeddingProvider ||
      previous.embeddingModel !== current.embeddingModel ||
      previous.embeddingApiUrl !== current.embeddingApiUrl
    );
  }
}
