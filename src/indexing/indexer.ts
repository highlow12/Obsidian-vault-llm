// 인덱서 - 파일 스캔, 파싱, 청킹, 임베딩, 저장을 통합

import { MetadataStore } from "./metadataStore";
import { VectorStore } from "./vectorStore";
import { EmbeddingGenerator, EmbeddingConfig } from "./embeddings";
import { parseMarkdown, computeHash } from "./parser";
import { chunkText } from "./chunker";
import { IndexingConfig, NoteMetadata, Chunk } from "./types";
import { createHash } from "crypto";

export class Indexer {
  private metadataStore: MetadataStore;
  private vectorStore: VectorStore;
  private embeddingGenerator: EmbeddingGenerator;
  private config: IndexingConfig;

  constructor(config: IndexingConfig) {
    this.config = config;
    this.metadataStore = new MetadataStore(config.metaDbPath);
    this.vectorStore = new VectorStore(config.vectorDbPath);
    
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
    const queryEmbedding = await this.embeddingGenerator.embed(query);

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
   * 리소스 해제
   */
  close(): void {
    this.metadataStore.close();
    this.vectorStore.close();
  }
}
