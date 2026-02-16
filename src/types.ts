export type ApiProvider = "gemini" | "openai" | "ollama" | "custom";

export type OvlSettings = {
  provider: ApiProvider;
  apiUrl: string;
  apiKey: string;
  model: string;
  systemPrompt: string;
  defaultOutputFolder: string;
};

export const PROVIDER_PRESETS: Record<ApiProvider, { apiUrl: string; model: string }> = {
  gemini: {
    apiUrl: "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash:generateContent",
    model: "gemini-3-flash"
  },
  openai: {
    apiUrl: "https://api.openai.com/v1/chat/completions",
    model: "gpt-4o-mini"
  },
  ollama: {
    apiUrl: "http://localhost:11434/v1/chat/completions",
    model: "llama3.1"
  },
  custom: {
    apiUrl: "",
    model: ""
  }
};

export const DEFAULT_SETTINGS: OvlSettings = {
  provider: "gemini",
  apiUrl: PROVIDER_PRESETS.gemini.apiUrl,
  apiKey: "",
  model: PROVIDER_PRESETS.gemini.model,
  systemPrompt: "",
  defaultOutputFolder: ""
};
