// 벡터 인덱스 생성 팩토리

import { IndexingConfig } from "./types";
import { VectorStore } from "./vectorStore";
import { VectorIndex } from "./vectorIndex";

export function createVectorIndex(config: IndexingConfig, indexSignature: string): VectorIndex {
  const engine = config.vectorIndexEngine || "json";

  if (engine === "json") {
    return new VectorStore(config.vectorStorePath, indexSignature);
  }

  throw new Error(`아직 지원하지 않는 벡터 인덱스 엔진입니다: ${engine}`);
}
