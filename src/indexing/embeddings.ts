// 임베딩 생성기 - HuggingFace Transformers 사용

import { pipeline } from "@xenova/transformers";

export class EmbeddingGenerator {
  private pipeline: any = null;
  private modelName: string;

  constructor(modelName: string = "Xenova/all-MiniLM-L6-v2") {
    this.modelName = modelName;
  }

  /**
   * 임베딩 파이프라인 초기화
   * 
   * 참고: 이 메서드는 런타임에 ML 모델을 다운로드합니다.
   * 모델은 HuggingFace에서 다운로드되며, 로컬 캐시에 저장됩니다.
   * 보안: 모델 소스가 손상될 위험이 있으므로, 신뢰할 수 있는 모델만 사용하세요.
   */
  async initialize(): Promise<void> {
    if (this.pipeline) {
      return;
    }

    console.log(`임베딩 모델 로딩 중: ${this.modelName}`);
    console.log(`모델은 HuggingFace에서 다운로드되어 로컬에 캐시됩니다.`);
    this.pipeline = await pipeline("feature-extraction", this.modelName);
    console.log("임베딩 모델 로딩 완료");
  }

  /**
   * 텍스트를 임베딩 벡터로 변환
   */
  async embed(text: string): Promise<number[]> {
    if (!this.pipeline) {
      await this.initialize();
    }

    if (!this.pipeline) {
      throw new Error("임베딩 파이프라인 초기화 실패");
    }

    // 임베딩 생성
    const output = await this.pipeline(text, {
      pooling: "mean",
      normalize: true,
    });

    // 결과를 number[]로 변환
    return Array.from(output.data as Float32Array);
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
