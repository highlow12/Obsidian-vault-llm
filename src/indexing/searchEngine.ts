// 하이브리드 검색 엔진 - 벡터 검색과 키워드 검색을 병렬 수행 후 RRF로 결과 병합

import { Indexer } from "./indexer";
import { Chunk, NoteMetadata } from "./types";
import { extractKeywords } from "../topicSeparation/keywordExtractor";
import { appendRagTrace } from "./ragTracer";

export interface HybridSearchResult {
  chunk: Chunk;
  note: NoteMetadata;
  score: number;
  vectorScore?: number;
  keywordScore?: number;
}

/**
 * Reciprocal Rank Fusion 상수 (k=60)
 * RRF(d) = Σ_{S ∈ {V, K}} 1/(k + rank_S(d))
 */
export const RRF_K = 60;

/**
 * RRF 점수 계산 전 더 많은 후보를 가져오기 위한 배수
 * 최종 topK보다 많은 결과를 검색하여 RRF 병합 후 상위 K개를 선택합니다.
 */
const PRE_RRF_MULTIPLIER = 2;

/**
 * RRF 점수를 계산합니다.
 * @param vectorRanks 벡터 검색 결과의 chunkId -> 1-based rank 맵
 * @param keywordRanks 키워드 검색 결과의 chunkId -> 1-based rank 맵
 * @param k RRF 상수 (기본값 60)
 * @returns chunkId -> RRF 합산 점수 맵
 */
export function computeRRF(
  vectorRanks: Map<string, number>,
  keywordRanks: Map<string, number>,
  k: number = RRF_K
): Map<string, number> {
  const scores = new Map<string, number>();

  for (const [id, rank] of vectorRanks) {
    scores.set(id, (scores.get(id) ?? 0) + 1 / (k + rank));
  }

  for (const [id, rank] of keywordRanks) {
    scores.set(id, (scores.get(id) ?? 0) + 1 / (k + rank));
  }

  return scores;
}

/**
 * 하이브리드 검색 엔진
 * 벡터 검색과 키워드 검색을 병렬 수행하고 RRF 알고리즘으로 결과를 병합합니다.
 */
export class SearchEngine {
  constructor(
    private readonly indexer: Indexer,
    private readonly traceLogPath?: string
  ) {}

  /**
   * 하이브리드 검색 수행
   * 벡터 검색과 키워드 검색을 병렬로 실행하고 RRF로 결과를 병합합니다.
   */
  async hybridSearch(
    query: string,
    k?: number
  ): Promise<HybridSearchResult[]> {
    const topK = k ?? 8;

    // 키워드 추출 및 OR 쿼리 구성
    const keywords = extractKeywords(query);
    const keywordQuery = keywords.join(" OR ");

    // 벡터 검색과 키워드 검색 병렬 수행 (RRF 병합 후 topK 선택을 위해 더 많은 후보 수집)
    const candidateK = topK * PRE_RRF_MULTIPLIER;
    const [vectorResults, keywordResults] = await Promise.all([
      this.indexer.search(query, candidateK),
      Promise.resolve(
        keywordQuery.length > 0
          ? this.indexer.keywordSearch(keywordQuery, candidateK)
          : []
      ),
    ]);

    // RRF 입력용 rank 맵 구성 (1-based)
    const vectorRanks = new Map<string, number>(
      vectorResults.map((r, i) => [r.chunk.id, i + 1])
    );
    const keywordRanks = new Map<string, number>(
      keywordResults.map((r, i) => [r.chunk.id, i + 1])
    );

    // RRF 점수 계산
    const rrfScores = computeRRF(vectorRanks, keywordRanks);

    // RRF 점수 기준 정렬 후 상위 topK 선택
    const sortedEntries = Array.from(rrfScores.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, topK);

    // chunk 객체 조회를 위한 맵 구성
    const chunkMap = new Map<string, Chunk>();
    for (const r of vectorResults) {
      chunkMap.set(r.chunk.id, r.chunk);
    }
    for (const r of keywordResults) {
      if (!chunkMap.has(r.chunk.id)) {
        chunkMap.set(r.chunk.id, r.chunk);
      }
    }

    // RRF 결과를 기존 getSearchResultsWithMetadata 형식으로 변환
    const rrfChunkResults = sortedEntries
      .map(([id, rrfScore]) => {
        const chunk = chunkMap.get(id);
        if (!chunk) return null;
        return { chunk, score: rrfScore };
      })
      .filter((r): r is { chunk: Chunk; score: number } => r !== null);

    const withMeta = this.indexer.getSearchResultsWithMetadata(rrfChunkResults);

    // 최종 결과 조합 (score 필드에 rrfScore 사용)
    const hybridResults: HybridSearchResult[] = withMeta.map((r) => {
      const vectorEntry = vectorResults.find((v) => v.chunk.id === r.chunk.id);
      const keywordEntry = keywordResults.find((kw) => kw.chunk.id === r.chunk.id);
      return {
        chunk: r.chunk,
        note: r.note,
        score: r.score,
        vectorScore: vectorEntry?.score,
        keywordScore: keywordEntry?.score,
      };
    });

    // P4: 트레이스 로그 기록
    if (this.traceLogPath) {
      appendRagTrace(this.traceLogPath, {
        timestamp: new Date().toISOString(),
        query,
        vectorResults: vectorResults.map((r, i) => ({
          chunkId: r.chunk.id,
          rank: i + 1,
          score: r.score,
        })),
        keywordResults: keywordResults.map((r, i) => ({
          chunkId: r.chunk.id,
          rank: i + 1,
          score: r.score,
        })),
        rrfResults: sortedEntries.map(([id, rrfScore], i) => ({
          chunkId: id,
          rank: i + 1,
          rrfScore,
        })),
      });
    }

    return hybridResults;
  }
}
