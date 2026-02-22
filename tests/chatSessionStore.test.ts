import assert from "node:assert/strict";
import test from "node:test";
import type { Vault } from "obsidian";
import { deleteChatSession, listChatSessions, loadChatSession, saveChatSession } from "../src/chatSessionStore";
import type { ConversationTurn } from "../src/conversation";

type MemoryVault = Vault & {
  __files: Map<string, string>;
  __folders: Set<string>;
};

function createMemoryVault(): MemoryVault {
  const files = new Map<string, string>();
  const folders = new Set<string>();

  const vault = {
    adapter: {
      async exists(path: string): Promise<boolean> {
        return files.has(path) || folders.has(path);
      },
      async write(path: string, content: string): Promise<void> {
        files.set(path, content);
      },
      async read(path: string): Promise<string> {
        const value = files.get(path);
        if (typeof value !== "string") {
          throw new Error(`파일이 없습니다: ${path}`);
        }
        return value;
      },
      async list(path: string): Promise<{ files: string[]; folders: string[] }> {
        const prefix = `${path}/`;
        return {
          files: [...files.keys()].filter((item) => item.startsWith(prefix)),
          folders: [...folders.values()].filter((item) => item.startsWith(prefix))
        };
      },
      async remove(path: string): Promise<void> {
        files.delete(path);
      }
    },
    async create(path: string, content: string): Promise<void> {
      files.set(path, content);
    },
    async createFolder(path: string): Promise<void> {
      folders.add(path);
    },
    __files: files,
    __folders: folders
  } as unknown as MemoryVault;

  return vault;
}

test("saveChatSession은 세션 기록을 JSON으로 저장한다", async () => {
  const vault = createMemoryVault();
  const turns: ConversationTurn[] = [
    { role: "user", content: "안녕" },
    { role: "assistant", content: "안녕하세요" }
  ];

  const path = await saveChatSession(vault, "테스트 세션", turns);

  assert.match(path, /\.ovl\/chat-sessions\//);
  assert.equal(vault.__files.has(path), true);

  const raw = vault.__files.get(path) ?? "";
  assert.match(raw, /"sessionId": "테스트 세션"/);
  assert.match(raw, /"role": "assistant"/);
});

test("listChatSessions는 최신 업데이트 순서로 세션 목록을 반환한다", async () => {
  const vault = createMemoryVault();
  await saveChatSession(vault, "첫 세션", [{ role: "user", content: "a" }]);
  await new Promise((resolve) => setTimeout(resolve, 5));
  await saveChatSession(vault, "둘째 세션", [{ role: "user", content: "b" }]);

  const sessions = await listChatSessions(vault);

  assert.equal(sessions.length, 2);
  assert.equal(sessions[0].sessionId, "둘째 세션");
  assert.equal(sessions[1].sessionId, "첫 세션");
  assert.equal(sessions[0].turnCount, 1);
});

test("loadChatSession은 세션 ID로 턴 목록을 불러온다", async () => {
  const vault = createMemoryVault();
  const turns: ConversationTurn[] = [
    { role: "user", content: "질문" },
    { role: "assistant", content: "답변", timestamp: "2026-01-01T00:00:00.000Z" }
  ];

  await saveChatSession(vault, "복원 테스트", turns);
  const loadedTurns = await loadChatSession(vault, "복원 테스트");

  assert.equal(loadedTurns.length, 2);
  assert.equal(loadedTurns[0].content, "질문");
  assert.equal(loadedTurns[1].timestamp, "2026-01-01T00:00:00.000Z");
});

test("deleteChatSession은 선택한 세션만 삭제한다", async () => {
  const vault = createMemoryVault();
  await saveChatSession(vault, "남길 세션", [{ role: "user", content: "A" }]);
  await saveChatSession(vault, "삭제 세션", [{ role: "user", content: "B" }]);

  await deleteChatSession(vault, "삭제 세션");

  const sessions = await listChatSessions(vault);
  assert.equal(sessions.length, 1);
  assert.equal(sessions[0].sessionId, "남길 세션");
});
