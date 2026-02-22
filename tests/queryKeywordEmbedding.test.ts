import { test } from "node:test";
import assert from "node:assert";
import { buildQueryEmbeddingText } from "../src/indexing/queryKeywordEmbedding.js";

test("buildQueryEmbeddingText - 키워드 추출 결과를 공백으로 결합", () => {
  const query = "프로젝트 일정 관리 방법 알려줘";
  const result = buildQueryEmbeddingText(query);

  assert.ok(result.length > 0, "임베딩 입력 텍스트가 생성되어야 합니다");
  assert.ok(result.includes("프로젝트") || result.includes("일정"), "핵심 키워드가 포함되어야 합니다");
});

test("buildQueryEmbeddingText - 빈 문자열은 그대로 빈 문자열", () => {
  const result = buildQueryEmbeddingText("   ");
  assert.strictEqual(result, "");
});

test("buildQueryEmbeddingText - 키워드가 없으면 원문 폴백", () => {
  const query = "a";
  const result = buildQueryEmbeddingText(query);
  assert.strictEqual(result, query);
});
