// 퍼지 검색 스텁 - 테스트 먼저 작성을 위한 빈 구현
// 실제 구현은 다음 커밋에서 추가됩니다.

import { Chunk } from "./types";

/** 문자 n-그램을 생성합니다. */
export function charNGrams(_text: string, _n: number = 3): string[] {
  throw new Error("미구현: charNGrams");
}

/** 두 배열 사이의 다이스 계수를 계산합니다. */
export function diceCoefficient(_a: string[], _b: string[]): number {
  throw new Error("미구현: diceCoefficient");
}

/** 두 문자열의 트라이그램 기반 유사도를 계산합니다. */
export function trigramSimilarity(_a: string, _b: string): number {
  throw new Error("미구현: trigramSimilarity");
}

/** 퍼지 검색을 수행합니다. */
export function fuzzySearch(
  _query: string,
  _chunks: Chunk[],
  _k: number,
  _minScore: number = 0.1
): Array<{ chunk: Chunk; score: number }> {
  throw new Error("미구현: fuzzySearch");
}
