import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { convertToMarkdown, saveConversation, Conversation, ConversationTurn } from "../src/conversation";
import { runSaveConversation } from "../src/ovl";

function makeTempDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), "ovl-test-"));
}

test("convertToMarkdown은 대화를 마크다운으로 변환한다", () => {
  const conversation: Conversation = {
    sessionId: "test-session",
    turns: [
      { role: "user", content: "안녕하세요" },
      { role: "assistant", content: "안녕하세요! 무엇을 도와드릴까요?" },
    ],
    createdAt: new Date("2024-01-01T00:00:00Z"),
  };
  
  const markdown = convertToMarkdown(conversation);
  
  assert.match(markdown, /---/);
  assert.match(markdown, /sessionId: "test-session"/);
  assert.match(markdown, /createdAt: "2024-01-01T00:00:00.000Z"/);
  assert.match(markdown, /## 👤 사용자/);
  assert.match(markdown, /안녕하세요/);
  assert.match(markdown, /## 🤖 어시스턴트/);
  assert.match(markdown, /안녕하세요! 무엇을 도와드릴까요?/);
});

test("saveConversation은 대화를 파일로 저장한다", () => {
  const tempDir = makeTempDir();
  
  try {
    const conversation: Conversation = {
      sessionId: "test-123",
      turns: [
        { role: "user", content: "테스트 질문" },
        { role: "assistant", content: "테스트 답변" },
      ],
      createdAt: new Date("2024-01-15T10:30:00Z"),
    };
    
    const filepath = saveConversation(conversation, tempDir);
    
    assert.equal(fs.existsSync(filepath), true);
    assert.equal(path.basename(filepath), "2024-01-15-test-123.md");
    
    const content = fs.readFileSync(filepath, "utf-8");
    assert.match(content, /sessionId: "test-123"/);
    assert.match(content, /테스트 질문/);
    assert.match(content, /테스트 답변/);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("saveConversation은 존재하지 않는 디렉토리에 대해 에러를 던진다", () => {
  const conversation: Conversation = {
    sessionId: "test",
    turns: [],
    createdAt: new Date(),
  };
  
  assert.throws(
    () => saveConversation(conversation, "/nonexistent/path"),
    /대상 디렉토리가 존재하지 않습니다/
  );
});

test("runSaveConversation은 JSON 형식의 대화 턴을 읽어 저장한다", () => {
  const tempDir = makeTempDir();
  const tempInputFile = path.join(tempDir, "input.json");
  
  try {
    const turns: ConversationTurn[] = [
      { role: "user", content: "첫 번째 질문" },
      { role: "assistant", content: "첫 번째 답변" },
      { role: "user", content: "두 번째 질문" },
    ];
    
    fs.writeFileSync(tempInputFile, JSON.stringify(turns, null, 2), "utf-8");
    
    const code = runSaveConversation(turns, {
      sessionId: "cli-test",
      output: tempDir,
    });
    
    assert.equal(code, 0);
    
    const files = fs.readdirSync(tempDir).filter(f => f.endsWith(".md"));
    assert.equal(files.length, 1);
    assert.match(files[0], /cli-test\.md$/);
    
    const content = fs.readFileSync(path.join(tempDir, files[0]), "utf-8");
    assert.match(content, /첫 번째 질문/);
    assert.match(content, /두 번째 질문/);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("타임스탬프가 있는 턴은 타임스탬프를 포함한다", () => {
  const conversation: Conversation = {
    sessionId: "timestamp-test",
    turns: [
      {
        role: "user",
        content: "질문",
        timestamp: new Date("2024-01-01T12:00:00Z"),
      },
    ],
    createdAt: new Date("2024-01-01T00:00:00Z"),
  };
  
  const markdown = convertToMarkdown(conversation);
  
  assert.match(markdown, /\*2024-01-01T12:00:00.000Z\*/);
});
