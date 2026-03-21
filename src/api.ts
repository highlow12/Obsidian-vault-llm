import { requestUrl } from "obsidian";
import type { ConversationTurn } from "./conversation";
import type { OvlSettings } from "./types";
import { PROVIDER_PRESETS } from "./types";
import type { AssistantReplyStreamOptions, AssistantTokenUsage } from "./pluginApi";

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

    if (settings.provider === "claude") {
      return this.requestClaudeReply(settings, turns);
    }

    return this.requestOpenAiCompatibleReply(settings, turns);
  }

  async requestAssistantReplyStream(
    turns: ConversationTurn[],
    options: AssistantReplyStreamOptions
  ): Promise<string> {
    const settings = this.getSettings();

    if (settings.provider === "gemini") {
      return this.requestGeminiReplyStream(settings, turns, options);
    }

    if (settings.provider === "claude") {
      return this.requestClaudeReplyStream(settings, turns, options);
    }

    return this.requestOpenAiCompatibleReplyStream(settings, turns, options);
  }

  async requestTitleReply(prompt: string): Promise<string> {
    const settings = this.getSettings();
    const titleModel = settings.titleModel.trim();
    const modelName = titleModel || settings.model.trim();
    const turns: ConversationTurn[] = [
      {
        role: "user",
        content: prompt,
        timestamp: new Date().toISOString()
      }
    ];

    if (settings.provider === "gemini") {
      return this.requestGeminiReply(settings, turns, {
        modelName,
        systemPrompt: ""
      });
    }

    if (settings.provider === "claude") {
      return this.requestClaudeReply(settings, turns, {
        modelName,
        systemPrompt: ""
      });
    }

    return this.requestOpenAiCompatibleReply(settings, turns, {
      modelName,
      systemPrompt: ""
    });
  }

  async requestSummaryReply(prompt: string): Promise<string> {
    const settings = this.getSettings();
    const summaryModel = settings.summaryModel.trim();
    const modelName = summaryModel || settings.model.trim();
    const turns: ConversationTurn[] = [
      {
        role: "user",
        content: prompt,
        timestamp: new Date().toISOString()
      }
    ];

    if (settings.provider === "gemini") {
      return this.requestGeminiReply(settings, turns, {
        modelName,
        systemPrompt: ""
      });
    }

    if (settings.provider === "claude") {
      return this.requestClaudeReply(settings, turns, {
        modelName,
        systemPrompt: ""
      });
    }

    return this.requestOpenAiCompatibleReply(settings, turns, {
      modelName,
      systemPrompt: ""
    });
  }

  private async requestOpenAiCompatibleReply(
    settings: OvlSettings,
    turns: ConversationTurn[],
    options?: { modelName?: string; systemPrompt?: string | null }
  ): Promise<string> {
    const apiUrl = settings.apiUrl.trim();
    if (!apiUrl) {
      throw new Error("API URL을 설정해 주세요.");
    }

    const modelName = options?.modelName?.trim() || settings.model.trim() || PROVIDER_PRESETS.openai.model;
    if (!modelName) {
      throw new Error("모델 이름을 입력해 주세요.");
    }

    const messages = this.buildOpenAiMessages(settings, turns, options?.systemPrompt ?? null);
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

  private async requestOpenAiCompatibleReplyStream(
    settings: OvlSettings,
    turns: ConversationTurn[],
    streamOptions: AssistantReplyStreamOptions,
    options?: { modelName?: string; systemPrompt?: string | null }
  ): Promise<string> {
    const apiUrl = settings.apiUrl.trim();
    if (!apiUrl) {
      throw new Error("API URL을 설정해 주세요.");
    }

    const modelName = options?.modelName?.trim() || settings.model.trim() || PROVIDER_PRESETS.openai.model;
    if (!modelName) {
      throw new Error("모델 이름을 입력해 주세요.");
    }

    const messages = this.buildOpenAiMessages(settings, turns, options?.systemPrompt ?? null);
    const payload = {
      model: modelName,
      messages,
      stream: true,
      stream_options: {
        include_usage: true
      }
    };

    const headers: Record<string, string> = {
      "Content-Type": "application/json"
    };
    if (settings.apiKey.trim()) {
      headers.Authorization = `Bearer ${settings.apiKey.trim()}`;
    }

    let response: Response;
    try {
      response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        signal: streamOptions.signal
      });
    } catch (error) {
      if (this.isAbortError(error)) {
        throw this.createAbortError();
      }
      const message = error instanceof Error ? error.message : String(error);
      await this.log("openai-compatible stream request failed", {
        url: apiUrl,
        body: payload,
        error: message
      });
      throw new Error(`API 스트리밍 요청 실패: ${message}`);
    }

    if (!response.ok) {
      const responseText = await response.text();
      await this.log("openai-compatible stream response error", {
        url: apiUrl,
        body: payload,
        status: response.status,
        response: responseText
      });
      throw new Error(`API 오류: ${response.status}`);
    }

    if (!response.body) {
      const fallback = await this.requestOpenAiCompatibleReply(settings, turns, options);
      streamOptions.onToken(fallback);
      return fallback;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let fullText = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const chunks = buffer.split("\n\n");
        buffer = chunks.pop() ?? "";

        for (const chunk of chunks) {
          const parsedChunk = this.parseOpenAiSseChunk(chunk);
          if (parsedChunk.usage) {
            streamOptions.onUsage?.(parsedChunk.usage);
          }
          for (const token of parsedChunk.tokens) {
            fullText += token;
            streamOptions.onToken(token);
          }
        }
      }

      if (buffer.trim()) {
        const parsedChunk = this.parseOpenAiSseChunk(buffer);
        if (parsedChunk.usage) {
          streamOptions.onUsage?.(parsedChunk.usage);
        }
        for (const token of parsedChunk.tokens) {
          fullText += token;
          streamOptions.onToken(token);
        }
      }
    } catch (error) {
      if (this.isAbortError(error)) {
        throw this.createAbortError();
      }
      const message = error instanceof Error ? error.message : String(error);
      await this.log("openai-compatible stream read failed", {
        url: apiUrl,
        body: payload,
        error: message
      });
      throw new Error(`스트리밍 응답 처리 실패: ${message}`);
    }

    return fullText.trim();
  }

  private async requestClaudeReply(
    settings: OvlSettings,
    turns: ConversationTurn[],
    options?: { modelName?: string; systemPrompt?: string | null }
  ): Promise<string> {
    const apiKey = settings.apiKey.trim();
    if (!apiKey) {
      throw new Error("Claude API 키를 입력해 주세요.");
    }

    const modelName = options?.modelName?.trim() || settings.model.trim() || PROVIDER_PRESETS.claude.model;
    if (!modelName) {
      throw new Error("Claude 모델 이름을 입력해 주세요.");
    }

    const systemPrompt = (options?.systemPrompt ?? settings.systemPrompt).trim();
    const messages = turns
      .filter((turn) => turn.role !== "system")
      .map((turn) => ({
        role: turn.role as "user" | "assistant",
        content: turn.content
      }));

    const payload: {
      model: string;
      max_tokens: number;
      messages: Array<{ role: "user" | "assistant"; content: string }>;
      system?: string;
    } = {
      model: modelName,
      max_tokens: 8192,
      messages
    };

    if (systemPrompt) {
      payload.system = systemPrompt;
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    };

    const apiUrl = settings.apiUrl.trim() || PROVIDER_PRESETS.claude.apiUrl;

    let response: { text: string; json?: unknown; status?: number };
    try {
      response = await requestUrl({
        url: apiUrl,
        method: "POST",
        headers,
        body: JSON.stringify(payload)
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await this.log("claude request failed", {
        model: modelName,
        body: payload,
        error: message
      });
      throw new Error(`Claude 요청 실패: ${message}`);
    }

    const status = response.status;
    if (status && status >= 400) {
      await this.log("claude response error", {
        model: modelName,
        body: payload,
        status,
        response: response.text
      });
      throw new Error(`Claude API 오류: ${status}`);
    }

    const data = this.parseJsonResponse(response.text, response.json);
    const text =
      (data as { content?: Array<{ type?: string; text?: string }> })?.content
        ?.filter((block) => block.type === "text")
        .map((block) => block.text ?? "")
        .join("") ?? "";

    if (!text) {
      await this.log("claude response invalid", { model: modelName, response: data });
      throw new Error("응답 형식이 올바르지 않습니다.");
    }

    return text.trim();
  }

  private async requestClaudeReplyStream(
    settings: OvlSettings,
    turns: ConversationTurn[],
    streamOptions: AssistantReplyStreamOptions,
    options?: { modelName?: string; systemPrompt?: string | null }
  ): Promise<string> {
    const apiKey = settings.apiKey.trim();
    if (!apiKey) {
      throw new Error("Claude API 키를 입력해 주세요.");
    }

    const modelName = options?.modelName?.trim() || settings.model.trim() || PROVIDER_PRESETS.claude.model;
    if (!modelName) {
      throw new Error("Claude 모델 이름을 입력해 주세요.");
    }

    const systemPrompt = (options?.systemPrompt ?? settings.systemPrompt).trim();
    const messages = turns
      .filter((turn) => turn.role !== "system")
      .map((turn) => ({
        role: turn.role as "user" | "assistant",
        content: turn.content
      }));

    const payload: {
      model: string;
      max_tokens: number;
      messages: Array<{ role: "user" | "assistant"; content: string }>;
      system?: string;
      stream: boolean;
    } = {
      model: modelName,
      max_tokens: 8192,
      messages,
      stream: true
    };

    if (systemPrompt) {
      payload.system = systemPrompt;
    }

    const apiUrl = settings.apiUrl.trim() || PROVIDER_PRESETS.claude.apiUrl;

    let response: Response;
    try {
      response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify(payload),
        signal: streamOptions.signal
      });
    } catch (error) {
      if (this.isAbortError(error)) {
        throw this.createAbortError();
      }
      const message = error instanceof Error ? error.message : String(error);
      await this.log("claude stream request failed", {
        model: modelName,
        body: payload,
        error: message
      });
      throw new Error(`Claude 스트리밍 요청 실패: ${message}`);
    }

    if (!response.ok) {
      const responseText = await response.text();
      await this.log("claude stream response error", {
        model: modelName,
        body: payload,
        status: response.status,
        response: responseText
      });
      throw new Error(`Claude API 오류: ${response.status}`);
    }

    if (!response.body) {
      const fallback = await this.requestClaudeReply(settings, turns, options);
      streamOptions.onToken(fallback);
      return fallback;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let fullText = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const chunks = buffer.split("\n\n");
        buffer = chunks.pop() ?? "";

        for (const chunk of chunks) {
          const parsedChunk = this.parseClaudeSseChunk(chunk);
          if (parsedChunk.usage) {
            streamOptions.onUsage?.(parsedChunk.usage);
          }
          for (const token of parsedChunk.tokens) {
            fullText += token;
            streamOptions.onToken(token);
          }
        }
      }

      if (buffer.trim()) {
        const parsedChunk = this.parseClaudeSseChunk(buffer);
        if (parsedChunk.usage) {
          streamOptions.onUsage?.(parsedChunk.usage);
        }
        for (const token of parsedChunk.tokens) {
          fullText += token;
          streamOptions.onToken(token);
        }
      }
    } catch (error) {
      if (this.isAbortError(error)) {
        throw this.createAbortError();
      }
      const message = error instanceof Error ? error.message : String(error);
      await this.log("claude stream read failed", {
        model: modelName,
        body: payload,
        error: message
      });
      throw new Error(`Claude 스트리밍 응답 처리 실패: ${message}`);
    }

    return fullText.trim();
  }

  private async requestGeminiReply(
    settings: OvlSettings,
    turns: ConversationTurn[],
    options?: { modelName?: string; systemPrompt?: string | null }
  ): Promise<string> {
    const apiKey = settings.apiKey.trim();
    if (!apiKey) {
      throw new Error("Gemini API 키를 입력해 주세요.");
    }

    const modelName = options?.modelName?.trim() || settings.model.trim() || PROVIDER_PRESETS.gemini.model;
    if (!modelName) {
      throw new Error("Gemini 모델 이름을 입력해 주세요.");
    }

    const systemPrompt = (options?.systemPrompt ?? settings.systemPrompt).trim();
    const contents = turns.map((turn) => {
      const role = turn.role === "assistant" ? "model" : "user";
      const text = turn.role === "system" ? `[시스템] ${turn.content}` : turn.content;
      return {
        role,
        parts: [{ text }]
      };
    });

    const payload: {
      systemInstruction?: { parts: Array<{ text: string }> };
      contents: Array<{ role: string; parts: Array<{ text: string }> }>;
      generationConfig: { responseMimeType: string };
    } = {
      contents,
      generationConfig: {
        responseMimeType: "text/plain"
      }
    };

    if (systemPrompt) {
      payload.systemInstruction = { parts: [{ text: systemPrompt }] };
    }

    // Gemini API URL 구성 (API 키를 쿼리 파라미터로 전달)
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json"
    };

    let response: { text: string; json?: unknown; status?: number };
    try {
      response = await requestUrl({
        url: apiUrl,
        method: "POST",
        headers,
        body: JSON.stringify(payload)
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

    const status = response.status;
    if (status && status >= 400) {
      await this.log("gemini response error", {
        model: modelName,
        body: payload,
        status,
        response: response.text
      });
      throw new Error(`Gemini API 오류: ${status}`);
    }

    const data = this.parseJsonResponse(response.text, response.json);
    const text =
      (data as { text?: string })?.text ??
      (data as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> })
        ?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text ?? "")
        .join("") ??
      "";

    if (!text) {
      await this.log("gemini response invalid", { model: modelName, response: data });
      throw new Error("응답 형식이 올바르지 않습니다.");
    }

    return text;
  }

  private async requestGeminiReplyStream(
    settings: OvlSettings,
    turns: ConversationTurn[],
    streamOptions: AssistantReplyStreamOptions,
    options?: { modelName?: string; systemPrompt?: string | null }
  ): Promise<string> {
    const apiKey = settings.apiKey.trim();
    if (!apiKey) {
      throw new Error("Gemini API 키를 입력해 주세요.");
    }

    const modelName = options?.modelName?.trim() || settings.model.trim() || PROVIDER_PRESETS.gemini.model;
    if (!modelName) {
      throw new Error("Gemini 모델 이름을 입력해 주세요.");
    }

    const systemPrompt = (options?.systemPrompt ?? settings.systemPrompt).trim();
    const contents = turns.map((turn) => {
      const role = turn.role === "assistant" ? "model" : "user";
      const text = turn.role === "system" ? `[시스템] ${turn.content}` : turn.content;
      return {
        role,
        parts: [{ text }]
      };
    });

    const payload: {
      systemInstruction?: { parts: Array<{ text: string }> };
      contents: Array<{ role: string; parts: Array<{ text: string }> }>;
      generationConfig: { responseMimeType: string };
    } = {
      contents,
      generationConfig: {
        responseMimeType: "text/plain"
      }
    };

    if (systemPrompt) {
      payload.systemInstruction = { parts: [{ text: systemPrompt }] };
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:streamGenerateContent?alt=sse&key=${apiKey}`;

    let response: Response;
    try {
      response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        signal: streamOptions.signal
      });
    } catch (error) {
      if (this.isAbortError(error)) {
        throw this.createAbortError();
      }
      const message = error instanceof Error ? error.message : String(error);
      await this.log("gemini stream request failed", {
        model: modelName,
        body: payload,
        error: message
      });
      throw new Error(`Gemini 스트리밍 요청 실패: ${message}`);
    }

    if (!response.ok) {
      const responseText = await response.text();
      await this.log("gemini stream response error", {
        model: modelName,
        body: payload,
        status: response.status,
        response: responseText
      });
      throw new Error(`Gemini API 오류: ${response.status}`);
    }

    if (!response.body) {
      const fallback = await this.requestGeminiReply(settings, turns, options);
      streamOptions.onToken(fallback);
      return fallback;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let fullText = "";
    let snapshotText = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const chunks = buffer.split("\n\n");
        buffer = chunks.pop() ?? "";

        for (const chunk of chunks) {
          const result = this.parseGeminiSseChunk(chunk, snapshotText);
          snapshotText = result.snapshot;
          if (result.usage) {
            streamOptions.onUsage?.(result.usage);
          }
          if (result.delta) {
            fullText += result.delta;
            streamOptions.onToken(result.delta);
          }
        }
      }

      if (buffer.trim()) {
        const result = this.parseGeminiSseChunk(buffer, snapshotText);
        snapshotText = result.snapshot;
        if (result.usage) {
          streamOptions.onUsage?.(result.usage);
        }
        if (result.delta) {
          fullText += result.delta;
          streamOptions.onToken(result.delta);
        }
      }
    } catch (error) {
      if (this.isAbortError(error)) {
        throw this.createAbortError();
      }
      const message = error instanceof Error ? error.message : String(error);
      await this.log("gemini stream read failed", {
        model: modelName,
        body: payload,
        error: message
      });
      throw new Error(`Gemini 스트리밍 응답 처리 실패: ${message}`);
    }

    return fullText;
  }

  private buildOpenAiMessages(
    settings: OvlSettings,
    turns: ConversationTurn[],
    systemPromptOverride: string | null
  ): Array<{ role: string; content: string }> {
    const messages = [] as Array<{ role: string; content: string }>;
    const systemPrompt = systemPromptOverride !== null
      ? systemPromptOverride.trim()
      : settings.systemPrompt.trim();
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

  private parseOpenAiSseChunk(chunk: string): { tokens: string[]; usage?: AssistantTokenUsage } {
    const tokens: string[] = [];
    let usage: AssistantTokenUsage | undefined;
    const lines = chunk
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("data:"));

    for (const line of lines) {
      const payload = line.slice("data:".length).trim();
      if (!payload || payload === "[DONE]") {
        continue;
      }

      let data: unknown;
      try {
        data = JSON.parse(payload);
      } catch {
        continue;
      }

      const openAiUsage = this.extractOpenAiUsage(data);
      if (openAiUsage) {
        usage = openAiUsage;
      }

      const token =
        (data as { choices?: Array<{ delta?: { content?: string } }> })?.choices?.[0]?.delta?.content ??
        (data as { choices?: Array<{ message?: { content?: string } }> })?.choices?.[0]?.message?.content ??
        (data as { message?: { content?: string } })?.message?.content ??
        "";

      if (token) {
        tokens.push(token);
      }
    }

    return { tokens, usage };
  }

  private parseClaudeSseChunk(chunk: string): { tokens: string[]; usage?: AssistantTokenUsage } {
    const tokens: string[] = [];
    let usage: AssistantTokenUsage | undefined;
    const lines = chunk
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("data:"));

    for (const line of lines) {
      const payload = line.slice("data:".length).trim();
      if (!payload || payload === "[DONE]") {
        continue;
      }

      let data: unknown;
      try {
        data = JSON.parse(payload);
      } catch {
        continue;
      }

      // content_block_delta 이벤트에서 텍스트 토큰 추출
      const eventType = (data as { type?: string })?.type;
      if (eventType === "content_block_delta") {
        const delta = (data as { delta?: { type?: string; text?: string } })?.delta;
        if (delta?.type === "text_delta" && delta.text) {
          tokens.push(delta.text);
        }
      }

      // message_delta 이벤트에서 사용량 추출
      if (eventType === "message_delta") {
        const claudeUsage = this.extractClaudeUsage(data);
        if (claudeUsage) {
          usage = claudeUsage;
        }
      }

      // message_start 이벤트에서 입력 토큰 수 추출
      if (eventType === "message_start") {
        const messageUsage = (data as {
          message?: { usage?: { input_tokens?: number } };
        })?.message?.usage;
        if (messageUsage) {
          usage = { ...usage, inputTokens: messageUsage.input_tokens };
        }
      }
    }

    return { tokens, usage };
  }

  private extractClaudeUsage(data: unknown): AssistantTokenUsage | null {
    const usage = (data as {
      usage?: { output_tokens?: number };
    })?.usage;

    if (!usage) {
      return null;
    }

    const outputTokens = Number(usage.output_tokens);
    if (!Number.isFinite(outputTokens)) {
      return null;
    }

    return { outputTokens };
  }

  private parseGeminiSseChunk(
    chunk: string,
    snapshotText: string
  ): { delta: string; snapshot: string; usage?: AssistantTokenUsage } {
    const lines = chunk
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("data:"));

    let delta = "";
    let snapshot = snapshotText;
    let usage: AssistantTokenUsage | undefined;

    for (const line of lines) {
      const payload = line.slice("data:".length).trim();
      if (!payload || payload === "[DONE]") {
        continue;
      }

      let data: unknown;
      try {
        data = JSON.parse(payload);
      } catch {
        continue;
      }

      const geminiUsage = this.extractGeminiUsage(data);
      if (geminiUsage) {
        usage = geminiUsage;
      }

      const nextText =
        (data as { text?: string })?.text ??
        (data as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> })
          ?.candidates?.[0]?.content?.parts
          ?.map((part) => part.text ?? "")
          .join("") ??
        "";

      if (!nextText) {
        continue;
      }

      if (nextText.startsWith(snapshot)) {
        const appended = nextText.slice(snapshot.length);
        if (appended) {
          delta += appended;
        }
        snapshot = nextText;
      } else {
        delta += nextText;
        snapshot += nextText;
      }
    }

    return { delta, snapshot, usage };
  }

  private extractOpenAiUsage(data: unknown): AssistantTokenUsage | null {
    const usage = (data as {
      usage?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number };
    })?.usage;

    if (!usage) {
      return null;
    }

    const inputTokens = Number(usage.prompt_tokens);
    const outputTokens = Number(usage.completion_tokens);
    const totalTokens = Number(usage.total_tokens);

    const hasAnyToken =
      Number.isFinite(inputTokens) || Number.isFinite(outputTokens) || Number.isFinite(totalTokens);
    if (!hasAnyToken) {
      return null;
    }

    const result: AssistantTokenUsage = {};
    if (Number.isFinite(inputTokens)) {
      result.inputTokens = inputTokens;
    }
    if (Number.isFinite(outputTokens)) {
      result.outputTokens = outputTokens;
    }
    if (Number.isFinite(totalTokens)) {
      result.totalTokens = totalTokens;
    }

    return result;
  }

  private extractGeminiUsage(data: unknown): AssistantTokenUsage | null {
    const usage = (data as {
      usageMetadata?: {
        promptTokenCount?: number;
        candidatesTokenCount?: number;
        totalTokenCount?: number;
      };
    })?.usageMetadata;

    if (!usage) {
      return null;
    }

    const inputTokens = Number(usage.promptTokenCount);
    const outputTokens = Number(usage.candidatesTokenCount);
    const totalTokens = Number(usage.totalTokenCount);

    const hasAnyToken =
      Number.isFinite(inputTokens) || Number.isFinite(outputTokens) || Number.isFinite(totalTokens);
    if (!hasAnyToken) {
      return null;
    }

    const result: AssistantTokenUsage = {};
    if (Number.isFinite(inputTokens)) {
      result.inputTokens = inputTokens;
    }
    if (Number.isFinite(outputTokens)) {
      result.outputTokens = outputTokens;
    }
    if (Number.isFinite(totalTokens)) {
      result.totalTokens = totalTokens;
    }

    return result;
  }

  private isAbortError(error: unknown): boolean {
    return error instanceof Error && (error.name === "AbortError" || /abort|중단/i.test(error.message));
  }

  private createAbortError(): Error {
    const error = new Error("요청이 중단되었습니다.");
    error.name = "AbortError";
    return error;
  }

  private async log(context: string, detail: unknown): Promise<void> {
    await this.logWriter(context, detail);
  }
}
