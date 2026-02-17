// 파서 테스트

import { test } from "node:test";
import assert from "node:assert";
import { parseMarkdown, computeHash } from "../src/indexing/parser.js";

test("parseMarkdown - 기본 파싱", () => {
  const content = `---
title: 테스트 노트
tags: [test, markdown]
---

# 제목 1

이것은 테스트 내용입니다. #테스트태그

[[링크1]] 그리고 [[링크2|별칭]]을 포함합니다.

## 제목 2

더 많은 내용.
`;

  const result = parseMarkdown("test.md", content);

  assert.strictEqual(result.title, "테스트 노트");
  assert.deepStrictEqual(result.tags.sort(), ["markdown", "test", "테스트태그"].sort());
  assert.deepStrictEqual(result.links, ["링크1", "링크2"]);
  assert.ok(result.sections.length >= 2, "최소 2개 섹션");
  assert.ok(result.sections.some(s => s.heading === "제목 1"));
  assert.ok(result.sections.some(s => s.heading === "제목 2"));
});

test("parseMarkdown - frontmatter 없는 경우", () => {
  const content = `# 간단한 노트

내용만 있습니다.`;

  const result = parseMarkdown("simple.md", content);

  assert.strictEqual(result.title, "simple");
  assert.strictEqual(result.tags.length, 0);
  assert.strictEqual(result.links.length, 0);
  assert.strictEqual(result.sections.length, 1);
});

test("parseMarkdown - 태그 추출", () => {
  const content = `텍스트에 #태그1 과 #태그2 가 있습니다.`;

  const result = parseMarkdown("tags.md", content);

  assert.deepStrictEqual(result.tags.sort(), ["태그1", "태그2"].sort());
});

test("parseMarkdown - 링크 추출", () => {
  const content = `[[노트1]] 그리고 [[노트2]] 그리고 [[노트3|별칭]]`;

  const result = parseMarkdown("links.md", content);

  assert.deepStrictEqual(result.links, ["노트1", "노트2", "노트3"]);
});

test("computeHash - 동일 내용은 동일 해시", () => {
  const content1 = "테스트 내용";
  const content2 = "테스트 내용";

  const hash1 = computeHash(content1);
  const hash2 = computeHash(content2);

  assert.strictEqual(hash1, hash2);
});

test("computeHash - 다른 내용은 다른 해시", () => {
  const content1 = "테스트 내용 1";
  const content2 = "테스트 내용 2";

  const hash1 = computeHash(content1);
  const hash2 = computeHash(content2);

  assert.notStrictEqual(hash1, hash2);
});
