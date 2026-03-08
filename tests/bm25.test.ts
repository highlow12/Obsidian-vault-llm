import { test } from "node:test";
import assert from "node:assert";
import { BM25Index, tokenize, BM25_K1, BM25_B } from "../src/indexing/bm25.js";
import { Chunk } from "../src/indexing/types.js";

// ============= tokenize 테스트 =============

test("tokenize - 기본 영문 토큰화", () => {
  const tokens = tokenize("hello world test");
  assert.deepStrictEqual(tokens, ["hello", "world", "test"]);
});

test("tokenize - 소문자 변환", () => {
  const tokens = tokenize("Hello World TEST");
  assert.deepStrictEqual(tokens, ["hello", "world", "test"]);
});

test("tokenize - 한국어 텍스트 토큰화", () => {
  const tokens = tokenize("검색 시스템 업그레이드");
  assert.ok(tokens.includes("검색"), "검색 포함");
  assert.ok(tokens.includes("시스템"), "시스템 포함");
  assert.ok(tokens.includes("업그레이드"), "업그레이드 포함");
});

test("tokenize - 특수문자 제거", () => {
  const tokens = tokenize("hello, world! test.");
  assert.ok(!tokens.includes(","), "쉼표 제거");
  assert.ok(!tokens.includes("!"), "느낌표 제거");
  assert.ok(!tokens.includes("."), "마침표 제거");
});

test("tokenize - 짧은 토큰 필터링 (길이 2 미만)", () => {
  const tokens = tokenize("a hello b world");
  assert.ok(!tokens.includes("a"), "길이 1 토큰 제거");
  assert.ok(!tokens.includes("b"), "길이 1 토큰 제거");
  assert.ok(tokens.includes("hello"), "길이 5 토큰 포함");
});

test("tokenize - 빈 문자열은 빈 배열 반환", () => {
  const tokens = tokenize("");
  assert.deepStrictEqual(tokens, []);
});

// ============= BM25Index 테스트 =============

// 테스트용 청크 생성 헬퍼
function createChunk(id: string, noteId: string, text: string): Chunk {
  return {
    id,
    noteId,
    text,
    position: 0,
    tokenCount: text.split(" ").length,
    section: "section-1",
  };
}

test("BM25Index - 기본 검색", () => {
  const index = new BM25Index();

  const chunk1 = createChunk("c1", "n1", "벡터 검색 시스템 구현");
  const chunk2 = createChunk("c2", "n2", "키워드 매칭 알고리즘");
  const chunk3 = createChunk("c3", "n3", "검색 엔진 최적화 방법");

  index.addChunk(chunk1);
  index.addChunk(chunk2);
  index.addChunk(chunk3);

  const results = index.search("검색 시스템", 3);

  assert.ok(results.length > 0, "검색 결과가 있어야 함");
  // "검색"이 포함된 청크들이 결과에 있어야 함
  const resultIds = results.map((r) => r.chunkId);
  assert.ok(
    resultIds.includes("c1") || resultIds.includes("c3"),
    "'검색' 포함 청크가 결과에 있어야 함"
  );
});

test("BM25Index - 빈 인덱스에서 검색은 빈 배열 반환", () => {
  const index = new BM25Index();
  const results = index.search("검색", 5);
  assert.deepStrictEqual(results, []);
});

test("BM25Index - 빈 쿼리는 빈 배열 반환", () => {
  const index = new BM25Index();
  const chunk = createChunk("c1", "n1", "검색 시스템");
  index.addChunk(chunk);

  const results = index.search("", 5);
  assert.deepStrictEqual(results, []);
});

test("BM25Index - 관련성 높은 문서가 상위에 랭킹", () => {
  const index = new BM25Index();

  // 쿼리 단어를 많이 포함한 문서가 높은 점수를 받아야 함
  const chunk1 = createChunk("c1", "n1", "검색 검색 검색 시스템 검색");
  const chunk2 = createChunk("c2", "n2", "무관한 내용 전혀 다름");
  const chunk3 = createChunk("c3", "n3", "검색 시스템");

  index.addChunk(chunk1);
  index.addChunk(chunk2);
  index.addChunk(chunk3);

  const results = index.search("검색 시스템", 3);

  // c2 (쿼리 단어 없음)는 결과에 없어야 함
  const resultIds = results.map((r) => r.chunkId);
  assert.ok(!resultIds.includes("c2"), "관련없는 문서는 결과에 없어야 함");
});

test("BM25Index - IDF: 희귀 단어가 높은 점수", () => {
  const index = new BM25Index();

  // 모든 문서에 "검색"이 있고 한 문서에만 "양자역학"이 있음
  const chunk1 = createChunk("c1", "n1", "검색 시스템 양자역학");
  const chunk2 = createChunk("c2", "n2", "검색 엔진");
  const chunk3 = createChunk("c3", "n3", "검색 최적화");

  index.addChunk(chunk1);
  index.addChunk(chunk2);
  index.addChunk(chunk3);

  // "양자역학"은 c1에만 있으므로 IDF가 높아야 함
  const results1 = index.search("양자역학", 3);
  assert.ok(results1.length > 0, "양자역학 검색 결과 있음");
  assert.strictEqual(results1[0].chunkId, "c1", "양자역학 포함 문서가 최상위");
});

