// HNSW 기반 ANN 벡터 스토어 - 바이너리 직렬화를 통한 I/O 속도 최적화

import { existsSync, mkdirSync, readFileSync, writeFileSync, renameSync } from "fs";
import { dirname } from "path";
import { HierarchicalNSW } from "hnswlib-node";
import { VectorIndex, VectorSearchHit } from "./vectorIndex";

/** 초기 HNSW 인덱스 용량 */
const INITIAL_CAPACITY = 1024;
/** 용량 초과 시 확장 배수 */
const GROWTH_FACTOR = 2;

/** 메타데이터 바이너리 파일 시그니처 */
const META_MAGIC = Buffer.from("HNSWMETA");
/** 메타데이터 바이너리 포맷 버전 */
const META_VERSION = 1;

/** HNSW 내부 메타데이터 */
interface HnswMeta {
  indexSignature: string;
  dimension: number | null;
  /** 다음에 사용할 HNSW 정수 레이블 */
  nextLabel: number;
  /** HNSW 레이블 → 청크 ID 매핑 */
  labelToChunkId: Map<number, string>;
  /** 청크 ID → HNSW 레이블 매핑 */
  chunkIdToLabel: Map<string, number>;
  /** markDelete로 삭제된 레이블 집합 */
  deletedLabels: Set<number>;
}

/**
 * HNSW 기반 ANN 벡터 스토어.
 *
 * - HNSW 인덱스를 바이너리 파일(`storePath`)에 저장합니다.
 * - 메타데이터(레이블 매핑, 인덱스 시그니처 등)를 바이너리 파일(`storePath + ".meta.bin"`)에 저장합니다.
 * - 원자적 쓰기(임시 파일 → 이름 변경)로 데이터 무결성을 보장합니다.
 */
export class HnswVectorStore implements VectorIndex {
  private readonly hnswPath: string;
  private readonly metaPath: string;
  private index: HierarchicalNSW | null = null;
  private meta: HnswMeta;

  constructor(storePath: string, indexSignature: string) {
    this.hnswPath = storePath;
    this.metaPath = storePath + ".meta.bin";
    this.meta = this.loadMeta(indexSignature);
    if (this.meta.dimension !== null) {
      this.index = this.loadIndex(this.meta.dimension);
    }
  }

  // ──────────────────────────────────────────────
  // VectorIndex 인터페이스 구현
  // ──────────────────────────────────────────────

  getIndexSignature(): string {
    return this.meta.indexSignature;
  }

  getDimension(): number | null {
    return this.meta.dimension;
  }

  reset(indexSignature: string): void {
    this.index = null;
    this.meta = {
      indexSignature,
      dimension: null,
      nextLabel: 0,
      labelToChunkId: new Map(),
      chunkIdToLabel: new Map(),
      deletedLabels: new Set(),
    };
    this.persistMeta();
  }

  storeEmbedding(chunkId: string, embedding: number[]): void {
    this.initDimension(embedding.length);
    this.validateDimension(embedding.length);

    if (this.meta.chunkIdToLabel.has(chunkId)) {
      // 이미 존재하는 청크: 삭제 후 재삽입
      this.removeFromIndex(chunkId);
    }

    this.insertIntoIndex(chunkId, embedding);
    this.persist();
  }

  storeEmbeddings(embeddings: Map<string, number[]>): void {
    for (const [chunkId, embedding] of embeddings.entries()) {
      this.initDimension(embedding.length);
      this.validateDimension(embedding.length);

      if (this.meta.chunkIdToLabel.has(chunkId)) {
        this.removeFromIndex(chunkId);
      }
      this.insertIntoIndex(chunkId, embedding);
    }
    this.persist();
  }

  getEmbedding(chunkId: string): number[] | null {
    const label = this.meta.chunkIdToLabel.get(chunkId);
    if (label === undefined || this.index === null) return null;
    if (this.meta.deletedLabels.has(label)) return null;

    try {
      return Array.from(this.index.getPoint(label));
    } catch {
      return null;
    }
  }

  getAllEmbeddings(): Map<string, number[]> {
    const result = new Map<string, number[]>();
    if (this.index === null) return result;

    for (const [label, chunkId] of this.meta.labelToChunkId.entries()) {
      if (this.meta.deletedLabels.has(label)) continue;
      try {
        const point = this.index.getPoint(label);
        result.set(chunkId, Array.from(point));
      } catch {
        // markDelete된 포인트나 인덱스 손상 시 getPoint가 실패할 수 있으므로 무시합니다.
      }
    }
    return result;
  }

  deleteEmbedding(chunkId: string): void {
    this.removeFromIndex(chunkId);
    if (this.meta.labelToChunkId.size === 0) {
      this.meta.dimension = null;
    }
    this.persist();
  }

  deleteEmbeddings(chunkIds: string[]): void {
    if (chunkIds.length === 0) return;
    for (const chunkId of chunkIds) {
      this.removeFromIndex(chunkId);
    }
    if (this.meta.labelToChunkId.size === 0) {
      this.meta.dimension = null;
    }
    this.persist();
  }

