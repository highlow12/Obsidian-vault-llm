/**
 * 키워드 추출 테스트
 */

import { test } from "node:test";
import assert from "node:assert";
import {
  extractKeywords,
  extractCommonKeywords,
  formatKeywordsMetadata,
  extractNounsWithSegmenter,
  removeEnglishStopWords,
  extractKeywordsWithKiwi,
  type KiwiTokenInfo,
} from "../src/topicSeparation/keywordExtractor.js";

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

// ---- 새로운 기능 테스트 ----

test("extractNounsWithSegmenter - 한국어 명사 추출 (Intl.Segmenter 기반)", () => {
  const text = "날씨가 정말 좋습니다. 오늘은 학교에 갔습니다.";
  const nouns = extractNounsWithSegmenter(text);

  assert.ok(nouns.length > 0, "명사가 추출되어야 함");
  // 날씨, 학교 같은 명사가 포함되어야 함
  const hasNoun = nouns.some(n => n === "날씨" || n === "학교");
  assert.ok(hasNoun, `날씨 또는 학교가 추출되어야 함 (추출된 명사: ${nouns.join(", ")})`);
});

test("extractNounsWithSegmenter - 영어 불용어는 제외됨", () => {
  const text = "the project is about machine learning and AI";
  const nouns = extractNounsWithSegmenter(text);

  // 영어 불용어(the, is, and, about)는 제외되어야 함
  assert.ok(!nouns.includes("the"), "불용어 'the'는 제외되어야 함");
  assert.ok(!nouns.includes("is"), "불용어 'is'는 제외되어야 함");
  assert.ok(!nouns.includes("and"), "불용어 'and'는 제외되어야 함");
});

test("extractNounsWithSegmenter - 한영 혼합 텍스트", () => {
  const text = "AI 프로젝트를 진행하면서 machine learning을 공부했습니다.";
  const nouns = extractNounsWithSegmenter(text);

  assert.ok(nouns.length > 0, "키워드가 추출되어야 함");
  // AI, 프로젝트, machine, learning 같은 키워드가 포함되어야 함
  const hasKeyword = nouns.some(n => n === "프로젝트" || n === "AI" || n.toLowerCase() === "machine" || n.toLowerCase() === "learning");
  assert.ok(hasKeyword, `주요 키워드가 추출되어야 함 (추출된 키워드: ${nouns.join(", ")})`);
});

test("removeEnglishStopWords - 영어 불용어 제거", () => {
  const words = ["the", "project", "is", "about", "machine", "learning", "and", "AI"];
  const filtered = removeEnglishStopWords(words);

  assert.ok(!filtered.includes("the"), "'the'가 제거되어야 함");
  assert.ok(!filtered.includes("is"), "'is'가 제거되어야 함");
  assert.ok(!filtered.includes("and"), "'and'가 제거되어야 함");
  assert.ok(!filtered.includes("about"), "'about'가 제거되어야 함");
  assert.ok(filtered.includes("project"), "'project'는 유지되어야 함");
  assert.ok(filtered.includes("machine"), "'machine'은 유지되어야 함");
  assert.ok(filtered.includes("AI"), "'AI'는 유지되어야 함");
});

test("extractKeywordsWithKiwi - kiwi 모의 객체로 한국어 명사 추출", () => {
  // kiwi tokenize 결과를 모의(mock)하는 함수
  const mockKiwiTokenize = (text: string): KiwiTokenInfo[] => {
    // 간단한 테스트용 토크나이저 시뮬레이션
    if (text.includes("날씨")) {
      return [
        { str: "날씨", tag: "NNG", position: 0, length: 2 },
        { str: "가", tag: "JX", position: 2, length: 1 },
        { str: "정말", tag: "MAG", position: 4, length: 2 },
        { str: "좋", tag: "VA", position: 7, length: 1 },
        { str: "습니다", tag: "EF", position: 8, length: 3 },
      ];
    }
    return [];
  };

  const text = "날씨가 정말 좋습니다.";
  const keywords = extractKeywordsWithKiwi(text, mockKiwiTokenize);

  assert.ok(keywords.includes("날씨"), `날씨가 키워드로 추출되어야 함 (추출된 키워드: ${keywords.join(", ")})`);
  assert.ok(!keywords.includes("가"), "조사 '가'는 포함되지 않아야 함");
  assert.ok(!keywords.includes("정말"), "부사 '정말'은 포함되지 않아야 함");
});

test("extractKeywordsWithKiwi - 고유명사(NNP)도 추출됨", () => {
  const mockKiwiTokenize = (_text: string): KiwiTokenInfo[] => [
    { str: "서울", tag: "NNP", position: 0, length: 2 },
    { str: "에서", tag: "JKB", position: 2, length: 2 },
    { str: "회의", tag: "NNG", position: 5, length: 2 },
    { str: "를", tag: "JKO", position: 7, length: 1 },
    { str: "하", tag: "VV", position: 9, length: 1 },
    { str: "았습니다", tag: "EF", position: 10, length: 4 },
  ];

  const keywords = extractKeywordsWithKiwi("서울에서 회의를 했습니다.", mockKiwiTokenize);

  assert.ok(keywords.includes("서울"), "고유명사 '서울'이 포함되어야 함");
  assert.ok(keywords.includes("회의"), "일반명사 '회의'가 포함되어야 함");
  assert.ok(!keywords.includes("를"), "조사는 포함되지 않아야 함");
});

test("extractKeywords - 영어 불용어가 결과에서 제거됨", () => {
  const text = "the project is about machine learning. machine learning 기술을 활용합니다.";
  const keywords = extractKeywords(text);

  assert.ok(!keywords.includes("the"), "불용어 'the'가 결과에 포함되면 안 됨");
  assert.ok(!keywords.includes("is"), "불용어 'is'가 결과에 포함되면 안 됨");
  assert.ok(!keywords.includes("about"), "불용어 'about'이 결과에 포함되면 안 됨");
});
