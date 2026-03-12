// 하이브리드 검색 엔진 - 퍼지 검색으로 후보 생성 후 BM25로 관련성 재랭킹
// 벡터 검색을 통한 의미론적 유사도도 함께 활용합니다.

import { Indexer } from "./indexer";
import { Chunk, NoteMetadata, SearchFilter } from "./types";
import { parseSearchQuery } from "./searchFilterQuery";
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
  /** Obsidian API 검색 점수 (obsidianSearchFn을 사용할 때 포함) */
  obsidianScore?: number;
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
 * Obsidian API 기반 검색 함수 타입
 * 쿼리를 받아 관련성 순으로 정렬된 청크 배열을 반환합니다.
 * Obsidian의 prepareFuzzySearch 등을 활용하여 구현합니다.
 */
export type ObsidianSearchFn = (query: string) => Array<{ chunk: Chunk; score: number }>;

/**
 * 인덱서가 제공하는 선택적 확장 검색 기능 인터페이스
 */
interface ExtendedSearchCapable {
  bm25Search?(query: string, k?: number): Array<{ chunk: Chunk; score: number }>;
  fuzzySearch?(query: string, k?: number): Array<{ chunk: Chunk; score: number }>;
  bm25ScoreSubset?(query: string, chunkIds: string[]): Map<string, number>;
  vectorScoreSubset?(query: string, chunkIds: string[]): Promise<Map<string, number>>;
}

function normalizePath(path: string): string {
  return path.replace(/\\/g, "/").replace(/^\/+/, "").toLowerCase();
}

function getNestedValue(source: Record<string, unknown>, keyPath: string): unknown {
  const keys = keyPath.split(".").map((key) => key.trim()).filter((key) => key.length > 0);
  let current: unknown = source;

  for (const key of keys) {
    if (!current || typeof current !== "object" || Array.isArray(current)) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[key];
  }

  return current;
}

function toDateValue(value: unknown): Date | undefined {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value;
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? undefined : date;
  }

  if (typeof value === "string") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? undefined : date;
  }

  return undefined;
}

function isPrimitiveEqual(left: unknown, right: unknown): boolean {
  if (typeof left === "string" && typeof right === "string") {
    return left.toLowerCase() === right.toLowerCase();
  }
  return left === right;
}

