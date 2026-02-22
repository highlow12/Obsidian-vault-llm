// JSON 메타데이터 저장소

import { existsSync, mkdirSync, readFileSync, writeFileSync, renameSync } from "fs";
import { dirname } from "path";
import { NoteMetadata, Chunk, MetadataStoreData } from "./types";

export class MetadataStore {
  private readonly storePath: string;
  private data: MetadataStoreData;

  constructor(storePath: string, indexSignature: string) {
    this.storePath = storePath;
    this.data = this.loadData(indexSignature);
  }

  /**
   * 저장소 데이터 로드
   */
  private loadData(indexSignature: string): MetadataStoreData {
    if (!existsSync(this.storePath)) {
      return {
        indexSignature,
        updatedAt: Date.now(),
        notes: {},
        chunks: {},
      };
    }

    try {
      const raw = readFileSync(this.storePath, "utf-8");
      const parsed = JSON.parse(raw) as Partial<MetadataStoreData>;
      return {
        indexSignature: parsed.indexSignature || indexSignature,
        updatedAt: typeof parsed.updatedAt === "number" ? parsed.updatedAt : Date.now(),
        notes: parsed.notes || {},
        chunks: parsed.chunks || {},
      };
    } catch (error) {
      console.warn("메타데이터 저장소 로드 실패, 새로 초기화합니다:", error);
      return {
        indexSignature,
        updatedAt: Date.now(),
        notes: {},
        chunks: {},
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
   * 저장소 초기화
   */
  reset(indexSignature: string): void {
    this.data = {
      indexSignature,
      updatedAt: Date.now(),
      notes: {},
      chunks: {},
    };
    this.persist();
  }

  /**
   * 노트 저장 또는 업데이트
   */
  upsertNote(note: NoteMetadata): void {
    this.data.notes[note.id] = { ...note };
    this.persist();
  }

  /**
   * 경로로 노트 조회
   */
  getNoteByPath(path: string): NoteMetadata | null {
    const note = Object.values(this.data.notes).find((item) => item.path === path);
    return note ? { ...note } : null;
  }

  /**
   * ID로 노트 조회
   */
  getNoteById(id: string): NoteMetadata | null {
    const note = this.data.notes[id];
    return note ? { ...note } : null;
  }

  /**
   * 모든 노트 조회
   */
  getAllNotes(): NoteMetadata[] {
    return Object.values(this.data.notes)
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .map((note) => ({ ...note }));
  }

  /**
   * 노트 삭제
   */
  deleteNote(id: string): void {
    delete this.data.notes[id];
    this.persist();
  }

  /**
   * 청크 저장
   */
  insertChunks(chunks: Chunk[]): void {
    for (const chunk of chunks) {
      this.data.chunks[chunk.id] = { ...chunk };
    }
    this.persist();
  }

  /**
   * 노트의 청크 삭제
   */
  deleteChunksByNoteId(noteId: string): void {
    for (const [chunkId, chunk] of Object.entries(this.data.chunks)) {
      if (chunk.noteId === noteId) {
        delete this.data.chunks[chunkId];
      }
    }
    this.persist();
  }

  /**
   * 노트의 청크 조회
   */
  getChunksByNoteId(noteId: string): Chunk[] {
    return Object.values(this.data.chunks)
      .filter((chunk) => chunk.noteId === noteId)
      .sort((a, b) => a.position - b.position)
      .map((chunk) => ({ ...chunk }));
  }

  /**
   * ID로 청크 조회
   */
  getChunkById(id: string): Chunk | null {
    const chunk = this.data.chunks[id];
    return chunk ? { ...chunk } : null;
  }

  /**
   * 모든 청크 조회
   */
  getAllChunks(): Chunk[] {
    return Object.values(this.data.chunks).map((chunk) => ({ ...chunk }));
  }

  /**
   * 데이터베이스 닫기
   */
  close(): void {
    // 파일 기반 저장소는 close 동작이 필요하지 않습니다.
  }
}
