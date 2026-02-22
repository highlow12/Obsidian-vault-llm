// 인덱서 - 파일 스캔, 파싱, 청킹, 임베딩, 저장을 통합

import { MetadataStore } from "./metadataStore";
import { EmbeddingGenerator, EmbeddingConfig } from "./embeddings";
import { parseMarkdown, computeHash } from "./parser";
import { chunkText } from "./chunker";
import { IndexingConfig, NoteMetadata, Chunk } from "./types";
import { createHash } from "crypto";
import { VectorIndex } from "./vectorIndex";
import { createVectorIndex } from "./vectorIndexFactory";
import { buildQueryEmbeddingText } from "./queryKeywordEmbedding";

export class Indexer {
  private metadataStore: MetadataStore;
  private vectorStore: VectorIndex;
  private embeddingGenerator: EmbeddingGenerator;
  private config: IndexingConfig;
  private indexSignature: string;

  constructor(config: IndexingConfig) {
    this.config = config;
    this.indexSignature = this.generateIndexSignature();
    this.metadataStore = new MetadataStore(config.metaStorePath, this.indexSignature);
    this.vectorStore = createVectorIndex(config, this.indexSignature);
    
    const embeddingConfig: EmbeddingConfig = {
      provider: config.embeddingProvider,
      model: config.embeddingModel,
      apiKey: config.embeddingApiKey,
      apiUrl: config.embeddingApiUrl,
    };
    
    this.embeddingGenerator = new EmbeddingGenerator(embeddingConfig);
  }

  /**
   * 초기화 - 임베딩 모델 로드
   */
  async initialize(): Promise<void> {
    await this.embeddingGenerator.initialize();

    const metadataSignature = this.metadataStore.getIndexSignature();
    const vectorSignature = this.vectorStore.getIndexSignature();

    if (
      metadataSignature !== this.indexSignature ||
      vectorSignature !== this.indexSignature
    ) {
      console.log("임베딩 모델 변경 감지: 기존 인덱스를 초기화합니다.");
      this.metadataStore.reset(this.indexSignature);
      this.vectorStore.reset(this.indexSignature);
    }
  }

  /**
   * 단일 파일 인덱싱
   */
  async indexFile(filePath: string, content: string): Promise<void> {
    try {
      // 파일 해시 계산
      const hash = computeHash(content);

      // 기존 노트 확인
      const existingNote = this.metadataStore.getNoteByPath(filePath);
      if (existingNote && existingNote.hash === hash) {
        console.log(`파일 변경 없음, 스킵: ${filePath}`);
        return;
      }

      // 마크다운 파싱
      const parsed = parseMarkdown(filePath, content);

      // 노트 ID 생성
      const noteId = this.generateNoteId(filePath);

      // 메타데이터 저장
      const noteMetadata: NoteMetadata = {
        id: noteId,
        path: filePath,
        title: parsed.title,
        tags: parsed.tags,
        links: parsed.links,
        frontmatter: parsed.frontmatter,
        updatedAt: Date.now(),
        hash,
      };

      this.metadataStore.upsertNote(noteMetadata);

      // 기존 청크 삭제
      if (existingNote) {
        const oldChunks = this.metadataStore.getChunksByNoteId(noteId);
        this.vectorStore.deleteEmbeddings(oldChunks.map((c) => c.id));
        this.metadataStore.deleteChunksByNoteId(noteId);
      }

      // 청킹
      const chunks = chunkText(noteId, parsed.sections, {
        chunkSize: this.config.chunkSize,
        chunkOverlap: this.config.chunkOverlap,
      });

      if (chunks.length === 0) {
        console.log(`청크 없음: ${filePath}`);
        return;
      }

      // 청크 저장
      this.metadataStore.insertChunks(chunks);

      // 임베딩 생성 및 저장
      console.log(`임베딩 생성 중: ${filePath} (${chunks.length}개 청크)`);
      for (const chunk of chunks) {
        const embedding = await this.embeddingGenerator.embed(chunk.text);
        this.vectorStore.storeEmbedding(chunk.id, embedding);
      }

      console.log(`인덱싱 완료: ${filePath}`);
    } catch (error) {
      console.error(`인덱싱 실패: ${filePath}`, error);
      throw error;
    }
  }

