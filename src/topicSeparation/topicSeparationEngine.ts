/**
 * 주제 분리 엔진
 * 
 * 대화의 의미론적 경계를 탐지하여 주제별로 분리합니다.
 */

import type { App, PluginManifest } from 'obsidian';
import type { ConversationTurn } from '../conversation';
import { extractKeywords, formatKeywordsMetadata, extractCommonKeywords } from './keywordExtractor';
import { EmbeddingGenerator, cosineSimilarity } from './embeddingService';
import { appendTopicSeparationFailureLog } from '../logging';
import type { ConversationSegment, TopicBoundary, SegmentLink, TopicSeparationResult } from './types';

export interface TopicSeparationConfig {
  apiKey: string;
  similarityThreshold?: number; // 기본값: 0.75
  minSegmentLength?: number; // 최소 세그먼트 길이 (턴 수)
  windowSize?: number; // 슬라이딩 윈도우 크기
  enableKeywordMetadata?: boolean; // 키워드 메타데이터 사용 여부
  app?: App; // 로깅용 Obsidian 앱
  manifest?: PluginManifest; // 플러그인 매니페스트
  enableEmbeddingLogging?: boolean; // 임베딩 로깅 활성화
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
      enableKeywordMetadata: config.enableKeywordMetadata ?? true,
      enableEmbeddingLogging: config.enableEmbeddingLogging ?? false
    };
    this.embeddingGenerator = new EmbeddingGenerator(
      config.apiKey,
      config.app,
      config.manifest,
      config.enableEmbeddingLogging ?? false
    );
  }

  /**
   * 대화를 주제별로 분리합니다
   * @param turns 대화 턴 배열
   * @returns 주제 분리 결과
   */
  async separateTopics(turns: ConversationTurn[]): Promise<TopicSeparationResult> {
    try {
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
      let embeddings: number[][];
      try {
        embeddings = await this.embeddingGenerator.embedBatch(turnTexts);
      } catch (error) {
        const msg = `임베딩 생성 실패: ${error instanceof Error ? error.message : String(error)}`;
        if (this.config.app) {
          await appendTopicSeparationFailureLog(this.config.app, this.config.manifest, msg, error);
        }
        throw new Error(msg);
      }

      // 3. 슬라이딩 윈도우로 유사도 계산
      console.log('유사도 계산 중...');
      let similarities: number[];
      try {
        similarities = this.calculateWindowSimilarities(embeddings);
      } catch (error) {
        const msg = `유사도 계산 실패: ${error instanceof Error ? error.message : String(error)}`;
        if (this.config.app) {
          await appendTopicSeparationFailureLog(this.config.app, this.config.manifest, msg, error);
        }
        throw new Error(msg);
      }

      // 4. 주제 경계 탐지
      console.log('주제 경계 탐지 중...');
      let boundaries: TopicBoundary[];
      try {
        boundaries = this.detectTopicBoundaries(similarities);
      } catch (error) {
        const msg = `주제 경계 탐지 실패: ${error instanceof Error ? error.message : String(error)}`;
        if (this.config.app) {
          await appendTopicSeparationFailureLog(this.config.app, this.config.manifest, msg, error);
        }
        throw new Error(msg);
      }

      // 5. 세그먼트 생성
      console.log('세그먼트 생성 중...');
      let segments: ConversationSegment[];
      try {
        segments = this.createSegments(turns, boundaries, similarities);
      } catch (error) {
        const msg = `세그먼트 생성 실패: ${error instanceof Error ? error.message : String(error)}`;
        if (this.config.app) {
          await appendTopicSeparationFailureLog(this.config.app, this.config.manifest, msg, error);
        }
        throw new Error(msg);
      }

      // 6. 세그먼트 간 링크 분석
      console.log('세그먼트 링크 분석 중...');
      let links: SegmentLink[];
      try {
        links = this.analyzeSegmentLinks(segments);
      } catch (error) {
        const msg = `세그먼트 링크 분석 실패: ${error instanceof Error ? error.message : String(error)}`;
        if (this.config.app) {
          await appendTopicSeparationFailureLog(this.config.app, this.config.manifest, msg, error);
        }
        throw new Error(msg);
      }

      return {
        segments,
        boundaries,
        links
      };
    } catch (error) {
      // 이미 로깅된 에러는 다시 로깅하지 않음
      if (error instanceof Error && error.message.includes('실패:')) {
        throw error;
      }

      // 예상치 못한 에러
      const msg = `주제 분리 중 예상치 못한 오류: ${error instanceof Error ? error.message : String(error)}`;
      if (this.config.app) {
        await appendTopicSeparationFailureLog(this.config.app, this.config.manifest, msg, error);
      }
      throw new Error(msg);
    }
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
    // 방어적 프로그래밍: 이론적으로 unreachable하지만 타입 안정성을 위해 유지
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
