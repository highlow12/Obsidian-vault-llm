import { Notice } from "obsidian";
import type { ConversationTurn } from "../../conversation";
import type { ChatSessionSummary } from "../../chatSessionStore";
import type { PluginChatApi } from "../../pluginApi";

type BusyState = {
  isBusy: boolean;
  sendLoading?: boolean;
  vaultSearchLoading?: boolean;
  saveLoading?: boolean;
  stopEnabled?: boolean;
  disableHistoryActions?: boolean;
};

export class ChatSessionManager {
  private isApplyingLoadedSession = false;
  private suppressHistorySelectionChange = false;

  constructor(
    private readonly plugin: PluginChatApi,
    private readonly getSessionId: () => string,
    private readonly setSessionId: (value: string) => void,
    private readonly getMessages: () => ConversationTurn[],
    private readonly clearMessages: () => void,
    private readonly appendMessage: (turn: ConversationTurn) => Promise<void>,
    private readonly setBusyState: (state: BusyState) => void,
    private readonly getHistorySelectEl: () => HTMLSelectElement | null,
    private readonly clearStreamingState: () => void
  ) {}

  isBusyApplying(): boolean {
    return this.isApplyingLoadedSession;
  }

  isHistorySelectionSuppressed(): boolean {
    return this.suppressHistorySelectionChange;
  }

  async startNewSession(buildSessionId: () => string): Promise<void> {
    this.setBusyState({ isBusy: true, disableHistoryActions: true });
    try {
      this.clearStreamingState();

      const sessionId = this.getSessionId().trim();
      if (this.getMessages().length > 0 && sessionId) {
        await this.plugin.saveChatSession(sessionId, this.getMessages());
      }

      this.clearMessages();
      this.setSessionId(buildSessionId());
      await this.refreshHistoryDropdown();
      new Notice("새 세션을 시작했습니다.");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      new Notice(`새 세션 시작 실패: ${message}`);
    } finally {
      this.setBusyState({ isBusy: false });
    }
  }

  async loadHistorySessionById(sessionId: string): Promise<void> {
    this.setBusyState({ isBusy: true, disableHistoryActions: true });
    try {
      const turns = await this.plugin.loadChatSession(sessionId);
      this.clearStreamingState();
      this.isApplyingLoadedSession = true;
      this.clearMessages();
      for (const turn of turns) {
        await this.appendMessage(turn);
      }
      this.isApplyingLoadedSession = false;
      this.setSessionId(sessionId);
      await this.persistCurrentSession();
      await this.refreshHistoryDropdown(sessionId);
      new Notice(`대화 기록을 불러왔습니다: ${sessionId}`);
    } catch (error) {
      this.isApplyingLoadedSession = false;
      const message = error instanceof Error ? error.message : String(error);
      new Notice(`대화 기록 불러오기 실패: ${message}`);
    } finally {
      this.setBusyState({ isBusy: false });
    }
  }

  async deleteSelectedSession(sessionId: string): Promise<void> {
    if (!sessionId) {
      new Notice("삭제할 세션을 먼저 선택해 주세요.");
      return;
    }

    this.setBusyState({ isBusy: true, disableHistoryActions: true });
    try {
      await this.plugin.deleteChatSession(sessionId);
      await this.refreshHistoryDropdown();
      new Notice(`세션을 삭제했습니다: ${sessionId}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      new Notice(`세션 삭제 실패: ${message}`);
    } finally {
      this.setBusyState({ isBusy: false });
    }
  }

  async refreshHistoryDropdown(selectedSessionId?: string): Promise<void> {
    const historySelectEl = this.getHistorySelectEl();
    if (!historySelectEl) {
      return;
    }

    const sessions: ChatSessionSummary[] = await this.plugin.listChatSessions();
    this.suppressHistorySelectionChange = true;
    historySelectEl.empty();

    const placeholder = historySelectEl.createEl("option", {
      text: "기록 불러오기",
      value: ""
    });
    placeholder.selected = true;

    for (const session of sessions) {
      const option = historySelectEl.createEl("option", {
        text: `${session.sessionId} (${session.turnCount})`,
        value: session.sessionId
      });

      if (selectedSessionId && session.sessionId === selectedSessionId) {
        option.selected = true;
      }
    }

    this.suppressHistorySelectionChange = false;
  }

  async persistCurrentSession(): Promise<void> {
    if (this.isApplyingLoadedSession) {
      return;
    }

    const sessionId = this.getSessionId().trim();
    if (!sessionId || this.getMessages().length === 0) {
      return;
    }

    try {
      await this.plugin.saveChatSession(sessionId, this.getMessages());
      await this.refreshHistoryDropdown(sessionId);
    } catch (error) {
      console.error("대화 기록 자동 저장 실패:", error);
    }
  }
}
