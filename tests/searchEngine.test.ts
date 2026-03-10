import { test } from "node:test";
import assert from "node:assert";
import { computeRRF, RRF_K, SearchEngine, HybridSearchResult, ObsidianSearchFn } from "../src/indexing/searchEngine.js";
import { Chunk, NoteMetadata } from "../src/indexing/types.js";

// ============= computeRRF 테스트 =============

test("computeRRF - 벡터 검색 결과만 있을 때 점수 계산", () => {
  const vectorRanks = new Map([
    ["chunk-1", 1],
    ["chunk-2", 2],
    ["chunk-3", 3],
  ]);
  const keywordRanks = new Map<string, number>();

  const scores = computeRRF(vectorRanks, keywordRanks);

  assert.strictEqual(scores.size, 3);
  // rank 1: 1/(60+1), rank 2: 1/(60+2), rank 3: 1/(60+3)
  assert.ok((scores.get("chunk-1") ?? 0) > (scores.get("chunk-2") ?? 0));
  assert.ok((scores.get("chunk-2") ?? 0) > (scores.get("chunk-3") ?? 0));
});

test("computeRRF - 키워드 검색 결과만 있을 때 점수 계산", () => {
  const vectorRanks = new Map<string, number>();
  const keywordRanks = new Map([
    ["chunk-a", 1],
    ["chunk-b", 2],
  ]);

  const scores = computeRRF(vectorRanks, keywordRanks);

  assert.strictEqual(scores.size, 2);
  assert.ok((scores.get("chunk-a") ?? 0) > (scores.get("chunk-b") ?? 0));
});

test("computeRRF - 두 검색 결과에 모두 나타나는 청크는 점수가 합산됨", () => {
  const vectorRanks = new Map([["chunk-overlap", 1], ["chunk-vector-only", 2]]);
  const keywordRanks = new Map([["chunk-overlap", 1], ["chunk-keyword-only", 2]]);

  const scores = computeRRF(vectorRanks, keywordRanks);

  // chunk-overlap은 두 소스에서 rank 1이므로 점수가 두 배
  const overlapScore = scores.get("chunk-overlap") ?? 0;
  const vectorOnlyScore = scores.get("chunk-vector-only") ?? 0;
  const keywordOnlyScore = scores.get("chunk-keyword-only") ?? 0;

  // 두 리스트 모두 rank 1: 2/(60+1)
  assert.ok(overlapScore > vectorOnlyScore, "중복 청크 점수가 벡터 전용 점수보다 높아야 함");
  assert.ok(overlapScore > keywordOnlyScore, "중복 청크 점수가 키워드 전용 점수보다 높아야 함");
});

test("computeRRF - RRF 점수 공식 검증 (k=60)", () => {
  const vectorRanks = new Map([["chunk-1", 1]]);
  const keywordRanks = new Map([["chunk-1", 1]]);

  const scores = computeRRF(vectorRanks, keywordRanks);

  const expected = 1 / (RRF_K + 1) + 1 / (RRF_K + 1);
  const actual = scores.get("chunk-1") ?? 0;

  assert.ok(Math.abs(actual - expected) < 1e-10, `기대값: ${expected}, 실제값: ${actual}`);
});

test("computeRRF - 사용자 정의 k값 적용", () => {
  const vectorRanks = new Map([["chunk-1", 1]]);
  const keywordRanks = new Map<string, number>();

  const scores = computeRRF(vectorRanks, keywordRanks, 10);

  const expected = 1 / (10 + 1);
  const actual = scores.get("chunk-1") ?? 0;

  assert.ok(Math.abs(actual - expected) < 1e-10, `기대값: ${expected}, 실제값: ${actual}`);
});

test("computeRRF - 빈 입력에서 빈 결과 반환", () => {
  const scores = computeRRF(new Map(), new Map());
  assert.strictEqual(scores.size, 0);
});

// ============= SearchEngine.hybridSearch() 테스트 =============

