// 벡터 스토어 - 임베딩 저장 및 유사도 검색

import { existsSync, mkdirSync, readFileSync, writeFileSync, renameSync } from "fs";
import { dirname } from "path";
import { VectorStoreData } from "./types";
import { VectorIndex } from "./vectorIndex";

export class VectorStore implements VectorIndex {
  private readonly storePath: string;
  private data: VectorStoreData;

  constructor(storePath: string, indexSignature: string) {
    this.storePath = storePath;
    this.data = this.loadData(indexSignature);
  }

  /**
   * 저장소 데이터 로드
   */
  private loadData(indexSignature: string): VectorStoreData {
    if (!existsSync(this.storePath)) {
      return {
        indexSignature,
        dimension: null,
        updatedAt: Date.now(),
        embeddings: {},
      };
    }

    try {
      const raw = readFileSync(this.storePath, "utf-8");
      const parsed = JSON.parse(raw) as Partial<VectorStoreData>;
      return {
        indexSignature: parsed.indexSignature || indexSignature,
        dimension: typeof parsed.dimension === "number" ? parsed.dimension : null,
        updatedAt: typeof parsed.updatedAt === "number" ? parsed.updatedAt : Date.now(),
        embeddings: parsed.embeddings || {},
      };
    } catch (error) {
      console.warn("벡터 저장소 로드 실패, 새로 초기화합니다:", error);
      return {
        indexSignature,
        dimension: null,
        updatedAt: Date.now(),
        embeddings: {},
      };
    }
  }

  /**
   * 저장소 데이터 저장 (원자적 쓰기)
   */
  private persist(): void {
    mkdirSync(dirname(this.storePath), { recursive: true });
    this.data.updatedAt = Date.now();

    const tempPath = `${this.storePath}.tmp`;
    writeFileSync(tempPath, JSON.stringify(this.data), "utf-8");
    renameSync(tempPath, this.storePath);
  }

  /**
   * 인덱스 시그니처 조회
   */
  getIndexSignature(): string {
    return this.data.indexSignature;
  }

  /**
   * 벡터 차원 조회
   */
  getDimension(): number | null {
    return this.data.dimension;
  }

  /**
   * 저장소 초기화
   */
  reset(indexSignature: string): void {
    this.data = {
      indexSignature,
      dimension: null,
      updatedAt: Date.now(),
      embeddings: {},
    };
    this.persist();
  }

  /**
   * 임베딩 저장
   */
  storeEmbedding(chunkId: string, embedding: number[]): void {
    if (this.data.dimension === null) {
      this.data.dimension = embedding.length;
    }

    if (embedding.length !== this.data.dimension) {
      throw new Error(
        `임베딩 차원 불일치: expected=${this.data.dimension}, actual=${embedding.length}`
      );
    }

    this.data.embeddings[chunkId] = embedding;
    this.persist();
  }

  /**
   * 여러 임베딩 일괄 저장
   */
  storeEmbeddings(embeddings: Map<string, number[]>): void {
    for (const [chunkId, embedding] of embeddings.entries()) {
      if (this.data.dimension === null) {
        this.data.dimension = embedding.length;
      }

      if (embedding.length !== this.data.dimension) {
        throw new Error(
          `임베딩 차원 불일치: expected=${this.data.dimension}, actual=${embedding.length}`
        );
      }

      this.data.embeddings[chunkId] = embedding;
    }

    this.persist();
  }

  /**
   * 임베딩 조회
   */
  getEmbedding(chunkId: string): number[] | null {
    return this.data.embeddings[chunkId] || null;
  }

  /**
   * 모든 임베딩 조회
   */
  getAllEmbeddings(): Map<string, number[]> {
    const result = new Map<string, number[]>();

    for (const [chunkId, embedding] of Object.entries(this.data.embeddings)) {
      result.set(chunkId, embedding);
    }

    return result;
  }

  /**
   * 청크의 임베딩 삭제
   */
  deleteEmbedding(chunkId: string): void {
    delete this.data.embeddings[chunkId];

    if (Object.keys(this.data.embeddings).length === 0) {
      this.data.dimension = null;
    }

    this.persist();
  }

  /**
   * 여러 청크의 임베딩 삭제
   */
  deleteEmbeddings(chunkIds: string[]): void {
    if (chunkIds.length === 0) {
      return;
    }

    for (const chunkId of chunkIds) {
      delete this.data.embeddings[chunkId];
    }

    if (Object.keys(this.data.embeddings).length === 0) {
      this.data.dimension = null;
    }

    this.persist();
  }

  /**
   * 코사인 유사도 계산
   */
  private cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) {
      throw new Error("벡터 길이가 일치하지 않습니다");
    }

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  /**
   * 벡터 검색 - Top-K 유사 청크 찾기
   * 
   * 참고: 현재 구현은 모든 임베딩을 메모리에 로드하여 선형 검색을 수행합니다.
   * 대규모 볼트의 경우 성능이 저하될 수 있으며, 다음과 같은 개선이 권장됩니다:
   * - ANN(Approximate Nearest Neighbor) 알고리즘 사용 (FAISS, HNSW 등)
   * - 전용 벡터 데이터베이스 사용 (Chroma, Qdrant 등)
   * - 증분 검색 또는 인덱스 캐싱
   */
  search(queryEmbedding: number[], k: number = 8): Array<{ chunkId: string; score: number }> {
    const allEmbeddings = this.getAllEmbeddings();
    const scores: Array<{ chunkId: string; score: number }> = [];

    for (const [chunkId, embedding] of allEmbeddings.entries()) {
      const score = this.cosineSimilarity(queryEmbedding, embedding);
      scores.push({ chunkId, score });
    }

    // 점수 기준 내림차순 정렬 후 상위 K개 반환
    scores.sort((a, b) => b.score - a.score);
    return scores.slice(0, k);
  }

  /**
   * 데이터베이스 닫기
   */
  close(): void {
    // 파일 기반 저장소는 close 동작이 필요하지 않습니다.
  }
}
