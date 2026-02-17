export type ApiProvider = "gemini" | "openai" | "ollama" | "custom";
export type EmbeddingProvider = "gemini" | "openai" | "local" | "custom";

export type OvlSettings = {
  provider: ApiProvider;
  apiUrl: string;
  apiKey: string;
  model: string;
  systemPrompt: string;
  defaultOutputFolder: string;
  // 인덱싱 설정
  indexingEnabled: boolean;
  chunkSize: number;
  chunkOverlap: number;
  topK: number;
  // 임베딩 설정
  embeddingProvider: EmbeddingProvider;
  embeddingApiKey: string;
  embeddingModel: string;
};

export const PROVIDER_PRESETS: Record<ApiProvider, { apiUrl: string; model: string }> = {
  gemini: {
    apiUrl: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent",
    model: "gemini-2.0-flash-exp"
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

export const EMBEDDING_PRESETS: Record<EmbeddingProvider, { model: string; apiUrl?: string }> = {
  gemini: {
    model: "text-embedding-004",
    apiUrl: "https://generativelanguage.googleapis.com/v1beta/models"
  },
  openai: {
    model: "text-embedding-3-small",
    apiUrl: "https://api.openai.com/v1/embeddings"
  },
  local: {
    model: "Xenova/all-MiniLM-L6-v2"
  },
  custom: {
    model: ""
  }
};

export const DEFAULT_SETTINGS: OvlSettings = {
  provider: "gemini",
  apiUrl: PROVIDER_PRESETS.gemini.apiUrl,
  apiKey: "",
  model: PROVIDER_PRESETS.gemini.model,
  systemPrompt: "",
  defaultOutputFolder: "",
  // 인덱싱 기본 설정
  indexingEnabled: false,
  chunkSize: 400,
  chunkOverlap: 50,
  topK: 8,
  // 임베딩 기본 설정 (Gemini)
  embeddingProvider: "gemini",
  embeddingApiKey: "",
  embeddingModel: EMBEDDING_PRESETS.gemini.model,
};