// 테스트용 모킹된 Indexer 클래스
class MockIndexer {
  private vectorResults: Array<{ chunk: Chunk; score: number }> = [];
  private keywordResults: Array<{ chunk: Chunk; score: number }> = [];
  private fuzzyResultsData: Array<{ chunk: Chunk; score: number }> = [];
  private bm25SubsetMap: Map<string, number> = new Map();

  setVectorResults(results: Array<{ chunk: Chunk; score: number }>) {
    this.vectorResults = results;
  }

  setKeywordResults(results: Array<{ chunk: Chunk; score: number }>) {
    this.keywordResults = results;
  }

  setFuzzyResults(results: Array<{ chunk: Chunk; score: number }>) {
    this.fuzzyResultsData = results;
  }

  setBm25SubsetScores(scores: Map<string, number>) {
    this.bm25SubsetMap = scores;
  }

  async search(query: string, k?: number): Promise<Array<{ chunk: Chunk; score: number }>> {
    return this.vectorResults.slice(0, k);
  }

  keywordSearch(query: string, k?: number): Array<{ chunk: Chunk; score: number }> {
    return this.keywordResults.slice(0, k);
  }

  fuzzySearch(query: string, k?: number): Array<{ chunk: Chunk; score: number }> {
    return this.fuzzyResultsData.slice(0, k);
  }

  bm25ScoreSubset(query: string, chunkIds: string[]): Map<string, number> {
    // 요청된 chunkIds 중 bm25SubsetMap에 있는 것만 반환
    const result = new Map<string, number>();
    for (const id of chunkIds) {
      const score = this.bm25SubsetMap.get(id);
      if (score !== undefined) {
        result.set(id, score);
      }
    }
    return result;
  }

  getSearchResultsWithMetadata(
    results: Array<{ chunk: Chunk; score: number }>
  ): Array<{ chunk: Chunk; note: NoteMetadata; score: number }> {
    return results.map((r) => ({
      chunk: r.chunk,
      note: this.createMockNote(r.chunk.noteId),
      score: r.score,
    }));
  }

  private createMockNote(noteId: string): NoteMetadata {
    return {
      id: noteId,
      path: `/note-${noteId}.md`,
      title: `Note ${noteId}`,
      tags: ["test"],
      links: [],
      frontmatter: {},
      updatedAt: Date.now(),
      hash: "hash-" + noteId,
    };
  }
}

// 테스트용 청크 생성 헬퍼
function createChunk(
  id: string,
  noteId: string,
  text: string,
  section: string = "section-1"
): Chunk {
  return {
    id,
    noteId,
    text,
    position: 0,
    tokenCount: text.length,
    section,
  };
}

test("SearchEngine.hybridSearch - 벡터와 키워드 검색 결과가 모두 있을 때 RRF로 병합", async () => {
  const mockIndexer = new MockIndexer() as any;

  // 벡터 검색 결과
  const vectorChunk1 = createChunk("v1", "note1", "벡터 검색 가장 관련성 높음");
  const vectorChunk2 = createChunk("v2", "note2", "벡터 검색 두 번째");
  mockIndexer.setVectorResults([
    { chunk: vectorChunk1, score: 0.95 },
    { chunk: vectorChunk2, score: 0.85 },
  ]);

  // 퍼지 검색 결과 (후보 생성)
  const fuzzyChunk1 = createChunk("k1", "note1", "키워드 매칭됨");
  const fuzzyChunk2 = createChunk("k2", "note3", "키워드 매칭");
  mockIndexer.setFuzzyResults([
    { chunk: fuzzyChunk1, score: 0.8 },
    { chunk: fuzzyChunk2, score: 0.6 },
  ]);
  // BM25 점수 (관련성 재랭킹)
  mockIndexer.setBm25SubsetScores(new Map([["k1", 2.5], ["k2", 1.0]]));

  const searchEngine = new SearchEngine(mockIndexer);
  const results = await searchEngine.hybridSearch("test query", 2);

  assert.strictEqual(results.length, 2, "예상 결과 개수는 2개");
  assert.ok(results[0].score > 0, "결과에 RRF 점수 포함");
  assert.ok(results[0].note, "결과에 메타데이터 포함");
});

