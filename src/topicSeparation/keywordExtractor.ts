/**
 * 키워드 추출 모듈
 * 
 * 한국어 텍스트에서 핵심 키워드를 추출합니다.
 * - Intl.Segmenter를 사용한 한국어 단어 분리 및 명사 추출
 * - kiwi-nlp 형태소 분석기와 통합 가능한 인터페이스 제공
 * - 영어 불용어(stop words) 제거 기능 포함
 */

/**
 * kiwi-nlp TokenInfo 타입 (kiwi-nlp와 통합 시 사용)
 */
export interface KiwiTokenInfo {
  str: string;
  tag: string;
  position: number;
  length: number;
}

/**
 * kiwi tokenize 함수 타입
 */
export type KiwiTokenizeFn = (text: string) => KiwiTokenInfo[];

/**
 * 한국어 조사(postposition) 패턴 목록
 * 단어 끝에서 조사를 제거해 명사 원형을 추출하는 데 사용
 */
const KOREAN_POSTPOSITIONS = [
  '에서', '으로', '에게', '한테', '부터', '까지', '이라', '라는', '이는',
  '에게서', '한테서', '라고', '이라고', '이고', '이며', '이나', '이라면',
  '으로부터', '로부터', '와의', '과의',
  '이가', '이를', '이은', '이는',
  '에서의',
  '로서', '으로서', '로써', '으로써',
  '에', '의', '을', '를', '이', '가', '은', '는',
  '와', '과', '로', '도', '만',
  '께', '마다', '씩', '처럼', '보다', '만큼',
];

/**
 * 한국어 동사/형용사 어미 패턴 (명사가 아닌 품사 식별용)
 */
const KOREAN_VERB_ENDINGS = [
  '합니다', '했습니다', '합니까', '했습니까',
  '습니다', '었습니다', '았습니다',
  '하다', '했다', '한다', '할', '하고', '하며', '하여',
  '되다', '됐다', '된다', '될', '되고', '되며', '되어',
  '있다', '있어', '있고', '있는', '있을',
  '없다', '없어', '없고', '없는', '없을',
  '이다', '이어', '이고', '이며', '이면', '이라',
  '는다', '었다', '았다', '겠다',
];

/**
 * 한국어 불용어 목록 (기능어, 대명사, 조사 등)
 */
const KOREAN_STOP_WORDS = new Set([
  '이', '그', '저', '것', '수', '등', '들', '및', '을', '를', '이를', '그를', '저를',
  '은', '는', '이는', '그는', '저는', '가', '에', '의', '로', '으로', '에서', '와', '과',
  '하다', '있다', '되다', '않다', '없다', '같다', '이다', '아니다',
  '하는', '있는', '되는', '하고', '있고', '되고', '한', '하며', '있으며',
  '할', '있을', '될', '합니다', '입니다', '습니다',
  '그리고', '그러나', '하지만', '또한', '또', '및', '등',
  '때문', '경우', '통해', '대한', '위한', '관한', '따른',
  '것', '점', '때', '중', '내', '외',
]);

/**
 * 영어 불용어 목록 (일반적인 기능어, 관사, 전치사 등)
 */
const ENGLISH_STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'up', 'about', 'into', 'through', 'during',
  'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
  'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might',
  'shall', 'can', 'need', 'dare', 'ought', 'used',
  'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves',
  'you', 'your', 'yours', 'yourself', 'yourselves',
  'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself',
  'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves',
  'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those',
  'am', 'not', 'no', 'nor', 'so', 'yet', 'both', 'either', 'neither',
  'each', 'few', 'more', 'most', 'other', 'some', 'such',
  'than', 'too', 'very', 's', 't', 'just', 'don', 'now', 'as', 'if',
  'then', 'there', 'here', 'when', 'where', 'why', 'how', 'all', 'also',
  'only', 'same', 'own', 'after', 'before', 'while', 'since', 'until',
  'between', 'out', 'down', 'off', 'over', 'under', 'again', 'further',
  'once', 'any', 'because', 'against', 'above', 'below',
]);

/**
 * 영어 불용어를 제거합니다
 * @param words 단어 배열
 * @returns 불용어가 제거된 단어 배열
 */
export function removeEnglishStopWords(words: string[]): string[] {
  return words.filter(word => !ENGLISH_STOP_WORDS.has(word.toLowerCase()));
}

/**
 * Intl.Segmenter를 사용해 한국어 텍스트에서 명사형 단어를 추출합니다.
 * kiwi-nlp 모델 파일이 없는 환경에서 폴백으로 사용됩니다.
 * @param text 입력 텍스트
 * @returns 추출된 명사형 단어 배열
 */
