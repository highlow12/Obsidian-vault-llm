import { Notice, Plugin, normalizePath } from "obsidian";
import type { ConversationTurn } from "./conversation";
import { saveConversationFromTurns } from "./conversationStore";
import { OvlApiClient } from "./api";
import { appendErrorLog } from "./logging";
import { SaveConversationModal, SaveConversationForm } from "./modals/saveConversationModal";
import { parseTurns } from "./parseTurns";
import { OvlSettingTab } from "./settings";
import { DEFAULT_SETTINGS, OvlSettings } from "./types";
import { ChatView, VIEW_TYPE_OVL_CHAT } from "./views/chatView";

export default class OvlPlugin extends Plugin {
  public settings: OvlSettings = { ...DEFAULT_SETTINGS };
  private apiClient: OvlApiClient | null = null;

  async onload(): Promise<void> {
    await this.loadSettings();

    // API 호출 로직을 분리해 상태를 유지합니다.
    this.apiClient = new OvlApiClient(
      () => this.settings,
      (context: string, detail: unknown) =>
        appendErrorLog(this.app, this.manifest, context, detail)
    );

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

    this.addSettingTab(new OvlSettingTab(this));
  }

  onunload(): void {
    this.app.workspace.getLeavesOfType(VIEW_TYPE_OVL_CHAT).forEach((leaf) => {
      leaf.detach();
    });
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
