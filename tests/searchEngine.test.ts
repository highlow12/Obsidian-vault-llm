import { test } from "node:test";
import assert from "node:assert";
import { computeRRF, RRF_K } from "../src/indexing/searchEngine.js";

test("computeRRF - 벡터 검색 결과만 있을 때 점수 계산", () => {
  const vectorRanks = new Map([
    ["chunk-1", 1],
    ["chunk-2", 2],
    ["chunk-3", 3],
  ]);
  const keywordRanks = new Map<string, number>();

  const scores = computeRRF(vectorRanks, keywordRanks);

  assert.strictEqual(scores.size, 3);
  // rank 1: 1/(60+1), rank 2: 1/(60+2), rank 3: 1/(60+3)
  assert.ok((scores.get("chunk-1") ?? 0) > (scores.get("chunk-2") ?? 0));
  assert.ok((scores.get("chunk-2") ?? 0) > (scores.get("chunk-3") ?? 0));
});

test("computeRRF - 키워드 검색 결과만 있을 때 점수 계산", () => {
  const vectorRanks = new Map<string, number>();
  const keywordRanks = new Map([
    ["chunk-a", 1],
    ["chunk-b", 2],
  ]);

  const scores = computeRRF(vectorRanks, keywordRanks);

  assert.strictEqual(scores.size, 2);
  assert.ok((scores.get("chunk-a") ?? 0) > (scores.get("chunk-b") ?? 0));
});

test("computeRRF - 두 검색 결과에 모두 나타나는 청크는 점수가 합산됨", () => {
  const vectorRanks = new Map([["chunk-overlap", 1], ["chunk-vector-only", 2]]);
  const keywordRanks = new Map([["chunk-overlap", 1], ["chunk-keyword-only", 2]]);

  const scores = computeRRF(vectorRanks, keywordRanks);

  // chunk-overlap은 두 소스에서 rank 1이므로 점수가 두 배
  const overlapScore = scores.get("chunk-overlap") ?? 0;
  const vectorOnlyScore = scores.get("chunk-vector-only") ?? 0;
  const keywordOnlyScore = scores.get("chunk-keyword-only") ?? 0;

  // 두 리스트 모두 rank 1: 2/(60+1)
  assert.ok(overlapScore > vectorOnlyScore, "중복 청크 점수가 벡터 전용 점수보다 높아야 함");
  assert.ok(overlapScore > keywordOnlyScore, "중복 청크 점수가 키워드 전용 점수보다 높아야 함");
});

test("computeRRF - RRF 점수 공식 검증 (k=60)", () => {
  const vectorRanks = new Map([["chunk-1", 1]]);
  const keywordRanks = new Map([["chunk-1", 1]]);

  const scores = computeRRF(vectorRanks, keywordRanks);

  const expected = 1 / (RRF_K + 1) + 1 / (RRF_K + 1);
  const actual = scores.get("chunk-1") ?? 0;

  assert.ok(Math.abs(actual - expected) < 1e-10, `기대값: ${expected}, 실제값: ${actual}`);
});

test("computeRRF - 사용자 정의 k값 적용", () => {
  const vectorRanks = new Map([["chunk-1", 1]]);
  const keywordRanks = new Map<string, number>();

  const scores = computeRRF(vectorRanks, keywordRanks, 10);

  const expected = 1 / (10 + 1);
  const actual = scores.get("chunk-1") ?? 0;

  assert.ok(Math.abs(actual - expected) < 1e-10, `기대값: ${expected}, 실제값: ${actual}`);
});

test("computeRRF - 빈 입력에서 빈 결과 반환", () => {
  const scores = computeRRF(new Map(), new Map());
  assert.strictEqual(scores.size, 0);
});
