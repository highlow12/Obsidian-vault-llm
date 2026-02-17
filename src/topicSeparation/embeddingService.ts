/**
 * 벡터 임베딩 및 유사도 계산 모듈
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * 코사인 유사도를 계산합니다
 * @param vecA 벡터 A
 * @param vecB 벡터 B
 * @returns 코사인 유사도 (0~1)
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) {
    throw new Error('벡터의 차원이 일치하지 않습니다');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) {
    return 0;
  }

  return dotProduct / denominator;
}

/**
 * Gemini API를 사용하여 텍스트 임베딩을 생성합니다
 */
export class EmbeddingGenerator {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;
  private cache: Map<string, number[]> = new Map();

  constructor(private apiKey: string) {
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'embedding-001' });
    }
  }

  /**
   * 텍스트를 벡터로 변환합니다
   * @param text 입력 텍스트
   * @returns 임베딩 벡터
   */
  async embed(text: string): Promise<number[]> {
    if (!this.model) {
      throw new Error('Gemini API가 초기화되지 않았습니다');
    }

    // 캐시 확인
    if (this.cache.has(text)) {
      return this.cache.get(text)!;
    }

    try {
      const result = await this.model.embedContent(text);
      const embedding = result.embedding.values;

      // 캐시에 저장
      this.cache.set(text, embedding);

      return embedding;
    } catch (error) {
      console.error('임베딩 생성 실패:', error);
      throw new Error(`임베딩 생성 실패: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * 여러 텍스트를 한 번에 벡터로 변환합니다
   * @param texts 입력 텍스트 배열
   * @returns 임베딩 벡터 배열
   */
  async embedBatch(texts: string[]): Promise<number[][]> {
    const embeddings: number[][] = [];

    for (const text of texts) {
      const embedding = await this.embed(text);
      embeddings.push(embedding);
    }

    return embeddings;
  }

  /**
   * 캐시를 초기화합니다
   */
  clearCache(): void {
    this.cache.clear();
  }
}
