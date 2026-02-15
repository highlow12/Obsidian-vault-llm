import fs from "node:fs";
import path from "node:path";

// 대화의 각 턴을 나타내는 타입
export type ConversationTurn = {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: Date | string;
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
  
  // 헤더: 제목과 메타데이터
  lines.push(`# 대화 기록 - ${conversation.sessionId}`);
  lines.push("");
  lines.push(`생성일: ${conversation.createdAt.toISOString()}`);
  lines.push("");
  lines.push("---");
  lines.push("");
  
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
