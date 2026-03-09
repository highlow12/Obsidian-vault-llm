// 하이브리드 검색 엔진 - 퍼지 검색으로 후보 생성 후 BM25로 관련성 재랭킹
// 벡터 검색을 통한 의미론적 유사도도 함께 활용합니다.

import { Indexer } from "./indexer";
import { Chunk, NoteMetadata } from "./types";
import { extractKeywords } from "../topicSeparation/keywordExtractor";
import { buildQueryEmbeddingText } from "./queryKeywordEmbedding";
import { appendRagTrace, RagTraceEntry } from "./ragTracer";

export interface HybridSearchResult {
  chunk: Chunk;
  note: NoteMetadata;
  score: number;
  vectorScore?: number;
  keywordScore?: number;
  bm25Score?: number;
  fuzzyScore?: number;
}

/**
 * Reciprocal Rank Fusion 상수 (k=60)
 * RRF(d) = Σ_{S ∈ {V, K}} 1/(k + rank_S(d))
 */
export const RRF_K = 60;

/**
 * 퍼지 검색으로 후보를 생성할 때의 배수
 * 최종 topK보다 많은 후보를 퍼지 검색으로 수집하여 BM25 재랭킹에 활용합니다.
 */
const FUZZY_CANDIDATE_MULTIPLIER = 5;

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
 * 다중 소스 RRF 점수를 계산합니다.
 * 여러 검색 소스(벡터, BM25, 퍼지 등)의 랭크를 결합합니다.
 * @param rankMaps 각 검색 소스의 chunkId -> 1-based rank 맵 배열
 * @param k RRF 상수 (기본값 60)
 * @returns chunkId -> RRF 합산 점수 맵
 */
export function computeMultiRRF(
  rankMaps: Map<string, number>[],
  k: number = RRF_K
): Map<string, number> {
  const scores = new Map<string, number>();

  for (const rankMap of rankMaps) {
    for (const [id, rank] of rankMap) {
      scores.set(id, (scores.get(id) ?? 0) + 1 / (k + rank));
    }
  }

  return scores;
}

/**
 * 인덱서가 제공하는 선택적 확장 검색 기능 인터페이스
 */
interface ExtendedSearchCapable {
  bm25Search?(query: string, k?: number): Array<{ chunk: Chunk; score: number }>;
  fuzzySearch?(query: string, k?: number): Array<{ chunk: Chunk; score: number }>;
  bm25ScoreSubset?(query: string, chunkIds: string[]): Map<string, number>;
}

/**
 * 하이브리드 검색 엔진
 *
 * 검색 전략 (2단계 파이프라인):
 * - Phase 1 (후보 생성): 퍼지 검색으로 오타/유사어를 허용하며 넓은 후보군 수집
 * - Phase 2 (관련성 확보): BM25로 후보군을 재랭킹하여 관련성이 높은 청크를 선별
 * - 보완: 벡터 검색을 통한 의미론적 유사도를 RRF로 통합
 */
export class SearchEngine {
  constructor(
    private readonly indexer: Indexer,
    private readonly traceLogPath?: string,
    private readonly onTrace?: (entry: RagTraceEntry) => void | Promise<void>
  ) {}

