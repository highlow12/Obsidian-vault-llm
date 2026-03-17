import { test } from "node:test";
import assert from "node:assert";
import { mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { HnswVectorStore } from "../src/indexing/hnswVectorStore.js";

function createTempStorePath(): { path: string; cleanup: () => void } {
  const dir = mkdtempSync(join(tmpdir(), "ovl-hnsw-"));
  return {
    path: join(dir, "vectors.hnsw"),
    cleanup: () => rmSync(dir, { recursive: true, force: true }),
  };
}

/** 코사인 유사도 계산 (테스트용) */
function cosineSim(a: number[], b: number[]): number {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

test("HnswVectorStore - 임베딩 저장 및 조회", () => {
  const temp = createTempStorePath();
  try {
    const store = new HnswVectorStore(temp.path, "sig-a");
    store.storeEmbedding("chunk-1", [0.1, 0.2, 0.3]);

    const loaded = store.getEmbedding("chunk-1");
    assert.ok(loaded !== null, "임베딩이 null이 아니어야 합니다");
    assert.strictEqual(loaded!.length, 3);
    assert.strictEqual(store.getDimension(), 3);
  } finally {
    temp.cleanup();
  }
});

test("HnswVectorStore - 차원 불일치 시 에러", () => {
  const temp = createTempStorePath();
  try {
    const store = new HnswVectorStore(temp.path, "sig-a");
    store.storeEmbedding("chunk-1", [0.1, 0.2, 0.3]);

    assert.throws(() => {
      store.storeEmbedding("chunk-2", [0.1, 0.2]);
    }, /임베딩 차원 불일치/);
  } finally {
    temp.cleanup();
  }
});

test("HnswVectorStore - 인덱스 시그니처 reset 시 저장소 초기화", () => {
  const temp = createTempStorePath();
  try {
    const store = new HnswVectorStore(temp.path, "sig-a");
    store.storeEmbedding("chunk-1", [1, 0, 0]);

    store.reset("sig-b");

    assert.strictEqual(store.getIndexSignature(), "sig-b");
    assert.strictEqual(store.getEmbedding("chunk-1"), null);
    assert.strictEqual(store.getDimension(), null);
  } finally {
    temp.cleanup();
  }
});

test("HnswVectorStore - 바이너리 직렬화 후 재로드 (영속성)", () => {
  const temp = createTempStorePath();
  try {
    // 저장
    const store1 = new HnswVectorStore(temp.path, "sig-persist");
    store1.storeEmbedding("chunk-a", [1, 0, 0]);
    store1.storeEmbedding("chunk-b", [0, 1, 0]);
    store1.storeEmbedding("chunk-c", [0, 0, 1]);

    // 재로드 (바이너리 파일에서 복원)
    const store2 = new HnswVectorStore(temp.path, "sig-persist");
    assert.strictEqual(store2.getIndexSignature(), "sig-persist");
    assert.strictEqual(store2.getDimension(), 3);

    // 청크 조회
    const embA = store2.getEmbedding("chunk-a");
    assert.ok(embA !== null, "chunk-a 임베딩 조회 실패");
    assert.strictEqual(embA!.length, 3);

    // ANN 검색
    const hits = store2.search([1, 0, 0], 1);
    assert.strictEqual(hits.length, 1);
    assert.strictEqual(hits[0].chunkId, "chunk-a");
  } finally {
    temp.cleanup();
  }
});

test("HnswVectorStore - ANN 검색 결과가 코사인 유사도 순 반환", () => {
  const temp = createTempStorePath();
  try {
    const store = new HnswVectorStore(temp.path, "sig-search");
    store.storeEmbedding("near", [1.0, 0.1, 0.0]);
    store.storeEmbedding("far", [0.0, 0.1, 1.0]);
    store.storeEmbedding("mid", [0.5, 0.5, 0.0]);

    const query = [1.0, 0.0, 0.0];
    const hits = store.search(query, 3);

    assert.ok(hits.length > 0, "검색 결과가 비어 있습니다");
    // 가장 유사한 결과가 "near"이어야 합니다
    assert.strictEqual(hits[0].chunkId, "near");
    // 점수가 내림차순이어야 합니다
    for (let i = 1; i < hits.length; i++) {
      assert.ok(hits[i - 1].score >= hits[i].score, "점수가 내림차순이어야 합니다");
    }
  } finally {
    temp.cleanup();
  }
});

test("HnswVectorStore - 임베딩 삭제", () => {
  const temp = createTempStorePath();
  try {
    const store = new HnswVectorStore(temp.path, "sig-delete");
    store.storeEmbedding("chunk-1", [1, 0, 0]);
    store.storeEmbedding("chunk-2", [0, 1, 0]);

    store.deleteEmbedding("chunk-1");

    assert.strictEqual(store.getEmbedding("chunk-1"), null);
    assert.ok(store.getEmbedding("chunk-2") !== null);
  } finally {
    temp.cleanup();
  }
});

test("HnswVectorStore - 여러 임베딩 일괄 저장", () => {
  const temp = createTempStorePath();
  try {
    const store = new HnswVectorStore(temp.path, "sig-batch");
    const batch = new Map<string, number[]>([
      ["a", [1, 0, 0]],
      ["b", [0, 1, 0]],
      ["c", [0, 0, 1]],
    ]);

    store.storeEmbeddings(batch);

    assert.strictEqual(store.getDimension(), 3);
    assert.ok(store.getEmbedding("a") !== null);
    assert.ok(store.getEmbedding("b") !== null);
    assert.ok(store.getEmbedding("c") !== null);

    const all = store.getAllEmbeddings();
    assert.strictEqual(all.size, 3);
  } finally {
    temp.cleanup();
  }
});

test("HnswVectorStore - 삭제 후 재로드 시 삭제 정보 유지", () => {
  const temp = createTempStorePath();
  try {
    const store1 = new HnswVectorStore(temp.path, "sig-del-persist");
    store1.storeEmbedding("chunk-x", [1, 0, 0]);
    store1.storeEmbedding("chunk-y", [0, 1, 0]);
    store1.deleteEmbedding("chunk-x");

    const store2 = new HnswVectorStore(temp.path, "sig-del-persist");
    assert.strictEqual(store2.getEmbedding("chunk-x"), null);
    assert.ok(store2.getEmbedding("chunk-y") !== null);
  } finally {
    temp.cleanup();
  }
});

test("HnswVectorStore - 비어 있는 저장소에서 검색 시 빈 배열 반환", () => {
  const temp = createTempStorePath();
  try {
    const store = new HnswVectorStore(temp.path, "sig-empty");
    const hits = store.search([1, 0, 0], 5);
    assert.deepStrictEqual(hits, []);
  } finally {
    temp.cleanup();
  }
});

test("HnswVectorStore - k가 저장된 임베딩 수보다 클 때 가능한 만큼만 반환", () => {
  const temp = createTempStorePath();
  try {
    const store = new HnswVectorStore(temp.path, "sig-k-limit");
    store.storeEmbedding("only-one", [1, 0, 0]);

    const hits = store.search([1, 0, 0], 10);
    assert.ok(hits.length <= 1, "저장된 임베딩 수 이상의 결과를 반환하면 안 됩니다");
  } finally {
    temp.cleanup();
  }
});

test("HnswVectorStore - 동일 청크 ID 재저장 시 업데이트", () => {
  const temp = createTempStorePath();
  try {
    const store = new HnswVectorStore(temp.path, "sig-update");
    store.storeEmbedding("chunk-u", [1, 0, 0]);
    store.storeEmbedding("chunk-u", [0, 1, 0]); // 동일 ID 재저장

    const all = store.getAllEmbeddings();
    // 중복 없이 1개여야 합니다
    assert.strictEqual(all.size, 1);
  } finally {
    temp.cleanup();
  }
});
