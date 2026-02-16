import type { ConversationTurn } from "./conversation";

export function parseTurns(content: string): ConversationTurn[] {
  let data: unknown;
  try {
    data = JSON.parse(content);
  } catch {
    throw new Error("JSON 형식이 올바르지 않습니다.");
  }

  if (!Array.isArray(data)) {
    throw new Error("JSON은 배열이어야 합니다.");
  }

  return data.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new Error(`잘못된 항목: ${index + 1}번째`);
    }

    const role = (item as { role?: string }).role;
    const contentValue = (item as { content?: string }).content;
    const timestampValue = (item as { timestamp?: string }).timestamp;

    if (role !== "user" && role !== "assistant" && role !== "system") {
      throw new Error(`role이 올바르지 않습니다: ${index + 1}번째`);
    }
    if (typeof contentValue !== "string" || !contentValue.trim()) {
      throw new Error(`content가 올바르지 않습니다: ${index + 1}번째`);
    }

    return {
      role,
      content: contentValue,
      timestamp: timestampValue
    };
  });
}
