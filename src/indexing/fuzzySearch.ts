// 퍼지 검색 - 문자 n-그램 기반 유사도 검색
// 오타나 유사한 단어도 검색 결과에 포함시킵니다.

import { Chunk } from "./types";

/**
 * 문자 n-그램을 생성합니다.
 * @param text 입력 텍스트
 * @param n 그램 크기 (기본값: 3)
 * @returns n-그램 배열
 */
export function charNGrams(text: string, n: number = 3): string[] {
  const normalized = text.toLowerCase();
  if (normalized.length < n) return [];

  const ngrams: string[] = [];
  for (let i = 0; i <= normalized.length - n; i++) {
    ngrams.push(normalized.slice(i, i + n));
  }
  return ngrams;
}

/**
 * 두 배열(n-그램 집합) 사이의 다이스 계수를 계산합니다.
 * score = 2 * |A ∩ B| / (|A| + |B|)
 * @param a 첫 번째 n-그램 배열
 * @param b 두 번째 n-그램 배열
 * @returns 0(완전 다름)~1(완전 일치) 사이의 유사도
 */
export function diceCoefficient(a: string[], b: string[]): number {
  if (a.length === 0 || b.length === 0) return 0;

  const setA = new Set(a);
  const setB = new Set(b);

  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) intersection++;
  }

  return (2 * intersection) / (setA.size + setB.size);
}

/**
 * 두 문자열의 트라이그램(3-그램) 기반 유사도를 계산합니다.
 * @param a 첫 번째 문자열
 * @param b 두 번째 문자열
 * @returns 0~1 사이의 유사도 점수
 */
export function trigramSimilarity(a: string, b: string): number {
  const trigramsA = charNGrams(a, 3);
  const trigramsB = charNGrams(b, 3);
  return diceCoefficient(trigramsA, trigramsB);
}

/**
 * 퍼지 검색을 수행합니다.
 *
 * 쿼리를 단어로 분해한 뒤, 각 단어의 트라이그램을 청크 텍스트의 단어와 비교하여
 * 유사도 점수를 계산합니다. 오타나 약간 다른 표현도 매칭됩니다.
 *
 * @param query 검색 쿼리
 * @param chunks 검색 대상 청크 목록
 * @param k 반환할 최대 결과 수
 * @param minScore 최소 유사도 임계값 (기본값: 0.1)
 * @returns 점수 내림차순으로 정렬된 검색 결과
 */
export function fuzzySearch(
  query: string,
  chunks: Chunk[],
  k: number,
  minScore: number = 0.1
): Array<{ chunk: Chunk; score: number }> {
  if (!query || chunks.length === 0) return [];

  // 쿼리를 단어로 분리 (길이 2 이상만)
  const queryWords = query
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length >= 2);

  if (queryWords.length === 0) return [];

  // 각 쿼리 단어의 트라이그램을 미리 계산
  const queryWordTrigrams = queryWords.map((w) => charNGrams(w, 3));

  const results: Array<{ chunk: Chunk; score: number }> = [];

  for (const chunk of chunks) {
    // 청크 텍스트를 단어로 분리
    const textWords = chunk.text
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length >= 2);

    if (textWords.length === 0) continue;

    // 각 텍스트 단어의 트라이그램을 미리 계산
    const textWordTrigrams = textWords.map((w) => charNGrams(w, 3));

    // 각 쿼리 단어에 대해 텍스트에서 가장 유사한 단어를 찾음
    let totalScore = 0;

    for (const qTrigrams of queryWordTrigrams) {
      if (qTrigrams.length === 0) continue;

      let bestMatch = 0;
      for (const wTrigrams of textWordTrigrams) {
        const sim = diceCoefficient(qTrigrams, wTrigrams);
        if (sim > bestMatch) bestMatch = sim;
      }

      totalScore += bestMatch;
    }

    // 점수 = 매칭된 쿼리 단어들의 평균 유사도
    const score = totalScore / queryWordTrigrams.length;
    if (score >= minScore) {
      results.push({ chunk, score });
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, k);
}
