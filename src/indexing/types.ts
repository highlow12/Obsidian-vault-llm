// 인덱싱 시스템 타입 정의

export interface NoteMetadata {
  id: string;
  path: string;
  title: string;
  tags: string[];
  links: string[];
  frontmatter: Record<string, unknown>;
  updatedAt: number;
  hash: string;
}

export interface Chunk {
  id: string;
  noteId: string;
  text: string;
  embedding?: number[];
  position: number;
  tokenCount: number;
  section: string;
}

export interface SearchResult {
  chunk: Chunk;
  note: NoteMetadata;
  score: number;
  snippet: string;
}

export interface SearchFilter {
  folders?: string[];
  tags?: string[];
  frontmatter?: Record<string, unknown>;
  dateRange?: {
    from?: Date;
    to?: Date;
  };
}

export interface VectorStoreData {
  indexSignature: string;
  dimension: number | null;
  updatedAt: number;
  embeddings: Record<string, number[]>;
}

export interface MetadataStoreData {
  indexSignature: string;
  updatedAt: number;
  notes: Record<string, NoteMetadata>;
  chunks: Record<string, Chunk>;
}

export interface IndexingConfig {
  chunkSize: number;
  chunkOverlap: number;
  topK: number;
  vectorIndexEngine?: "json" | "hnsw";
  embeddingProvider: "gemini" | "openai" | "local" | "custom";
  embeddingModel: string;
  embeddingApiKey?: string;
  embeddingApiUrl?: string;
  metaStorePath: string;
  vectorStorePath: string;
}