export function extractNounsWithSegmenter(text: string): string[] {
  if (!text || text.trim().length === 0) {
    return [];
  }

  // Intl.Segmenter로 단어 단위 분리 (한국어 지원)
  const segmenter = new Intl.Segmenter('ko', { granularity: 'word' });
  const segments = Array.from(segmenter.segment(text));

  // 단어 세그먼트만 추출 (공백, 구두점 제외)
  const words = segments
    .filter(s => s.isWordLike)
    .map(s => s.segment);

  const result: string[] = [];

  for (const word of words) {
    // 영어 단어인 경우: 불용어 제거 후 포함
    if (/^[a-zA-Z]+$/.test(word)) {
      if (!ENGLISH_STOP_WORDS.has(word.toLowerCase()) && word.length >= 2) {
        result.push(word);
      }
      continue;
    }

    // 한국어 단어인 경우: 조사 제거 후 명사 추출
    if (/[가-힣]/.test(word)) {
      // 동사/형용사 어미로 끝나는 단어는 제외
      const isVerbOrAdj = KOREAN_VERB_ENDINGS.some(ending => word.endsWith(ending));
      if (isVerbOrAdj) {
        continue;
      }

      // 조사 제거하여 명사 원형 추출
      let noun = word;
      const sortedPostpositions = [...KOREAN_POSTPOSITIONS].sort((a, b) => b.length - a.length);
      for (const postposition of sortedPostpositions) {
        if (noun.endsWith(postposition) && noun.length > postposition.length) {
          noun = noun.slice(0, noun.length - postposition.length);
          break;
        }
      }

      // 최소 길이 필터 (1글자 단어 제외)
      if (noun.length >= 2) {
        result.push(noun);
      }
    }
  }

  return result;
}

/**
 * kiwi-nlp의 tokenize 함수를 사용해 한국어 명사를 추출합니다.
 * kiwi-nlp의 품사 태그 중 명사(NN*)에 해당하는 토큰만 반환합니다.
 * 
 * @param text 입력 텍스트
 * @param kiwiTokenize kiwi-nlp의 tokenize 함수
 * @returns 추출된 명사 배열
 */
export function extractKeywordsWithKiwi(text: string, kiwiTokenize: KiwiTokenizeFn): string[] {
  if (!text || text.trim().length === 0) {
    return [];
  }

  const tokens = kiwiTokenize(text);

  // kiwi 품사 태그: NNG (일반명사), NNP (고유명사), NNB (의존명사)
  const nouns = tokens
    .filter(token => token.tag.startsWith('NN'))
    .map(token => token.str)
    .filter(str => str.length >= 2);

  // 영어 불용어 제거
  const filtered = removeEnglishStopWords(nouns);

  // 빈도수 계산 후 상위 키워드 반환
  return rankByFrequency(filtered, 10);
}

/**
 * 단어 배열을 빈도순으로 정렬하여 상위 N개 반환
 * @param words 단어 배열
 * @param topN 반환할 최대 개수
 * @returns 빈도순으로 정렬된 단어 배열
 */
function rankByFrequency(words: string[], topN: number): string[] {
  const frequency = new Map<string, number>();
  for (const word of words) {
    frequency.set(word, (frequency.get(word) || 0) + 1);
  }
  return Array.from(frequency.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word)
    .slice(0, topN);
}

/**
 * 텍스트에서 키워드를 추출합니다.
 * Intl.Segmenter를 사용해 한국어 단어를 분리하고, 명사형 단어를 추출합니다.
 * 영어 불용어는 자동으로 제거됩니다.
 * @param text 입력 텍스트
 * @returns 추출된 키워드 배열
 */
export function extractKeywords(text: string): string[] {
  if (!text || text.trim().length === 0) {
    return [];
  }

  // 기본 전처리: 특수문자 제거
  const cleaned = text
    .replace(/[^\w\sㄱ-ㅎㅏ-ㅣ가-힣]/g, ' ')
    .trim();

  // Intl.Segmenter 기반 명사 추출
  const nouns = extractNounsWithSegmenter(cleaned);

  if (nouns.length > 0) {
    // 모듈 레벨 한국어 불용어로 필터링
    const filtered = nouns.filter(word => !KOREAN_STOP_WORDS.has(word));
    return rankByFrequency(filtered, 10);
  }

  // Intl.Segmenter로 추출된 키워드가 없을 경우 기본 방식으로 폴백
  const words = cleaned
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 1);
  const englishFiltered = removeEnglishStopWords(words);
  const filtered = englishFiltered.filter(word => !KOREAN_STOP_WORDS.has(word) && word.length >= 2);
  return rankByFrequency(filtered, 10);
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
