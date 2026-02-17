import { Notice, Plugin, normalizePath, TFile } from "obsidian";
import type { ConversationTurn } from "./conversation";
import { saveConversationFromTurns } from "./conversationStore";
import { OvlApiClient } from "./api";
import { appendErrorLog } from "./logging";
import { SaveConversationModal, SaveConversationForm } from "./modals/saveConversationModal";
import { parseTurns } from "./parseTurns";
import { OvlSettingTab } from "./settings";
import { DEFAULT_SETTINGS, OvlSettings } from "./types";
import { ChatView, VIEW_TYPE_OVL_CHAT } from "./views/chatView";
import { Indexer } from "./indexing/indexer";
import { VaultWatcher } from "./vaultWatcher";
import { join } from "path";

export default class OvlPlugin extends Plugin {
  public settings: OvlSettings = { ...DEFAULT_SETTINGS };
  private apiClient: OvlApiClient | null = null;
  private indexer: Indexer | null = null;
  private vaultWatcher: VaultWatcher | null = null;

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
      // 데이터 디렉토리 경로
      const dataDir = join(
        // @ts-ignore - Obsidian API의 내부 속성 사용
        this.app.vault.adapter.basePath,
        ".obsidian",
        "plugins",
        this.manifest.id
      );

      const metaDbPath = join(dataDir, "meta.db");
      const vectorDbPath = join(dataDir, "vectors.db");

      // 인덱서 생성
      this.indexer = new Indexer({
        chunkSize: this.settings.chunkSize,
        chunkOverlap: this.settings.chunkOverlap,
        topK: this.settings.topK,
        embeddingModel: "Xenova/all-MiniLM-L6-v2",
        metaDbPath,
        vectorDbPath,
      });

      await this.indexer.initialize();

      // 볼트 워처 설정
      this.vaultWatcher = new VaultWatcher(this.app.vault);
      this.vaultWatcher.setIndexer(this.indexer);

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

  public async saveConversationFromTurns(
    sessionId: string,
    turns: ConversationTurn[],
    outputFolder: string
  ): Promise<string> {
    return saveConversationFromTurns(this.app.vault, sessionId, turns, outputFolder);
  }

  private async loadSettings(): Promise<void> {
    this.settings = { ...DEFAULT_SETTINGS, ...(await this.loadData()) };
  }

  public async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
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
}
