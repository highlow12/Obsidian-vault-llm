// 문서 청킹 로직 - 텍스트를 적절한 크기로 분할

import { Chunk } from "./types";
import { Section } from "./parser";

/**
 * 간단한 토큰 카운터 (공백 기준 근사치)
 */
function estimateTokenCount(text: string): number {
  // 영어는 1단어 ≈ 1.3 토큰, 한글은 1음절 ≈ 1 토큰 근사
  const words = text.split(/\s+/).length;
  const koreanChars = (text.match(/[가-힣]/g) || []).length;
  return Math.ceil(words * 1.3 + koreanChars * 0.5);
}

/**
 * 텍스트를 청크로 분할
 */
export function chunkText(
  noteId: string,
  sections: Section[],
  options: {
    chunkSize?: number;
    chunkOverlap?: number;
  } = {}
): Chunk[] {
  const chunkSize = options.chunkSize || 400;
  const chunkOverlap = options.chunkOverlap || 50;
  const chunks: Chunk[] = [];

  for (const section of sections) {
    const sectionText = section.heading
      ? `# ${section.heading}\n\n${section.content}`
      : section.content;

    if (!sectionText.trim()) {
      continue;
    }

    const tokenCount = estimateTokenCount(sectionText);

    // 섹션이 청크 크기보다 작으면 그대로 사용
    if (tokenCount <= chunkSize) {
      chunks.push({
        id: `${noteId}-chunk-${chunks.length}`,
        noteId,
        text: sectionText,
        position: section.position,
        tokenCount,
        section: section.heading,
      });
      continue;
    }

    // 섹션이 크면 문장 단위로 분할
    const sentences = splitIntoSentences(sectionText);
    let currentChunk: string[] = [];
    let currentTokens = 0;

    for (const sentence of sentences) {
      const sentenceTokens = estimateTokenCount(sentence);

      // 현재 청크에 추가 가능한지 확인
      if (currentTokens + sentenceTokens <= chunkSize) {
        currentChunk.push(sentence);
        currentTokens += sentenceTokens;
      } else {
        // 현재 청크 저장
        if (currentChunk.length > 0) {
          const chunkText = currentChunk.join(" ");
          chunks.push({
            id: `${noteId}-chunk-${chunks.length}`,
            noteId,
            text: chunkText,
            position: section.position,
            tokenCount: currentTokens,
            section: section.heading,
          });

          // 오버랩을 위해 마지막 몇 문장 유지
          const overlapSentences = getOverlapSentences(currentChunk, chunkOverlap);
          currentChunk = overlapSentences;
          currentTokens = estimateTokenCount(currentChunk.join(" "));
        }

        // 새 청크 시작
        currentChunk.push(sentence);
        currentTokens += sentenceTokens;
      }
    }

    // 마지막 청크 저장
    if (currentChunk.length > 0) {
      const chunkText = currentChunk.join(" ");
      chunks.push({
        id: `${noteId}-chunk-${chunks.length}`,
        noteId,
        text: chunkText,
        position: section.position,
        tokenCount: currentTokens,
        section: section.heading,
      });
    }
  }

  return chunks;
}

/**
 * 텍스트를 문장으로 분할 (간단한 버전)
 */
function splitIntoSentences(text: string): string[] {
  // 마침표, 느낌표, 물음표 뒤 공백으로 분할
  const sentences = text.split(/([.!?]\s+)/).filter((s) => s.trim());
  const result: string[] = [];

  for (let i = 0; i < sentences.length; i += 2) {
    const sentence = sentences[i];
    const punctuation = sentences[i + 1] || "";
    result.push(sentence + punctuation);
  }

  return result.filter((s) => s.trim());
}

/**
 * 오버랩을 위한 마지막 문장들 가져오기
 */
function getOverlapSentences(sentences: string[], targetTokens: number): string[] {
  const overlap: string[] = [];
  let tokens = 0;

  for (let i = sentences.length - 1; i >= 0; i--) {
    const sentence = sentences[i];
    const sentenceTokens = estimateTokenCount(sentence);

    if (tokens + sentenceTokens > targetTokens) {
      break;
    }

    overlap.unshift(sentence);
    tokens += sentenceTokens;
  }

  return overlap;
}
