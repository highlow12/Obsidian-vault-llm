import { extractKeywords } from "../topicSeparation/keywordExtractor";

/**
 * 질의문을 키워드 기반 임베딩 텍스트로 변환합니다.
 * 키워드가 없거나 오류가 발생하면 원문 질의를 그대로 반환합니다.
 */
export function buildQueryEmbeddingText(query: string): string {
  const normalizedQuery = query.trim();
  if (!normalizedQuery) {
    return "";
  }

  try {
    const keywords = extractKeywords(normalizedQuery)
      .map((keyword) => keyword.trim())
      .filter((keyword) => keyword.length > 0);

    if (keywords.length === 0) {
      return normalizedQuery;
    }

    return keywords.join(" ");
  } catch (error) {
    console.warn("질의 키워드 추출 실패, 원문 질의를 사용합니다:", error);
    return normalizedQuery;
  }
}
