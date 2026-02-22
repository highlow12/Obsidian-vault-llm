import type { Vault } from "obsidian";
import type { ConversationTurn } from "./conversation";

type SanitizedGenerationLog = NonNullable<ConversationTurn["generationLog"]>;

export type ChatSessionSummary = {
  sessionId: string;
  turnCount: number;
  updatedAt: string;
};

type StoredChatSession = {
  sessionId: string;
  turns: ConversationTurn[];
  updatedAt: string;
};

const SESSION_FOLDER = ".ovl/chat-sessions";

export async function saveChatSession(
  vault: Vault,
  sessionId: string,
  turns: ConversationTurn[]
): Promise<string> {
  const normalizedSessionId = sessionId.trim();
  if (!normalizedSessionId) {
    throw new Error("세션 제목이 비어 있습니다.");
  }

  await ensureFolderExists(vault, SESSION_FOLDER);
  const path = normalizePathSafe(`${SESSION_FOLDER}/${buildSessionFileName(normalizedSessionId)}`);

  const payload: StoredChatSession = {
    sessionId: normalizedSessionId,
    turns,
    updatedAt: new Date().toISOString()
  };

  const exists = await vault.adapter.exists(path);
  if (exists) {
    await vault.adapter.write(path, JSON.stringify(payload, null, 2));
  } else {
    await vault.create(path, JSON.stringify(payload, null, 2));
  }

  return path;
}

export async function listChatSessions(vault: Vault): Promise<ChatSessionSummary[]> {
  const files = await listSessionFiles(vault);
  const summaries: ChatSessionSummary[] = [];

  for (const file of files) {
    try {
      const raw = await vault.adapter.read(file);
      const parsed = JSON.parse(raw) as Partial<StoredChatSession>;
      const sessionId = typeof parsed.sessionId === "string" ? parsed.sessionId.trim() : "";
      if (!sessionId) {
        continue;
      }

      const turns = Array.isArray(parsed.turns) ? parsed.turns : [];
      const updatedAt =
        typeof parsed.updatedAt === "string" && parsed.updatedAt.trim()
          ? parsed.updatedAt
          : new Date(0).toISOString();

      summaries.push({
        sessionId,
        turnCount: turns.length,
        updatedAt
      });
    } catch {
      continue;
    }
  }

  return summaries.sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

export async function loadChatSession(vault: Vault, sessionId: string): Promise<ConversationTurn[]> {
  const normalizedSessionId = sessionId.trim();
  if (!normalizedSessionId) {
    throw new Error("불러올 세션 제목이 비어 있습니다.");
  }

  const session = await findSessionFileById(vault, normalizedSessionId);
  if (!session) {
    throw new Error("저장된 대화 기록을 찾지 못했습니다.");
  }

  return sanitizeTurns(session.parsed.turns);
}

export async function deleteChatSession(vault: Vault, sessionId: string): Promise<void> {
  const normalizedSessionId = sessionId.trim();
  if (!normalizedSessionId) {
    throw new Error("삭제할 세션 제목이 비어 있습니다.");
  }

  const session = await findSessionFileById(vault, normalizedSessionId);
  if (!session) {
    throw new Error("삭제할 대화 기록을 찾지 못했습니다.");
  }

  await vault.adapter.remove(session.path);
}

function sanitizeTurns(turns: unknown): ConversationTurn[] {
  if (!Array.isArray(turns)) {
    return [];
  }

  const sanitized: ConversationTurn[] = [];
  for (const turn of turns) {
    if (!turn || typeof turn !== "object") {
      continue;
    }

    const role = (turn as { role?: unknown }).role;
    const content = (turn as { content?: unknown }).content;
    const timestamp = (turn as { timestamp?: unknown }).timestamp;
    const generationLog = (turn as { generationLog?: unknown }).generationLog;

    if (!isConversationRole(role) || typeof content !== "string") {
      continue;
    }

    const nextTurn: ConversationTurn = {
      role,
      content
    };

    if (typeof timestamp === "string") {
      nextTurn.timestamp = timestamp;
    }

    const sanitizedGenerationLog = sanitizeGenerationLog(generationLog);
    if (sanitizedGenerationLog) {
      nextTurn.generationLog = sanitizedGenerationLog;
    }

    sanitized.push(nextTurn);
  }

  return sanitized;
}

function isConversationRole(value: unknown): value is ConversationTurn["role"] {
  return value === "user" || value === "assistant" || value === "system";
}

function sanitizeGenerationLog(value: unknown): SanitizedGenerationLog | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const raw = value as Record<string, unknown>;
  const durationMs = Number(raw.durationMs);
  const startedAt = typeof raw.startedAt === "string" ? raw.startedAt : "";
  const completedAt = typeof raw.completedAt === "string" ? raw.completedAt : "";
  const estimated = typeof raw.estimated === "boolean" ? raw.estimated : false;

  if (!Number.isFinite(durationMs) || !startedAt || !completedAt) {
    return null;
  }

  const log: SanitizedGenerationLog = {
    durationMs,
    startedAt,
    completedAt,
    estimated
  };

  const provider = typeof raw.provider === "string" ? raw.provider.trim() : "";
  if (provider) {
    log.provider = provider;
  }

  const model = typeof raw.model === "string" ? raw.model.trim() : "";
  if (model) {
    log.model = model;
  }

  const inputTokens = Number(raw.inputTokens);
  if (Number.isFinite(inputTokens)) {
    log.inputTokens = inputTokens;
  }

  const outputTokens = Number(raw.outputTokens);
  if (Number.isFinite(outputTokens)) {
    log.outputTokens = outputTokens;
  }

  const totalTokens = Number(raw.totalTokens);
  if (Number.isFinite(totalTokens)) {
    log.totalTokens = totalTokens;
  }

  const tokensPerSecond = Number(raw.tokensPerSecond);
  if (Number.isFinite(tokensPerSecond)) {
    log.tokensPerSecond = tokensPerSecond;
  }

  return log;
}