test("SearchEngine.hybridSearch - 벡터 검색 결과만 있을 때", async () => {
  const mockIndexer = new MockIndexer() as any;

  const chunk1 = createChunk("v1", "note1", "벡터 결과만 있음");
  const chunk2 = createChunk("v2", "note2", "두 번째 벡터 결과");
  mockIndexer.setVectorResults([
    { chunk: chunk1, score: 0.9 },
    { chunk: chunk2, score: 0.7 },
  ]);
  mockIndexer.setFuzzyResults([]);

  const searchEngine = new SearchEngine(mockIndexer);
  const results = await searchEngine.hybridSearch("test", 2);

  assert.strictEqual(results.length, 2, "벡터 검색 결과 개수 반환");
  assert.strictEqual(results[0].chunk.id, "v1", "상위 결과가 벡터 순서대로 정렬");
});

test("SearchEngine.hybridSearch - 퍼지 검색 결과만 있을 때 (BM25 재랭킹)", async () => {
  const mockIndexer = new MockIndexer() as any;

  mockIndexer.setVectorResults([]);

  const chunk1 = createChunk("f1", "note1", "퍼지 결과만 있음");
  const chunk2 = createChunk("f2", "note2", "두 번째 퍼지 결과");
  mockIndexer.setFuzzyResults([
    { chunk: chunk1, score: 0.8 },
    { chunk: chunk2, score: 0.6 },
  ]);
  // BM25 점수: f2가 더 높음 → BM25 재랭킹 후 f2가 앞으로
  mockIndexer.setBm25SubsetScores(new Map([["f1", 1.0], ["f2", 3.5]]));

  const searchEngine = new SearchEngine(mockIndexer);
  const results = await searchEngine.hybridSearch("test", 2);

  assert.strictEqual(results.length, 2, "퍼지 검색 결과 개수 반환");
  // BM25 점수가 높은 f2가 최상위에 위치해야 함
  assert.strictEqual(results[0].chunk.id, "f2", "BM25 재랭킹 후 높은 점수 청크가 앞에");
});

test("SearchEngine.hybridSearch - 중복된 청크는 RRF 점수가 높음", async () => {
  const mockIndexer = new MockIndexer() as any;

  // 동일한 청크가 퍼지와 벡터 검색에서 모두 나타남
  const overlappingChunk = createChunk("overlap", "note1", "중복 청크");
  const vectorOnlyChunk = createChunk("vector-only", "note2", "벡터만");
  const fuzzyOnlyChunk = createChunk("fuzzy-only", "note3", "퍼지만");

  mockIndexer.setVectorResults([
    { chunk: overlappingChunk, score: 0.9 },
    { chunk: vectorOnlyChunk, score: 0.7 },
  ]);

  mockIndexer.setFuzzyResults([
    { chunk: overlappingChunk, score: 0.8 },
    { chunk: fuzzyOnlyChunk, score: 0.6 },
  ]);
  // BM25 점수: 두 후보 모두에 점수 부여
  mockIndexer.setBm25SubsetScores(new Map([["overlap", 2.0], ["fuzzy-only", 1.0]]));

  const searchEngine = new SearchEngine(mockIndexer);
  const results = await searchEngine.hybridSearch("test", 3);

  // 중복 청크(벡터+BM25 재랭킹 결과)가 최상위에 있어야 함
  assert.strictEqual(results[0].chunk.id, "overlap", "중복 청크가 최상위 순위");
});

