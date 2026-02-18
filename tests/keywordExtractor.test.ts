/**
 * 키워드 추출 테스트
 */

import { test } from "node:test";
import assert from "node:assert";
import { extractKeywords, extractCommonKeywords, formatKeywordsMetadata } from "../src/topicSeparation/keywordExtractor.js";

test("extractKeywords - 한국어 텍스트에서 키워드 추출", () => {
  const text = "오늘은 날씨가 정말 좋습니다. 날씨가 화창하고 기온도 적당합니다.";
  const keywords = extractKeywords(text);
  
  assert.ok(keywords.length > 0, "키워드가 추출되어야 함");
  // 형태소 분석 없이 간단한 규칙 기반이므로 "날씨가" 형태로 추출됨
  const hasWeatherKeyword = keywords.some(k => k.includes("날씨"));
  assert.ok(hasWeatherKeyword, "날씨 관련 키워드가 포함되어야 함");
});

test("extractKeywords - 빈 텍스트", () => {
  const keywords = extractKeywords("");
  assert.strictEqual(keywords.length, 0, "빈 배열을 반환해야 함");
});

test("extractCommonKeywords - 공통 키워드 추출", () => {
  const texts = [
    "프로젝트 관리에 대해 논의했습니다",
    "프로젝트 일정을 확인했습니다",
    "프로젝트 진행 상황을 공유했습니다"
  ];
  
  const commonKeywords = extractCommonKeywords(texts);
  assert.ok(commonKeywords.includes("프로젝트"), "프로젝트 키워드가 공통으로 포함되어야 함");
});

test("formatKeywordsMetadata - 키워드 메타데이터 포맷팅", () => {
  const keywords = ["프로젝트", "관리", "일정"];
  const formatted = formatKeywordsMetadata(keywords);
  
  assert.strictEqual(formatted, "[Keywords: 프로젝트, 관리, 일정]");
});

test("formatKeywordsMetadata - 빈 키워드", () => {
  const formatted = formatKeywordsMetadata([]);
  assert.strictEqual(formatted, "");
});
