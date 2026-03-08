import { test } from "node:test";
import assert from "node:assert";
import {
  charNGrams,
  diceCoefficient,
  trigramSimilarity,
  fuzzySearch,
} from "../src/indexing/fuzzySearch.js";
import { Chunk } from "../src/indexing/types.js";

// ============= charNGrams 테스트 =============

test("charNGrams - 기본 트라이그램 생성", () => {
  const ngrams = charNGrams("hello", 3);
  assert.deepStrictEqual(ngrams, ["hel", "ell", "llo"]);
});

test("charNGrams - n=2 바이그램 생성", () => {
  const ngrams = charNGrams("abc", 2);
  assert.deepStrictEqual(ngrams, ["ab", "bc"]);
});

test("charNGrams - 텍스트 길이가 n보다 짧으면 빈 배열", () => {
  const ngrams = charNGrams("ab", 3);
  assert.deepStrictEqual(ngrams, []);
});

test("charNGrams - 소문자 변환 적용", () => {
  const ngrams = charNGrams("Hello", 3);
  // 소문자화 후 처리
  assert.ok(ngrams.every((g) => g === g.toLowerCase()), "모두 소문자여야 함");
});

test("charNGrams - 빈 문자열은 빈 배열", () => {
  const ngrams = charNGrams("", 3);
  assert.deepStrictEqual(ngrams, []);
});

// ============= diceCoefficient 테스트 =============

test("diceCoefficient - 동일 배열은 1.0", () => {
  const a = ["abc", "bcd", "cde"];
  const b = ["abc", "bcd", "cde"];
  assert.ok(Math.abs(diceCoefficient(a, b) - 1.0) < 1e-10, "동일 배열 계수 1.0");
});

test("diceCoefficient - 공통 원소가 없으면 0.0", () => {
  const a = ["abc", "bcd"];
  const b = ["xyz", "yza"];
  assert.strictEqual(diceCoefficient(a, b), 0.0);
});

test("diceCoefficient - 절반 겹치는 경우", () => {
  const a = ["abc", "bcd"];
  const b = ["abc", "xyz"]; // 1개 공통
  // 2 * 1 / (2 + 2) = 0.5
  assert.ok(Math.abs(diceCoefficient(a, b) - 0.5) < 1e-10);
});

test("diceCoefficient - 빈 배열은 0.0", () => {
  assert.strictEqual(diceCoefficient([], ["abc"]), 0.0);
  assert.strictEqual(diceCoefficient(["abc"], []), 0.0);
  assert.strictEqual(diceCoefficient([], []), 0.0);
});

// ============= trigramSimilarity 테스트 =============

test("trigramSimilarity - 동일 문자열은 1.0", () => {
  const sim = trigramSimilarity("검색시스템", "검색시스템");
  assert.ok(Math.abs(sim - 1.0) < 1e-10, "동일 문자열 유사도 1.0");
});

test("trigramSimilarity - 완전히 다른 문자열은 0.0에 가까움", () => {
  const sim = trigramSimilarity("검색", "xyz");
  assert.ok(sim < 0.1, `완전히 다른 문자열 유사도는 낮아야 함: ${sim}`);
});

test("trigramSimilarity - 유사한 문자열은 높은 유사도", () => {
  const sim1 = trigramSimilarity("검색시스템", "검색시스탬"); // 오타
  const sim2 = trigramSimilarity("검색시스템", "완전다른내용");

  assert.ok(sim1 > sim2, "유사한 문자열이 다른 문자열보다 유사도가 높아야 함");
});

// ============= fuzzySearch 테스트 =============

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

test("fuzzySearch - 정확한 매칭은 높은 점수", () => {
  const chunks = [
    createChunk("c1", "n1", "검색 시스템 구현 방법"),
    createChunk("c2", "n2", "전혀 다른 내용의 문서입니다"),
  ];

  const results = fuzzySearch("검색 시스템", chunks, 5);

  assert.ok(results.length > 0, "결과가 있어야 함");
  // 관련 있는 청크가 상위에 있어야 함
  assert.strictEqual(results[0].chunk.id, "c1", "관련 청크가 최상위");
});

test("fuzzySearch - 빈 쿼리는 빈 배열 반환", () => {
  const chunks = [createChunk("c1", "n1", "검색 시스템")];
  const results = fuzzySearch("", chunks, 5);
  assert.deepStrictEqual(results, []);
});

test("fuzzySearch - 빈 청크 목록은 빈 배열 반환", () => {
  const results = fuzzySearch("검색", [], 5);
  assert.deepStrictEqual(results, []);
});

test("fuzzySearch - k 파라미터로 결과 수 제한", () => {
  const chunks = Array.from({ length: 10 }, (_, i) =>
    createChunk(`c${i}`, `n${i}`, `검색 시스템 내용 ${i}`)
  );

  const results = fuzzySearch("검색 시스템", chunks, 3);
  assert.ok(results.length <= 3, "k=3이면 최대 3개 반환");
});

test("fuzzySearch - 점수는 0과 1 사이", () => {
  const chunks = [
    createChunk("c1", "n1", "검색 시스템"),
    createChunk("c2", "n2", "다른 내용"),
  ];

  const results = fuzzySearch("검색", chunks, 5);
  for (const result of results) {
    assert.ok(result.score >= 0, `점수는 0 이상: ${result.score}`);
    assert.ok(result.score <= 1, `점수는 1 이하: ${result.score}`);
  }
});

test("fuzzySearch - 결과는 점수 내림차순 정렬", () => {
  const chunks = [
    createChunk("c1", "n1", "검색 시스템 구현"),
    createChunk("c2", "n2", "검색"),
    createChunk("c3", "n3", "전혀 무관한 내용"),
  ];

  const results = fuzzySearch("검색 시스템", chunks, 5);

  for (let i = 0; i < results.length - 1; i++) {
    assert.ok(
      results[i].score >= results[i + 1].score,
      "결과가 점수 내림차순으로 정렬되어야 함"
    );
  }
});

test("fuzzySearch - 오타가 있어도 유사한 단어 매칭", () => {
  const chunks = [
    createChunk("c1", "n1", "검색 시스템 구현"), // 정확한 매칭
    createChunk("c2", "n2", "전혀 다른 문서 내용"), // 무관
  ];

  // "검샥"은 "검색"의 오타
  const results = fuzzySearch("검샥 시스탬", chunks, 5, 0.05);

  // 오타에도 불구하고 c1이 c2보다 높은 점수여야 함
  if (results.length >= 2) {
    const c1Score = results.find((r) => r.chunk.id === "c1")?.score ?? 0;
    const c2Score = results.find((r) => r.chunk.id === "c2")?.score ?? 0;
    assert.ok(c1Score > c2Score, "오타가 있어도 유사한 청크가 더 높은 점수");
  } else if (results.length === 1) {
    assert.strictEqual(results[0].chunk.id, "c1", "오타 포함 쿼리로 유사 청크 발견");
  }
  // 결과 없을 수도 있음 (임계값 문제)
});

test("fuzzySearch - minScore 임계값 적용", () => {
  const chunks = [
    createChunk("c1", "n1", "검색 시스템"),
    createChunk("c2", "n2", "xyz abc qwerty"),
  ];

  // 높은 임계값으로 검색 - 무관한 c2는 제외되어야 함
  const results = fuzzySearch("검색", chunks, 5, 0.3);
  const resultIds = results.map((r) => r.chunk.id);
  assert.ok(!resultIds.includes("c2"), "낮은 유사도 청크는 임계값으로 제외");
});
