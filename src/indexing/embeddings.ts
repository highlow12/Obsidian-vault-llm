// 임베딩 생성기 - API 기반 및 로컬 모델 지원

import { requestUrl } from "obsidian";

export type EmbeddingConfig = {
  provider: "gemini" | "openai" | "local" | "custom";
  apiKey?: string;
  model: string;
  apiUrl?: string;
};

interface GeminiEmbeddingResponse {
  embedding?: {
    values?: number[];
  };
}

interface OpenAIEmbeddingResponse {
  data?: Array<{
    embedding?: number[];
  }>;
}

interface CustomEmbeddingResponse {
  data?: Array<{
    embedding?: number[];
  }>;
}

export class EmbeddingGenerator {
  private pipeline: any = null;
  private pipelineFactory: ((task: string, model: string) => Promise<any>) | null = null;
  private config: EmbeddingConfig;

  constructor(config: EmbeddingConfig) {
    this.config = config;
  }

  /**
   * 임베딩 초기화
   */
  async initialize(): Promise<void> {
    if (this.config.provider === "local") {
      if (this.pipeline) {
        return;
      }

      console.log(`로컬 임베딩 모델 로딩 중: ${this.config.model}`);
      console.log(`모델은 HuggingFace에서 다운로드되어 로컬에 캐시됩니다.`);
      const pipelineFactory = await this.loadPipelineFactory();
      this.pipeline = await pipelineFactory("feature-extraction", this.config.model);
      console.log("임베딩 모델 로딩 완료");
    } else {
      // API 기반은 초기화 불필요
      console.log(`API 기반 임베딩 사용: ${this.config.provider}`);
    }
  }

  /**
   * 텍스트를 임베딩 벡터로 변환
   */
  async embed(text: string): Promise<number[]> {
    if (this.config.provider === "local") {
      return this.embedLocal(text);
    } else if (this.config.provider === "gemini") {
      return this.embedGemini(text);
    } else if (this.config.provider === "openai") {
      return this.embedOpenAI(text);
    } else if (this.config.provider === "custom") {
      return this.embedCustom(text);
    }

    throw new Error(`지원하지 않는 임베딩 제공자: ${this.config.provider}`);
  }

  /**
   * 로컬 모델로 임베딩 생성
   */
  private async embedLocal(text: string): Promise<number[]> {
    if (!this.pipeline) {
      await this.initialize();
    }

    if (!this.pipeline) {
      throw new Error("임베딩 파이프라인 초기화 실패");
    }

    const output = await this.pipeline(text, {
      pooling: "mean",
      normalize: true,
    });

    return Array.from(output.data as Float32Array);
  }

  /**
   * 로컬 임베딩용 파이프라인 로더 (필요할 때만 로드)
   */
  private async loadPipelineFactory(): Promise<(task: string, model: string) => Promise<any>> {
    if (this.pipelineFactory) {
      return this.pipelineFactory;
    }

    const module = await import("@xenova/transformers");
    this.pipelineFactory = module.pipeline as (task: string, model: string) => Promise<any>;
    return this.pipelineFactory;
  }

  /**
   * Gemini API로 임베딩 생성
   */
  private async embedGemini(text: string): Promise<number[]> {
    if (!this.config.apiKey) {
      throw new Error("Gemini API 키가 설정되지 않았습니다");
    }

    const url = `${this.config.apiUrl}/${this.config.model}:embedContent?key=${this.config.apiKey}`;

    try {
      const response = await requestUrl({
        url,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: {
            parts: [{ text }],
          },
        }),
      });

      const data = response.json as GeminiEmbeddingResponse;
      if (data.embedding?.values) {
        return data.embedding.values;
      }

      throw new Error("Gemini API 응답 형식이 올바르지 않습니다");
    } catch (error) {
      console.error("Gemini 임베딩 생성 실패:", error);
      throw error;
    }
  }

  /**
   * OpenAI API로 임베딩 생성
   */
  private async embedOpenAI(text: string): Promise<number[]> {
    if (!this.config.apiKey) {
      throw new Error("OpenAI API 키가 설정되지 않았습니다");
    }

    try {
      const response = await requestUrl({
        url: this.config.apiUrl || "https://api.openai.com/v1/embeddings",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          model: this.config.model,
          input: text,
        }),
      });

      const data = response.json as OpenAIEmbeddingResponse;
      if (data.data?.[0]?.embedding) {
        return data.data[0].embedding;
      }

      throw new Error("OpenAI API 응답 형식이 올바르지 않습니다");
    } catch (error) {
      console.error("OpenAI 임베딩 생성 실패:", error);
      throw error;
    }
  }

  /**
   * 커스텀 API로 임베딩 생성
   */
  private async embedCustom(text: string): Promise<number[]> {
    if (!this.config.apiUrl) {
      throw new Error("커스텀 API URL이 설정되지 않았습니다");
    }

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (this.config.apiKey) {
        headers["Authorization"] = `Bearer ${this.config.apiKey}`;
      }

      const response = await requestUrl({
        url: this.config.apiUrl,
        method: "POST",
        headers,
        body: JSON.stringify({
          model: this.config.model,
          input: text,
        }),
      });

      const data = response.json as CustomEmbeddingResponse | number[];
      
      // OpenAI 호환 형식
      if (!Array.isArray(data) && data.data?.[0]?.embedding) {
        return data.data[0].embedding;
      }
      
      // 직접 배열 반환
      if (Array.isArray(data)) {
        return data;
      }

      throw new Error("커스텀 API 응답 형식을 파싱할 수 없습니다");
    } catch (error) {
      console.error("커스텀 임베딩 생성 실패:", error);
      throw error;
    }
  }

  /**
   * 여러 텍스트를 배치로 임베딩 생성
   */
  async embedBatch(texts: string[]): Promise<number[][]> {
    const embeddings: number[][] = [];

    for (const text of texts) {
      const embedding = await this.embed(text);
      embeddings.push(embedding);
    }

    return embeddings;
  }
}
