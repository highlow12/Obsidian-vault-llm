import { ItemView, MarkdownRenderer } from "obsidian";
import type { AssistantGenerationLog, ConversationTurn } from "../../conversation";
import type { AssistantTokenUsage, PluginChatApi } from "../../pluginApi";

type GenerationLogParams = {
  requestTurns: ConversationTurn[];
  reply: string;
  startedAtMs: number;
  completedAtMs: number;
  usage?: AssistantTokenUsage;
};

export class ChatMessageRenderer {
  private messages: ConversationTurn[] = [];
  private messagesEl: HTMLDivElement | null = null;
  private streamingTurn: ConversationTurn | null = null;
  private streamingMessageEl: HTMLDivElement | null = null;
  private streamingContentEl: HTMLDivElement | null = null;

  constructor(
    private readonly view: ItemView,
    private readonly plugin: PluginChatApi,
    private readonly onPersist: () => Promise<void>
  ) {}

  setMessagesContainer(messagesEl: HTMLDivElement | null): void {
    this.messagesEl = messagesEl;
  }

  getMessages(): ConversationTurn[] {
    return this.messages;
  }

  setMessages(turns: ConversationTurn[]): void {
    this.messages = [...turns];
  }

  clearMessages(): void {
    this.messages = [];
    this.messagesEl?.empty();
  }

  hasStreamingTurn(): boolean {
    return Boolean(this.streamingTurn);
  }

  getStreamingTurnContent(): string {
    return this.streamingTurn?.content ?? "";
  }

  setStreamingGenerationLog(log: AssistantGenerationLog): void {
    if (this.streamingTurn) {
      this.streamingTurn.generationLog = log;
    }
  }

  async appendMessage(turn: ConversationTurn): Promise<void> {
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
      await MarkdownRenderer.renderMarkdown(turn.content, contentEl, "", this.view);
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
    await this.onPersist();
  }

  createStreamingAssistantMessage(): void {
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

  updateStreamingAssistantMessage(token: string): void {
    if (!this.streamingTurn || !this.streamingContentEl || !token) {
      return;
    }

    this.streamingTurn.content += token;
    this.streamingContentEl.setText(this.streamingTurn.content);

    if (this.messagesEl) {
      this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
    }
  }

  async finalizeStreamingAssistantMessage(finalContent?: string): Promise<void> {
    if (!this.streamingTurn || !this.streamingContentEl) {
      this.clearStreamingMessageState();
      return;
    }

    if (typeof finalContent === "string") {
      this.streamingTurn.content = finalContent;
    }

    this.streamingContentEl.empty();
    try {
      await MarkdownRenderer.renderMarkdown(
        this.streamingTurn.content,
        this.streamingContentEl,
        "",
        this.view
      );
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

    await this.onPersist();

    this.clearStreamingMessageState();
  }

  removeStreamingAssistantMessage(): void {
    if (this.streamingTurn) {
      const index = this.messages.indexOf(this.streamingTurn);
      if (index >= 0) {
        this.messages.splice(index, 1);
      }
    }

    this.streamingMessageEl?.remove();
    this.clearStreamingMessageState();
  }

  clearStreamingMessageState(): void {
    this.streamingTurn = null;
    this.streamingMessageEl = null;
    this.streamingContentEl = null;
  }

  buildAssistantGenerationLog(params: GenerationLogParams): AssistantGenerationLog {
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

  private getRoleLabel(role: ConversationTurn["role"]): string {
    if (role === "user") {
      return "사용자";
    }
    if (role === "assistant") {
      return "어시스턴트";
    }
    return "시스템";
  }
}
