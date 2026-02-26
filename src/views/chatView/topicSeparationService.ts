import type { ConversationTurn } from "../../conversation";
import type { PluginChatApi } from "../../pluginApi";
import type { ChatPromptBuilder } from "./promptBuilder";
import type { ChatTextSanitizer } from "./textSanitizer";
import { appendLlmInputLog } from "../../logging";
import { TopicSeparationEngine, saveSegmentsAsNotes } from "../../topicSeparation";

export class ChatTopicSeparationService {
  constructor(
    private readonly plugin: PluginChatApi,
    private readonly promptBuilder: ChatPromptBuilder,
    private readonly textSanitizer: ChatTextSanitizer
  ) {}

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
   * 다중 주제가 발견된 경우에만 저장하고 세그먼트 수를 반환합니다.
   * 단일 주제인 경우 0을 반환하며, 호출자가 위키 요약으로 폴백해야 합니다.
   */
  async runEmbeddingTopicSeparation(
    turns: ConversationTurn[],
    finalSessionId: string,
    outputFolder: string
  ): Promise<number> {
    const engine = new TopicSeparationEngine({
      apiKey: this.plugin.settings.embeddingApiKey || this.plugin.settings.apiKey,
      embeddingModel: this.plugin.settings.embeddingModel,
      similarityThreshold: this.plugin.settings.saveSimilarityThreshold,
      minSegmentLength: 2,
      windowSize: 2,
      enableKeywordMetadata: true,
      app: this.plugin.app,
      manifest: this.plugin.manifest,
      enableEmbeddingLogging: true
    });

    try {
      const result = await engine.separateTopics(turns);
      console.log(`주제 분리 완료: ${result.segments.length}개 세그먼트 감지`);

      if (result.segments.length > 1) {
        await saveSegmentsAsNotes(
          this.plugin.app.vault,
          result.segments,
          result.links,
          finalSessionId,
          outputFolder,
          this.plugin.app,
          this.plugin.manifest
        );
        return result.segments.length;
      }

      return 0;
    } finally {
      engine.clearCache();
    }
  }
}
