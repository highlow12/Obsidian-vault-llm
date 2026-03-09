// BM25 (Best Matching 25) 검색 알고리즘 구현
// 단어 빈도(TF)와 역문서빈도(IDF)를 결합하여 관련성 높은 문서를 랭킹합니다.

import { Chunk } from "./types";

/** BM25 단어 빈도 포화 파라미터 (k1) */
export const BM25_K1 = 1.2;

/** BM25 문서 길이 정규화 파라미터 (b) */
export const BM25_B = 0.75;

/**
 * 텍스트를 소문자 단어 토큰 배열로 분리합니다.
 * 길이 2 미만의 토큰은 제거합니다.
 */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[\s.,!?;:'"()\[\]{}<>\/\\|@#$%^&*+=~`\-_]+/)
    .filter((t) => t.length >= 2);
}

/**
 * BM25 인덱스 클래스
 *
 * BM25 스코어 공식:
 * score(D, Q) = Σ_{t ∈ Q} IDF(t) * (tf * (k1+1)) / (tf + k1*(1-b+b*|D|/avgdl))
 *
 * IDF(t) = log((N - df(t) + 0.5) / (df(t) + 0.5) + 1)  [Robertson-Sparck Jones 변형]
 */
export class BM25Index {
  /** 단어 → 해당 단어가 포함된 문서 수 (역문서빈도 계산용) */
  private termDocFreq: Map<string, number> = new Map();
  /** 문서 ID → (단어 → 빈도) */
  private docTermFreq: Map<string, Map<string, number>> = new Map();
  /** 문서 ID → 토큰 수 */
  private docLengths: Map<string, number> = new Map();
  private totalDocs: number = 0;
  private totalLength: number = 0;
  private readonly k1: number;
  private readonly b: number;

  constructor(k1: number = BM25_K1, b: number = BM25_B) {
    this.k1 = k1;
    this.b = b;
  }

  /**
   * 청크를 인덱스에 추가합니다.
   * 동일 ID의 청크가 이미 존재하면 먼저 제거 후 재추가합니다.
   */
  addChunk(chunk: Chunk): void {
    if (this.docTermFreq.has(chunk.id)) {
      this.removeChunk(chunk.id);
    }

    const tokens = tokenize(chunk.text);
    const termFreq = new Map<string, number>();

    for (const token of tokens) {
      termFreq.set(token, (termFreq.get(token) ?? 0) + 1);
    }

    for (const term of termFreq.keys()) {
      this.termDocFreq.set(term, (this.termDocFreq.get(term) ?? 0) + 1);
    }

    this.docTermFreq.set(chunk.id, termFreq);
    this.docLengths.set(chunk.id, tokens.length);
    this.totalDocs++;
    this.totalLength += tokens.length;
  }

  /**
   * 청크를 인덱스에서 제거합니다.
   */
  removeChunk(chunkId: string): void {
    const termFreq = this.docTermFreq.get(chunkId);
    if (!termFreq) return;

    for (const term of termFreq.keys()) {
      const df = this.termDocFreq.get(term) ?? 0;
      if (df <= 1) {
        this.termDocFreq.delete(term);
      } else {
        this.termDocFreq.set(term, df - 1);
      }
    }

    const length = this.docLengths.get(chunkId) ?? 0;
    this.totalLength -= length;
    this.totalDocs--;
    this.docTermFreq.delete(chunkId);
    this.docLengths.delete(chunkId);
  }

  /**
   * 여러 청크를 배치로 제거합니다.
   */
  removeChunks(chunkIds: string[]): void {
    for (const id of chunkIds) {
      this.removeChunk(id);
    }
  }

  /**
   * Robertson-Sparck Jones 변형 IDF를 계산합니다.
   * IDF(t) = log((N - df(t) + 0.5) / (df(t) + 0.5) + 1)
   */
  private idf(term: string): number {
    const df = this.termDocFreq.get(term) ?? 0;
    if (df === 0) return 0;
    return Math.log((this.totalDocs - df + 0.5) / (df + 0.5) + 1);
  }

  /**
   * BM25 점수를 계산하여 상위 k개 결과를 반환합니다.
   */
  search(query: string, k: number): Array<{ chunkId: string; score: number }> {
    if (this.totalDocs === 0) return [];

    const queryTokens = tokenize(query);
    if (queryTokens.length === 0) return [];

    const avgdl = this.totalLength / this.totalDocs;
    const scores = new Map<string, number>();

    for (const [chunkId, termFreq] of this.docTermFreq) {
      const dl = this.docLengths.get(chunkId) ?? 0;
      let score = 0;

      for (const term of queryTokens) {
        const idf = this.idf(term);
        if (idf === 0) continue;

        const tf = termFreq.get(term) ?? 0;
        if (tf === 0) continue;

        const numerator = tf * (this.k1 + 1);
        const denominator = tf + this.k1 * (1 - this.b + (this.b * dl) / avgdl);
        score += idf * (numerator / denominator);
      }

      if (score > 0) {
        scores.set(chunkId, score);
      }
    }

    return Array.from(scores.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, k)
      .map(([chunkId, score]) => ({ chunkId, score }));
  }

  /**
   * 지정된 청크 ID 부분집합에 대해 BM25 점수를 계산합니다.
   * 퍼지 검색 후보군에 대해 BM25 관련성 점수를 매길 때 사용합니다.
   * @param query 검색 쿼리
   * @param chunkIds BM25 점수를 계산할 청크 ID 집합
   * @returns chunkId → BM25 점수 맵 (점수 > 0인 청크만 포함)
   */
  scoreSubset(query: string, chunkIds: string[]): Map<string, number> {
    const scores = new Map<string, number>();
    if (this.totalDocs === 0 || chunkIds.length === 0) return scores;

    const queryTokens = tokenize(query);
    if (queryTokens.length === 0) return scores;

    const avgdl = this.totalLength / this.totalDocs;
    const chunkIdSet = new Set(chunkIds);

    for (const chunkId of chunkIdSet) {
      const termFreq = this.docTermFreq.get(chunkId);
      if (!termFreq) continue;

      const dl = this.docLengths.get(chunkId) ?? 0;
      let score = 0;

      for (const term of queryTokens) {
        const idf = this.idf(term);
        if (idf === 0) continue;

        const tf = termFreq.get(term) ?? 0;
        if (tf === 0) continue;

        const numerator = tf * (this.k1 + 1);
        const denominator = tf + this.k1 * (1 - this.b + (this.b * dl) / avgdl);
        score += idf * (numerator / denominator);
      }

      if (score > 0) {
        scores.set(chunkId, score);
      }
    }

    return scores;
  }

  /**
   * 청크 목록으로 인덱스를 완전히 재구성합니다.
   */
  buildFromChunks(chunks: Chunk[]): void {
    this.termDocFreq.clear();
    this.docTermFreq.clear();
    this.docLengths.clear();
    this.totalDocs = 0;
    this.totalLength = 0;

    for (const chunk of chunks) {
      this.addChunk(chunk);
    }
  }

  /**
   * 현재 인덱스의 문서(청크) 수를 반환합니다.
   */
  getDocumentCount(): number {
    return this.totalDocs;
  }
}
