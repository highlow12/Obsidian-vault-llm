// 청킹 테스트

import { test } from "node:test";
import assert from "node:assert";
import { chunkText } from "../src/indexing/chunker.js";

test("chunkText - 짧은 섹션은 그대로 유지", () => {
  const sections = [
    {
      heading: "제목",
      content: "짧은 내용",
      level: 1,
      position: 0,
    },
  ];

  const chunks = chunkText("note-1", sections, { chunkSize: 400, chunkOverlap: 50 });

  assert.strictEqual(chunks.length, 1);
  assert.strictEqual(chunks[0].noteId, "note-1");
  assert.ok(chunks[0].text.includes("제목"));
  assert.ok(chunks[0].text.includes("짧은 내용"));
});

test("chunkText - 긴 섹션은 분할", () => {
  const longContent = Array(100)
    .fill("이것은 긴 문장입니다. ")
    .join("");

  const sections = [
    {
      heading: "긴 섹션",
      content: longContent,
      level: 1,
      position: 0,
    },
  ];

  const chunks = chunkText("note-2", sections, { chunkSize: 50, chunkOverlap: 10 });

  assert.ok(chunks.length > 1, "긴 섹션은 여러 청크로 분할되어야 함");
  assert.ok(chunks.every((c) => c.noteId === "note-2"));
});

test("chunkText - 여러 섹션 처리", () => {
  const sections = [
    {
      heading: "섹션 1",
      content: "첫 번째 섹션 내용",
      level: 1,
      position: 0,
    },
    {
      heading: "섹션 2",
      content: "두 번째 섹션 내용",
      level: 1,
      position: 100,
    },
  ];

  const chunks = chunkText("note-3", sections);

  assert.ok(chunks.length >= 2);
  assert.ok(chunks.some((c) => c.text.includes("섹션 1")));
  assert.ok(chunks.some((c) => c.text.includes("섹션 2")));
});

test("chunkText - 빈 섹션은 스킵", () => {
  const sections = [
    {
      heading: "",
      content: "",
      level: 0,
      position: 0,
    },
  ];

  const chunks = chunkText("note-4", sections);

  // 빈 헤더와 빈 내용이 있으면 청크가 생성되지 않음
  assert.ok(chunks.length === 0 || (chunks.length === 1 && chunks[0].text.trim() === ""));
});