test("SearchEngine.hybridSearch - 커스텀 k값 적용", async () => {
  const mockIndexer = new MockIndexer() as any;

  const chunks = Array.from({ length: 5 }, (_, i) =>
    createChunk(`chunk-${i}`, `note${i}`, `내용 ${i}`)
  );

  mockIndexer.setVectorResults(
    chunks.map((chunk, i) => ({ chunk, score: 0.9 - i * 0.1 }))
  );
  mockIndexer.setFuzzyResults([]);

  const searchEngine = new SearchEngine(mockIndexer);

  // k=3으로 지정하면 최대 3개 결과만 반환
  const results = await searchEngine.hybridSearch("test", 3);
  assert.strictEqual(results.length, 3, "k=3일 때 최대 3개 결과만 반환");

  // k=10이면 더 많은 후보에서 선택
  const moreResults = await searchEngine.hybridSearch("test", 10);
  assert.ok(moreResults.length <= 5, "사용 가능한 결과보다 많이 요청해도 초과하지 않음");
});

test("SearchEngine.hybridSearch - 빈 검색 결과", async () => {
  const mockIndexer = new MockIndexer() as any;

  mockIndexer.setVectorResults([]);
  mockIndexer.setFuzzyResults([]);

  const searchEngine = new SearchEngine(mockIndexer);
  const results = await searchEngine.hybridSearch("없음", 8);

  assert.strictEqual(results.length, 0, "검색 결과가 없을 때 빈 배열 반환");
});

test("SearchEngine.hybridSearch - vectorScore와 fuzzyScore, bm25Score 포함", async () => {
  const mockIndexer = new MockIndexer() as any;

  const chunk = createChunk("test", "note1", "테스트");
  mockIndexer.setVectorResults([{ chunk, score: 0.95 }]);
  mockIndexer.setFuzzyResults([{ chunk, score: 0.8 }]);
  mockIndexer.setBm25SubsetScores(new Map([["test", 2.5]]));

  const searchEngine = new SearchEngine(mockIndexer);
  const results = await searchEngine.hybridSearch("test", 1);

  assert.strictEqual(results.length, 1);
  assert.strictEqual(results[0].vectorScore, 0.95, "벡터 점수 포함");
  assert.strictEqual(results[0].fuzzyScore, 0.8, "퍼지 점수 포함");
  assert.ok((results[0].bm25Score ?? 0) > 0, "BM25 점수 포함");
});

test("SearchEngine.hybridSearch - 기본 k값은 8", async () => {
  const mockIndexer = new MockIndexer() as any;

  const chunks = Array.from({ length: 20 }, (_, i) =>
    createChunk(`chunk-${i}`, `note${i}`, `내용 ${i}`)
  );

  mockIndexer.setVectorResults(
    chunks.map((chunk, i) => ({ chunk, score: 0.9 - i * 0.01 }))
  );
  mockIndexer.setFuzzyResults([]);

  const searchEngine = new SearchEngine(mockIndexer);
  const results = await searchEngine.hybridSearch("test"); // k 명시하지 않음

  assert.strictEqual(results.length, 8, "기본 k값 8로 8개 결과 반환");
});

test("SearchEngine.hybridSearch - 의도적으로만 일부 부분 점수 포함되지 않음", async () => {
  const mockIndexer = new MockIndexer() as any;

  // 벡터에만 있는 청크
  const vectorOnlyChunk = createChunk("v-only", "note1", "벡터만");
  mockIndexer.setVectorResults([{ chunk: vectorOnlyChunk, score: 0.9 }]);
  mockIndexer.setFuzzyResults([]);

  const searchEngine = new SearchEngine(mockIndexer);
  const results = await searchEngine.hybridSearch("test", 1);

  assert.strictEqual(results.length, 1);
  assert.strictEqual(results[0].vectorScore, 0.9, "벡터 점수 존재");
  assert.strictEqual(results[0].fuzzyScore, undefined, "퍼지 점수 미포함 (퍼지 후보 없음)");
  assert.strictEqual(results[0].bm25Score, undefined, "BM25 점수 미포함 (퍼지 후보 없음)");
});