test("BM25Index - addChunk 후 getDocumentCount 증가", () => {
  const index = new BM25Index();

  assert.strictEqual(index.getDocumentCount(), 0, "초기 문서 수 0");

  index.addChunk(createChunk("c1", "n1", "검색 시스템"));
  assert.strictEqual(index.getDocumentCount(), 1, "청크 추가 후 문서 수 1");

  index.addChunk(createChunk("c2", "n2", "키워드 검색"));
  assert.strictEqual(index.getDocumentCount(), 2, "청크 추가 후 문서 수 2");
});

test("BM25Index - removeChunk 후 검색에서 제외", () => {
  const index = new BM25Index();

  const chunk = createChunk("c1", "n1", "검색 시스템");
  index.addChunk(chunk);
  index.addChunk(createChunk("c2", "n2", "다른 문서"));

  assert.strictEqual(index.getDocumentCount(), 2);

  index.removeChunk("c1");
  assert.strictEqual(index.getDocumentCount(), 1, "삭제 후 문서 수 1");

  const results = index.search("검색 시스템", 5);
  const resultIds = results.map((r) => r.chunkId);
  assert.ok(!resultIds.includes("c1"), "삭제된 청크는 검색 결과에 없음");
});

test("BM25Index - removeChunks 배치 삭제", () => {
  const index = new BM25Index();

  index.addChunk(createChunk("c1", "n1", "검색"));
  index.addChunk(createChunk("c2", "n2", "검색"));
  index.addChunk(createChunk("c3", "n3", "검색"));

  index.removeChunks(["c1", "c2"]);
  assert.strictEqual(index.getDocumentCount(), 1, "2개 삭제 후 1개 남음");
});

test("BM25Index - buildFromChunks는 기존 인덱스를 교체", () => {
  const index = new BM25Index();

  index.addChunk(createChunk("old1", "n1", "구 데이터"));
  assert.strictEqual(index.getDocumentCount(), 1);

  const newChunks = [
    createChunk("new1", "n2", "새 검색 데이터"),
    createChunk("new2", "n3", "새 시스템 데이터"),
  ];

  index.buildFromChunks(newChunks);
  assert.strictEqual(index.getDocumentCount(), 2, "새 청크 2개로 재구성");

  const results = index.search("검색", 5);
  assert.ok(
    results.some((r) => r.chunkId === "new1"),
    "새 청크가 검색됨"
  );
  assert.ok(
    !results.some((r) => r.chunkId === "old1"),
    "구 청크는 검색되지 않음"
  );
});

test("BM25Index - k 파라미터로 결과 수 제한", () => {
  const index = new BM25Index();

  for (let i = 0; i < 10; i++) {
    index.addChunk(createChunk(`c${i}`, `n${i}`, `검색 시스템 ${i}`));
  }

  const results3 = index.search("검색", 3);
  assert.ok(results3.length <= 3, "k=3이면 최대 3개 반환");

  const results5 = index.search("검색", 5);
  assert.ok(results5.length <= 5, "k=5이면 최대 5개 반환");
});

test("BM25Index - TF 포화: 반복 등장해도 점수가 무한정 높아지지 않음", () => {
  const index = new BM25Index();

  // 검색어가 100번 반복된 문서 vs 1번 등장한 문서
  const repetitiveText = Array(100).fill("검색").join(" ");
  const normalText = "검색 시스템";

  index.addChunk(createChunk("repetitive", "n1", repetitiveText));
  index.addChunk(createChunk("normal", "n2", normalText));

  const results = index.search("검색", 2);

  // BM25 K1 파라미터로 포화 효과 - 두 문서 모두 점수 차이가 유한함
  assert.ok(results.length > 0, "검색 결과 있음");
  const repetitiveResult = results.find((r) => r.chunkId === "repetitive");
  const normalResult = results.find((r) => r.chunkId === "normal");

  if (repetitiveResult && normalResult) {
    // 포화 효과로 점수 차이가 크지 않아야 함 (10배 이하)
    const ratio = repetitiveResult.score / normalResult.score;
    assert.ok(ratio < 10, `TF 포화 효과: 점수비 ${ratio}는 10 미만이어야 함`);
  }
});

test("BM25Index - 점수는 양수", () => {
  const index = new BM25Index();

  index.addChunk(createChunk("c1", "n1", "검색 시스템 구현"));
  index.addChunk(createChunk("c2", "n2", "검색 엔진 최적화"));

  const results = index.search("검색", 5);
  for (const result of results) {
    assert.ok(result.score > 0, `점수는 양수여야 함: ${result.score}`);
  }
});

test("BM25Index - 기본 파라미터 확인", () => {
  assert.strictEqual(BM25_K1, 1.2, "k1 기본값은 1.2");
  assert.strictEqual(BM25_B, 0.75, "b 기본값은 0.75");
});

test("BM25Index - 동일 청크 ID 재추가 시 중복 없음", () => {
  const index = new BM25Index();

  index.addChunk(createChunk("c1", "n1", "검색 시스템"));
  index.addChunk(createChunk("c1", "n1", "검색 시스템 업데이트")); // 동일 ID 재추가

  assert.strictEqual(index.getDocumentCount(), 1, "중복 청크 없이 1개만 저장");
});
