// 벡터 스토어 - 임베딩 저장 및 유사도 검색

import Database from "better-sqlite3";
import { Chunk, SearchResult, SearchFilter } from "./types";

export class VectorStore {
  private db: Database.Database;

  constructor(dbPath: string) {
    this.db = new Database(dbPath);
    this.initializeSchema();
  }

  /**
   * 데이터베이스 스키마 초기화
   */
  private initializeSchema(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS embeddings (
        chunk_id TEXT PRIMARY KEY,
        embedding TEXT NOT NULL -- JSON array of numbers
      );

      CREATE INDEX IF NOT EXISTS idx_embeddings_chunk_id ON embeddings(chunk_id);
    `);
  }

  /**
   * 임베딩 저장
   */
  storeEmbedding(chunkId: string, embedding: number[]): void {
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO embeddings (chunk_id, embedding)
      VALUES (?, ?)
    `);
    stmt.run(chunkId, JSON.stringify(embedding));
  }

  /**
   * 여러 임베딩 일괄 저장
   */
  storeEmbeddings(embeddings: Map<string, number[]>): void {
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO embeddings (chunk_id, embedding)
      VALUES (?, ?)
    `);

    const transaction = this.db.transaction((embeddings: Map<string, number[]>) => {
      for (const [chunkId, embedding] of embeddings.entries()) {
        stmt.run(chunkId, JSON.stringify(embedding));
      }
    });

    transaction(embeddings);
  }

  /**
   * 임베딩 조회
   */
  getEmbedding(chunkId: string): number[] | null {
    const stmt = this.db.prepare("SELECT embedding FROM embeddings WHERE chunk_id = ?");
    const row = stmt.get(chunkId) as any;
    return row ? JSON.parse(row.embedding) : null;
  }

  /**
   * 모든 임베딩 조회
   */
  getAllEmbeddings(): Map<string, number[]> {
    const stmt = this.db.prepare("SELECT chunk_id, embedding FROM embeddings");
    const rows = stmt.all() as any[];
    const result = new Map<string, number[]>();

    for (const row of rows) {
      result.set(row.chunk_id, JSON.parse(row.embedding));
    }

    return result;
  }

  /**
   * 청크의 임베딩 삭제
   */
  deleteEmbedding(chunkId: string): void {
    const stmt = this.db.prepare("DELETE FROM embeddings WHERE chunk_id = ?");
    stmt.run(chunkId);
  }

  /**
   * 여러 청크의 임베딩 삭제
   */
  deleteEmbeddings(chunkIds: string[]): void {
    const placeholders = chunkIds.map(() => "?").join(",");
    const stmt = this.db.prepare(`DELETE FROM embeddings WHERE chunk_id IN (${placeholders})`);
    stmt.run(...chunkIds);
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
    this.db.close();
  }
}
