import { test } from "node:test";
import assert from "node:assert";
import { computeRRF, RRF_K, SearchEngine, HybridSearchResult } from "../src/indexing/searchEngine.js";
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

  setVectorResults(results: Array<{ chunk: Chunk; score: number }>) {
    this.vectorResults = results;
  }

  setKeywordResults(results: Array<{ chunk: Chunk; score: number }>) {
    this.keywordResults = results;
  }

  async search(query: string, k?: number): Promise<Array<{ chunk: Chunk; score: number }>> {
    return this.vectorResults.slice(0, k);
  }

  keywordSearch(query: string, k?: number): Array<{ chunk: Chunk; score: number }> {
    return this.keywordResults.slice(0, k);
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

  // 키워드 검색 결과
  const keywordChunk1 = createChunk("k1", "note1", "키워드 매칭됨");
  const keywordChunk2 = createChunk("k2", "note3", "키워드 매칭");
  mockIndexer.setKeywordResults([
    { chunk: keywordChunk1, score: 0.8 },
    { chunk: keywordChunk2, score: 0.6 },
  ]);

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
  mockIndexer.setKeywordResults([]);

  const searchEngine = new SearchEngine(mockIndexer);
  const results = await searchEngine.hybridSearch("test", 2);

  assert.strictEqual(results.length, 2, "벡터 검색 결과 개수 반환");
  assert.strictEqual(results[0].chunk.id, "v1", "상위 결과가 벡터 순서대로 정렬");
});

test("SearchEngine.hybridSearch - 키워드 검색 결과만 있을 때", async () => {
  const mockIndexer = new MockIndexer() as any;

  mockIndexer.setVectorResults([]);

  const chunk1 = createChunk("k1", "note1", "키워드 결과만 있음");
  const chunk2 = createChunk("k2", "note2", "두 번째 키워드 결과");
  mockIndexer.setKeywordResults([
    { chunk: chunk1, score: 0.8 },
    { chunk: chunk2, score: 0.6 },
  ]);

  const searchEngine = new SearchEngine(mockIndexer);
  const results = await searchEngine.hybridSearch("test", 2);

  assert.strictEqual(results.length, 2, "키워드 검색 결과 개수 반환");
  assert.strictEqual(results[0].chunk.id, "k1", "키워드 순서대로 정렬");
});

test("SearchEngine.hybridSearch - 중복된 청크는 RRF 점수가 높음", async () => {
  const mockIndexer = new MockIndexer() as any;

  // 동일한 청크가 두 검색에서 나타남
  const overlappingChunk = createChunk("overlap", "note1", "중복 청크");
  const vectorOnlyChunk = createChunk("vector-only", "note2", "벡터만");
  const keywordOnlyChunk = createChunk("keyword-only", "note3", "키워드만");

  mockIndexer.setVectorResults([
    { chunk: overlappingChunk, score: 0.9 },
    { chunk: vectorOnlyChunk, score: 0.7 },
  ]);

  mockIndexer.setKeywordResults([
    { chunk: overlappingChunk, score: 0.8 },
    { chunk: keywordOnlyChunk, score: 0.6 },
  ]);

  const searchEngine = new SearchEngine(mockIndexer);
  const results = await searchEngine.hybridSearch("test", 3);

  // 중복 청크가 최상위에 있어야 함
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
  mockIndexer.setKeywordResults([]);

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
  mockIndexer.setKeywordResults([]);

  const searchEngine = new SearchEngine(mockIndexer);
  const results = await searchEngine.hybridSearch("없음", 8);

  assert.strictEqual(results.length, 0, "검색 결과가 없을 때 빈 배열 반환");
});

test("SearchEngine.hybridSearch - vectorScore와 keywordScore 포함", async () => {
  const mockIndexer = new MockIndexer() as any;

  const chunk = createChunk("test", "note1", "테스트");
  mockIndexer.setVectorResults([{ chunk, score: 0.95 }]);
  mockIndexer.setKeywordResults([{ chunk, score: 0.8 }]);

  const searchEngine = new SearchEngine(mockIndexer);
  const results = await searchEngine.hybridSearch("test", 1);

  assert.strictEqual(results.length, 1);
  assert.strictEqual(results[0].vectorScore, 0.95, "벡터 점수 포함");
  assert.strictEqual(results[0].keywordScore, 0.8, "키워드 점수 포함");
});

test("SearchEngine.hybridSearch - 기본 k값은 8", async () => {
  const mockIndexer = new MockIndexer() as any;

  const chunks = Array.from({ length: 20 }, (_, i) =>
    createChunk(`chunk-${i}`, `note${i}`, `내용 ${i}`)
  );

  mockIndexer.setVectorResults(
    chunks.map((chunk, i) => ({ chunk, score: 0.9 - i * 0.01 }))
  );
  mockIndexer.setKeywordResults([]);

  const searchEngine = new SearchEngine(mockIndexer);
  const results = await searchEngine.hybridSearch("test"); // k 명시하지 않음

  assert.strictEqual(results.length, 8, "기본 k값 8로 8개 결과 반환");
});

test("SearchEngine.hybridSearch - 의도적으로만 일부 부분 점수 포함되지 않음", async () => {
  const mockIndexer = new MockIndexer() as any;

  // 벡터에만 있는 청크
  const vectorOnlyChunk = createChunk("v-only", "note1", "벡터만");
  mockIndexer.setVectorResults([{ chunk: vectorOnlyChunk, score: 0.9 }]);
  mockIndexer.setKeywordResults([]);

  const searchEngine = new SearchEngine(mockIndexer);
  const results = await searchEngine.hybridSearch("test", 1);

  assert.strictEqual(results.length, 1);
  assert.strictEqual(results[0].vectorScore, 0.9, "벡터 점수 존재");
  assert.strictEqual(results[0].keywordScore, undefined, "키워드 점수 미포함");
});
