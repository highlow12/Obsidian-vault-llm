/**
 * 주제 분리 엔진
 * 
 * 대화의 의미론적 경계를 탐지하여 주제별로 분리합니다.
 */

import type { ConversationTurn } from '../conversation';
import { extractKeywords, formatKeywordsMetadata, extractCommonKeywords } from './keywordExtractor';
import { EmbeddingGenerator, cosineSimilarity } from './embeddingService';
import type { ConversationSegment, TopicBoundary, SegmentLink, TopicSeparationResult } from './types';

export interface TopicSeparationConfig {
  apiKey: string;
  similarityThreshold?: number; // 기본값: 0.75
  minSegmentLength?: number; // 최소 세그먼트 길이 (턴 수)
  windowSize?: number; // 슬라이딩 윈도우 크기
  enableKeywordMetadata?: boolean; // 키워드 메타데이터 사용 여부
}

export class TopicSeparationEngine {
  private embeddingGenerator: EmbeddingGenerator;
  private config: TopicSeparationConfig;

  constructor(config: TopicSeparationConfig) {
    this.config = {
      ...config,
      similarityThreshold: config.similarityThreshold ?? 0.75,
      minSegmentLength: config.minSegmentLength ?? 2,
      windowSize: config.windowSize ?? 2,
      enableKeywordMetadata: config.enableKeywordMetadata ?? true
    };
    this.embeddingGenerator = new EmbeddingGenerator(config.apiKey);
  }

  /**
   * 대화를 주제별로 분리합니다
   * @param turns 대화 턴 배열
   * @returns 주제 분리 결과
   */
  async separateTopics(turns: ConversationTurn[]): Promise<TopicSeparationResult> {
    if (turns.length === 0) {
      return {
        segments: [],
        boundaries: [],
        links: []
      };
    }

    // 1. 각 턴의 텍스트 준비 (키워드 메타데이터 추가)
    const turnTexts = this.prepareTurnTexts(turns);

    // 2. 임베딩 생성
    console.log('임베딩 생성 중...');
    const embeddings = await this.embeddingGenerator.embedBatch(turnTexts);

    // 3. 슬라이딩 윈도우로 유사도 계산
    console.log('유사도 계산 중...');
    const similarities = this.calculateWindowSimilarities(embeddings);

    // 4. 주제 경계 탐지
    console.log('주제 경계 탐지 중...');
    const boundaries = this.detectTopicBoundaries(similarities);

    // 5. 세그먼트 생성
    console.log('세그먼트 생성 중...');
    const segments = this.createSegments(turns, boundaries, similarities);

    // 6. 세그먼트 간 링크 분석
    console.log('세그먼트 링크 분석 중...');
    const links = this.analyzeSegmentLinks(segments);

    return {
      segments,
      boundaries,
      links
    };
  }

  /**
   * 턴 텍스트를 준비합니다 (키워드 메타데이터 추가)
   */
  private prepareTurnTexts(turns: ConversationTurn[]): string[] {
    return turns.map(turn => {
      let text = turn.content;

      if (this.config.enableKeywordMetadata) {
        const keywords = extractKeywords(text);
        const metadata = formatKeywordsMetadata(keywords);
        if (metadata) {
          text = `${metadata} ${text}`;
        }
      }

      return text;
    });
  }

  /**
   * 슬라이딩 윈도우 방식으로 유사도를 계산합니다
   */
  private calculateWindowSimilarities(embeddings: number[][]): number[] {
    const similarities: number[] = [];
    const windowSize = this.config.windowSize!;

    for (let i = 0; i < embeddings.length - 1; i++) {
      // 현재 윈도우: 현재 턴부터 windowSize만큼
      const currentWindow = this.combineEmbeddings(
        embeddings.slice(Math.max(0, i - windowSize + 1), i + 1)
      );

      // 다음 윈도우: 다음 턴
      const nextWindow = embeddings[i + 1];

      // 유사도 계산
      const similarity = cosineSimilarity(currentWindow, nextWindow);
      similarities.push(similarity);
    }

    return similarities;
  }

  /**
   * 여러 임베딩을 평균하여 하나로 결합합니다
   */
  private combineEmbeddings(embeddings: number[][]): number[] {
    if (embeddings.length === 0) {
      throw new Error('임베딩 배열이 비어있습니다');
    }

    if (embeddings.length === 1) {
      return embeddings[0];
    }

    const dim = embeddings[0].length;
    const combined = new Array(dim).fill(0);

    for (const embedding of embeddings) {
      for (let i = 0; i < dim; i++) {
        combined[i] += embedding[i];
      }
    }

    // 평균 계산
    for (let i = 0; i < dim; i++) {
      combined[i] /= embeddings.length;
    }

    return combined;
  }