test("SearchEngine.hybridSearch - 퍼지 후보에서 BM25 재랭킹이 올바르게 동작", async () => {
  const mockIndexer = new MockIndexer() as any;

  // 퍼지 검색 후보: f1(퍼지점수 높음), f2, f3
  const f1 = createChunk("f1", "note1", "퍼지 점수 제일 높음");
  const f2 = createChunk("f2", "note2", "퍼지 점수 중간");
  const f3 = createChunk("f3", "note3", "퍼지 점수 낮음");

  mockIndexer.setVectorResults([]);
  mockIndexer.setFuzzyResults([
    { chunk: f1, score: 0.9 },
    { chunk: f2, score: 0.7 },
    { chunk: f3, score: 0.5 },
  ]);
  // BM25 점수: f3가 가장 관련성 높음 → BM25 재랭킹으로 순위 역전
  mockIndexer.setBm25SubsetScores(new Map([
    ["f1", 0.5],
    ["f2", 1.5],
    ["f3", 4.0],  // BM25 가장 높음
  ]));

  const searchEngine = new SearchEngine(mockIndexer);
  const results = await searchEngine.hybridSearch("test", 3);

  // BM25 점수 기준으로 f3가 최상위에 위치해야 함
  assert.strictEqual(results[0].chunk.id, "f3", "BM25 재랭킹으로 관련성 높은 청크가 최상위");
  assert.ok((results[0].bm25Score ?? 0) > (results[1].bm25Score ?? 0), "BM25 점수 내림차순");
});

// ============= Obsidian API 검색 경로 테스트 =============

test("SearchEngine.hybridSearch - Obsidian 검색 함수가 있을 때 퍼지 검색 대신 사용됨", async () => {
  const mockIndexer = new MockIndexer() as any;

  const obsidianChunk1 = createChunk("obs1", "note1", "Obsidian 관련성 가장 높음");
  const obsidianChunk2 = createChunk("obs2", "note2", "Obsidian 관련성 두 번째");

  // 퍼지 검색 결과는 비워두고 Obsidian 검색이 대신 결과를 제공
  mockIndexer.setFuzzyResults([]);
  mockIndexer.setVectorResults([]);

  // Obsidian API 기반 검색 함수 모킹 (관련도 점수 포함)
  const obsidianSearchFn: ObsidianSearchFn = (_query: string) => [
    { chunk: obsidianChunk1, score: 0.95 },
    { chunk: obsidianChunk2, score: 0.75 },
  ];

  const searchEngine = new SearchEngine(mockIndexer, undefined, undefined, obsidianSearchFn);
  const results = await searchEngine.hybridSearch("test", 2);

  assert.strictEqual(results.length, 2, "Obsidian 검색 결과 2개 반환");
  // Obsidian 점수가 포함되어야 함
  assert.ok(results[0].obsidianScore !== undefined, "obsidianScore 포함");
  assert.strictEqual(results[0].chunk.id, "obs1", "Obsidian 관련도 순서 유지");
});

test("SearchEngine.hybridSearch - Obsidian 점수가 있으면 BM25 재랭킹 스킵", async () => {
  const mockIndexer = new MockIndexer() as any;

  // Obsidian이 이미 관련도 점수 기준으로 정렬된 결과 반환
  const o1 = createChunk("o1", "note1", "Obsidian 점수 높음");
  const o2 = createChunk("o2", "note2", "Obsidian 점수 중간");
  const o3 = createChunk("o3", "note3", "Obsidian 점수 낮음");

  mockIndexer.setVectorResults([]);
  mockIndexer.setFuzzyResults([]);
  // BM25 점수는 o3가 가장 높음 → BM25 재랭킹이 적용되면 순서가 바뀌어야 함
  mockIndexer.setBm25SubsetScores(new Map([
    ["o1", 0.5],
    ["o2", 1.0],
    ["o3", 5.0], // BM25 최고점
  ]));

  // Obsidian 점수 기준: o1 > o2 > o3 순서
  const obsidianSearchFn: ObsidianSearchFn = (_query: string) => [
    { chunk: o1, score: 0.9 },  // Obsidian 최고점
    { chunk: o2, score: 0.6 },
    { chunk: o3, score: 0.3 },  // Obsidian 최저점
  ];

  const searchEngine = new SearchEngine(mockIndexer, undefined, undefined, obsidianSearchFn);
  const results = await searchEngine.hybridSearch("test", 3);

  // Obsidian 점수가 있으므로 BM25 재랭킹이 적용되지 않아야 함
  // → o1이 최상위 유지 (BM25 기준으로는 o3가 최상위여야 하지만 스킵됨)
  assert.strictEqual(results[0].chunk.id, "o1", "Obsidian 점수가 있으면 순서 그대로 유지");
  assert.ok(results[0].obsidianScore !== undefined, "obsidianScore 포함");
  assert.strictEqual(results[0].bm25Score, undefined, "BM25 재랭킹이 스킵되어 bm25Score 없음");
});