  /**
   * 파일 삭제 처리
   */
  deleteFile(filePath: string): void {
    const note = this.metadataStore.getNoteByPath(filePath);
    if (!note) {
      return;
    }

    const chunks = this.metadataStore.getChunksByNoteId(note.id);
    this.vectorStore.deleteEmbeddings(chunks.map((c) => c.id));
    this.metadataStore.deleteChunksByNoteId(note.id);
    this.metadataStore.deleteNote(note.id);

    console.log(`파일 삭제 완료: ${filePath}`);
  }

  /**
   * 검색
   */
  async search(query: string, k?: number): Promise<Array<{ chunk: Chunk; score: number }>> {
    const topK = k || this.config.topK;

    // 쿼리 임베딩 생성
    const queryTextForEmbedding = buildQueryEmbeddingText(query);
    const queryEmbedding = await this.embeddingGenerator.embed(queryTextForEmbedding || query);

    const currentDimension = this.vectorStore.getDimension();
    if (currentDimension !== null && queryEmbedding.length !== currentDimension) {
      console.warn(
        `쿼리 차원(${queryEmbedding.length})과 인덱스 차원(${currentDimension})이 달라 검색을 건너뜁니다.`
      );
      return [];
    }

    // 벡터 검색
    const results = this.vectorStore.search(queryEmbedding, topK);

    // 청크 정보 추가
    const searchResults = results
      .map((result) => {
        const chunk = this.metadataStore.getChunkById(result.chunkId);
        if (!chunk) {
          return null;
        }
        return {
          chunk,
          score: result.score,
        };
      })
      .filter((r) => r !== null) as Array<{ chunk: Chunk; score: number }>;

    return searchResults;
  }

  /**
   * 키워드 기반 검색 (인덱싱된 청크에서 키워드 매칭)
   * @param keywordQuery "keyword1 OR keyword2" 형식의 키워드 쿼리
   */
  keywordSearch(keywordQuery: string, k?: number): Array<{ chunk: Chunk; score: number }> {
    const topK = k || this.config.topK;

    // "keyword1 OR keyword2" 형식에서 개별 키워드 추출 (OR 주변 공백 허용)
    const keywords = keywordQuery
      .split(/\s*OR\s*/i)
      .map((kw) => kw.trim().toLowerCase())
      .filter((kw) => kw.length > 0);

    if (keywords.length === 0) {
      return [];
    }

    const chunks = this.metadataStore.getAllChunks();
    const results: Array<{ chunk: Chunk; score: number }> = [];

    for (const chunk of chunks) {
      const text = chunk.text.toLowerCase();
      let matchCount = 0;
      for (const keyword of keywords) {
        if (text.includes(keyword)) {
          matchCount++;
        }
      }
      if (matchCount > 0) {
        results.push({ chunk, score: matchCount / keywords.length });
      }
    }

    return results.sort((a, b) => b.score - a.score).slice(0, topK);
  }

  /**
   * 검색 결과에 노트 메타데이터 추가
   */
  getSearchResultsWithMetadata(
    searchResults: Array<{ chunk: Chunk; score: number }>
  ): Array<{
    chunk: Chunk;
    note: NoteMetadata;
    score: number;
  }> {
    return searchResults
      .map((result) => {
        const note = this.metadataStore.getNoteById(result.chunk.noteId);
        if (!note) {
          return null;
        }
        return {
          chunk: result.chunk,
          note,
          score: result.score,
        };
      })
      .filter((r) => r !== null) as Array<{
      chunk: Chunk;
      note: NoteMetadata;
      score: number;
    }>;
  }

  /**
   * 노트 ID 생성
   */
  private generateNoteId(filePath: string): string {
    return createHash("sha256").update(filePath).digest("hex").substring(0, 16);
  }

  /**
   * 인덱스 시그니처 생성
   */
  private generateIndexSignature(): string {
    const source = [
      this.config.embeddingProvider,
      this.config.embeddingModel,
      this.config.embeddingApiUrl || "",
    ].join("::");

    return createHash("sha256").update(source).digest("hex").substring(0, 16);
  }

  /**
   * 리소스 해제
   */
  close(): void {
    this.metadataStore.close();
    this.vectorStore.close();
  }
}
