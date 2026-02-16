import { requestUrl } from "obsidian";
import { GoogleGenAI } from "@google/genai";
import type { ConversationTurn } from "./conversation";
import type { OvlSettings } from "./types";
import { PROVIDER_PRESETS } from "./types";

type LogWriter = (context: string, detail: unknown) => Promise<void>;

type SettingsGetter = () => OvlSettings;

export class OvlApiClient {
  private readonly getSettings: SettingsGetter;
  private readonly logWriter: LogWriter;

  constructor(getSettings: SettingsGetter, logWriter?: LogWriter) {
    this.getSettings = getSettings;
    // 로그 기록기를 주입받지 못한 경우에도 안전하게 동작하도록 처리합니다.
    this.logWriter = logWriter ?? (async () => {});
  }

  async requestAssistantReply(turns: ConversationTurn[]): Promise<string> {
    const settings = this.getSettings();

    if (settings.provider === "gemini") {
      return this.requestGeminiReply(settings, turns);
    }

    return this.requestOpenAiCompatibleReply(settings, turns);
  }

  private async requestOpenAiCompatibleReply(
    settings: OvlSettings,
    turns: ConversationTurn[]
  ): Promise<string> {
    const apiUrl = settings.apiUrl.trim();
    if (!apiUrl) {
      throw new Error("API URL을 설정해 주세요.");
    }

    const modelName = settings.model.trim() || PROVIDER_PRESETS.openai.model;
    if (!modelName) {
      throw new Error("모델 이름을 입력해 주세요.");
    }

    const messages = this.buildOpenAiMessages(settings, turns);
    const payload = {
      model: modelName,
      messages
    };
    const body = JSON.stringify(payload);

    const headers: Record<string, string> = {
      "Content-Type": "application/json"
    };
    if (settings.apiKey.trim()) {
      headers.Authorization = `Bearer ${settings.apiKey.trim()}`;
    }

    let response: { text: string; json?: unknown; status?: number };
    try {
      response = await requestUrl({
        url: apiUrl,
        method: "POST",
        headers,
        body
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await this.log("openai-compatible request failed", {
        url: apiUrl,
        body: payload,
        error: message
      });
      throw new Error(`API 요청 실패: ${message}`);
    }

    const status = response.status;
    if (status && status >= 400) {
      await this.log("openai-compatible response error", {
        url: apiUrl,
        body: payload,
        status,
        response: response.text
      });
      throw new Error(`API 오류: ${status}`);
    }

    const data = this.parseJsonResponse(response.text, response.json);
    const content =
      (data as { choices?: Array<{ message?: { content?: string } }> })?.choices?.[0]?.message
        ?.content ??
      (data as { reply?: string })?.reply ??
      (data as { content?: string })?.content ??
      (data as { message?: string })?.message;

    if (!content || typeof content !== "string") {
      await this.log("openai-compatible response invalid", { url: apiUrl, response: data });
      throw new Error("응답 형식이 올바르지 않습니다.");
    }

    return content.trim();
  }

  private async requestGeminiReply(
    settings: OvlSettings,
    turns: ConversationTurn[]
  ): Promise<string> {
    const apiKey = settings.apiKey.trim();
    if (!apiKey) {
      throw new Error("Gemini API 키를 입력해 주세요.");
    }

    const modelName = settings.model.trim() || PROVIDER_PRESETS.gemini.model;
    if (!modelName) {
      throw new Error("Gemini 모델 이름을 입력해 주세요.");
    }

    const systemPrompt = settings.systemPrompt.trim();
    const contents = turns.map((turn) => {
      const role = turn.role === "assistant" ? "model" : "user";
      const text = turn.role === "system" ? `[시스템] ${turn.content}` : turn.content;
      return {
        role,
        parts: [{ text }]
      };
    });

    const payload = {
      systemInstruction: systemPrompt ? { parts: [{ text: systemPrompt }] } : undefined,
      contents,
      generationConfig: {
        responseMimeType: "text/plain"
      }
    };

    const ai = new GoogleGenAI({ apiKey });
    let response:
      | { text?: string; candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> }
      | undefined;
    try {
      response = await ai.models.generateContent({
        model: modelName,
        ...payload
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await this.log("gemini request failed", {
        model: modelName,
        body: payload,
        error: message
      });
      throw new Error(`Gemini 요청 실패: ${message}`);
    }

    const text =
      response?.text?.trim() ??
      response?.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("").trim() ??
      "";

    if (!text) {
      await this.log("gemini response invalid", { model: modelName, response });
      throw new Error("응답 형식이 올바르지 않습니다.");
    }

    return text;
  }

  private buildOpenAiMessages(
    settings: OvlSettings,
    turns: ConversationTurn[]
  ): Array<{ role: string; content: string }> {
    const messages = [] as Array<{ role: string; content: string }>;
    const systemPrompt = settings.systemPrompt.trim();
    if (systemPrompt) {
      messages.push({ role: "system", content: systemPrompt });
    }
    for (const turn of turns) {
      messages.push({ role: turn.role, content: turn.content });
    }
    return messages;
  }

  private parseJsonResponse(text: string, json?: unknown): unknown {
    if (json) {
      return json;
    }
    try {
      return JSON.parse(text);
    } catch {
      throw new Error("API 응답을 해석할 수 없습니다.");
    }
  }

  private async log(context: string, detail: unknown): Promise<void> {
    await this.logWriter(context, detail);
  }
}
