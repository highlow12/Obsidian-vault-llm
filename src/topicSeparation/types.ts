/**
 * 주제 분리 관련 타입 정의
 */

export interface ConversationSegment {
  startIndex: number;
  endIndex: number;
  turns: any[];
  keywords: string[];
  avgSimilarity: number;
}

export interface TopicBoundary {
  index: number;
  similarity: number;
  isPrimaryBoundary: boolean;
}

export interface SegmentLink {
  fromSegment: number;
  toSegment: number;
  commonKeywords: string[];
  relevanceScore: number;
}

export interface TopicSeparationResult {
  segments: ConversationSegment[];
  boundaries: TopicBoundary[];
  links: SegmentLink[];
}
