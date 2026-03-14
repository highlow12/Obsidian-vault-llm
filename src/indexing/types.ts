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

export interface FrontmatterComparison {
  key: string;
  op: ">" | "<" | ">=" | "<=" | "!=";
  value: unknown;
  /** true이면 이 조건에 해당하는 노트를 제외합니다. */
  excluded?: boolean;
}

export interface SearchFilter {
  folders?: string[];
  excludedFolders?: string[];
  filePaths?: string[];
  excludedFilePaths?: string[];
  contentTerms?: string[];
  lineTerms?: string[];
  blockTerms?: string[];
  sectionTerms?: string[];
  taskTerms?: string[];
  taskTodoTerms?: string[];
  taskDoneTerms?: string[];
  caseMode?: "default" | "match" | "ignore";
  tags?: string[];
  excludedTags?: string[];
  tagOperator?: "OR" | "AND";
  requiredProperties?: string[];
  excludedProperties?: string[];
  frontmatter?: Record<string, unknown>;
  excludedFrontmatter?: Record<string, unknown>;
  /** 속성 OR 다중값: [property:val1 OR val2] */
  frontmatterOR?: Record<string, unknown[]>;
  /** 제외 속성 OR 다중값: -[property:val1 OR val2] */
  excludedFrontmatterOR?: Record<string, unknown[]>;
  /** 속성 비교 연산자: [property:>5], [property:<=10] 등 */
  frontmatterComparisons?: FrontmatterComparison[];
  /** 단독 제외 항(-term): 일반 검색어에서 제외할 텀 */
  excludedTerms?: string[];
  /** 정규식 검색(/regex/): 본문 내 정규식 패턴 매칭 */
  regexTerms?: RegExp[];
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
