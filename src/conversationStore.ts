import type { Vault } from "obsidian";
import { normalizePath } from "obsidian";
import type { Conversation, ConversationTurn } from "./conversation";
import { convertToMarkdown } from "./conversation";

export async function saveConversationFromTurns(
  vault: Vault,
  sessionId: string,
  turns: ConversationTurn[],
  outputFolder: string
): Promise<string> {
  const conversation: Conversation = {
    sessionId,
    turns,
    createdAt: new Date()
  };

  const markdown = convertToMarkdown(conversation);
  const filename = buildFileName(conversation);
  const cleanedFolder = outputFolder ? normalizePath(outputFolder).replace(/^\/+/, "") : "";
  const targetPath = await ensureUniquePath(
    vault,
    normalizePath(cleanedFolder ? `${cleanedFolder}/${filename}` : filename)
  );

  if (cleanedFolder) {
    await ensureFolderExists(vault, cleanedFolder);
  }

  await vault.create(targetPath, markdown);
  return targetPath;
}

function buildFileName(conversation: Conversation): string {
  const safeTitle = sanitizeFileSegment(conversation.sessionId);
  return `${safeTitle}.md`;
}

function sanitizeFileSegment(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    return "untitled";
  }

  const cleaned = trimmed
    .replace(/[\\/:*?"<>|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned || "untitled";
}

async function ensureFolderExists(vault: Vault, folder: string): Promise<void> {
  const exists = await vault.adapter.exists(folder);
  if (!exists) {
    await vault.createFolder(folder);
  }
}

async function ensureUniquePath(vault: Vault, path: string): Promise<string> {
  const normalized = normalizePath(path);
  const extensionIndex = normalized.lastIndexOf(".md");
  const base = extensionIndex === -1 ? normalized : normalized.slice(0, extensionIndex);
  const extension = extensionIndex === -1 ? "" : ".md";

  let candidate = normalized;
  let count = 1;

  while (await vault.adapter.exists(candidate)) {
    candidate = `${base}-${count}${extension}`;
    count += 1;
  }

  return candidate;
}
