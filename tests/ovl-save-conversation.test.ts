import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { main } from "../src/ovl";
import { ConversationTurn } from "../src/conversation";

function makeTempDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), "ovl-test-"));
}

test("save-conversation 명령은 JSON 파일에서 대화를 읽어 마크다운으로 저장한다", () => {
  const tempDir = makeTempDir();
  const tempInputFile = path.join(tempDir, "conversation.json");
  
  try {
    const turns: ConversationTurn[] = [
      { role: "user", content: "질문입니다" },
      { role: "assistant", content: "답변입니다" },
    ];
    
    fs.writeFileSync(tempInputFile, JSON.stringify(turns), "utf-8");
    
    const code = main([
      "save-conversation",
      "--session-id", "test-session-1",
      "--input", tempInputFile,
      "--output", tempDir,
    ]);
    
    assert.equal(code, 0);
    
    const files = fs.readdirSync(tempDir).filter(f => f.endsWith(".md"));
    assert.equal(files.length, 1);
    
    const content = fs.readFileSync(path.join(tempDir, files[0]), "utf-8");
    assert.match(content, /# 대화 기록 - test-session-1/);
    assert.match(content, /질문입니다/);
    assert.match(content, /답변입니다/);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("save-conversation 명령은 session-id가 없으면 실패한다", () => {
  const tempDir = makeTempDir();
  const tempInputFile = path.join(tempDir, "conversation.json");
  
  try {
    fs.writeFileSync(tempInputFile, "[]", "utf-8");
    
    const code = main([
      "save-conversation",
      "--input", tempInputFile,
      "--output", tempDir,
    ]);
    
    assert.equal(code, 1);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("save-conversation 명령은 input 파일이 없으면 실패한다", () => {
  const code = main([
    "save-conversation",
    "--session-id", "test",
    "--input", "/nonexistent/file.json",
    "--output", "/tmp",
  ]);
  
  assert.equal(code, 1);
});

test("save-conversation 명령은 잘못된 JSON 파일에 대해 실패한다", () => {
  const tempDir = makeTempDir();
  const tempInputFile = path.join(tempDir, "invalid.json");
  
  try {
    fs.writeFileSync(tempInputFile, "not valid json", "utf-8");
    
    const code = main([
      "save-conversation",
      "--session-id", "test",
      "--input", tempInputFile,
      "--output", tempDir,
    ]);
    
    assert.equal(code, 1);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});
