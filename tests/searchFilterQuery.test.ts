import { test } from "node:test";
import assert from "node:assert";
import { parseSearchQuery } from "../src/indexing/searchFilterQuery.js";

test("parseSearchQuery - 일반 쿼리만 있을 때 필터 없음", () => {
  const parsed = parseSearchQuery("옵시디언 RAG 검색");

  assert.strictEqual(parsed.query, "옵시디언 RAG 검색");
  assert.strictEqual(parsed.filter, undefined);
});

test("parseSearchQuery - 폴더 include/exclude와 태그를 파싱", () => {
  const parsed = parseSearchQuery("folder:docs -folder:private tag:AI tag:#ml 질문");

  assert.strictEqual(parsed.query, "질문");
  assert.deepStrictEqual(parsed.filter?.folders, ["docs"]);
  assert.deepStrictEqual(parsed.filter?.excludedFolders, ["private"]);
  assert.deepStrictEqual(parsed.filter?.tags, ["ai", "ml"]);
  assert.strictEqual(parsed.filter?.tagOperator, "OR");
});

test("parseSearchQuery - frontmatter 중첩 키와 날짜 범위 파싱", () => {
  const parsed = parseSearchQuery(
    "meta.author.name:kim fm.status:done date>=2024-01-01 date<=2024-12-31 회고"
  );

  assert.strictEqual(parsed.query, "회고");
  assert.deepStrictEqual(parsed.filter?.frontmatter, {
    "author.name": "kim",
    status: "done",
  });
  assert.ok(parsed.filter?.dateRange?.from instanceof Date);
  assert.ok(parsed.filter?.dateRange?.to instanceof Date);
});

test("parseSearchQuery - Obsidian path/file/tag/property 문법 파싱", () => {
  const parsed = parseSearchQuery(
    'path:docs -path:private file:guide.md -file:draft.md tag:#RAG [author.name:kim] [status:done] 질문'
  );

  assert.strictEqual(parsed.query, "질문");
  assert.deepStrictEqual(parsed.filter?.folders, ["docs"]);
  assert.deepStrictEqual(parsed.filter?.excludedFolders, ["private"]);
  assert.deepStrictEqual(parsed.filter?.filePaths, ["guide.md"]);
  assert.deepStrictEqual(parsed.filter?.excludedFilePaths, ["draft.md"]);
  assert.deepStrictEqual(parsed.filter?.tags, ["rag"]);
  assert.deepStrictEqual(parsed.filter?.frontmatter, {
    "author.name": "kim",
    status: "done",
  });
});

test("parseSearchQuery - 계층형 태그 문법 파싱", () => {
  const parsed = parseSearchQuery("tag:#개발/검색 path:docs 계층 태그 설명");

  assert.strictEqual(parsed.query, "계층 태그 설명");
  assert.deepStrictEqual(parsed.filter?.tags, ["개발/검색"]);
  assert.deepStrictEqual(parsed.filter?.folders, ["docs"]);
});

test("parseSearchQuery - 부정 태그와 부정 속성 필터 파싱", () => {
  const parsed = parseSearchQuery("tag:#개발 -tag:#개발/실험 [status:done] -[author.name:kim] 요약");

  assert.strictEqual(parsed.query, "요약");
  assert.deepStrictEqual(parsed.filter?.tags, ["개발"]);
  assert.deepStrictEqual(parsed.filter?.excludedTags, ["개발/실험"]);
  assert.deepStrictEqual(parsed.filter?.frontmatter, { status: "done" });
  assert.deepStrictEqual(parsed.filter?.excludedFrontmatter, { "author.name": "kim" });
});

test("parseSearchQuery - 잘못된 날짜는 무시하고 검색어는 유지", () => {
  const parsed = parseSearchQuery("date>=invalid-date 성능");

  assert.strictEqual(parsed.query, "성능");
  assert.strictEqual(parsed.filter, undefined);
});