test("SearchEngine.hybridSearch - Obsidian 점수가 없으면(0) BM25 재랭킹 적용", async () => {
  const mockIndexer = new MockIndexer() as any;

  const o1 = createChunk("o1", "note1", "첫 번째 후보");
  const o2 = createChunk("o2", "note2", "두 번째 후보");
  const o3 = createChunk("o3", "note3", "세 번째 후보");

  mockIndexer.setVectorResults([]);
  mockIndexer.setFuzzyResults([]);
  // BM25 점수: o3가 가장 높음 → BM25 재랭킹으로 o3가 최상위로 이동해야 함
  mockIndexer.setBm25SubsetScores(new Map([
    ["o1", 0.5],
    ["o2", 1.0],
    ["o3", 5.0],
  ]));

  // Obsidian 점수가 모두 0 → BM25 재랭킹 적용
  const obsidianSearchFn: ObsidianSearchFn = (_query: string) => [
    { chunk: o1, score: 0 },
    { chunk: o2, score: 0 },
    { chunk: o3, score: 0 },
  ];

  const searchEngine = new SearchEngine(mockIndexer, undefined, undefined, obsidianSearchFn);
  const results = await searchEngine.hybridSearch("test", 3);

  // Obsidian 점수가 없으므로 BM25 재랭킹이 적용되어 o3가 최상위
  assert.strictEqual(results[0].chunk.id, "o3", "BM25 재랭킹으로 o3가 최상위");
  assert.ok((results[0].bm25Score ?? 0) > 0, "BM25 점수 포함");
});

test("SearchEngine.hybridSearch - Obsidian 검색 + 벡터 검색 RRF 통합", async () => {
  const mockIndexer = new MockIndexer() as any;

  const obsidianChunk = createChunk("obs", "note1", "Obsidian+Vector 공통");
  const vectorOnlyChunk = createChunk("vec", "note2", "벡터만");
  const obsidianOnlyChunk = createChunk("obsonly", "note3", "Obsidian만");

  // 벡터 결과: obs + vec
  mockIndexer.setVectorResults([
    { chunk: obsidianChunk, score: 0.9 },
    { chunk: vectorOnlyChunk, score: 0.7 },
  ]);

  // Obsidian 검색: obs + obsonly
  const obsidianSearchFn: ObsidianSearchFn = (_query: string) => [
    { chunk: obsidianChunk, score: 0.95 },
    { chunk: obsidianOnlyChunk, score: 0.6 },
  ];

  const searchEngine = new SearchEngine(mockIndexer, undefined, undefined, obsidianSearchFn);
  const results = await searchEngine.hybridSearch("test", 3);

  // 양쪽에 공통으로 나타나는 obs 청크가 RRF로 최상위
  assert.strictEqual(results[0].chunk.id, "obs", "Obsidian+벡터 공통 청크가 RRF 최상위");
  assert.ok(results[0].obsidianScore !== undefined, "obsidianScore 포함");
  assert.ok(results[0].vectorScore !== undefined, "vectorScore 포함");
});
