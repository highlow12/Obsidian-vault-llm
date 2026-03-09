// RAG 검색 트레이스 로거 - log.txt 에 JSON 트레이스 기록

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname } from "path";

export interface RagTraceEntry {
  timestamp: string;
  query: string;
  executionTimeMs: number;
  requestedK: number;
  extractedKeywords?: string[];
  keywordQuery?: string;
  fuzzyQuery?: string;
  vectorResults: Array<{ chunkId: string; noteId: string; rank: number; score: number; text: string }>;
  keywordResults: Array<{ chunkId: string; noteId: string; rank: number; score: number; text: string }>;
  bm25Results?: Array<{ chunkId: string; noteId: string; rank: number; score: number; text: string }>;
  fuzzyResults?: Array<{ chunkId: string; noteId: string; rank: number; score: number; text: string }>;
  rrfResults: Array<{ chunkId: string; noteId: string; rank: number; rrfScore: number; text: string }>;
  finalResults: Array<{
    chunkId: string;
    noteId: string;
    rank: number;
    rrfScore: number;
    vectorScore?: number;
    keywordScore?: number;
    bm25Score?: number;
    fuzzyScore?: number;
    text: string;
  }>;
  stats: {
    vectorResultCount: number;
    keywordResultCount: number;
    bm25ResultCount?: number;
    fuzzyResultCount?: number;
    finalResultCount: number;
    overlapCount: number;
  };
}

/**
 * RAG 트레이스 엔트리를 log.txt 파일에 JSON 블록 형식으로 추가합니다.
 * 기존 텍스트 로그와 공존하도록 파일 앞부분에 prepend 합니다.
 *
 * 로그 항목:
 * - timestamp: 검색 실행 시간
 * - query: 사용자 쿼리
 * - executionTimeMs: 전체 검색 실행 시간 (밀리초)
 * - requestedK: 요청된 결과 개수
 * - extractedKeywords: 추출된 키워드 목록
 * - keywordQuery: 최종 키워드 쿼리 문자열
 * - vectorResults: 벡터 검색 결과 (상세 정보 포함)
 * - keywordResults: 키워드 검색 결과 (상세 정보 포함)
 * - rrfResults: RRF 병합 후 순위 (정렬됨)
 * - finalResults: 최종 반환 결과 (벡터/키워드 점수 포함)
 * - stats: 통계 (개수, 중복 등)
 */
export function appendRagTrace(tracePath: string, entry: RagTraceEntry): void {
  try {
    mkdirSync(dirname(tracePath), { recursive: true });
    const current = existsSync(tracePath) ? readFileSync(tracePath, "utf-8") : "";
    const jsonTrace = JSON.stringify(entry, null, 2);
    const block = `\n[${entry.timestamp}] [RAG JSON TRACE]\n${jsonTrace}\n---\n`;
    writeFileSync(tracePath, `${block}${current}`, "utf-8");
  } catch (error) {
    console.warn("RAG 트레이스 로그 기록 실패:", error);
  }
}
