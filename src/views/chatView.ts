import { ItemView, Notice, WorkspaceLeaf } from "obsidian";
import type { ConversationTurn } from "../conversation";
import type { AssistantTokenUsage, PluginChatApi } from "../pluginApi";
import { appendLlmInputLog } from "../logging";
import { ChatMessageRenderer } from "./chatView/messageRenderer";
import { ChatRagComposer } from "./chatView/ragComposer";
import { ChatPromptBuilder } from "./chatView/promptBuilder";
import { ChatTextSanitizer } from "./chatView/textSanitizer";
import { ChatTopicSeparationService } from "./chatView/topicSeparationService";
import { ChatSessionManager } from "./chatView/sessionManager";

export const VIEW_TYPE_OVL_CHAT = "ovl-chat-view";
/** 임베딩 주제 분리를 시도하는 최소 대화 턴 수 */
const MIN_TURNS_FOR_TOPIC_SEPARATION = 4;

export class ChatView extends ItemView {
  private readonly plugin: PluginChatApi;
  private inputEl: HTMLTextAreaElement | null = null;
  private sendButtonEl: HTMLButtonElement | null = null;
  private stopButtonEl: HTMLButtonElement | null = null;
  private vaultSearchButtonEl: HTMLButtonElement | null = null;
  private historySelectEl: HTMLSelectElement | null = null;
  private deleteSessionButtonEl: HTMLButtonElement | null = null;
  private saveButtonEl: HTMLButtonElement | null = null;
  private newSessionButtonEl: HTMLButtonElement | null = null;
  private sessionIdEl: HTMLInputElement | null = null;
  private showSourcesCheckbox: HTMLInputElement | null = null;
  private activeAbortController: AbortController | null = null;
  private readonly messageRenderer: ChatMessageRenderer;
  private readonly ragComposer: ChatRagComposer;
  private readonly promptBuilder: ChatPromptBuilder;
  private readonly textSanitizer: ChatTextSanitizer;
  private readonly topicSeparationService: ChatTopicSeparationService;
  private readonly sessionManager: ChatSessionManager;

  constructor(leaf: WorkspaceLeaf, plugin: PluginChatApi) {
    super(leaf);
    this.plugin = plugin;
    this.promptBuilder = new ChatPromptBuilder();
    this.textSanitizer = new ChatTextSanitizer();
    this.ragComposer = new ChatRagComposer(
      () => this.plugin.settings.searchSimilarityThreshold
    );
    this.messageRenderer = new ChatMessageRenderer(
      this,
      this.plugin,
      () => this.sessionManager.persistCurrentSession()
    );
    this.topicSeparationService = new ChatTopicSeparationService(
      this.plugin,
      this.promptBuilder,
      this.textSanitizer
    );
    this.sessionManager = new ChatSessionManager(
      this.plugin,
      () => this.sessionIdEl?.value ?? "",
      (value) => {
        if (this.sessionIdEl) {
          this.sessionIdEl.value = value;
        }
      },
      () => this.messageRenderer.getMessages(),
      () => this.messageRenderer.clearMessages(),
      (turn) => this.messageRenderer.appendMessage(turn),
      (state) => this.setBusyState(state),
      () => this.historySelectEl,
      () => this.clearStreamingState()
    );
  }

  getViewType(): string {
    return VIEW_TYPE_OVL_CHAT;
  }

  getDisplayText(): string {
    return "OVL 대화";
  }

  getIcon(): string {
    return "message-circle";
  }

