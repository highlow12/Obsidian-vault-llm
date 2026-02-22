// 벡터 인덱스 추상화 인터페이스

export type VectorSearchHit = {
  chunkId: string;
  score: number;
};

export interface VectorIndex {
  getIndexSignature(): string;
  getDimension(): number | null;
  reset(indexSignature: string): void;
  storeEmbedding(chunkId: string, embedding: number[]): void;
  storeEmbeddings(embeddings: Map<string, number[]>): void;
  getEmbedding(chunkId: string): number[] | null;
  getAllEmbeddings(): Map<string, number[]>;
  deleteEmbedding(chunkId: string): void;
  deleteEmbeddings(chunkIds: string[]): void;
  search(queryEmbedding: number[], k?: number): VectorSearchHit[];
  close(): void;
}
