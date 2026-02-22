import { ItemView, MarkdownRenderer, Notice, WorkspaceLeaf } from "obsidian";
import type { AssistantGenerationLog, ConversationTurn } from "../conversation";
import type { AssistantTokenUsage, PluginChatApi } from "../pluginApi";

export const VIEW_TYPE_OVL_CHAT = "ovl-chat-view";

export class ChatView extends ItemView {
  private readonly plugin: PluginChatApi;
  private messages: ConversationTurn[] = [];
  private messagesEl: HTMLDivElement | null = null;
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
  private streamingMessageEl: HTMLDivElement | null = null;
  private streamingContentEl: HTMLDivElement | null = null;
  private streamingTurn: ConversationTurn | null = null;
  private isApplyingLoadedSession: boolean = false;
  private suppressHistorySelectionChange: boolean = false;

  constructor(leaf: WorkspaceLeaf, plugin: PluginChatApi) {
    super(leaf);
    this.plugin = plugin;
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
    this.messagesEl = messagesEl;

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

    await this.refreshHistoryDropdown();
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

  private async appendMessage(turn: ConversationTurn): Promise<void> {
    this.messages.push(turn);
    if (!this.messagesEl) {
      return;
    }

    const messageEl = this.messagesEl.createEl("div", {
      cls: `ovl-chat-message ovl-chat-${turn.role}`
    });
    messageEl.createEl("div", {
      cls: "ovl-chat-role",
      text: this.getRoleLabel(turn.role)
    });
    const contentEl = messageEl.createEl("div", {
      cls: "ovl-chat-content markdown-preview-view markdown-rendered"
    });
    try {
      await MarkdownRenderer.renderMarkdown(turn.content, contentEl, "", this);
    } catch (error) {
      const fallback = error instanceof Error ? error.message : String(error);
      contentEl.setText(`렌더링 실패: ${fallback}`);
    }
    if (turn.timestamp) {
      const timestamp = typeof turn.timestamp === "string"
        ? turn.timestamp
        : turn.timestamp.toISOString();
      messageEl.createEl("div", {
        cls: "ovl-chat-timestamp",
        text: timestamp
      });
    }

    if (turn.role === "assistant" && turn.generationLog) {
      this.renderGenerationLogControls(messageEl, turn.generationLog);
    }

    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
    await this.persistCurrentSession();
  }

  private createStreamingAssistantMessage(): void {
    const turn: ConversationTurn = {
      role: "assistant",
      content: "",
      timestamp: new Date().toISOString()
    };
    this.messages.push(turn);
    this.streamingTurn = turn;

    if (!this.messagesEl) {
      return;
    }

    const messageEl = this.messagesEl.createEl("div", {
      cls: "ovl-chat-message ovl-chat-assistant"
    });
    messageEl.createEl("div", {
      cls: "ovl-chat-role",
      text: this.getRoleLabel("assistant")
    });

    const contentEl = messageEl.createEl("div", {
      cls: "ovl-chat-content markdown-preview-view markdown-rendered"
    });
    contentEl.setText("");

    const timestamp = turn.timestamp
      ? (typeof turn.timestamp === "string" ? turn.timestamp : turn.timestamp.toISOString())
      : new Date().toISOString();

    messageEl.createEl("div", {
      cls: "ovl-chat-timestamp",
      text: timestamp
    });

    this.streamingMessageEl = messageEl;
    this.streamingContentEl = contentEl;
    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
  }

  private updateStreamingAssistantMessage(token: string): void {
    if (!this.streamingTurn || !this.streamingContentEl || !token) {
      return;
    }

    this.streamingTurn.content += token;
    this.streamingContentEl.setText(this.streamingTurn.content);

    if (this.messagesEl) {
      this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
    }
  }

  private async finalizeStreamingAssistantMessage(finalContent?: string): Promise<void> {
    if (!this.streamingTurn || !this.streamingContentEl) {
      this.clearStreamingMessageState();
      return;
    }

    if (typeof finalContent === "string") {
      this.streamingTurn.content = finalContent;
    }

    this.streamingContentEl.empty();
    try {
      await MarkdownRenderer.renderMarkdown(this.streamingTurn.content, this.streamingContentEl, "", this);
    } catch (error) {
      const fallback = error instanceof Error ? error.message : String(error);
      this.streamingContentEl.setText(`렌더링 실패: ${fallback}`);
    }

    if (this.streamingMessageEl && this.streamingTurn.generationLog) {
      this.renderGenerationLogControls(this.streamingMessageEl, this.streamingTurn.generationLog);
    }

    if (this.messagesEl) {
      this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
    }

    await this.persistCurrentSession();

    this.clearStreamingMessageState();
  }

  private removeStreamingAssistantMessage(): void {
    if (this.streamingTurn) {
      const index = this.messages.indexOf(this.streamingTurn);
      if (index >= 0) {
        this.messages.splice(index, 1);
      }
    }

    this.streamingMessageEl?.remove();
    this.clearStreamingMessageState();
  }

  private clearStreamingMessageState(): void {
    this.streamingTurn = null;
    this.streamingMessageEl = null;
    this.streamingContentEl = null;
  }

  private handleStopStreaming(): void {
    this.activeAbortController?.abort();
  }

  private isAbortError(error: unknown): boolean {
    return error instanceof Error && (error.name === "AbortError" || /중단|abort/i.test(error.message));
  }

  private getRoleLabel(role: ConversationTurn["role"]): string {
    if (role === "user") {
      return "사용자";
    }
    if (role === "assistant") {
      return "어시스턴트";
    }
    return "시스템";
  }

  private async handleSend(useRag: boolean): Promise<void> {
    const input = this.inputEl?.value.trim() ?? "";
    if (!input) {
      new Notice("메시지를 입력해 주세요.");
      return;
    }

    const isFirstQuestion = this.messages.length === 0;

    await this.appendMessage({
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

      let reply: string;
      let requestTurns: ConversationTurn[] | null = null;

      if (useRag && this.plugin.settings.indexingEnabled) {
        // RAG 사용: 검색 후 컨텍스트 추가
        try {
          const searchResults = await this.plugin.search(input);
          const relevantResults = this.filterRelevantSearchResults(searchResults);
          
          if (relevantResults.length === 0) {
            if (showSourcesOnly) {
              reply = "질문과 유사한 노트를 찾지 못했습니다.";
            } else {
              requestTurns = this.messages;
              reply = "";
            }
          } else if (showSourcesOnly) {
            // 소스만 표시
            reply = this.formatSearchResults(relevantResults);
          } else {
            // 검색 결과를 컨텍스트로 LLM에 전달
            const context = this.buildContext(relevantResults);
            const enhancedMessages = this.buildEnhancedMessages(input, context);
            requestTurns = enhancedMessages;
            reply = "";
          }
        } catch (error) {
          console.error("RAG 검색 실패:", error);
          new Notice("검색에 실패하여 일반 모드로 전환합니다");
          requestTurns = this.messages;
          reply = "";
        }
      } else {
        // 일반 모드
        requestTurns = this.messages;
        reply = "";
      }

      if (requestTurns) {
        this.createStreamingAssistantMessage();
        const startedAtMs = Date.now();
        let latestUsage: AssistantTokenUsage | undefined;
        let streamedReply = "";
        try {
          reply = await this.plugin.requestAssistantReplyStream(requestTurns, {
            signal: abortController.signal,
            onToken: (token) => {
              streamedReply += token;
              this.updateStreamingAssistantMessage(token);
            },
            onUsage: (usage) => {
              latestUsage = usage;
            }
          });
          if (!reply) {
            reply = streamedReply;
          }

          if (this.streamingTurn) {
            this.streamingTurn.generationLog = this.buildAssistantGenerationLog({
              requestTurns,
              reply,
              startedAtMs,
              completedAtMs: Date.now(),
              usage: latestUsage
            });
          }

          await this.finalizeStreamingAssistantMessage(reply);
        } catch (error) {
          const partialReply = streamedReply || this.streamingTurn?.content || "";
          if (partialReply) {
            if (this.streamingTurn) {
              this.streamingTurn.generationLog = this.buildAssistantGenerationLog({
                requestTurns,
                reply: partialReply,
                startedAtMs,
                completedAtMs: Date.now(),
                usage: latestUsage
              });
            }
            await this.finalizeStreamingAssistantMessage(partialReply);
          } else {
            this.removeStreamingAssistantMessage();
          }

          if (this.isAbortError(error)) {
            new Notice("응답 생성을 중단했습니다.");
            return;
          }
          throw error;
        }
      } else {
        await this.appendMessage({
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

  private filterRelevantSearchResults(searchResults: any[]): any[] {
    const threshold = this.plugin.settings.searchSimilarityThreshold;
    return searchResults.filter((result) => {
      const score = Number(result?.score);
      if (!Number.isFinite(score)) {
        return false;
      }
      return score >= threshold;
    });
  }

  private buildContext(searchResults: any[]): string {
    if (searchResults.length === 0) {
      return "관련 문서를 찾을 수 없습니다.";
    }

    let context = "다음은 검색된 관련 문서들입니다:\n\n";
    
    for (let i = 0; i < searchResults.length; i++) {
      const result = searchResults[i];
      const { chunk, note, score } = result;
      
      context += `## 문서 ${i + 1}: ${note.title}\n`;
      context += `- 파일: ${note.path}\n`;
      context += `- 섹션: ${chunk.section || "본문"}\n`;
      context += `- 유사도: ${(score * 100).toFixed(1)}%\n\n`;
      context += `${chunk.text}\n\n`;
      context += "---\n\n";
    }

    return context;
  }

  private formatSearchResults(searchResults: any[]): string {
    if (searchResults.length === 0) {
      return "검색 결과가 없습니다.";
    }

    let output = "# 검색 결과\n\n";
    
    for (let i = 0; i < searchResults.length; i++) {
      const result = searchResults[i];
      const { chunk, note, score } = result;
      
      output += `## ${i + 1}. ${note.title}\n\n`;
      output += `**파일**: [[${note.path}]]\n`;
      output += `**섹션**: ${chunk.section || "본문"}\n`;
      output += `**유사도**: ${(score * 100).toFixed(1)}%\n\n`;
      output += `> ${chunk.text.substring(0, 200)}${chunk.text.length > 200 ? "..." : ""}\n\n`;
    }

    return output;
  }

  private buildEnhancedMessages(query: string, context: string): ConversationTurn[] {
    // 시스템 프롬프트에 컨텍스트 추가
    const systemPrompt = `너는 Obsidian 볼트의 전문 리서치 어시스턴트다. 
제공된 문서들을 참고하여 사용자의 질문에 답변하되, 항상 출처를 명시하라.
모르는 내용은 추측하지 말고 솔직하게 모른다고 답변하라.

${context}`;

    // 기존 메시지에 시스템 프롬프트 추가
    return [
      { role: "system", content: systemPrompt, timestamp: new Date().toISOString() },
      ...this.messages
    ];
  }

  private buildAssistantGenerationLog(params: {
    requestTurns: ConversationTurn[];
    reply: string;
    startedAtMs: number;
    completedAtMs: number;
    usage?: AssistantTokenUsage;
  }): AssistantGenerationLog {
    const durationMs = Math.max(1, params.completedAtMs - params.startedAtMs);
    const estimatedInputTokens = this.estimateTokenCount(
      params.requestTurns.map((turn) => turn.content).join("\n")
    );
    const estimatedOutputTokens = this.estimateTokenCount(params.reply);

    const inputTokens = params.usage?.inputTokens ?? estimatedInputTokens;
    const outputTokens = params.usage?.outputTokens ?? estimatedOutputTokens;
    const totalTokens = params.usage?.totalTokens ?? inputTokens + outputTokens;
    const tokensPerSecond = outputTokens / (durationMs / 1000);

    return {
      provider: this.plugin.settings.provider,
      model: this.plugin.settings.model,
      inputTokens,
      outputTokens,
      totalTokens,
      durationMs,
      tokensPerSecond,
      startedAt: new Date(params.startedAtMs).toISOString(),
      completedAt: new Date(params.completedAtMs).toISOString(),
      estimated: !params.usage
    };
  }

  private estimateTokenCount(text: string): number {
    const compact = text.replace(/\s+/g, " ").trim();
    if (!compact) {
      return 0;
    }

    const charBased = Math.ceil(compact.length / 4);
    const wordBased = compact.split(" ").filter(Boolean).length;
    return Math.max(1, Math.max(charBased, wordBased));
  }

  private renderGenerationLogControls(messageEl: HTMLDivElement, log: AssistantGenerationLog): void {
    const controlsEl = messageEl.createEl("div", { cls: "ovl-chat-log-controls" });
    const buttonEl = controlsEl.createEl("button", {
      cls: "ovl-chat-log-button",
      text: "!"
    });
    buttonEl.type = "button";
    buttonEl.setAttribute("aria-label", "생성 로그 보기");

    const panelEl = messageEl.createEl("div", { cls: "ovl-chat-log-panel" });
    panelEl.addClass("is-hidden");

    const items: Array<{ label: string; value: string }> = [
      { label: "제공자", value: log.provider || "-" },
      { label: "모델", value: log.model || "-" },
      { label: "입력 토큰", value: this.formatTokenValue(log.inputTokens) },
      { label: "출력 토큰", value: this.formatTokenValue(log.outputTokens) },
      { label: "총 토큰", value: this.formatTokenValue(log.totalTokens) },
      { label: "생성 시간", value: `${log.durationMs.toLocaleString()} ms` },
      { label: "초당 토큰", value: this.formatTokensPerSecond(log.tokensPerSecond) },
      {
        label: "토큰 출처",
        value: log.estimated ? "추정치(응답 기반 계산)" : "API 사용량 메타데이터"
      }
    ];

    for (const item of items) {
      const rowEl = panelEl.createEl("div", { cls: "ovl-chat-log-row" });
      rowEl.createEl("span", { cls: "ovl-chat-log-label", text: item.label });
      rowEl.createEl("span", { cls: "ovl-chat-log-value", text: item.value });
    }

    buttonEl.addEventListener("click", () => {
      const nextHidden = !panelEl.hasClass("is-hidden");
      panelEl.toggleClass("is-hidden", nextHidden);
      buttonEl.toggleClass("is-open", !nextHidden);
    });
  }

  private formatTokenValue(value?: number): string {
    if (!Number.isFinite(value)) {
      return "-";
    }
    return Number(value).toLocaleString();
  }

  private formatTokensPerSecond(value?: number): string {
    if (!Number.isFinite(value) || value === undefined) {
      return "-";
    }
    return `${value.toFixed(2)} tps`;
  }

  private async handleSave(): Promise<void> {
    if (this.messages.length === 0) {
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

      new Notice("대화를 주제별로 분석하는 중...");

      // 단일 LLM 호출로 주제 분리 및 문서 생성
      const topicDocs = await this.separateTopicsWithLLM(this.messages);

      if (topicDocs.length > 1) {
        // 여러 주제로 분리됨
        for (let topicIndex = 0; topicIndex < topicDocs.length; topicIndex++) {
          const doc = topicDocs[topicIndex];
          const docTitle = `${finalSessionId} - ${topicIndex + 1}. ${doc.title}`;
          await this.plugin.saveConversationFromTurns(
            docTitle,
            [{ role: "assistant", content: doc.content, timestamp: new Date().toISOString() }],
            this.plugin.settings.defaultOutputFolder
          );
        }
        new Notice(`${topicDocs.length}개의 주제로 분리하여 저장 완료!`);
        this.resetSession();
        return;
      }

      if (topicDocs.length === 1) {
        // 단일 주제
        const targetPath = await this.plugin.saveConversationFromTurns(
          finalSessionId,
          [{ role: "assistant", content: topicDocs[0].content, timestamp: new Date().toISOString() }],
          this.plugin.settings.defaultOutputFolder
        );
        new Notice(`저장 완료: ${targetPath}`);
        this.resetSession();
        return;
      }

      // LLM 응답 파싱 실패 시 기존 위키 요약 방식으로 폴백
      new Notice("주제 분리 실패. 일반 방식으로 저장합니다.");
      const summaryPrompt = this.buildWikiSummaryPrompt(this.messages);
      let summary = await this.plugin.requestAssistantReply([
        { role: "user", content: summaryPrompt, timestamp: new Date().toISOString() }
      ]);
      summary = this.cleanSummary(summary);

      if (this.isSummaryTooShort(summary)) {
        const retryPrompt = this.buildWikiSummaryPrompt(this.messages, true);
        summary = await this.plugin.requestAssistantReply([
          { role: "user", content: retryPrompt, timestamp: new Date().toISOString() }
        ]);
        summary = this.cleanSummary(summary);
      }

      const targetPath = await this.plugin.saveConversationFromTurns(
        finalSessionId,
        [{ role: "assistant", content: summary, timestamp: new Date().toISOString() }],
        this.plugin.settings.defaultOutputFolder
      );
      new Notice(`위키 요약 저장 완료: ${targetPath}`);
      this.resetSession();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      new Notice(`저장 실패: ${message}`);
    } finally {
      this.setBusyState({ isBusy: false });
    }
  }

  private resetSession(): void {
    this.messages = [];
    if (this.messagesEl) {
      this.messagesEl.empty();
    }
    if (this.inputEl) {
      this.inputEl.value = "";
    }
    if (this.sessionIdEl) {
      this.sessionIdEl.value = this.buildSessionId();
    }
    void this.refreshHistoryDropdown();
  }

  private async handleStartNewSession(): Promise<void> {
    this.setBusyState({ isBusy: true, disableHistoryActions: true });
    try {
      this.activeAbortController?.abort();
      this.clearStreamingMessageState();

      const sessionId = this.sessionIdEl?.value.trim() ?? "";
      if (this.messages.length > 0 && sessionId) {
        await this.plugin.saveChatSession(sessionId, this.messages);
      }

      this.resetSession();
      new Notice("새 세션을 시작했습니다.");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      new Notice(`새 세션 시작 실패: ${message}`);
    } finally {
      this.setBusyState({ isBusy: false });
    }
  }

  private async handleHistorySelectionChange(): Promise<void> {
    if (!this.historySelectEl || this.suppressHistorySelectionChange) {
      return;
    }
    const sessionId = this.historySelectEl.value;
    if (!sessionId) {
      return;
    }

    await this.loadHistorySessionById(sessionId);
  }

  private async handleDeleteSelectedSession(): Promise<void> {
    if (!this.historySelectEl) {
      return;
    }

    const sessionId = this.historySelectEl.value;
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

  private async loadHistorySessionById(sessionId: string): Promise<void> {
    this.setBusyState({ isBusy: true, disableHistoryActions: true });
    try {
      const turns = await this.plugin.loadChatSession(sessionId);
      this.activeAbortController?.abort();
      this.clearStreamingMessageState();
      this.isApplyingLoadedSession = true;
      this.messages = [];
      if (this.messagesEl) {
        this.messagesEl.empty();
      }
      for (const turn of turns) {
        await this.appendMessage(turn);
      }
      this.isApplyingLoadedSession = false;
      if (this.sessionIdEl) {
        this.sessionIdEl.value = sessionId;
      }
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

  private async refreshHistoryDropdown(selectedSessionId?: string): Promise<void> {
    if (!this.historySelectEl) {
      return;
    }

    const sessions = await this.plugin.listChatSessions();
    this.suppressHistorySelectionChange = true;
    this.historySelectEl.empty();

    const placeholder = this.historySelectEl.createEl("option", {
      text: "기록 불러오기",
      value: ""
    });
    placeholder.selected = true;

    for (const session of sessions) {
      const option = this.historySelectEl.createEl("option", {
        text: `${session.sessionId} (${session.turnCount})`,
        value: session.sessionId
      });

      if (selectedSessionId && session.sessionId === selectedSessionId) {
        option.selected = true;
      }
    }

    this.suppressHistorySelectionChange = false;
  }

  private async persistCurrentSession(): Promise<void> {
    if (this.isApplyingLoadedSession) {
      return;
    }

    const sessionId = this.sessionIdEl?.value.trim() ?? "";
    if (!sessionId || this.messages.length === 0) {
      return;
    }

    try {
      await this.plugin.saveChatSession(sessionId, this.messages);
      await this.refreshHistoryDropdown(sessionId);
    } catch (error) {
      console.error("대화 기록 자동 저장 실패:", error);
    }
  }

  private buildWikiSummaryPrompt(turns: ConversationTurn[], enforceLongForm: boolean = false): string {
    const transcript = turns
      .map((turn) => {
        const roleLabel =
          turn.role === "user" ? "사용자" :
          turn.role === "assistant" ? "어시스턴트" :
          "시스템";
        return `[${roleLabel}] ${turn.content}`;
      })
      .join("\n\n");

    const minLength = enforceLongForm ? 1800 : 1200;

    return `다음 대화를 자세한 위키 요약문으로 작성해 주세요.\n\n` +
      `요구사항:\n` +
      `- 출력은 YAML frontmatter 와 본문만 작성\n` +
      `- # 제목은 쓰지 말고 바로 본문부터 시작\n` +
      `- 형식(헤더/목록/표)은 자유롭게 선택하되, 가독성은 유지\n` +
      `- 단순 압축 요약이 아니라 맥락, 근거, 결론, 후속 과제를 충분히 설명\n` +
      `- 대화 흐름(문제 제기 -> 검토 -> 판단/결정 -> 실행 계획)이 보이게 정리\n` +
      `- 등장한 주요 개념, 조건, 제약, 대안, 트레이드오프를 빠짐없이 포함\n` +
      `- 실행 가능한 항목은 구체적 행동 단위로 작성(누가/무엇을/어떻게)\n` +
      `- 불확실한 내용과 추가 확인이 필요한 항목을 분리해서 명시\n` +
      `- 한국어로 작성\n` +
      `- 최소 ${minLength}자 이상으로 충분히 자세히 작성\n` +
      `- "어시스턴트", 타임스탬프, 서문성 멘트, 사족 없이 본문만 출력\n\n` +
      `대화 기록:\n${transcript}`;
  }

  private isSummaryTooShort(summary: string): boolean {
    const compact = summary
      .replace(/```[\s\S]*?```/g, "")
      .replace(/\s+/g, "")
      .trim();

    return compact.length < 900;
  }

  private cleanSummary(summary: string): string {
    const lines = summary.split("\n");
    const cleaned = [] as string[];
    let index = 0;

    while (index < lines.length) {
      const line = lines[index].trim();
      if (line.startsWith("## 🤖") || line.startsWith("## 어시스턴트")) {
        index += 1;
        while (index < lines.length && lines[index].trim().startsWith("*")) {
          index += 1;
        }
        while (index < lines.length && lines[index].trim() === "") {
          index += 1;
        }
        continue;
      }
      if (line.startsWith("다음은 ") && line.includes("요약")) {
        index += 1;
        while (index < lines.length && lines[index].trim() === "") {
          index += 1;
        }
        continue;
      }
      cleaned.push(lines[index]);
      index += 1;
    }

    return cleaned.join("\n").trim();
  }

  private async generateSessionTitleFromQuestion(question: string): Promise<void> {
    if (!this.sessionIdEl) {
      return;
    }

    const prompt =
      "다음 질문을 보고 세션 제목을 만들어 주세요. " +
      "조건: 12~20자 내외의 간결한 제목, 이모지/따옴표 금지, 제목만 출력.\n\n" +
      `질문: ${question}`;

    try {
      const title = await this.plugin.requestTitleReply(prompt);
      const cleaned = this.cleanTitle(title);
      if (cleaned) {
        this.sessionIdEl.value = cleaned;
      }
    } catch (error) {
      console.error("세션 제목 생성 실패:", error);
    }
  }

  private async generateTitleForSave(): Promise<string> {
    const transcript = this.messages
      .map((turn) => {
        const roleLabel =
          turn.role === "user" ? "사용자" :
          turn.role === "assistant" ? "어시스턴트" :
          "시스템";
        return `[${roleLabel}] ${turn.content}`;
      })
      .join("\n\n");

    const prompt =
      "다음 대화 내용을 보고 문장형 제목을 만들어 주세요. " +
      "조건: 20~40자 내외, 이모지/따옴표 금지, 제목만 출력.\n\n" +
      `대화:\n${transcript}`;

    try {
      const title = await this.plugin.requestTitleReply(prompt);
      return this.cleanTitle(title);
    } catch (error) {
      console.error("저장용 제목 생성 실패:", error);
      return "";
    }
  }

  private async separateTopicsWithLLM(
    turns: ConversationTurn[]
  ): Promise<Array<{ title: string; content: string }>> {
    const transcript = turns
      .map((turn) => {
        const roleLabel =
          turn.role === "user" ? "사용자" :
          turn.role === "assistant" ? "어시스턴트" :
          "시스템";
        return `[${roleLabel}] ${turn.content}`;
      })
      .join("\n\n");

    const prompt =
      `다음 대화를 주제별로 분리하고 각 주제에 대한 위키 문서를 작성해 주세요.\n\n` +
      `요구사항:\n` +
      `- 대화의 주요 주제들을 파악하여 분리\n` +
      `- 주제가 하나뿐이면 하나의 문서만 작성\n` +
      `- 각 주제별로 맥락, 근거, 결론, 후속 과제를 포함한 위키 형식 문서 작성\n` +
      `- 반드시 JSON 배열 형식으로만 응답 (다른 텍스트 없이)\n` +
      `- 형식: [{"title": "주제 제목", "content": "마크다운 내용"}, ...]\n` +
      `- title: 20자 이내의 간결한 제목, content: 위키 형식 마크다운, 한국어\n\n` +
      `대화:\n${transcript}\n\n` +
      `JSON만 출력 (코드블록 없이):`;

    let topicSeparationResponse: string;
    try {
      topicSeparationResponse = await this.plugin.requestAssistantReply([
        { role: "user", content: prompt, timestamp: new Date().toISOString() }
      ]);
    } catch (error) {
      console.error("LLM 주제 분리 요청 실패:", error);
      return [];
    }

    try {
      let jsonStr = topicSeparationResponse.trim();
      // 코드블록 제거
      jsonStr = jsonStr.replace(/^```(?:json)?\s*|\s*```$/gi, "");
      const parsed = JSON.parse(jsonStr) as unknown;
      if (
        Array.isArray(parsed) &&
        parsed.length > 0 &&
        parsed.every(
          (item): item is { title: string; content: string } =>
            typeof item === "object" &&
            item !== null &&
            typeof (item as Record<string, unknown>).title === "string" &&
            typeof (item as Record<string, unknown>).content === "string"
        )
      ) {
        return parsed;
      }
    } catch (error) {
      console.error("LLM 주제 분리 응답 파싱 실패:", error, topicSeparationResponse);
    }

    return [];
  }

  private cleanTitle(title: string): string {
    return title
      .replace(/["'`]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }
}
