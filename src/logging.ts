import type { App, PluginManifest } from "obsidian";
import { normalizePath } from "obsidian";
import type { ConversationTurn } from "./conversation";

// main.js가 있는 플러그인 실제 경로를 찾아서 로그 파일 경로 반환
export function getPluginLogPath(app: App, manifest?: PluginManifest): string {
  // 플러그인 ID 기본값
  const pluginId = manifest?.id ?? "obsidian-vault-llm";
  
  // 실제 플러그인 폴더 경로: .obsidian/plugins/{pluginId}
  const pluginsDir = normalizePath(`${app.vault.configDir}/plugins`);
  const pluginDir = normalizePath(`${pluginsDir}/${pluginId}`);
  
  // 로그 파일은 플러그인 디렉토리에 직접 생성
  return normalizePath(`${pluginDir}/log.txt`);
}

export async function appendErrorLog(
  app: App,
  manifest: PluginManifest | undefined,
  context: string,
  detail: unknown
): Promise<void> {
  const logPath = getPluginLogPath(app, manifest);
  const timestamp = new Date().toISOString();
  const detailText = toSafeString(detail);
  const entry = `\n[${timestamp}] ${context}\n${detailText}\n`;

  try {
    const exists = await app.vault.adapter.exists(logPath);
    if (exists) {
      const current = await app.vault.adapter.read(logPath);
      await app.vault.adapter.write(logPath, `${entry}${current}`);
    } else {
      await app.vault.adapter.write(logPath, entry.trimStart());
    }
  } catch (error) {
    console.error("Failed to write plugin log", error);
  }
}

export interface EmbeddingLogData {
  inputText: string;
  embedding: number[];
  similarity?: number; // 이전 임베딩과의 유사도
  previousInputText?: string;
}

export async function appendEmbeddingLog(
  app: App,
  manifest: PluginManifest | undefined,
  data: EmbeddingLogData
): Promise<void> {
  const logPath = getPluginLogPath(app, manifest);
  const timestamp = new Date().toISOString();
  
  // 입력 텍스트 전체 (개행 제거)
  const inputText = data.inputText.replace(/\n/g, ' ');
  
  // 임베딩 벡터를 간단히 표현
  const embeddingInfo = `[벡터 차원: ${data.embedding.length}]`;
  
  // 유사도 정보
  let similarityInfo = '';
  if (data.similarity !== undefined) {
    similarityInfo = ` | 이전 임베딩과의 유사도: ${(data.similarity * 100).toFixed(2)}%`;
  }
  
  // 로그 엔트리
  let entry = `\n[${timestamp}] [임베딩] 입력: "${inputText}" ${embeddingInfo}${similarityInfo}\n`;

  try {
    const exists = await app.vault.adapter.exists(logPath);
    if (exists) {
      const current = await app.vault.adapter.read(logPath);
      await app.vault.adapter.write(logPath, `${entry}${current}`);
    } else {
      await app.vault.adapter.write(logPath, entry.trimStart());
    }
  } catch (error) {
    console.error('[임베딩 로그] 파일 쓰기 실패:', error);
  }
}

export async function appendTopicSeparationFailureLog(
  app: App,
  manifest: PluginManifest | undefined,
  reason: string,
  details?: unknown
): Promise<void> {
  const logPath = getPluginLogPath(app, manifest);
  const timestamp = new Date().toISOString();
  
  let entry = `\n[${timestamp}] [주제 분리 실패] 이유: ${reason}\n`;
  
  if (details) {
    entry += `상세: ${toSafeString(details)}\n`;
  }
  
  entry += "---\n";

  try {
    const exists = await app.vault.adapter.exists(logPath);
    if (exists) {
      const current = await app.vault.adapter.read(logPath);
      await app.vault.adapter.write(logPath, `${entry}${current}`);
    } else {
      await app.vault.adapter.write(logPath, entry.trimStart());
    }
  } catch (error) {
    console.error('[주제 분리 실패 로그] 파일 쓰기 실패:', error);
  }
}

export type LlmInputLogSource = "send" | "vault-search" | "save-summary" | "save-topic";

export interface LlmInputLogData {
  source: LlmInputLogSource;
  systemPrompt?: string;
  turns: ConversationTurn[];
}

export async function appendLlmInputLog(
  app: App,
  manifest: PluginManifest | undefined,
  data: LlmInputLogData
): Promise<void> {
  const logPath = getPluginLogPath(app, manifest);
  const timestamp = new Date().toISOString();
  const sourceLabel =
    data.source === "vault-search" ? "볼트 검색 답변" :
    data.source === "save-summary" ? "저장 요약" :
    data.source === "save-topic" ? "저장 주제 분리" :
    "전송";

  let entry = `\n[${timestamp}] [LLM 입력] 경로: ${sourceLabel}\n`;

  const systemPrompt = data.systemPrompt?.trim();
  if (systemPrompt) {
    entry += `[system:설정]\n${systemPrompt}\n`;
  }

  for (const turn of data.turns) {
    entry += `[${turn.role}]\n${turn.content}\n`;
  }

  entry += "---\n";

  try {
    const exists = await app.vault.adapter.exists(logPath);
    if (exists) {
      const current = await app.vault.adapter.read(logPath);
      await app.vault.adapter.write(logPath, `${entry}${current}`);
    } else {
      await app.vault.adapter.write(logPath, entry.trimStart());
    }
  } catch (error) {
    console.error("[LLM 입력 로그] 파일 쓰기 실패:", error);
  }
}

function toSafeString(detail: unknown): string {
  if (detail === null || detail === undefined) {
    return String(detail);
  }
  if (typeof detail === "string") {
    return detail;
  }
  if (detail instanceof Error) {
    return detail.stack ?? detail.message;
  }
  try {
    const seen = new WeakSet<object>();
    return JSON.stringify(
      detail,
      (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return "[순환 참조]";
          }
          seen.add(value);
        }
        return value;
      },
      2
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return `직렬화 실패: ${message}`;
  }
}