  /**
   * HNSW ANN 검색 - Top-K 근사 최근접 이웃 탐색
   */
  search(queryEmbedding: number[], k: number = 8): VectorSearchHit[] {
    if (this.index === null || this.meta.dimension === null) return [];
    this.validateDimension(queryEmbedding.length);

    // 삭제되지 않은 유효 포인트 수 계산
    const activeCount = this.meta.labelToChunkId.size;
    if (activeCount === 0) return [];

    const actualK = Math.min(k, activeCount);
    const result = this.index.searchKnn(queryEmbedding, actualK);

    const hits: VectorSearchHit[] = [];
    for (let i = 0; i < result.neighbors.length; i++) {
      const label = result.neighbors[i];
      const chunkId = this.meta.labelToChunkId.get(label);
      if (!chunkId) continue;

      // cosine space에서 distance = 1 - similarity이므로 변환
      const score = 1 - result.distances[i];
      hits.push({ chunkId, score });
    }
    return hits;
  }

  close(): void {
    // 파일 기반 저장소는 별도 close 동작이 불필요합니다.
  }

  // ──────────────────────────────────────────────
  // 내부 유틸리티
  // ──────────────────────────────────────────────

  /** 첫 번째 임베딩 저장 시 차원 초기화 */
  private initDimension(dim: number): void {
    if (this.meta.dimension === null) {
      this.meta.dimension = dim;
      this.index = new HierarchicalNSW("cosine", dim);
      this.index.initIndex(INITIAL_CAPACITY);
    }
  }

  /** 임베딩 차원 검증 */
  private validateDimension(dim: number): void {
    if (this.meta.dimension !== null && dim !== this.meta.dimension) {
      throw new Error(
        `임베딩 차원 불일치: expected=${this.meta.dimension}, actual=${dim}`
      );
    }
  }

  /** HNSW 인덱스에 포인트 삽입 (용량 초과 시 자동 확장) */
  private insertIntoIndex(chunkId: string, embedding: number[]): void {
    if (this.index === null) {
      throw new Error("HNSW 인덱스가 초기화되지 않았습니다");
    }

    // 용량 확인 및 확장
    const maxElements = this.index.getMaxElements();
    if (this.meta.nextLabel >= maxElements) {
      this.index.resizeIndex(maxElements * GROWTH_FACTOR);
    }

    const label = this.meta.nextLabel++;
    this.index.addPoint(embedding, label);
    this.meta.labelToChunkId.set(label, chunkId);
    this.meta.chunkIdToLabel.set(chunkId, label);
  }

  /** HNSW 인덱스에서 포인트 제거 (markDelete 사용) */
  private removeFromIndex(chunkId: string): void {
    const label = this.meta.chunkIdToLabel.get(chunkId);
    if (label === undefined) return;
    if (this.index !== null && !this.meta.deletedLabels.has(label)) {
      try {
        this.index.markDelete(label);
      } catch {
        // 레이블이 존재하지 않거나 이미 markDelete된 경우 예외가 발생할 수 있으므로 무시합니다.
      }
    }
    this.meta.deletedLabels.add(label);
    this.meta.labelToChunkId.delete(label);
    this.meta.chunkIdToLabel.delete(chunkId);
  }

  /** HNSW 인덱스 + 메타데이터 원자적 저장 */
  private persist(): void {
    if (this.index !== null) {
      this.persistIndex();
    }
    this.persistMeta();
  }

  /** HNSW 바이너리 인덱스 파일 저장 (원자적 쓰기) */
  private persistIndex(): void {
    if (this.index === null) return;
    mkdirSync(dirname(this.hnswPath), { recursive: true });
    const tempPath = `${this.hnswPath}.tmp`;
    this.index.writeIndexSync(tempPath);
    renameSync(tempPath, this.hnswPath);
  }

