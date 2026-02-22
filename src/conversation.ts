import fs from "node:fs";
import path from "node:path";

function yamlQuote(value: string): string {
  return JSON.stringify(value);
}

// 대화의 각 턴을 나타내는 타입
export type AssistantGenerationLog = {
  provider?: string;
  model?: string;
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
  durationMs: number;
  tokensPerSecond?: number;
  startedAt: string;
  completedAt: string;
  estimated: boolean;
};

export type ConversationTurn = {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: Date | string;
  generationLog?: AssistantGenerationLog;
};

// 대화 전체를 나타내는 타입
export type Conversation = {
  sessionId: string;
  turns: ConversationTurn[];
  createdAt: Date;
};

// 대화를 마크다운 형식으로 변환
export function convertToMarkdown(conversation: Conversation): string {
  const lines: string[] = [];

  // YAML 프론트매터
  const roleList = Array.from(new Set(conversation.turns.map((turn) => turn.role))).join(", ");
  lines.push("---");
  lines.push(`sessionId: ${yamlQuote(conversation.sessionId)}`);
  lines.push(`createdAt: ${yamlQuote(conversation.createdAt.toISOString())}`);
  lines.push(`turnCount: ${conversation.turns.length}`);
  lines.push(`roles: [${roleList}]`);
  lines.push("---");
  lines.push("");

  // 단일 요약 저장(assistant 1턴)인 경우 본문만 그대로 출력
  if (conversation.turns.length === 1 && conversation.turns[0].role === "assistant") {
    lines.push(conversation.turns[0].content.trim());
    lines.push("");
    return lines.join("\n");
  }
  
  // 각 턴을 마크다운으로 변환
  for (const turn of conversation.turns) {
    const roleLabel = turn.role === "user" ? "👤 사용자" : 
                     turn.role === "assistant" ? "🤖 어시스턴트" : 
                     "⚙️ 시스템";
    
    lines.push(`## ${roleLabel}`);
    
    if (turn.timestamp) {
      const timestamp = typeof turn.timestamp === "string" 
        ? turn.timestamp 
        : turn.timestamp.toISOString();
      lines.push(`*${timestamp}*`);
      lines.push("");
    }
    
    lines.push(turn.content);
    lines.push("");
  }
  
  return lines.join("\n");
}

// 대화를 파일로 저장
export function saveConversation(
  conversation: Conversation,
  targetDir: string
): string {
  if (!fs.existsSync(targetDir)) {
    throw new Error(`대상 디렉토리가 존재하지 않습니다: ${targetDir}`);
  }
  
  const markdown = convertToMarkdown(conversation);
  
  // 파일명 생성: YYYY-MM-DD-sessionId.md
  const date = conversation.createdAt.toISOString().split("T")[0];
  const filename = `${date}-${conversation.sessionId}.md`;
  const filepath = path.join(targetDir, filename);
  
  fs.writeFileSync(filepath, markdown, "utf-8");
  
  return filepath;
}