function normalizeTag(tag: string): string {
  return tag.trim().replace(/^#/, "").toLowerCase();
}

function matchesTagHierarchy(noteTag: string, filterTag: string): boolean {
  const normalizedNoteTag = normalizeTag(noteTag);
  const normalizedFilterTag = normalizeTag(filterTag);

  return (
    normalizedNoteTag === normalizedFilterTag ||
    normalizedNoteTag.startsWith(`${normalizedFilterTag}/`)
  );
}

function matchesFilter(note: NoteMetadata, filter?: SearchFilter): boolean {
  if (!filter) {
    return true;
  }

  const normalizedNotePath = normalizePath(note.path);
  const includeFolders = (filter.folders ?? []).map((folder) => normalizePath(folder));
  const excludeFolders = (filter.excludedFolders ?? []).map((folder) => normalizePath(folder));
  const includeFiles = (filter.filePaths ?? []).map((file) => normalizePath(file));
  const excludeFiles = (filter.excludedFilePaths ?? []).map((file) => normalizePath(file));

  if (includeFolders.length > 0) {
    const matchesInclude = includeFolders.some(
      (folder) => normalizedNotePath === folder || normalizedNotePath.startsWith(`${folder}/`)
    );
    if (!matchesInclude) {
      return false;
    }
  }

  if (excludeFolders.length > 0) {
    const matchesExclude = excludeFolders.some(
      (folder) => normalizedNotePath === folder || normalizedNotePath.startsWith(`${folder}/`)
    );
    if (matchesExclude) {
      return false;
    }
  }

  if (includeFiles.length > 0) {
    const matchesIncludeFile = includeFiles.some(
      (file) => normalizedNotePath === file || normalizedNotePath.endsWith(`/${file}`)
    );
    if (!matchesIncludeFile) {
      return false;
    }
  }

  if (excludeFiles.length > 0) {
    const matchesExcludeFile = excludeFiles.some(
      (file) => normalizedNotePath === file || normalizedNotePath.endsWith(`/${file}`)
    );
    if (matchesExcludeFile) {
      return false;
    }
  }

  const normalizedNoteTags = note.tags.map((tag) => normalizeTag(tag));
  const normalizedFilterTags = (filter.tags ?? []).map((tag) => normalizeTag(tag));
  const normalizedExcludedTags = (filter.excludedTags ?? []).map((tag) => normalizeTag(tag));
  if (normalizedFilterTags.length > 0) {
    if (filter.tagOperator === "AND") {
      const hasAllTags = normalizedFilterTags.every((filterTag) =>
        normalizedNoteTags.some((noteTag) => matchesTagHierarchy(noteTag, filterTag))
      );
      if (!hasAllTags) {
        return false;
      }
    } else {
      const hasAnyTag = normalizedFilterTags.some((filterTag) =>
        normalizedNoteTags.some((noteTag) => matchesTagHierarchy(noteTag, filterTag))
      );
      if (!hasAnyTag) {
        return false;
      }
    }
  }

  if (normalizedExcludedTags.length > 0) {
    const hasExcludedTag = normalizedExcludedTags.some((excludedTag) =>
      normalizedNoteTags.some((noteTag) => matchesTagHierarchy(noteTag, excludedTag))
    );
    if (hasExcludedTag) {
      return false;
    }
  }

  if (filter.requiredProperties && filter.requiredProperties.length > 0) {
    for (const propName of filter.requiredProperties) {
      const value = getNestedValue(note.frontmatter, propName);
      if (value === undefined || value === null) {
        return false;
      }
    }
  }

  if (filter.excludedProperties && filter.excludedProperties.length > 0) {
    for (const propName of filter.excludedProperties) {
      const value = getNestedValue(note.frontmatter, propName);
      if (value !== undefined && value !== null) {
        return false;
      }
    }
  }

  if (filter.frontmatterOR) {
    for (const [keyPath, allowedValues] of Object.entries(filter.frontmatterOR)) {
      const actualValue = getNestedValue(note.frontmatter, keyPath);
      const anyMatch = allowedValues.some((allowed) => isPrimitiveEqual(actualValue, allowed));
      if (!anyMatch) {
        return false;
      }
    }
  }

  if (filter.excludedFrontmatterOR) {
    for (const [keyPath, excludedValues] of Object.entries(filter.excludedFrontmatterOR)) {
      const actualValue = getNestedValue(note.frontmatter, keyPath);
      const anyMatch = excludedValues.some((excluded) => isPrimitiveEqual(actualValue, excluded));
      if (anyMatch) {
        return false;
      }
    }
  }

  if (filter.frontmatterComparisons && filter.frontmatterComparisons.length > 0) {
    for (const comp of filter.frontmatterComparisons) {
      const actualValue = getNestedValue(note.frontmatter, comp.key);
      if (actualValue === undefined || actualValue === null) {
        // 속성이 없는 경우: excluded 비교는 통과, 포함 비교는 실패
        if (!comp.excluded) return false;
        continue;
      }
      const actualNum = Number(actualValue);
      const expectedNum = Number(comp.value);

      let conditionMet: boolean;
      if (!Number.isNaN(actualNum) && !Number.isNaN(expectedNum)) {
        // 숫자 비교
        if (comp.op === ">") conditionMet = actualNum > expectedNum;
        else if (comp.op === "<") conditionMet = actualNum < expectedNum;
        else if (comp.op === ">=") conditionMet = actualNum >= expectedNum;
        else if (comp.op === "<=") conditionMet = actualNum <= expectedNum;
        else conditionMet = actualNum !== expectedNum; // "!="
      } else {
        // 문자열 사전순 비교
        const actualStr = String(actualValue).toLowerCase();
        const expectedStr = String(comp.value).toLowerCase();
        if (comp.op === ">") conditionMet = actualStr > expectedStr;
        else if (comp.op === "<") conditionMet = actualStr < expectedStr;
        else if (comp.op === ">=") conditionMet = actualStr >= expectedStr;
        else if (comp.op === "<=") conditionMet = actualStr <= expectedStr;
        else conditionMet = actualStr !== expectedStr; // "!="
      }

      // excluded=true이면 조건에 해당하는 노트를 제외, false이면 해당 노트만 포함
      if (comp.excluded ? conditionMet : !conditionMet) {
        return false;
      }
    }
  }

  if (filter.frontmatter) {
    for (const [keyPath, expectedValue] of Object.entries(filter.frontmatter)) {
      const actualValue = getNestedValue(note.frontmatter, keyPath);
      if (!isPrimitiveEqual(actualValue, expectedValue)) {
        return false;
      }
    }
  }

  if (filter.excludedFrontmatter) {
    for (const [keyPath, excludedValue] of Object.entries(filter.excludedFrontmatter)) {
      const actualValue = getNestedValue(note.frontmatter, keyPath);
      if (isPrimitiveEqual(actualValue, excludedValue)) {
        return false;
      }
    }
  }

  if (filter.dateRange?.from || filter.dateRange?.to) {
    const frontmatterDate = getNestedValue(note.frontmatter, "date");
    const comparableDate = toDateValue(frontmatterDate) ?? new Date(note.updatedAt);
    if (Number.isNaN(comparableDate.getTime())) {
      return false;
    }

    if (filter.dateRange.from && comparableDate < filter.dateRange.from) {
      return false;
    }
    if (filter.dateRange.to && comparableDate > filter.dateRange.to) {
      return false;
    }
  }

  return true;
}

/**
 * 하이브리드 검색 엔진
 *
 * 검색 전략 (4단계 파이프라인):
 * - Phase 1 (후보 생성): Obsidian API 검색 또는 퍼지 검색(폴백)으로 넓은 후보군 수집
 * - Phase 2 (정확도 정렬): Obsidian 점수가 있으면 그대로 활용, 없으면 BM25로 재랭킹
 * - Phase 3 (의미론적 보완): 벡터 검색 결과를 병렬로 수행
 * - Phase 4 (최종 통합): 정확도 정렬 결과와 벡터 검색 결과를 RRF로 병합하여 최종 결과 생성
 */
export class SearchEngine {
  constructor(
    private readonly indexer: Indexer,
    private readonly traceLogPath?: string,
    private readonly onTrace?: (entry: RagTraceEntry) => void | Promise<void>,
    /**
     * Obsidian API 기반 검색 함수 (선택적)
     * 제공되면 퍼지 검색 대신 이 함수로 후보를 생성합니다.
     * Obsidian의 prepareFuzzySearch 등을 활용할 수 있습니다.
     */
    private readonly obsidianSearchFn?: ObsidianSearchFn
  ) {}

  /**
   * 하이브리드 검색 수행
   *
   * Phase 1 - 후보 생성 (Obsidian API 검색 우선, 퍼지 검색 폴백):
   *   Obsidian의 prepareFuzzySearch 등을 활용하거나, 트라이그램 기반 퍼지 검색으로
   *   넓은 후보군을 수집합니다.
   *
   * Phase 2 - 정확도 정렬:
   *   Obsidian 검색이 관련도 점수를 제공하면 그대로 활용합니다.
   *   점수가 없는 경우(또는 퍼지 검색 시) BM25로 관련성 재랭킹합니다.
   *
   * Phase 3 - 벡터 검색과 RRF 통합:
   *   정확도 정렬된 결과와 벡터 검색 결과를 RRF로 병합하여 최종 결과를 생성합니다.
   */
  async hybridSearch(
    query: string,
    k?: number,
    filter?: SearchFilter
  ): Promise<HybridSearchResult[]> {
    const startTime = performance.now();
    const topK = k ?? 8;
    const parsedQuery = parseSearchQuery(query);
    const semanticQuery = parsedQuery.query || query;
    const effectiveFilter = filter ?? parsedQuery.filter;

    // 의미 있는 명사 키워드 추출 (트레이스 로그용)
    const keywords = extractKeywords(semanticQuery);
    const keywordQuery = keywords.join(" OR ");

    // 검색 쿼리: 불용어 제거 후 남은 의미 있는 키워드만 사용
    // 키워드가 추출되지 않으면 원본 쿼리를 폴백으로 사용합니다.
    const fuzzyQuery = keywords.length > 0 ? keywords.join(" ") : semanticQuery;

    // 벡터 검색을 위한 임베딩 텍스트 생성
    const queryEmbeddingText = buildQueryEmbeddingText(semanticQuery);

    // 확장 검색 기능 사용 가능 여부 확인
    const extendedIndexer = this.indexer as unknown as ExtendedSearchCapable;
    const hasFuzzy = typeof extendedIndexer.fuzzySearch === "function";
    const hasBm25Subset = typeof extendedIndexer.bm25ScoreSubset === "function";
    const hasVectorSubset = typeof extendedIndexer.vectorScoreSubset === "function";

    const candidateK = topK * FUZZY_CANDIDATE_MULTIPLIER;

    // Phase 1: 후보 생성 - Obsidian API 검색 또는 퍼지 검색(폴백)
    // Obsidian API는 prepareFuzzySearch 등을 활용하여 관련도 점수를 제공할 수 있습니다.
    let rawCandidates: Array<{ chunk: Chunk; score: number }> = [];
    let obsidianScoreByChunkId: Map<string, number> | undefined;
    let fuzzyScoreByChunkId: Map<string, number> | undefined;

    if (this.obsidianSearchFn) {
      // Obsidian API 검색으로 후보 생성 (퍼지 검색 대체)
      const obsidianResults = this.obsidianSearchFn(query);
      rawCandidates = obsidianResults;

      // Obsidian이 의미 있는 점수를 반환한 경우 별도 추적.
      // Obsidian의 prepareFuzzySearch는 매칭 시 양수 점수를 반환합니다.
      // 모든 점수가 0이면 매칭 결과가 없거나 관련도 정렬을 제공하지 않는 것으로 간주하며,
      // 이 경우 Phase 2에서 BM25 재랭킹을 적용합니다.
      if (obsidianResults.some((r) => r.score !== 0)) {
        obsidianScoreByChunkId = new Map(obsidianResults.map((r) => [r.chunk.id, r.score]));
      }
    } else if (hasFuzzy) {
      // 폴백: 트라이그램 기반 퍼지 검색
      rawCandidates = extendedIndexer.fuzzySearch!(fuzzyQuery, candidateK);
      if (rawCandidates.length > 0) {
        fuzzyScoreByChunkId = new Map(rawCandidates.map((r) => [r.chunk.id, r.score]));
      }
    }

    if (effectiveFilter) {
      rawCandidates = this.indexer
        .getSearchResultsWithMetadata(rawCandidates)
        .filter((result) => matchesFilter(result.note, effectiveFilter))
        .map((result) => ({ chunk: result.chunk, score: result.score }));
    }

    // Phase 2: 정확도 정렬
    // - Obsidian 점수가 있으면 이미 정확도 순으로 정렬되어 있으므로 그대로 사용
    // - 점수가 없거나(또는 퍼지 검색 사용 시) BM25로 재랭킹하여 관련성을 확보
    let sortedCandidates: Array<{ chunk: Chunk; score: number }> = [];
    let bm25ScoreByChunkId: Map<string, number> | undefined;

    if (obsidianScoreByChunkId) {
      // Obsidian이 관련도 점수 제공 → 이미 정렬됨, 그대로 사용
      sortedCandidates = rawCandidates;
    } else if (rawCandidates.length > 0 && hasBm25Subset) {
      // Obsidian 점수 없음 또는 퍼지 검색 → BM25로 관련성 재랭킹
      const candidateChunkIds = rawCandidates.map((r) => r.chunk.id);
      const bm25ScoreMap = extendedIndexer.bm25ScoreSubset!(semanticQuery, candidateChunkIds);
      bm25ScoreByChunkId = bm25ScoreMap;

      // BM25 점수가 있는 후보 → BM25 점수 기준 정렬
      // BM25 점수가 없는 후보(쿼리와 관련 없음)는 뒤에 배치
      sortedCandidates = rawCandidates
        .map((r) => ({
          chunk: r.chunk,
          score: bm25ScoreMap.get(r.chunk.id) ?? 0,
        }))
        .sort((a, b) => b.score - a.score);
    } else {
      sortedCandidates = rawCandidates;
    }

    // Phase 3: 벡터 검색 수행
    // Obsidian 1차 결과가 있으면 해당 후보군 내부에서만 벡터 점수를 계산합니다.
    let vectorResults: Array<{ chunk: Chunk; score: number }> = [];
    const candidateChunkIdsForVector = sortedCandidates.map((r) => r.chunk.id);

    if (candidateChunkIdsForVector.length > 0 && hasVectorSubset) {
      const vectorScoreMap = await extendedIndexer.vectorScoreSubset!(
        queryEmbeddingText,
        candidateChunkIdsForVector
      );

      const candidateChunkById = new Map(sortedCandidates.map((r) => [r.chunk.id, r.chunk]));
      vectorResults = candidateChunkIdsForVector
        .map((id) => {
          const chunk = candidateChunkById.get(id);
          const score = vectorScoreMap.get(id);
          if (!chunk || score === undefined) {
            return null;
          }
          return { chunk, score };
        })
        .filter((r): r is { chunk: Chunk; score: number } => r !== null)
        .sort((a, b) => b.score - a.score)
        .slice(0, candidateK);
    } else {
      vectorResults = await this.indexer.search(queryEmbeddingText, candidateK);
      if (effectiveFilter) {
        vectorResults = this.indexer
          .getSearchResultsWithMetadata(vectorResults)
          .filter((result) => matchesFilter(result.note, effectiveFilter))
          .map((result) => ({ chunk: result.chunk, score: result.score }));
      }
    }

    // Phase 4: 정확도 정렬 결과와 벡터 검색 결과를 RRF로 통합
    const primaryRanks = new Map<string, number>(
      sortedCandidates.map((r, i) => [r.chunk.id, i + 1])
    );
    const vectorRanks = new Map<string, number>(
      vectorResults.map((r, i) => [r.chunk.id, i + 1])
    );

    const nonEmptyRankMaps = [primaryRanks, vectorRanks].filter((m) => m.size > 0);
    const rrfScores = computeMultiRRF(nonEmptyRankMaps);

    // RRF 점수 기준 정렬 후 상위 topK 선택
    const sortedEntries = Array.from(rrfScores.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, topK);

    // chunk 객체 조회를 위한 맵 구성
    const chunkMap = new Map<string, Chunk>();
    for (const r of rawCandidates) {
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
    const vectorScoreByChunkId = new Map(
      vectorResults.map((r) => [r.chunk.id, r.score])
    );

    const hybridResults: HybridSearchResult[] = withMeta.map((r) => ({
      chunk: r.chunk,
      note: r.note,
      score: r.score,
      vectorScore: vectorScoreByChunkId.get(r.chunk.id),
      obsidianScore: obsidianScoreByChunkId?.get(r.chunk.id),
      bm25Score: bm25ScoreByChunkId?.get(r.chunk.id) || undefined,
      fuzzyScore: fuzzyScoreByChunkId?.get(r.chunk.id),
    }));

    // 중복 청크 계산 (2개 이상의 검색 소스에 나타난 청크)
    const candidateSet = new Set(rawCandidates.map((r) => r.chunk.id));
    const vectorSet = new Set(vectorResults.map((r) => r.chunk.id));
    const overlapChunkIds = new Set([...candidateSet].filter((id) => vectorSet.has(id)));

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
      // rawCandidates는 Obsidian 또는 퍼지 검색 결과
      fuzzyResults: rawCandidates.length > 0
        ? rawCandidates.map((r, i) => ({
            chunkId: r.chunk.id,
            noteId: r.chunk.noteId,
            rank: i + 1,
            score: r.score,
            text: r.chunk.text,
          }))
        : undefined,
      // BM25 재랭킹 결과 (BM25를 적용한 경우에만 기록)
      bm25Results: bm25ScoreByChunkId && sortedCandidates.length > 0
        ? sortedCandidates.map((r, i) => ({
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
        fuzzyResultCount: rawCandidates.length > 0 ? rawCandidates.length : undefined,
        bm25ResultCount: bm25ScoreByChunkId && sortedCandidates.length > 0 ? sortedCandidates.length : undefined,
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