  /**
   * 주제 경계를 탐지합니다
   */
  private detectTopicBoundaries(similarities: number[]): TopicBoundary[] {
    const boundaries: TopicBoundary[] = [];
    const threshold = this.config.similarityThreshold!;

    for (let i = 0; i < similarities.length; i++) {
      const similarity = similarities[i];

      // 유사도가 임계값 미만이거나 급격히 하락한 경우
      const isPrimaryBoundary = similarity < threshold;

      // 이전 대비 급격한 하락 감지
      if (i > 0) {
        const prevSimilarity = similarities[i - 1];
        const drop = prevSimilarity - similarity;
        
        // 0.15 이상 급격히 하락한 경우도 경계로 간주
        if (drop > 0.15) {
          boundaries.push({
            index: i + 1, // 다음 턴부터 새로운 주제
            similarity,
            isPrimaryBoundary: true
          });
          continue;
        }
      }

      if (isPrimaryBoundary) {
        boundaries.push({
          index: i + 1,
          similarity,
          isPrimaryBoundary: true
        });
      }
    }

    return boundaries;
  }

  /**
   * 세그먼트를 생성합니다
   */
  private createSegments(
    turns: ConversationTurn[],
    boundaries: TopicBoundary[],
    similarities: number[]
  ): ConversationSegment[] {
    const segments: ConversationSegment[] = [];
    const boundaryIndices = boundaries.map(b => b.index).sort((a, b) => a - b);
    const minSegmentLength = this.config.minSegmentLength!;

    let startIndex = 0;
    for (const endIndex of boundaryIndices) {
      if (endIndex - startIndex >= minSegmentLength) {
        const segmentTurns = turns.slice(startIndex, endIndex);
        const keywords = this.extractSegmentKeywords(segmentTurns);
        const avgSimilarity = this.calculateAverageSimilarity(similarities, startIndex, endIndex);

        segments.push({
          startIndex,
          endIndex,
          turns: segmentTurns,
          keywords,
          avgSimilarity
        });
      }

      startIndex = endIndex;
    }

    // 마지막 세그먼트
    if (startIndex < turns.length) {
      const segmentTurns = turns.slice(startIndex);
      const keywords = this.extractSegmentKeywords(segmentTurns);
      const avgSimilarity = this.calculateAverageSimilarity(similarities, startIndex, turns.length);

      segments.push({
        startIndex,
        endIndex: turns.length,
        turns: segmentTurns,
        keywords,
        avgSimilarity
      });
    }

    return segments;
  }

  /**
   * 세그먼트의 키워드를 추출합니다
   */
  private extractSegmentKeywords(turns: ConversationTurn[]): string[] {
    const allText = turns.map(t => t.content).join(' ');
    return extractKeywords(allText);
  }

  /**
   * 구간의 평균 유사도를 계산합니다
   */
  private calculateAverageSimilarity(similarities: number[], start: number, end: number): number {
    if (start >= end - 1) {
      return 1.0;
    }

    const relevantSimilarities = similarities.slice(start, Math.min(end - 1, similarities.length));
    if (relevantSimilarities.length === 0) {
      return 1.0;
    }

    const sum = relevantSimilarities.reduce((acc, val) => acc + val, 0);
    return sum / relevantSimilarities.length;
  }

  /**
   * 세그먼트 간 링크를 분석합니다
   */
  private analyzeSegmentLinks(segments: ConversationSegment[]): SegmentLink[] {
    const links: SegmentLink[] = [];

    for (let i = 0; i < segments.length; i++) {
      for (let j = i + 1; j < segments.length; j++) {
        const segmentA = segments[i];
        const segmentB = segments[j];

        // 공통 키워드 찾기
        const commonKeywords = segmentA.keywords.filter(k => segmentB.keywords.includes(k));

        if (commonKeywords.length > 0) {
          // 연관성 점수 계산 (Jaccard 유사도)
          const unionSize = new Set([...segmentA.keywords, ...segmentB.keywords]).size;
          const relevanceScore = commonKeywords.length / unionSize;

          // 최소 연관성 임계값 (0.1)
          if (relevanceScore > 0.1) {
            links.push({
              fromSegment: i,
              toSegment: j,
              commonKeywords,
              relevanceScore
            });
          }
        }
      }
    }

    return links;
  }

  /**
   * 캐시를 초기화합니다
   */
  clearCache(): void {
    this.embeddingGenerator.clearCache();
  }
}
