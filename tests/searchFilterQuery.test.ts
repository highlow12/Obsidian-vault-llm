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

test("parseSearchQuery - 단독 제외 항(-term) 파싱", () => {
  const parsed = parseSearchQuery("검색 -노트 RAG");

  assert.strictEqual(parsed.query, "검색 RAG");
  assert.deepStrictEqual(parsed.filter?.excludedTerms, ["노트"]);
});

test("parseSearchQuery - 정규식 검색(/regex/) 파싱", () => {
  const parsed = parseSearchQuery("/\\d{4}-\\d{2}/ 날짜");

  assert.strictEqual(parsed.query, "날짜");
  assert.ok(parsed.filter?.regexTerms?.length === 1);
  assert.ok(parsed.filter?.regexTerms?.[0] instanceof RegExp);
  assert.ok(parsed.filter?.regexTerms?.[0].test("2024-01"));
});

test("parseSearchQuery - 잘못된 정규식은 무시", () => {
  const parsed = parseSearchQuery("/[invalid/ 검색어");

  assert.strictEqual(parsed.query, "검색어");
  assert.strictEqual(parsed.filter, undefined);
});

test("parseSearchQuery - 속성 OR 다중값([property:val1 OR val2]) 파싱", () => {
  const parsed = parseSearchQuery("[status:done OR in-progress] 작업");

  assert.strictEqual(parsed.query, "작업");
  assert.deepStrictEqual(parsed.filter?.frontmatterOR, {
    status: ["done", "in-progress"],
  });
});

test("parseSearchQuery - 속성 비교 연산자([property:>5]) 파싱", () => {
  const parsed = parseSearchQuery("[priority:>3] 중요 작업");

  assert.strictEqual(parsed.query, "중요 작업");
  assert.deepStrictEqual(parsed.filter?.frontmatterComparisons, [
    { key: "priority", op: ">", value: 3 },
  ]);
});

test("parseSearchQuery - 속성 비교 연산자 다양한 형식", () => {
  const parsed = parseSearchQuery("[score:>=80] [count:<=10] [version:!=2]");

  assert.strictEqual(parsed.query, "");
  assert.deepStrictEqual(parsed.filter?.frontmatterComparisons, [
    { key: "score", op: ">=", value: 80 },
    { key: "count", op: "<=", value: 10 },
    { key: "version", op: "!=", value: 2 },
  ]);
});

test("parseSearchQuery - [property] 속성 존재 여부 파싱", () => {
  const parsed = parseSearchQuery("[author] -[draft] 문서");

  assert.strictEqual(parsed.query, "문서");
  assert.deepStrictEqual(parsed.filter?.requiredProperties, ["author"]);
  assert.deepStrictEqual(parsed.filter?.excludedProperties, ["draft"]);
});

test("parseSearchQuery - content/line/block/section 연산자 파싱", () => {
  const parsed = parseSearchQuery("content:RAG line:(검색 엔진) block:벡터 section:소개");

  assert.strictEqual(parsed.query, "");
  assert.deepStrictEqual(parsed.filter?.contentTerms, ["RAG"]);
  assert.deepStrictEqual(parsed.filter?.lineTerms, ["검색", "엔진"]);
  assert.deepStrictEqual(parsed.filter?.blockTerms, ["벡터"]);
  assert.deepStrictEqual(parsed.filter?.sectionTerms, ["소개"]);
});

test("parseSearchQuery - task/task-todo/task-done 연산자 파싱", () => {
  const parsed = parseSearchQuery("task:완료 task-todo:리뷰 task-done:배포");

  assert.strictEqual(parsed.query, "");
  assert.deepStrictEqual(parsed.filter?.taskTerms, ["완료"]);
  assert.deepStrictEqual(parsed.filter?.taskTodoTerms, ["리뷰"]);
  assert.deepStrictEqual(parsed.filter?.taskDoneTerms, ["배포"]);
});

test("parseSearchQuery - match-case/ignore-case 연산자 파싱", () => {
  const parsedMatch = parseSearchQuery("match-case:RAG");
  assert.strictEqual(parsedMatch.query, "RAG");
  assert.strictEqual(parsedMatch.filter?.caseMode, "match");

  const parsedIgnore = parseSearchQuery("ignore-case:rag");
  assert.strictEqual(parsedIgnore.query, "rag");
  assert.strictEqual(parsedIgnore.filter?.caseMode, "ignore");
});

test("parseSearchQuery - 복합 OR 연산자는 쿼리에 포함하지 않음", () => {
  const parsed = parseSearchQuery("검색 OR 탐색 필터");

  // OR 키워드 자체는 제거되고 검색어만 남음
  assert.ok(!parsed.query.includes("OR"));
  assert.ok(parsed.query.includes("검색"));
  assert.ok(parsed.query.includes("탐색"));
  assert.ok(parsed.query.includes("필터"));
});
