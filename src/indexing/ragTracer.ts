// RAG 검색 트레이스 로거 - .rag_logs/trace.json 에 검색 메트릭 기록

import { existsSync, mkdirSync, readFileSync, writeFileSync, renameSync } from "fs";
import { dirname } from "path";

export interface RagTraceEntry {
  timestamp: string;
  query: string;
  vectorResults: Array<{ chunkId: string; rank: number; score: number }>;
  keywordResults: Array<{ chunkId: string; rank: number; score: number }>;
  rrfResults: Array<{ chunkId: string; rank: number; rrfScore: number }>;
}

const MAX_TRACE_ENTRIES = 1000;

/**
 * RAG 트레이스 엔트리를 trace.json 파일에 추가합니다.
 * 파일이 없으면 새로 생성하고, 최대 1000개 엔트리를 유지합니다.
 */
export function appendRagTrace(tracePath: string, entry: RagTraceEntry): void {
  try {
    mkdirSync(dirname(tracePath), { recursive: true });

    let traces: RagTraceEntry[] = [];
    if (existsSync(tracePath)) {
      try {
        const raw = readFileSync(tracePath, "utf-8");
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          traces = parsed as RagTraceEntry[];
        }
      } catch (parseError) {
        console.warn("RAG 트레이스 파일 파싱 실패, 새로 초기화합니다:", parseError);
        traces = [];
      }
    }

    traces.push(entry);

    // 최근 엔트리만 유지
    if (traces.length > MAX_TRACE_ENTRIES) {
      traces = traces.slice(traces.length - MAX_TRACE_ENTRIES);
    }

    const tempPath = `${tracePath}.tmp`;
    writeFileSync(tempPath, JSON.stringify(traces, null, 2), "utf-8");
    renameSync(tempPath, tracePath);
  } catch (error) {
    console.warn("RAG 트레이스 로그 기록 실패:", error);
  }
}
