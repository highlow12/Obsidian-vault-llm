import { ItemView, MarkdownRenderer, Notice, WorkspaceLeaf } from "obsidian";
import type { ConversationTurn } from "../conversation";
import type { PluginChatApi } from "../pluginApi";
import { TopicSeparationEngine } from "../topicSeparation";
import { saveSegmentsAsNotes } from "../topicSeparation";

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
    sessionWrapEl.createEl("span", { text: "제목" });
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

    const saveButtonEl = controlsEl.createEl("button", { text: "저장", cls: "ovl-chat-button" });
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

    const sendButtonEl = inputWrapEl.createEl("button", { text: "전송", cls: "ovl-chat-button" });
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

  private setBusyState(state: {
    isBusy: boolean;
    sendLoading?: boolean;
    saveLoading?: boolean;
  }): void {
    const sendLoading = state.sendLoading ?? false;
    const saveLoading = state.saveLoading ?? false;

    if (this.sendButtonEl) {
      this.sendButtonEl.disabled = state.isBusy;
      this.sendButtonEl.classList.toggle("is-loading", sendLoading);
    }
    if (this.saveButtonEl) {
      this.saveButtonEl.disabled = state.isBusy;
      this.saveButtonEl.classList.toggle("is-loading", saveLoading);
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

    this.setBusyState({ isBusy: true, sendLoading: true });
    try {
      const useRag = this.useRagCheckbox?.checked ?? false;
      const showSourcesOnly = this.showSourcesCheckbox?.checked ?? false;

      let reply: string;

      if (useRag && this.plugin.settings.indexingEnabled) {
        // RAG 사용: 검색 후 컨텍스트 추가
        try {
          const searchResults = await this.plugin.search(input);
          
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

      await this.appendMessage({
        role: "assistant",
        content: reply,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      new Notice(`대화 실패: ${message}`);
    } finally {
      this.setBusyState({ isBusy: false });
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

      // 주제 분리 활성화 확인 (대화가 4턴 이상일 때만)
      const enableTopicSeparation = this.messages.length >= 4 && this.plugin.settings.apiKey;

      if (enableTopicSeparation) {
        // 주제 분리 AI 사용
        new Notice("대화를 주제별로 분석하는 중...");
        
        try {
          const engine = new TopicSeparationEngine({
            apiKey: this.plugin.settings.apiKey,
            similarityThreshold: 0.75,
            minSegmentLength: 2,
            windowSize: 2,
            enableKeywordMetadata: true
          });

          const result = await engine.separateTopics(this.messages);
          
          console.log(`주제 분리 완료: ${result.segments.length}개 세그먼트 감지`);

          if (result.segments.length > 1) {
            // 여러 주제로 분리됨
            new Notice(`${result.segments.length}개의 주제로 분리되었습니다. 저장 중...`);

            const multiNoteResult = await saveSegmentsAsNotes(
              this.app.vault,
              result.segments,
              result.links,
              finalSessionId,
              this.plugin.settings.defaultOutputFolder
            );

            new Notice(
              `주제별로 분리하여 저장 완료!\n` +
              `- 주제 노트: ${multiNoteResult.notePaths.length}개\n` +
              `- 인덱스: ${multiNoteResult.mainNotePath}`
            );

            engine.clearCache();
            this.resetSession();
            return;
          } else {
            // 단일 주제로 판단됨
            console.log("단일 주제로 판단되어 일반 저장 수행");
          }

          engine.clearCache();
        } catch (error) {
          console.error("주제 분리 실패, 일반 저장으로 전환:", error);
          new Notice("주제 분리 실패. 일반 방식으로 저장합니다.");
        }
      }

      // 일반 저장 (기존 로직)
      const summaryPrompt = this.buildWikiSummaryPrompt(this.messages);
      let summary = await this.plugin.requestAssistantReply([
        {
          role: "user",
          content: summaryPrompt,
          timestamp: new Date().toISOString()
        }
      ]);
      summary = this.cleanSummary(summary);

      const targetPath = await this.plugin.saveConversationFromTurns(
        finalSessionId,
        [
          {
            role: "assistant",
            content: summary,
            timestamp: new Date().toISOString()
          }
        ],
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
  }

  private buildWikiSummaryPrompt(turns: ConversationTurn[]): string {
    const transcript = turns
      .map((turn) => {
        const roleLabel =
          turn.role === "user" ? "사용자" :
          turn.role === "assistant" ? "어시스턴트" :
          "시스템";
        return `[${roleLabel}] ${turn.content}`;
      })
      .join("\n\n");

    return `다음 대화를 위키 형식의 마크다운 본문으로 정리해 주세요.\n\n` +
      `출력 형식(본문만):\n` +
      `# 제목\n` +
      `## 요약\n` +
      `## 핵심 주제\n` +
      `## 결정 사항\n` +
      `## 액션 아이템\n` +
      `## 열린 질문\n\n` +
      `요구사항:\n` +
      `- 위 형식을 지켜서 구조적으로 작성\n` +
      `- 가능한 경우 목록과 표 사용\n` +
      `- 한국어로 작성\n` +
      `- "어시스턴트"/타임스탬프/서문/설명/사족 없이 본문만 출력\n\n` +
      `대화 기록:\n${transcript}`;
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

  private cleanTitle(title: string): string {
    return title
      .replace(/["'`]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }
}
