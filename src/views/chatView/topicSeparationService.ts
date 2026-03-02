import type { ConversationTurn } from "../../conversation";
import type { PluginChatApi } from "../../pluginApi";
import type { ChatPromptBuilder } from "./promptBuilder";
import type { ChatTextSanitizer } from "./textSanitizer";
import { appendLlmInputLog } from "../../logging";

export class ChatTopicSeparationService {
  constructor(
    private readonly plugin: PluginChatApi,
    private readonly promptBuilder: ChatPromptBuilder,
    private readonly textSanitizer: ChatTextSanitizer
  ) {}

  private async summarizeTurnsForSave(turns: ConversationTurn[]): Promise<string> {
    const summaryPrompt = this.promptBuilder.buildWikiSummaryPrompt(turns);
    await appendLlmInputLog(this.plugin.app, this.plugin.manifest, {
      source: "save-summary",
      systemPrompt: "",
      turns: [{ role: "user", content: summaryPrompt, timestamp: new Date().toISOString() }]
    });

    let summary = await this.plugin.requestSummaryReply(summaryPrompt);
    summary = this.textSanitizer.cleanSummary(summary);

    if (this.textSanitizer.isSummaryTooShort(summary)) {
      const retryPrompt = this.promptBuilder.buildWikiSummaryPrompt(turns, true);
      await appendLlmInputLog(this.plugin.app, this.plugin.manifest, {
        source: "save-summary",
        systemPrompt: "",
        turns: [{ role: "user", content: retryPrompt, timestamp: new Date().toISOString() }]
      });
      summary = await this.plugin.requestSummaryReply(retryPrompt);
      summary = this.textSanitizer.cleanSummary(summary);
    }

    return summary;
  }

  async separateTopicsWithLLM(
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
      `중요: 과도한 분리를 피하고, 의미상 큰 전환이 있을 때만 분리하세요.\n\n` +
      `분리 원칙:\n` +
      `- 기본값은 1개 문서입니다. 명확한 근거가 없으면 분리하지 마세요.\n` +
      `- 질문/답변 한 번 바뀌었다는 이유만으로 새 주제를 만들지 마세요.\n` +
      `- 같은 목표의 후속 질문, 세부화, 예시 요청, 재질문은 같은 주제로 유지하세요.\n` +
      `- 아래 경우에만 새 주제로 분리하세요: 문제 영역이 바뀜, 사용자 의도가 바뀜, 산출물 유형이 바뀜(예: 일정 논의 → 메뉴 추천).\n` +
      `- 애매하면 반드시 합치세요(보수적으로 분리).\n` +
      `- 전체 문서 수는 가능한 최소로 유지하세요.\n\n` +
      `출력 요구사항:\n` +
      `- 반드시 JSON 배열 형식으로만 응답 (다른 텍스트 없이)\n` +
      `- 형식: [{"title": "주제 제목", "content": "마크다운 내용"}, ...]\n` +
      `- title: 20자 이내의 간결한 제목, content: 위키 형식 마크다운, 한국어\n` +
      `- 각 주제 문서에는 맥락, 근거, 결론, 후속 과제를 포함하세요.\n\n` +
      `대화:\n${transcript}\n\n` +
      `JSON만 출력 (코드블록 없이):`;

    let topicSeparationResponse: string;
    try {
      await appendLlmInputLog(this.plugin.app, this.plugin.manifest, {
        source: "save-topic",
        systemPrompt: this.plugin.settings.systemPrompt,
        turns: [{ role: "user", content: prompt, timestamp: new Date().toISOString() }]
      });
      topicSeparationResponse = await this.plugin.requestAssistantReply([
        { role: "user", content: prompt, timestamp: new Date().toISOString() }
      ]);
    } catch (error) {
      console.error("LLM 주제 분리 요청 실패:", error);
      return [];
    }

    try {
      let jsonStr = topicSeparationResponse.trim();
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

  async runLlmTopicSeparation(
    turns: ConversationTurn[],
    finalSessionId: string,
    outputFolder: string
  ): Promise<number> {
    const llmBaseTitle = `${finalSessionId}(llm)`;
    const topicDocs = await this.separateTopicsWithLLM(turns);

    if (topicDocs.length > 1) {
      for (let topicIndex = 0; topicIndex < topicDocs.length; topicIndex++) {
        const doc = topicDocs[topicIndex];
        const docTitle = `${llmBaseTitle} - ${topicIndex + 1}. ${doc.title}`;
        await this.plugin.saveConversationFromTurns(
          docTitle,
          [{ role: "assistant", content: doc.content, timestamp: new Date().toISOString() }],
          outputFolder
        );
      }
      return topicDocs.length;
    }

    if (topicDocs.length === 1) {
      await this.plugin.saveConversationFromTurns(
        llmBaseTitle,
        [{ role: "assistant", content: topicDocs[0].content, timestamp: new Date().toISOString() }],
        outputFolder
      );
      return 1;
    }

    const summary = await this.summarizeTurnsForSave(turns);

    await this.plugin.saveConversationFromTurns(
      llmBaseTitle,
      [{ role: "assistant", content: summary, timestamp: new Date().toISOString() }],
      outputFolder
    );
    return 1;
  }

  /**
   * 임베딩/키워드 기반 주제 분리 후 저장합니다 (fed909fc 버전 로직)
   *
    * 사용자 요청으로 임베딩 방식 주제 분리 기능을 비활성화했습니다.
    * 필요 시 아래 주석 처리된 기존 구현을 복구해 사용할 수 있습니다.
   */
  async runEmbeddingTopicSeparation(
    turns: ConversationTurn[],
    finalSessionId: string,
    outputFolder: string
  ): Promise<number> {
    void turns;
    void finalSessionId;
    void outputFolder;

    // const embeddingBaseTitle = `${finalSessionId}(임베딩)`;
    // const engine = new TopicSeparationEngine({
    //   apiKey: this.plugin.settings.embeddingApiKey || this.plugin.settings.apiKey,
    //   embeddingModel: this.plugin.settings.embeddingModel,
    //   similarityThreshold: this.plugin.settings.saveSimilarityThreshold,
    //   minSegmentLength: 2,
    //   windowSize: 2,
    //   enableKeywordMetadata: true,
    //   app: this.plugin.app,
    //   manifest: this.plugin.manifest,
    //   enableEmbeddingLogging: true
    // });
    // try {
    //   const result = await engine.separateTopics(turns);
    //   const segments = result.segments.length > 0 ? result.segments.map((segment) => segment.turns) : [turns];
    //   if (segments.length === 1) {
    //     const summary = await this.summarizeTurnsForSave(segments[0]);
    //     await this.plugin.saveConversationFromTurns(
    //       embeddingBaseTitle,
    //       [{ role: "assistant", content: summary, timestamp: new Date().toISOString() }],
    //       outputFolder
    //     );
    //     return 1;
    //   }
    //   for (let segmentIndex = 0; segmentIndex < segments.length; segmentIndex++) {
    //     const summary = await this.summarizeTurnsForSave(segments[segmentIndex]);
    //     const docTitle = `${embeddingBaseTitle} - ${segmentIndex + 1}`;
    //     await this.plugin.saveConversationFromTurns(
    //       docTitle,
    //       [{ role: "assistant", content: summary, timestamp: new Date().toISOString() }],
    //       outputFolder
    //     );
    //   }
    //   return segments.length;
    // } finally {
    //   engine.clearCache();
    // }

    return 0;
  }
}
