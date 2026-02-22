/**
 * 벡터 임베딩 및 유사도 계산 모듈
 */

import type { App, PluginManifest } from 'obsidian';
import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * 코사인 유사도를 계산합니다
 * @param vecA 벡터 A
 * @param vecB 벡터 B
 * @returns 코사인 유사도 (-1~1)
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
  private lastEmbedding: number[] | null = null;
  private lastText: string = '';

  constructor(
    private apiKey: string,
    private modelName: string = 'embedding-001',
    private app?: App,
    private manifest?: PluginManifest,
    private enableLogging: boolean = false
  ) {
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      // models/ 접두사 제거
      const cleanModelName = this.modelName.replace(/^models\//, '');
      this.model = this.genAI.getGenerativeModel({ model: cleanModelName });
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

    let embedding: number[] | undefined;

    // 캐시 확인
    if (this.cache.has(text)) {
      embedding = this.cache.get(text)!;
    } else {
      try {
        const result = await this.model.embedContent(text);
        const values = result?.embedding?.values;
        if (!Array.isArray(values) || values.length === 0) {
          throw new Error('임베딩 응답이 비어 있습니다');
        }
        embedding = values;

        // 캐시에 저장
        this.cache.set(text, embedding);
      } catch (error) {
        console.error('임베딩 생성 실패:', error);
        throw new Error(`임베딩 생성 실패: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    if (!embedding) {
      throw new Error('임베딩 생성 결과가 없습니다');
    }

    // 로깅 처리 - 모든 임베딩(캐시 포함)을 로깅
    if (this.enableLogging && this.app) {
      try {
        const { appendEmbeddingLog } = await import('../logging');
        let similarity: number | undefined;
        let previousText: string | undefined;

        if (this.lastEmbedding) {
          similarity = cosineSimilarity(this.lastEmbedding, embedding);
          previousText = this.lastText;
        }

        await appendEmbeddingLog(this.app, this.manifest, {
          inputText: text,
          embedding,
          similarity,
          previousInputText: previousText
        });
      } catch (logError) {
        console.error('임베딩 로그 작성 실패:', logError);
      }
    }

    // 마지막 임베딩 업데이트
    this.lastEmbedding = embedding;
    this.lastText = text;

    return embedding;
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