async function listSessionFiles(vault: Vault): Promise<string[]> {
  const exists = await vault.adapter.exists(SESSION_FOLDER);
  if (!exists) {
    return [];
  }

  const listed = await vault.adapter.list(SESSION_FOLDER);
  return listed.files.filter((path) => path.endsWith(".json"));
}

async function findSessionFileById(
  vault: Vault,
  sessionId: string
): Promise<{ path: string; parsed: Partial<StoredChatSession> } | null> {
  const files = await listSessionFiles(vault);
  for (const file of files) {
    try {
      const raw = await vault.adapter.read(file);
      const parsed = JSON.parse(raw) as Partial<StoredChatSession>;
      if (parsed.sessionId !== sessionId) {
        continue;
      }
      return { path: file, parsed };
    } catch {
      continue;
    }
  }

  return null;
}

async function ensureFolderExists(vault: Vault, folder: string): Promise<void> {
  const normalized = normalizePathSafe(folder).replace(/^\/+/, "");
  if (!normalized) {
    return;
  }

  const segments = normalized.split("/");
  let current = "";
  for (const segment of segments) {
    current = current ? `${current}/${segment}` : segment;
    const exists = await vault.adapter.exists(current);
    if (!exists) {
      await vault.createFolder(current);
    }
  }
}

function buildSessionFileName(sessionId: string): string {
  const safeName = sessionId
    .replace(/[\\/:*?"<>|]/g, " ")
    .replace(/\s+/g, " ")
    .trim() || "session";
  return `${safeName}-${hashSessionId(sessionId)}.json`;
}

function normalizePathSafe(path: string): string {
  return path
    .replace(/\\/g, "/")
    .replace(/\/+/g, "/")
    .replace(/^\.\//, "")
    .replace(/\/$/, "");
}

function hashSessionId(sessionId: string): string {
  let hash = 5381;
  for (let index = 0; index < sessionId.length; index += 1) {
    hash = (hash * 33) ^ sessionId.charCodeAt(index);
  }
  return Math.abs(hash >>> 0).toString(16);
}
