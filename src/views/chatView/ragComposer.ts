import type { ConversationTurn } from "../../conversation";
import type { Chunk, NoteMetadata } from "../../indexing/types";

export type ChatSearchResult = { chunk: Chunk; note: NoteMetadata; score: number };

export class ChatRagComposer {
  constructor(private readonly getThreshold: () => number) {}

  filterRelevantSearchResults(searchResults: ChatSearchResult[]): ChatSearchResult[] {
    const threshold = this.getThreshold();
    return searchResults.filter((result) => {
      const score = Number(result?.score);
      if (!Number.isFinite(score)) {
        return false;
      }
      return score >= threshold;
    });
  }

  buildContext(searchResults: ChatSearchResult[]): string {
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

  formatSearchResults(searchResults: ChatSearchResult[]): string {
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

  buildEnhancedMessages(
    query: string,
    context: string,
    baseTurns: ConversationTurn[]
  ): ConversationTurn[] {
    const systemPrompt = `너는 Obsidian 볼트의 전문 리서치 어시스턴트다. 
제공된 문서들을 참고하여 사용자의 질문에 답변하되, 항상 출처를 명시하라.
모르는 내용은 추측하지 말고 솔직하게 모른다고 답변하라.

[Context Filtering 지시사항]
아래 제공된 문서들 중 질문과 관련성이 높은 정보를 우선적으로 선택하여 답변하세요.
관련성이 낮은 문서는 무시하고, 가장 관련성 높은 내용을 중심으로 정확하게 답변하세요.

${context}`;

    return [
      { role: "system", content: systemPrompt, timestamp: new Date().toISOString() },
      ...baseTurns
    ];
  }
}
