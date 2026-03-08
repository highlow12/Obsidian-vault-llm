// BM25 검색 알고리즘 스텁 - 테스트 먼저 작성을 위한 빈 구현
// 실제 구현은 다음 커밋에서 추가됩니다.

import { Chunk } from "./types";

/** BM25 단어 빈도 포화 파라미터 (k1) */
export const BM25_K1 = 1.2;

/** BM25 문서 길이 정규화 파라미터 (b) */
export const BM25_B = 0.75;

/** 텍스트를 소문자 단어 토큰 배열로 분리합니다. */
export function tokenize(_text: string): string[] {
  throw new Error("미구현: tokenize");
}

/** BM25 인덱스 클래스 (스텁) */
export class BM25Index {
  addChunk(_chunk: Chunk): void {
    throw new Error("미구현: addChunk");
  }

  removeChunk(_chunkId: string): void {
    throw new Error("미구현: removeChunk");
  }

  removeChunks(_chunkIds: string[]): void {
    throw new Error("미구현: removeChunks");
  }

  buildFromChunks(_chunks: Chunk[]): void {
    throw new Error("미구현: buildFromChunks");
  }

  search(_query: string, _k: number): Array<{ chunkId: string; score: number }> {
    throw new Error("미구현: search");
  }

  getDocumentCount(): number {
    throw new Error("미구현: getDocumentCount");
  }
}