  /**
   * 메타데이터 바이너리 파일 저장.
   *
   * 파일 포맷:
   * ```
   * [8B]  매직 "HNSWMETA"
   * [1B]  버전 (uint8)
   * [4B]  indexSignature 길이 (uint32LE)
   * [NB]  indexSignature (UTF-8)
   * [4B]  dimension (int32LE, -1 = null)
   * [4B]  nextLabel (uint32LE)
   * [4B]  레이블 엔트리 수 (uint32LE)
   * 각 엔트리:
   *   [4B]  label (uint32LE)
   *   [4B]  chunkId 길이 (uint32LE)
   *   [NB]  chunkId (UTF-8)
   * [4B]  삭제된 레이블 수 (uint32LE)
   * 각 삭제 레이블:
   *   [4B]  label (uint32LE)
   * ```
   */
  private persistMeta(): void {
    mkdirSync(dirname(this.metaPath), { recursive: true });

    const sigBuf = Buffer.from(this.meta.indexSignature, "utf8");
    const entries = [...this.meta.labelToChunkId.entries()];
    const deletedArr = [...this.meta.deletedLabels];

    // 필요한 버퍼 크기 계산
    const entrySize = entries.reduce(
      (acc, [, chunkId]) => acc + 4 + 4 + Buffer.byteLength(chunkId, "utf8"),
      0
    );
    const totalSize =
      META_MAGIC.length + // 매직
      1 + // 버전
      4 + sigBuf.length + // 인덱스 시그니처
      4 + // dimension
      4 + // nextLabel
      4 + entrySize + // 레이블 엔트리
      4 + deletedArr.length * 4; // 삭제된 레이블

    const buf = Buffer.allocUnsafe(totalSize);
    let offset = 0;

    // 매직 및 버전
    META_MAGIC.copy(buf, offset);
    offset += META_MAGIC.length;
    buf.writeUInt8(META_VERSION, offset++);

    // 인덱스 시그니처
    buf.writeUInt32LE(sigBuf.length, offset);
    offset += 4;
    sigBuf.copy(buf, offset);
    offset += sigBuf.length;

    // dimension (-1 = null)
    buf.writeInt32LE(this.meta.dimension ?? -1, offset);
    offset += 4;

    // nextLabel
    buf.writeUInt32LE(this.meta.nextLabel, offset);
    offset += 4;

    // 레이블 엔트리
    buf.writeUInt32LE(entries.length, offset);
    offset += 4;
    for (const [label, chunkId] of entries) {
      const idBuf = Buffer.from(chunkId, "utf8");
      buf.writeUInt32LE(label, offset);
      offset += 4;
      buf.writeUInt32LE(idBuf.length, offset);
      offset += 4;
      idBuf.copy(buf, offset);
      offset += idBuf.length;
    }

    // 삭제된 레이블
    buf.writeUInt32LE(deletedArr.length, offset);
    offset += 4;
    for (const label of deletedArr) {
      buf.writeUInt32LE(label, offset);
      offset += 4;
    }

    // 원자적 쓰기
    const tempPath = `${this.metaPath}.tmp`;
    writeFileSync(tempPath, buf);
    renameSync(tempPath, this.metaPath);
  }

  /** 메타데이터 바이너리 파일 로드 */
  private loadMeta(defaultSignature: string): HnswMeta {
    if (!existsSync(this.metaPath)) {
      return this.emptyMeta(defaultSignature);
    }

    try {
      const buf = readFileSync(this.metaPath);
      let offset = 0;

      // 매직 검증
      const magic = buf.slice(offset, offset + META_MAGIC.length);
      offset += META_MAGIC.length;
      if (!magic.equals(META_MAGIC)) {
        throw new Error("잘못된 메타데이터 파일 형식");
      }

      // 버전 확인
      const version = buf.readUInt8(offset++);
      if (version !== META_VERSION) {
        throw new Error(`지원하지 않는 메타데이터 버전: ${version}`);
      }

      // 인덱스 시그니처
      const sigLen = buf.readUInt32LE(offset);
      offset += 4;
      const indexSignature = buf.slice(offset, offset + sigLen).toString("utf8");
      offset += sigLen;

      // dimension
      const dimRaw = buf.readInt32LE(offset);
      offset += 4;
      const dimension = dimRaw === -1 ? null : dimRaw;

      // nextLabel
      const nextLabel = buf.readUInt32LE(offset);
      offset += 4;

      // 레이블 엔트리
      const entryCount = buf.readUInt32LE(offset);
      offset += 4;
      const labelToChunkId = new Map<number, string>();
      const chunkIdToLabel = new Map<string, number>();
      for (let i = 0; i < entryCount; i++) {
        const label = buf.readUInt32LE(offset);
        offset += 4;
        const idLen = buf.readUInt32LE(offset);
        offset += 4;
        const chunkId = buf.slice(offset, offset + idLen).toString("utf8");
        offset += idLen;
        labelToChunkId.set(label, chunkId);
        chunkIdToLabel.set(chunkId, label);
      }

      // 삭제된 레이블
      const deletedCount = buf.readUInt32LE(offset);
      offset += 4;
      const deletedLabels = new Set<number>();
      for (let i = 0; i < deletedCount; i++) {
        deletedLabels.add(buf.readUInt32LE(offset));
        offset += 4;
      }

      return { indexSignature, dimension, nextLabel, labelToChunkId, chunkIdToLabel, deletedLabels };
    } catch (error) {
      console.warn("HNSW 메타데이터 로드 실패, 새로 초기화합니다:", error);
      return this.emptyMeta(defaultSignature);
    }
  }

  /** HNSW 인덱스 바이너리 파일 로드 */
  private loadIndex(dimension: number): HierarchicalNSW {
    const idx = new HierarchicalNSW("cosine", dimension);
    if (!existsSync(this.hnswPath)) {
      idx.initIndex(INITIAL_CAPACITY);
      return idx;
    }
    try {
      idx.readIndexSync(this.hnswPath);
    } catch (error) {
      console.warn("HNSW 인덱스 로드 실패, 새로 초기화합니다:", error);
      idx.initIndex(INITIAL_CAPACITY);
    }
    return idx;
  }

  /** 빈 메타데이터 생성 */
  private emptyMeta(indexSignature: string): HnswMeta {
    return {
      indexSignature,
      dimension: null,
      nextLabel: 0,
      labelToChunkId: new Map(),
      chunkIdToLabel: new Map(),
      deletedLabels: new Set(),
    };
  }
}