  async onOpen(): Promise<void> {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("ovl-chat-view");

    const headerEl = contentEl.createEl("div", { cls: "ovl-chat-header" });
    headerEl.createEl("div", { cls: "ovl-chat-title", text: "OVL 대화" });

    const sessionWrapEl = headerEl.createEl("div", { cls: "ovl-chat-session" });
    sessionWrapEl.createEl("span", { text: "제목" });
    const sessionInputEl = sessionWrapEl.createEl("input", { type: "text" });
    sessionInputEl.value = this.buildSessionId();
    this.sessionIdEl = sessionInputEl;

    const controlsEl = headerEl.createEl("div", { cls: "ovl-chat-controls" });

    const showSourcesLabel = controlsEl.createEl("label", { cls: "ovl-source-option" });
    const showSourcesCheckbox = showSourcesLabel.createEl("input", { type: "checkbox" });
    showSourcesCheckbox.checked = false;
    showSourcesLabel.appendText(" 소스만 보기");
    this.showSourcesCheckbox = showSourcesCheckbox;

    const saveButtonEl = controlsEl.createEl("button", { text: "저장", cls: "ovl-chat-button" });
    saveButtonEl.addEventListener("click", () => {
      void this.handleSave();
    });
    this.saveButtonEl = saveButtonEl;

    const newSessionButtonEl = controlsEl.createEl("button", { text: "새 세션", cls: "ovl-chat-button" });
    newSessionButtonEl.addEventListener("click", () => {
      void this.handleStartNewSession();
    });
    this.newSessionButtonEl = newSessionButtonEl;

    const historySelectEl = controlsEl.createEl("select", { cls: "ovl-session-select" });
    historySelectEl.addEventListener("change", () => {
      void this.handleHistorySelectionChange();
    });
    this.historySelectEl = historySelectEl;

    const deleteSessionButtonEl = controlsEl.createEl("button", { text: "x", cls: "ovl-chat-button" });
    deleteSessionButtonEl.addEventListener("click", () => {
      void this.handleDeleteSelectedSession();
    });
    this.deleteSessionButtonEl = deleteSessionButtonEl;

    const messagesEl = contentEl.createEl("div", { cls: "ovl-chat-messages" });
    this.messageRenderer.setMessagesContainer(messagesEl);

    const inputWrapEl = contentEl.createEl("div", { cls: "ovl-chat-input" });
    const textareaEl = inputWrapEl.createEl("textarea");
    textareaEl.placeholder = "메시지를 입력하세요. (Ctrl+Enter 전송)";
    this.inputEl = textareaEl;

    const actionWrapEl = inputWrapEl.createEl("div", { cls: "ovl-chat-actions" });
    const vaultSearchButtonEl = actionWrapEl.createEl("button", {
      text: "볼트 검색 답변",
      cls: "ovl-chat-button"
    });
    vaultSearchButtonEl.addEventListener("click", () => {
      void this.handleSend(true);
    });
    this.vaultSearchButtonEl = vaultSearchButtonEl;

    const sendButtonEl = actionWrapEl.createEl("button", { text: "전송", cls: "ovl-chat-button" });
    sendButtonEl.addEventListener("click", () => {
      void this.handleSend(false);
    });
    this.sendButtonEl = sendButtonEl;

    const stopButtonEl = actionWrapEl.createEl("button", { text: "중단", cls: "ovl-chat-button" });
    stopButtonEl.disabled = true;
    stopButtonEl.addEventListener("click", () => {
      this.handleStopStreaming();
    });
    this.stopButtonEl = stopButtonEl;

    textareaEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        void this.handleSend(false);
      }
    });

    await this.sessionManager.refreshHistoryDropdown();
  }

  private buildSessionId(): string {
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    return `session-${stamp}`;
  }

  private setBusyState(state: {
    isBusy: boolean;
    sendLoading?: boolean;
    vaultSearchLoading?: boolean;
    saveLoading?: boolean;
    stopEnabled?: boolean;
    disableHistoryActions?: boolean;
  }): void {
    const sendLoading = state.sendLoading ?? false;
    const vaultSearchLoading = state.vaultSearchLoading ?? false;
    const saveLoading = state.saveLoading ?? false;
    const stopEnabled = state.stopEnabled ?? false;
    const disableHistoryActions = state.disableHistoryActions ?? false;

    if (this.sendButtonEl) {
      this.sendButtonEl.disabled = state.isBusy;
      this.sendButtonEl.classList.toggle("is-loading", sendLoading);
    }
    if (this.vaultSearchButtonEl) {
      this.vaultSearchButtonEl.disabled = state.isBusy;
      this.vaultSearchButtonEl.classList.toggle("is-loading", vaultSearchLoading);
    }
    if (this.saveButtonEl) {
      this.saveButtonEl.disabled = state.isBusy;
      this.saveButtonEl.classList.toggle("is-loading", saveLoading);
    }
    if (this.newSessionButtonEl) {
      this.newSessionButtonEl.disabled = state.isBusy;
    }
    if (this.historySelectEl) {
      this.historySelectEl.disabled = state.isBusy || disableHistoryActions;
    }
    if (this.deleteSessionButtonEl) {
      this.deleteSessionButtonEl.disabled = state.isBusy || disableHistoryActions;
    }
    if (this.stopButtonEl) {
      this.stopButtonEl.disabled = !stopEnabled;
    }
    if (this.inputEl) {
      this.inputEl.disabled = state.isBusy;
    }
    if (state.isBusy) {
      this.contentEl.addClass("ovl-chat-busy");
    } else {
      this.contentEl.removeClass("ovl-chat-busy");
    }
  }

  private clearStreamingState(): void {
    this.activeAbortController?.abort();
    this.activeAbortController = null;
    this.messageRenderer.clearStreamingMessageState();
  }

  private handleStopStreaming(): void {
    this.activeAbortController?.abort();
  }

  private isAbortError(error: unknown): boolean {
    return error instanceof Error && (error.name === "AbortError" || /중단|abort/i.test(error.message));
  }

  private async handleSend(useRag: boolean): Promise<void> {
    const input = this.inputEl?.value.trim() ?? "";
    if (!input) {
      new Notice("메시지를 입력해 주세요.");
      return;
    }

    const isFirstQuestion = this.messageRenderer.getMessages().length === 0;

    await this.messageRenderer.appendMessage({
      role: "user",
      content: input,
      timestamp: new Date().toISOString()
    });
    if (this.inputEl) {
      this.inputEl.value = "";
    }

    if (isFirstQuestion) {
      void this.generateSessionTitleFromQuestion(input);
    }

    const abortController = new AbortController();
    this.activeAbortController = abortController;

    this.setBusyState({
      isBusy: true,
      sendLoading: !useRag,
      vaultSearchLoading: useRag,
      stopEnabled: true
    });
    try {
      const showSourcesOnly = this.showSourcesCheckbox?.checked ?? false;

      let reply = "";
      let requestTurns: ConversationTurn[] | null = null;

      if (useRag && this.plugin.settings.indexingEnabled) {
        // RAG 사용: 검색 후 컨텍스트 추가
        try {
          const searchResults = await this.plugin.search(input);
          const relevantResults = this.ragComposer.filterRelevantSearchResults(searchResults);

          if (relevantResults.length === 0) {
            if (showSourcesOnly) {
              reply = "질문과 유사한 노트를 찾지 못했습니다.";
            } else {
              requestTurns = this.messageRenderer.getMessages();
              reply = "";
            }
          } else if (showSourcesOnly) {
            // 소스만 표시
            reply = this.ragComposer.formatSearchResults(relevantResults);
          } else {
            // 검색 결과를 컨텍스트로 LLM에 전달
            const context = this.ragComposer.buildContext(relevantResults);
            const enhancedMessages = this.ragComposer.buildEnhancedMessages(
              input,
              context,
              this.messageRenderer.getMessages()
            );
            requestTurns = enhancedMessages;
            reply = "";
          }
        } catch (error) {
          console.error("RAG 검색 실패:", error);
          new Notice("검색에 실패하여 일반 모드로 전환합니다");
          requestTurns = this.messageRenderer.getMessages();
          reply = "";
        }
      } else {
        // 일반 모드
        requestTurns = this.messageRenderer.getMessages();
        reply = "";
      }

      if (requestTurns) {
        await appendLlmInputLog(this.app, this.plugin.manifest, {
          source: useRag ? "vault-search" : "send",
          systemPrompt: this.plugin.settings.systemPrompt,
          turns: requestTurns
        });
        this.messageRenderer.createStreamingAssistantMessage();
        const startedAtMs = Date.now();
        let latestUsage: AssistantTokenUsage | undefined;
        let streamedReply = "";
        try {
          reply = await this.plugin.requestAssistantReplyStream(requestTurns, {
            signal: abortController.signal,
            onToken: (token) => {
              streamedReply += token;
              this.messageRenderer.updateStreamingAssistantMessage(token);
            },
            onUsage: (usage) => {
              latestUsage = usage;
            }
          });
          if (!reply) {
            reply = streamedReply;
          }

          this.messageRenderer.setStreamingGenerationLog(
            this.messageRenderer.buildAssistantGenerationLog({
              requestTurns,
              reply,
              startedAtMs,
              completedAtMs: Date.now(),
              usage: latestUsage
            })
          );

          await this.messageRenderer.finalizeStreamingAssistantMessage(reply);
        } catch (error) {
          const partialReply = streamedReply || this.messageRenderer.getStreamingTurnContent();
          if (partialReply) {
            this.messageRenderer.setStreamingGenerationLog(
              this.messageRenderer.buildAssistantGenerationLog({
                requestTurns,
                reply: partialReply,
                startedAtMs,
                completedAtMs: Date.now(),
                usage: latestUsage
              })
            );
            await this.messageRenderer.finalizeStreamingAssistantMessage(partialReply);
          } else {
            this.messageRenderer.removeStreamingAssistantMessage();
          }

          if (this.isAbortError(error)) {
            new Notice("응답 생성을 중단했습니다.");
            return;
          }
          throw error;
        }
      } else {
        await this.messageRenderer.appendMessage({
          role: "assistant",
          content: reply,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      new Notice(`대화 실패: ${message}`);
    } finally {
      this.activeAbortController = null;
      this.setBusyState({ isBusy: false });
    }
  }


  private async handleSave(): Promise<void> {
    if (this.messageRenderer.getMessages().length === 0) {
      new Notice("저장할 대화가 없습니다.");
      return;
    }

    this.setBusyState({ isBusy: true, saveLoading: true });
    try {
      const conversationTitle = await this.generateTitleForSave();
      const sessionId = this.sessionIdEl?.value.trim() ?? "";
      const finalSessionId = conversationTitle || sessionId;
      if (!finalSessionId) {
        new Notice("제목을 입력해 주세요.");
        return;
      }
      if (conversationTitle && this.sessionIdEl) {
        this.sessionIdEl.value = conversationTitle;
      }

      const outputFolder = this.plugin.settings.defaultOutputFolder;
      const currentMessages = this.messageRenderer.getMessages();

      // 대화가 충분하고 API 키가 있을 때 임베딩 주제 분리 시도 (fed909fc 방식)
      const enableTopicSeparation = currentMessages.length >= MIN_TURNS_FOR_TOPIC_SEPARATION &&
        (this.plugin.settings.embeddingApiKey || this.plugin.settings.apiKey);

      if (enableTopicSeparation) {
        new Notice("대화를 주제별로 분석하는 중...");
        try {
          const topicCount = await this.topicSeparationService.runEmbeddingTopicSeparation(
            currentMessages,
            finalSessionId,
            outputFolder
          );
          if (topicCount > 1) {
            new Notice(`${topicCount}개의 주제로 분리하여 저장 완료!`);
            this.resetSession();
            return;
          }
          // 단일 주제 → 위키 요약으로 폴백
          console.log("단일 주제로 판단되어 일반 저장 수행");
        } catch (error) {
          console.error("주제 분리 실패, 일반 저장으로 전환:", error);
          new Notice("주제 분리 실패. 일반 방식으로 저장합니다.");
        }
      }

      // 위키 요약 저장 (단일 주제이거나 주제 분리 실패/미실행 시)
      const fileCount = await this.topicSeparationService.runLlmTopicSeparation(
        currentMessages,
        finalSessionId,
        outputFolder
      );
      new Notice(`저장 완료! (${fileCount}개 파일)`);
      this.resetSession();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      new Notice(`저장 실패: ${message}`);
    } finally {
      this.setBusyState({ isBusy: false });
    }
  }

  private resetSession(): void {
    this.messageRenderer.clearMessages();
    if (this.inputEl) {
      this.inputEl.value = "";
    }
    if (this.sessionIdEl) {
      this.sessionIdEl.value = this.buildSessionId();
    }
    void this.sessionManager.refreshHistoryDropdown();
  }

  private async handleStartNewSession(): Promise<void> {
    await this.sessionManager.startNewSession(() => this.buildSessionId());
  }

  private async handleHistorySelectionChange(): Promise<void> {
    if (!this.historySelectEl || this.sessionManager.isHistorySelectionSuppressed()) {
      return;
    }
    const sessionId = this.historySelectEl.value;
    if (!sessionId) {
      return;
    }

    await this.sessionManager.loadHistorySessionById(sessionId);
  }

  private async handleDeleteSelectedSession(): Promise<void> {
    if (!this.historySelectEl) {
      return;
    }

    const sessionId = this.historySelectEl.value;
    await this.sessionManager.deleteSelectedSession(sessionId);
  }

  private async generateSessionTitleFromQuestion(question: string): Promise<void> {
    if (!this.sessionIdEl) {
      return;
    }

    const prompt = this.promptBuilder.buildSessionTitlePrompt(question);

    try {
      const title = await this.plugin.requestTitleReply(prompt);
      const cleaned = this.textSanitizer.cleanTitle(title);
      if (cleaned) {
        this.sessionIdEl.value = cleaned;
      }
    } catch (error) {
      console.error("세션 제목 생성 실패:", error);
    }
  }

  private async generateTitleForSave(): Promise<string> {
    const prompt = this.promptBuilder.buildSaveTitlePrompt(
      this.messageRenderer.getMessages()
    );

    try {
      const title = await this.plugin.requestTitleReply(prompt);
      return this.textSanitizer.cleanTitle(title);
    } catch (error) {
      console.error("저장용 제목 생성 실패:", error);
      return "";
    }
  }

}

