import { test } from "node:test";
import assert from "node:assert";
import { mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { VectorStore } from "../src/indexing/vectorStore.js";

function createTempStorePath(): { path: string; cleanup: () => void } {
  const dir = mkdtempSync(join(tmpdir(), "ovl-vector-store-"));
  return {
    path: join(dir, "vectors.json"),
    cleanup: () => rmSync(dir, { recursive: true, force: true }),
  };
}

test("VectorStore - 임베딩 저장 및 조회", () => {
  const temp = createTempStorePath();

  try {
    const store = new VectorStore(temp.path, "sig-a");
    store.storeEmbedding("chunk-1", [0.1, 0.2, 0.3]);

    const loaded = store.getEmbedding("chunk-1");
    assert.deepStrictEqual(loaded, [0.1, 0.2, 0.3]);
    assert.strictEqual(store.getDimension(), 3);
  } finally {
    temp.cleanup();
  }
});

test("VectorStore - 차원 불일치 시 에러", () => {
  const temp = createTempStorePath();

  try {
    const store = new VectorStore(temp.path, "sig-a");
    store.storeEmbedding("chunk-1", [0.1, 0.2, 0.3]);

    assert.throws(() => {
      store.storeEmbedding("chunk-2", [0.1, 0.2]);
    }, /임베딩 차원 불일치/);
  } finally {
    temp.cleanup();
  }
});

test("VectorStore - 시그니처 reset 시 저장소 초기화", () => {
  const temp = createTempStorePath();

  try {
    const store = new VectorStore(temp.path, "sig-a");
    store.storeEmbedding("chunk-1", [1, 2, 3]);

    store.reset("sig-b");

    assert.strictEqual(store.getIndexSignature(), "sig-b");
    assert.strictEqual(store.getEmbedding("chunk-1"), null);
    assert.strictEqual(store.getDimension(), null);
  } finally {
    temp.cleanup();
  }
});
