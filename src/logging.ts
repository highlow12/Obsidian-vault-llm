import type { App, PluginManifest } from "obsidian";
import { normalizePath } from "obsidian";

export function getPluginLogPath(app: App, manifest?: PluginManifest): string {
  const pluginId = manifest?.id ?? "obsidian-vault-llm";
  return normalizePath(`${app.vault.configDir}/plugins/${pluginId}/log.txt`);
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
      await app.vault.adapter.write(logPath, `${current}${entry}`);
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
  
  // 입력 텍스트 (최대 150자)
  const inputText = data.inputText.substring(0, 150).replace(/\n/g, ' ');
  
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
      await app.vault.adapter.write(logPath, `${current}${entry}`);
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
      await app.vault.adapter.write(logPath, `${current}${entry}`);
    } else {
      await app.vault.adapter.write(logPath, entry.trimStart());
    }
  } catch (error) {
    console.error('[주제 분리 실패 로그] 파일 쓰기 실패:', error);
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
