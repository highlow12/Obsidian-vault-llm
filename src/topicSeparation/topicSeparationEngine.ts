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

interface EmbeddingUnit {
  text: string;
  startTurnIndex: number;
  endTurnIndex: number;
}

export interface TopicSeparationConfig {
  apiKey: string;
  embeddingModel?: string; // 임베딩 모델 이름
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
      config.embeddingModel ?? 'embedding-001',
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

      // 1. 임베딩 단위 텍스트 준비 (턴 인덱스 매핑 포함)
      const embeddingUnits = this.prepareEmbeddingUnits(turns);
      const turnTexts = embeddingUnits.map(unit => unit.text);

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
        segments = this.createSegmentsFromUnits(turns, embeddingUnits, boundaries, similarities);
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
   * 텍스트의 마지막 N개 문장을 추출합니다
   */
  private getLastNSentences(text: string, n: number = 3): string {
    // 마침표, 느낌표, 물음표로 문장을 분리
    const sentences = text.split(/([.!?]+)/).filter(s => s.trim().length > 0);
    
    // 문장 쌍으로 구성 (문장 + 구두점)
    const sentenceList: string[] = [];
    for (let i = 0; i < sentences.length; i += 2) {
      if (i + 1 < sentences.length) {
        sentenceList.push(sentences[i] + sentences[i + 1]);
      } else if (i < sentences.length) {
        sentenceList.push(sentences[i]);
      }
    }
    
    // 마지막 N개 문장 추출
    const lastSentences = sentenceList.slice(-n);
    return lastSentences.join(' ').trim();
  }

  /**
   * 턴 텍스트를 준비합니다 (사용자 지정 형식)
   * 임베딩 입력 = [현재 질문과 그 답변의 키워드] + 이전 assistant 마지막 2~3문장 + 현재 질문 + 현재 assistant 마지막 2~3문장
   */
  private prepareEmbeddingUnits(turns: ConversationTurn[]): EmbeddingUnit[] {
    const result: EmbeddingUnit[] = [];
    
    for (let i = 0; i < turns.length; i++) {
      const turn = turns[i];
      let embeddingInput = '';
      
      // user-assistant 쌍을 이루도록 처리
      if (turn.role === 'user') {
        // 1. 현재 질문과 다음 답변(있다면)의 키워드 추출
        let combinedText = turn.content;
        let keywords: string[] = [];
        
        // 다음 턴이 assistant인지 확인
        if (i + 1 < turns.length && turns[i + 1].role === 'assistant') {
          const nextTurn = turns[i + 1];
          combinedText += ' ' + nextTurn.content;
          keywords = extractKeywords(combinedText);
        } else {
          keywords = extractKeywords(turn.content);
        }
        
        // 2. 이전 assistant 마지막 2~3문장 추출 (윈도우 오버랩)
        let previousAssistantOverlap = '';
        for (let j = i - 1; j >= 0; j--) {
          if (turns[j].role === 'assistant') {
            previousAssistantOverlap = this.getLastNSentences(turns[j].content, 3);
            break;
          }
        }
        
        // 3. 현재 질문
        const currentQuestion = turn.content;
        
        // 4. 현재 질문에 대한 assistant 답변의 마지막 2~3문장
        let currentAssistantOverlap = '';
        if (i + 1 < turns.length && turns[i + 1].role === 'assistant') {
          currentAssistantOverlap = this.getLastNSentences(turns[i + 1].content, 3);
        }
        
        // 모두 합치기
        const keywordStr = keywords.length > 0 ? `[키워드: ${keywords.join(', ')}]` : '';
        embeddingInput = [
          keywordStr,
          previousAssistantOverlap,
          currentQuestion,
          currentAssistantOverlap
        ]
          .filter(s => s.length > 0)
          .join(' ');
        
        result.push({
          text: embeddingInput,
          startTurnIndex: i,
          endTurnIndex: i + 1 < turns.length && turns[i + 1].role === 'assistant' ? i + 2 : i + 1
        });
        
        // assistant 턴은 건너뛰기 (user 턴에서 이미 처리됨)
        if (i + 1 < turns.length && turns[i + 1].role === 'assistant') {
          i++;
        }
      } else if (turn.role === 'assistant' && (i === 0 || turns[i - 1].role !== 'user')) {
        // user 쌍이 없는 독립적인 assistant 턴인 경우
        const keywords = extractKeywords(turn.content);
        const lastSentences = this.getLastNSentences(turn.content, 3);
        const keywordStr = keywords.length > 0 ? `[키워드: ${keywords.join(', ')}]` : '';
        
        embeddingInput = [keywordStr, lastSentences].filter(s => s.length > 0).join(' ');
        result.push({
          text: embeddingInput,
          startTurnIndex: i,
          endTurnIndex: i + 1
        });
      }
    }
    
    return result.length > 0
      ? result
      : turns.map((turn, index) => ({
          text: turn.content,
          startTurnIndex: index,
          endTurnIndex: index + 1
        }));
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
  private createSegmentsFromUnits(
    turns: ConversationTurn[],
    embeddingUnits: EmbeddingUnit[],
    boundaries: TopicBoundary[],
    similarities: number[]
  ): ConversationSegment[] {
    if (embeddingUnits.length === 0) {
      return [];
    }

    const segments: ConversationSegment[] = [];
    const boundaryIndices = Array.from(
      new Set(
        boundaries
          .map(b => b.index)
          .filter(index => index > 0 && index < embeddingUnits.length)
      )
    ).sort((a, b) => a - b);
    const minSegmentLength = this.config.minSegmentLength!;

    let startUnitIndex = 0;
    for (const boundaryUnitIndex of boundaryIndices) {
      if (boundaryUnitIndex <= startUnitIndex) {
        continue;
      }

      const startTurnIndex = embeddingUnits[startUnitIndex].startTurnIndex;
      const endTurnIndex = embeddingUnits[boundaryUnitIndex - 1].endTurnIndex;

      if (endTurnIndex - startTurnIndex >= minSegmentLength) {
        const segmentTurns = turns.slice(startTurnIndex, endTurnIndex);
        const keywords = this.extractSegmentKeywords(segmentTurns);
        const avgSimilarity = this.calculateAverageSimilarityByUnits(
          similarities,
          startUnitIndex,
          boundaryUnitIndex
        );

        segments.push({
          startIndex: startTurnIndex,
          endIndex: endTurnIndex,
          turns: segmentTurns,
          keywords,
          avgSimilarity
        });

        startUnitIndex = boundaryUnitIndex;
      }
    }

    // 마지막 세그먼트
    const finalStartTurnIndex = embeddingUnits[startUnitIndex].startTurnIndex;
    const finalEndTurnIndex = embeddingUnits[embeddingUnits.length - 1].endTurnIndex;
    if (finalStartTurnIndex < finalEndTurnIndex) {
      const segmentTurns = turns.slice(finalStartTurnIndex, finalEndTurnIndex);
      const keywords = this.extractSegmentKeywords(segmentTurns);
      const avgSimilarity = this.calculateAverageSimilarityByUnits(
        similarities,
        startUnitIndex,
        embeddingUnits.length
      );

      segments.push({
        startIndex: finalStartTurnIndex,
        endIndex: finalEndTurnIndex,
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
  private calculateAverageSimilarityByUnits(
    similarities: number[],
    startUnitIndex: number,
    endUnitIndex: number
  ): number {
    if (startUnitIndex >= endUnitIndex - 1) {
      return 1.0;
    }

    const relevantSimilarities = similarities.slice(
      startUnitIndex,
      Math.min(endUnitIndex - 1, similarities.length)
    );
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
