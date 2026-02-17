import { ItemView, Notice, WorkspaceLeaf } from "obsidian";
import type { ConversationTurn } from "../conversation";
import type { PluginChatApi } from "../pluginApi";

export const VIEW_TYPE_OVL_CHAT = "ovl-chat-view";

export class ChatView extends ItemView {
  private readonly plugin: PluginChatApi;
  private messages: ConversationTurn[] = [];
  private messagesEl: HTMLDivElement | null = null;
  private inputEl: HTMLTextAreaElement | null = null;
  private sendButtonEl: HTMLButtonElement | null = null;
  private saveButtonEl: HTMLButtonElement | null = null;
  private sessionIdEl: HTMLInputElement | null = null;
  private useRagCheckbox: HTMLInputElement | null = null;
  private showSourcesCheckbox: HTMLInputElement | null = null;

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
    sessionWrapEl.createEl("span", { text: "세션" });
    const sessionInputEl = sessionWrapEl.createEl("input", { type: "text" });
    sessionInputEl.value = this.buildSessionId();
    this.sessionIdEl = sessionInputEl;

    const controlsEl = headerEl.createEl("div", { cls: "ovl-chat-controls" });
    
    // RAG 옵션
    const ragWrapEl = controlsEl.createEl("div", { cls: "ovl-rag-options" });
    const useRagLabel = ragWrapEl.createEl("label");
    const useRagCheckbox = useRagLabel.createEl("input", { type: "checkbox" });
    useRagCheckbox.checked = true;
    useRagLabel.appendText(" RAG 사용");
    this.useRagCheckbox = useRagCheckbox;

    const showSourcesLabel = ragWrapEl.createEl("label");
    const showSourcesCheckbox = showSourcesLabel.createEl("input", { type: "checkbox" });
    showSourcesCheckbox.checked = false;
    showSourcesLabel.appendText(" 소스만 보기");
    this.showSourcesCheckbox = showSourcesCheckbox;

    const saveButtonEl = controlsEl.createEl("button", { text: "저장" });
    saveButtonEl.addEventListener("click", () => {
      void this.handleSave();
    });
    this.saveButtonEl = saveButtonEl;

    const messagesEl = contentEl.createEl("div", { cls: "ovl-chat-messages" });
    this.messagesEl = messagesEl;

    const inputWrapEl = contentEl.createEl("div", { cls: "ovl-chat-input" });
    const textareaEl = inputWrapEl.createEl("textarea");
    textareaEl.placeholder = "메시지를 입력하세요. (Ctrl+Enter 전송)";
    this.inputEl = textareaEl;

    const sendButtonEl = inputWrapEl.createEl("button", { text: "전송" });
    sendButtonEl.addEventListener("click", () => {
      void this.handleSend();
    });
    this.sendButtonEl = sendButtonEl;

    textareaEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        void this.handleSend();
      }
    });
  }

  private buildSessionId(): string {
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    return `session-${stamp}`;
  }

  private setBusy(isBusy: boolean): void {
    if (this.sendButtonEl) {
      this.sendButtonEl.disabled = isBusy;
    }
    if (this.saveButtonEl) {
      this.saveButtonEl.disabled = isBusy;
    }
    if (this.inputEl) {
      this.inputEl.disabled = isBusy;
    }
    if (isBusy) {
      this.contentEl.addClass("ovl-chat-busy");
    } else {
      this.contentEl.removeClass("ovl-chat-busy");
    }
  }

  private appendMessage(turn: ConversationTurn): void {
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
    messageEl.createEl("div", {
      cls: "ovl-chat-content",
      text: turn.content
    });
    if (turn.timestamp) {
      const timestamp = typeof turn.timestamp === "string"
        ? turn.timestamp
        : turn.timestamp.toISOString();
      messageEl.createEl("div", {
        cls: "ovl-chat-timestamp",
        text: timestamp
      });
    }

    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
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

  private async handleSend(): Promise<void> {
    const input = this.inputEl?.value.trim() ?? "";
    if (!input) {
      new Notice("메시지를 입력해 주세요.");
      return;
    }

    this.appendMessage({
      role: "user",
      content: input,
      timestamp: new Date().toISOString()
    });
    if (this.inputEl) {
      this.inputEl.value = "";
    }

    this.setBusy(true);
    try {
      const useRag = this.useRagCheckbox?.checked ?? false;
      const showSourcesOnly = this.showSourcesCheckbox?.checked ?? false;

      let reply: string;

      if (useRag && this.plugin.settings.indexingEnabled) {
        // RAG 사용: 검색 후 컨텍스트 추가
        try {
          const searchResults = await (this.plugin as any).search(input);
          
          if (showSourcesOnly) {
            // 소스만 표시
            reply = this.formatSearchResults(searchResults);
          } else {
            // 검색 결과를 컨텍스트로 LLM에 전달
            const context = this.buildContext(searchResults);
            const enhancedMessages = this.buildEnhancedMessages(input, context);
            reply = await this.plugin.requestAssistantReply(enhancedMessages);
          }
        } catch (error) {
          console.error("RAG 검색 실패:", error);
          new Notice("검색에 실패하여 일반 모드로 전환합니다");
          reply = await this.plugin.requestAssistantReply(this.messages);
        }
      } else {
        // 일반 모드
        reply = await this.plugin.requestAssistantReply(this.messages);
      }

      this.appendMessage({
        role: "assistant",
        content: reply,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      new Notice(`대화 실패: ${message}`);
    } finally {
      this.setBusy(false);
    }
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

  private async handleSave(): Promise<void> {
    if (this.messages.length === 0) {
      new Notice("저장할 대화가 없습니다.");
      return;
    }

    const sessionId = this.sessionIdEl?.value.trim() ?? "";
    if (!sessionId) {
      new Notice("세션 ID를 입력해 주세요.");
      return;
    }

    try {
      const targetPath = await this.plugin.saveConversationFromTurns(
        sessionId,
        this.messages,
        this.plugin.settings.defaultOutputFolder
      );
      new Notice(`대화 저장 완료: ${targetPath}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      new Notice(`저장 실패: ${message}`);
    }
  }
}
