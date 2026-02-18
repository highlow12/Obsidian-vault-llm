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
  modifiedAt?: number; // 파일시스템 수정 시간
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

export interface IndexingConfig {
  chunkSize: number;
  chunkOverlap: number;
  topK: number;
  embeddingProvider: "gemini" | "openai" | "local" | "custom";
  embeddingModel: string;
  embeddingApiKey?: string;
  embeddingApiUrl?: string;
  metaDbPath: string;
  vectorDbPath: string;
}

export interface IndexingProgress {
  totalFiles: number;
  processedFiles: number;
  currentFile?: string;
  status: "initializing" | "indexing" | "completed" | "error" | "cancelled";
  error?: string;
}
