// SQLite 메타데이터 저장소

import Database from "better-sqlite3";
import { NoteMetadata, Chunk } from "./types";

export class MetadataStore {
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
      CREATE TABLE IF NOT EXISTS notes (
        id TEXT PRIMARY KEY,
        path TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        tags TEXT, -- JSON array
        links TEXT, -- JSON array
        frontmatter TEXT, -- JSON object
        updated_at INTEGER NOT NULL,
        hash TEXT NOT NULL,
        modified_at INTEGER -- 파일시스템 수정 시간
      );

      CREATE TABLE IF NOT EXISTS chunks (
        id TEXT PRIMARY KEY,
        note_id TEXT NOT NULL,
        text TEXT NOT NULL,
        position INTEGER NOT NULL,
        token_count INTEGER NOT NULL,
        section TEXT,
        FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_notes_path ON notes(path);
      CREATE INDEX IF NOT EXISTS idx_notes_updated_at ON notes(updated_at);
      CREATE INDEX IF NOT EXISTS idx_notes_modified_at ON notes(modified_at);
      CREATE INDEX IF NOT EXISTS idx_chunks_note_id ON chunks(note_id);
    `);

    // modified_at 컬럼이 없는 기존 DB를 마이그레이션
    this.migrateIfNeeded();
  }

  /**
   * 필요한 경우 스키마 마이그레이션
   */
  private migrateIfNeeded(): void {
    try {
      // modified_at 컬럼이 있는지 확인
      const columns = this.db.pragma("table_info(notes)") as any[];
      const hasModifiedAt = columns.some(col => col.name === "modified_at");
      
      if (!hasModifiedAt) {
        console.log("modified_at 컬럼 추가 중...");
        this.db.exec("ALTER TABLE notes ADD COLUMN modified_at INTEGER");
        console.log("마이그레이션 완료");
      }
    } catch (error) {
      console.error("스키마 마이그레이션 실패:", error);
    }
  }

  /**
   * 노트 저장 또는 업데이트
   */
  upsertNote(note: NoteMetadata): void {
    const stmt = this.db.prepare(`
      INSERT INTO notes (id, path, title, tags, links, frontmatter, updated_at, hash, modified_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        path = excluded.path,
        title = excluded.title,
        tags = excluded.tags,
        links = excluded.links,
        frontmatter = excluded.frontmatter,
        updated_at = excluded.updated_at,
        hash = excluded.hash,
        modified_at = excluded.modified_at
    `);

    stmt.run(
      note.id,
      note.path,
      note.title,
      JSON.stringify(note.tags),
      JSON.stringify(note.links),
      JSON.stringify(note.frontmatter),
      note.updatedAt,
      note.hash,
      note.modifiedAt || null
    );
  }

  /**
   * 경로로 노트 조회
   */
  getNoteByPath(path: string): NoteMetadata | null {
    const stmt = this.db.prepare("SELECT * FROM notes WHERE path = ?");
    const row = stmt.get(path) as any;
    return row ? this.rowToNote(row) : null;
  }

  /**
   * ID로 노트 조회
   */
  getNoteById(id: string): NoteMetadata | null {
    const stmt = this.db.prepare("SELECT * FROM notes WHERE id = ?");
    const row = stmt.get(id) as any;
    return row ? this.rowToNote(row) : null;
  }

  /**
   * 모든 노트 조회
   */
  getAllNotes(): NoteMetadata[] {
    const stmt = this.db.prepare("SELECT * FROM notes ORDER BY updated_at DESC");
    const rows = stmt.all() as any[];
    return rows.map((row) => this.rowToNote(row));
  }

  /**
   * 노트 삭제
   */
  deleteNote(id: string): void {
    const stmt = this.db.prepare("DELETE FROM notes WHERE id = ?");
    stmt.run(id);
  }

  /**
   * 청크 저장
   */
  insertChunks(chunks: Chunk[]): void {
    const stmt = this.db.prepare(`
      INSERT INTO chunks (id, note_id, text, position, token_count, section)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const transaction = this.db.transaction((chunks: Chunk[]) => {
      for (const chunk of chunks) {
        stmt.run(
          chunk.id,
          chunk.noteId,
          chunk.text,
          chunk.position,
          chunk.tokenCount,
          chunk.section
        );
      }
    });

    transaction(chunks);
  }

  /**
   * 노트의 청크 삭제
   */
  deleteChunksByNoteId(noteId: string): void {
    const stmt = this.db.prepare("DELETE FROM chunks WHERE note_id = ?");
    stmt.run(noteId);
  }

  /**
   * 노트의 청크 조회
   */
  getChunksByNoteId(noteId: string): Chunk[] {
    const stmt = this.db.prepare("SELECT * FROM chunks WHERE note_id = ? ORDER BY position");
    const rows = stmt.all(noteId) as any[];
    return rows.map((row) => this.rowToChunk(row));
  }

  /**
   * ID로 청크 조회
   */
  getChunkById(id: string): Chunk | null {
    const stmt = this.db.prepare("SELECT * FROM chunks WHERE id = ?");
    const row = stmt.get(id) as any;
    return row ? this.rowToChunk(row) : null;
  }

  /**
   * 모든 청크 조회
   */
  getAllChunks(): Chunk[] {
    const stmt = this.db.prepare("SELECT * FROM chunks");
    const rows = stmt.all() as any[];
    return rows.map((row) => this.rowToChunk(row));
  }

  /**
   * 데이터베이스 닫기
   */
  close(): void {
    this.db.close();
  }

  /**
   * DB 행을 NoteMetadata로 변환
   */
  private rowToNote(row: any): NoteMetadata {
    return {
      id: row.id,
      path: row.path,
      title: row.title,
      tags: JSON.parse(row.tags || "[]"),
      links: JSON.parse(row.links || "[]"),
      frontmatter: JSON.parse(row.frontmatter || "{}"),
      updatedAt: row.updated_at,
      hash: row.hash,
      modifiedAt: row.modified_at || undefined,
    };
  }

  /**
   * DB 행을 Chunk로 변환
   */
  private rowToChunk(row: any): Chunk {
    return {
      id: row.id,
      noteId: row.note_id,
      text: row.text,
      position: row.position,
      tokenCount: row.token_count,
      section: row.section,
    };
  }
}