  /**
   * 하이브리드 검색 수행
   *
   * Phase 1 - 퍼지 검색으로 후보 생성:
   *   넓은 후보군을 수집하여 오타나 유사어도 포함시킵니다.
   *
   * Phase 2 - BM25로 관련성 재랭킹:
   *   퍼지 후보들에 대해 BM25 점수를 계산하여 관련성 순으로 정렬합니다.
   *
   * Phase 3 - 벡터 검색과 RRF 통합:
   *   BM25 재랭킹 결과와 벡터 검색 결과를 RRF로 병합하여 최종 결과를 생성합니다.
   */
  async hybridSearch(
    query: string,
    k?: number
  ): Promise<HybridSearchResult[]> {
    const startTime = performance.now();
    const topK = k ?? 8;

    // 의미 있는 명사 키워드 추출 (퍼지 검색 및 트레이스 로그용)
    const keywords = extractKeywords(query);
    const keywordQuery = keywords.join(" OR ");

    // 퍼지 검색 쿼리: 불용어 제거 후 남은 의미 있는 키워드만 사용
    // 키워드가 추출되지 않으면 원본 쿼리를 폴백으로 사용합니다.
    const fuzzyQuery = keywords.length > 0 ? keywords.join(" ") : query;

    // 벡터 검색을 위한 임베딩 텍스트 생성
    const queryEmbeddingText = buildQueryEmbeddingText(query);

    // 확장 검색 기능 사용 가능 여부 확인
    const extendedIndexer = this.indexer as unknown as ExtendedSearchCapable;
    const hasFuzzy = typeof extendedIndexer.fuzzySearch === "function";
    const hasBm25Subset = typeof extendedIndexer.bm25ScoreSubset === "function";

    // Phase 1: 퍼지 검색으로 넓은 후보군 생성
    // 의미 있는 키워드로 검색하여 오타·유사어를 허용하며 관련 후보를 수집합니다.
    const candidateK = topK * FUZZY_CANDIDATE_MULTIPLIER;
    const fuzzyResults = hasFuzzy
      ? extendedIndexer.fuzzySearch!(fuzzyQuery, candidateK)
      : [];

    // Phase 2: BM25로 후보군 관련성 재랭킹
    // 퍼지 후보 청크들에 대해서만 BM25 점수를 계산합니다.
    let bm25RankedCandidates: Array<{ chunk: Chunk; score: number }> = [];
    if (fuzzyResults.length > 0 && hasBm25Subset) {
      const candidateChunkIds = fuzzyResults.map((r) => r.chunk.id);
      const bm25ScoreMap = extendedIndexer.bm25ScoreSubset!(query, candidateChunkIds);

      // BM25 점수가 있는 후보 → BM25 점수 기준 정렬
      // BM25 점수가 없는 후보(쿼리와 관련 없음)는 뒤에 배치
      const withBm25 = fuzzyResults
        .map((r) => ({
          chunk: r.chunk,
          bm25Score: bm25ScoreMap.get(r.chunk.id) ?? 0,
          fuzzyScore: r.score,
        }))
        .sort((a, b) => b.bm25Score - a.bm25Score);

      bm25RankedCandidates = withBm25.map((r) => ({
        chunk: r.chunk,
        score: r.bm25Score,
      }));
    } else if (fuzzyResults.length > 0) {
      // BM25 점수 계산 기능이 없는 경우 퍼지 점수로 대체
      bm25RankedCandidates = fuzzyResults;
    }

    // Phase 3: 벡터 검색 병렬 수행 (의미론적 유사도 보완)
    const vectorResults = await this.indexer.search(queryEmbeddingText, candidateK);

    // Phase 4: BM25 재랭킹 결과와 벡터 검색 결과를 RRF로 통합
    const bm25Ranks = new Map<string, number>(
      bm25RankedCandidates.map((r, i) => [r.chunk.id, i + 1])
    );
    const vectorRanks = new Map<string, number>(
      vectorResults.map((r, i) => [r.chunk.id, i + 1])
    );

    const nonEmptyRankMaps = [bm25Ranks, vectorRanks].filter((m) => m.size > 0);
    const rrfScores = computeMultiRRF(nonEmptyRankMaps);

    // RRF 점수 기준 정렬 후 상위 topK 선택
    const sortedEntries = Array.from(rrfScores.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, topK);

    // chunk 객체 조회를 위한 맵 구성
    const chunkMap = new Map<string, Chunk>();
    for (const r of fuzzyResults) {
      chunkMap.set(r.chunk.id, r.chunk);
    }
    for (const r of vectorResults) {
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

    // 최종 결과 조합 (각 소스별 점수 포함)
    const bm25ScoreByChunkId = new Map(
      bm25RankedCandidates.map((r) => [r.chunk.id, r.score])
    );
    const fuzzyScoreByChunkId = new Map(
      fuzzyResults.map((r) => [r.chunk.id, r.score])
    );
    const vectorScoreByChunkId = new Map(
      vectorResults.map((r) => [r.chunk.id, r.score])
    );

    const hybridResults: HybridSearchResult[] = withMeta.map((r) => ({
      chunk: r.chunk,
      note: r.note,
      score: r.score,
      vectorScore: vectorScoreByChunkId.get(r.chunk.id),
      bm25Score: bm25ScoreByChunkId.get(r.chunk.id) || undefined,
      fuzzyScore: fuzzyScoreByChunkId.get(r.chunk.id),
    }));

    // 중복 청크 계산 (2개 이상의 검색 소스에 나타난 청크)
    const fuzzySet = new Set(fuzzyResults.map((r) => r.chunk.id));
    const vectorSet = new Set(vectorResults.map((r) => r.chunk.id));
    const overlapChunkIds = new Set([...fuzzySet].filter((id) => vectorSet.has(id)));

    // 상세한 트레이스 로그 기록
    const executionTimeMs = performance.now() - startTime;
    const traceEntry: RagTraceEntry = {
      timestamp: new Date().toISOString(),
      query,
      executionTimeMs,
      requestedK: topK,
      extractedKeywords: keywords,
      keywordQuery,
      fuzzyQuery,
      vectorResults: vectorResults.map((r, i) => ({
        chunkId: r.chunk.id,
        noteId: r.chunk.noteId,
        rank: i + 1,
        score: r.score,
        text: r.chunk.text,
      })),
      keywordResults: [],
      fuzzyResults: fuzzyResults.length > 0
        ? fuzzyResults.map((r, i) => ({
            chunkId: r.chunk.id,
            noteId: r.chunk.noteId,
            rank: i + 1,
            score: r.score,
            text: r.chunk.text,
          }))
        : undefined,
      bm25Results: bm25RankedCandidates.length > 0
        ? bm25RankedCandidates.map((r, i) => ({
            chunkId: r.chunk.id,
            noteId: r.chunk.noteId,
            rank: i + 1,
            score: r.score,
            text: r.chunk.text,
          }))
        : undefined,
      rrfResults: sortedEntries.map(([id, rrfScore], i) => {
        const chunk = chunkMap.get(id);
        return {
          chunkId: id,
          noteId: chunk?.noteId || "unknown",
          rank: i + 1,
          rrfScore,
          text: chunk?.text || "",
        };
      }),
      finalResults: hybridResults.map((r, i) => ({
        chunkId: r.chunk.id,
        noteId: r.chunk.noteId,
        rank: i + 1,
        rrfScore: r.score,
        vectorScore: r.vectorScore,
        bm25Score: r.bm25Score,
        fuzzyScore: r.fuzzyScore,
        text: r.chunk.text,
      })),
      stats: {
        vectorResultCount: vectorResults.length,
        keywordResultCount: 0,
        fuzzyResultCount: fuzzyResults.length > 0 ? fuzzyResults.length : undefined,
        bm25ResultCount: bm25RankedCandidates.length > 0 ? bm25RankedCandidates.length : undefined,
        finalResultCount: hybridResults.length,
        overlapCount: overlapChunkIds.size,
      },
    };

    if (this.traceLogPath) {
      appendRagTrace(this.traceLogPath, traceEntry);
    }

    if (this.onTrace) {
      await Promise.resolve(this.onTrace(traceEntry));
    }

    return hybridResults;
  }
}

