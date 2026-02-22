import { test } from "node:test";
import assert from "node:assert";
import { mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { MetadataStore } from "../src/indexing/metadataStore.js";

function createTempStorePath(): { path: string; cleanup: () => void } {
  const dir = mkdtempSync(join(tmpdir(), "ovl-metadata-store-"));
  return {
    path: join(dir, "meta.json"),
    cleanup: () => rmSync(dir, { recursive: true, force: true }),
  };
}

test("MetadataStore - 노트/청크 저장 및 조회", () => {
  const temp = createTempStorePath();

  try {
    const store = new MetadataStore(temp.path, "sig-a");

    store.upsertNote({
      id: "note-1",
      path: "folder/a.md",
      title: "A",
      tags: ["t1"],
      links: [],
      frontmatter: {},
      updatedAt: Date.now(),
      hash: "hash-a",
    });

    store.insertChunks([
      {
        id: "chunk-1",
        noteId: "note-1",
        text: "내용",
        position: 0,
        tokenCount: 1,
        section: "S",
      },
    ]);

    const note = store.getNoteByPath("folder/a.md");
    const chunk = store.getChunkById("chunk-1");

    assert.ok(note);
    assert.ok(chunk);
    assert.strictEqual(note?.id, "note-1");
    assert.strictEqual(chunk?.noteId, "note-1");
  } finally {
    temp.cleanup();
  }
});

test("MetadataStore - reset 시 데이터 초기화", () => {
  const temp = createTempStorePath();

  try {
    const store = new MetadataStore(temp.path, "sig-a");

    store.upsertNote({
      id: "note-1",
      path: "folder/a.md",
      title: "A",
      tags: [],
      links: [],
      frontmatter: {},
      updatedAt: Date.now(),
      hash: "hash-a",
    });

    store.reset("sig-b");

    assert.strictEqual(store.getIndexSignature(), "sig-b");
    assert.strictEqual(store.getNoteById("note-1"), null);
    assert.strictEqual(store.getAllChunks().length, 0);
  } finally {
    temp.cleanup();
  }
});
