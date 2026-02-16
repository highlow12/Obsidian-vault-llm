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
