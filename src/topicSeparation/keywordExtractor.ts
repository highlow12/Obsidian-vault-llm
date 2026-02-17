/**
 * 키워드 추출 모듈
 * 
 * 한국어 텍스트에서 핵심 키워드를 추출합니다.
 * kiwi-rescript가 Node.js 환경에서 동작하지 않을 수 있으므로,
 * 대안으로 간단한 규칙 기반 키워드 추출을 구현합니다.
 */

/**
 * 텍스트에서 키워드를 추출합니다
 * @param text 입력 텍스트
 * @returns 추출된 키워드 배열
 */
export function extractKeywords(text: string): string[] {
  if (!text || text.trim().length === 0) {
    return [];
  }

  // 기본 전처리: 특수문자 제거 및 소문자 변환
  const cleaned = text
    .replace(/[^\w\sㄱ-ㅎㅏ-ㅣ가-힣]/g, ' ')
    .toLowerCase()
    .trim();

  // 단어 분리
  const words = cleaned.split(/\s+/).filter(word => word.length > 1);

  // 불용어 제거 (한국어 일반적인 불용어)
  const stopWords = new Set([
    '이', '그', '저', '것', '수', '등', '들', '및', '을', '를', '이를', '그를', '저를',
    '은', '는', '이는', '그는', '저는', '가', '에', '의', '로', '으로', '에서', '와', '과',
    '하다', '있다', '되다', '않다', '없다', '같다', '이다', '아니다',
    '하는', '있는', '되는', '하고', '있고', '되고', '한', '하며', '있으며',
    '할', '있을', '될', '합니다', '입니다', '습니다',
    '그리고', '그러나', '하지만', '또한', '또', '및', '등',
    '때문', '경우', '통해', '대한', '위한', '관한', '따른',
    '것', '점', '때', '중', '내', '외'
  ]);

  const filtered = words.filter(word => !stopWords.has(word) && word.length >= 2);

  // 빈도수 계산
  const frequency = new Map<string, number>();
  for (const word of filtered) {
    frequency.set(word, (frequency.get(word) || 0) + 1);
  }

  // 빈도순으로 정렬하여 상위 키워드 반환
  const sorted = Array.from(frequency.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word);

  // 최대 10개까지 반환
  return sorted.slice(0, 10);
}

/**
 * 여러 텍스트에서 공통 키워드를 추출합니다
 * @param texts 텍스트 배열
 * @returns 공통 키워드 배열
 */
export function extractCommonKeywords(texts: string[]): string[] {
  if (texts.length === 0) {
    return [];
  }

  // 각 텍스트의 키워드 추출
  const allKeywordSets = texts.map(text => new Set(extractKeywords(text)));

  if (allKeywordSets.length === 0) {
    return [];
  }

  // 모든 텍스트에 공통으로 등장하는 키워드 찾기
  const commonKeywords: string[] = [];
  const firstSet = allKeywordSets[0];

  for (const keyword of firstSet) {
    if (allKeywordSets.every(set => set.has(keyword))) {
      commonKeywords.push(keyword);
    }
  }

  return commonKeywords;
}

/**
 * 키워드를 메타데이터 형식으로 포맷팅합니다
 * @param keywords 키워드 배열
 * @returns 메타데이터 문자열
 */
export function formatKeywordsMetadata(keywords: string[]): string {
  if (keywords.length === 0) {
    return '';
  }
  return `[Keywords: ${keywords.join(', ')}]`;
}
