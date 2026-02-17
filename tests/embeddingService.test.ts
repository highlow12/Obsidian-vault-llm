/**
 * 임베딩 서비스 테스트
 */

import { test } from "node:test";
import assert from "node:assert";
import { cosineSimilarity } from "../src/topicSeparation/embeddingService.js";

test("cosineSimilarity - 동일한 벡터는 유사도 1.0", () => {
  const vecA = [1, 2, 3];
  const vecB = [1, 2, 3];
  
  const similarity = cosineSimilarity(vecA, vecB);
  assert.ok(Math.abs(similarity - 1.0) < 0.0001, "동일한 벡터의 유사도는 1.0");
});

test("cosineSimilarity - 반대 방향 벡터는 유사도 -1.0", () => {
  const vecA = [1, 2, 3];
  const vecB = [-1, -2, -3];
  
  const similarity = cosineSimilarity(vecA, vecB);
  assert.ok(Math.abs(similarity - (-1.0)) < 0.0001, "반대 벡터의 유사도는 -1.0");
});

test("cosineSimilarity - 직교 벡터는 유사도 0.0", () => {
  const vecA = [1, 0, 0];
  const vecB = [0, 1, 0];
  
  const similarity = cosineSimilarity(vecA, vecB);
  assert.ok(Math.abs(similarity) < 0.0001, "직교 벡터의 유사도는 0.0");
});

test("cosineSimilarity - 차원 불일치 시 에러", () => {
  const vecA = [1, 2, 3];
  const vecB = [1, 2];
  
  assert.throws(() => {
    cosineSimilarity(vecA, vecB);
  }, /벡터의 차원이 일치하지 않습니다/);
});

test("cosineSimilarity - 영벡터 처리", () => {
  const vecA = [0, 0, 0];
  const vecB = [1, 2, 3];
  
  const similarity = cosineSimilarity(vecA, vecB);
  assert.strictEqual(similarity, 0, "영벡터의 유사도는 0");
});
