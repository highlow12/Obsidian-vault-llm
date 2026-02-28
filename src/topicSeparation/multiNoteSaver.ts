/**
 * 다중 노트 저장 모듈
 * 
 * 주제별로 분리된 대화를 여러 노트로 저장하고 링크로 연결합니다.
 */

import type { Vault, App, PluginManifest } from 'obsidian';
import { normalizePath } from 'obsidian';
import type { ConversationSegment, SegmentLink } from './types';
import { convertToMarkdown } from '../conversation';

export interface MultiNoteSaveResult {
  notePaths: string[];
  mainNotePath: string;
}

/**
 * 세그먼트를 개별 노트로 저장합니다
 * @param vault Obsidian Vault
 * @param segments 대화 세그먼트 배열
 * @param links 세그먼트 간 링크
 * @param baseTitle 기본 제목
 * @param outputFolder 저장 폴더
 * @param app Obsidian 앱 인스턴스 (로깅용)
 * @param manifest 플러그인 매니페스트 (로깅용)
 * @returns 저장된 노트 경로들
 */
export async function saveSegmentsAsNotes(
  vault: Vault,
  segments: ConversationSegment[],
  links: SegmentLink[],
  baseTitle: string,
  outputFolder: string,
  app?: App,
  manifest?: PluginManifest
): Promise<MultiNoteSaveResult> {
  const notePaths: string[] = [];
  const cleanedFolder = outputFolder ? normalizePath(outputFolder).replace(/^\/+/, '') : '';

  // 폴더 생성
  if (cleanedFolder) {
    await ensureFolderExists(vault, cleanedFolder);
  }

  // 각 세그먼트를 개별 노트로 저장
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    const segmentTitle = await generateSegmentTitle(segment, baseTitle, i + 1);
    const markdown = generateSegmentMarkdown(segment, i, segments.length, links, notePaths);

    const filename = sanitizeFilename(segmentTitle) + '.md';
    const targetPath = await ensureUniquePath(
      vault,
      normalizePath(cleanedFolder ? `${cleanedFolder}/${filename}` : filename)
    );

    await vault.create(targetPath, markdown);
    notePaths.push(targetPath);
  }

  // 메인 인덱스 노트 생성
  const mainNotePath = await createMainIndexNote(vault, segments, notePaths, baseTitle, cleanedFolder);

  return {
    notePaths,
    mainNotePath
  };
}

/**
 * 세그먼트의 제목을 생성합니다
 */
async function generateSegmentTitle(
  segment: ConversationSegment,
  baseTitle: string,
  segmentNumber: number
): Promise<string> {
  // 키워드 기반 제목 생성
  const topKeywords = segment.keywords.slice(0, 3).join(', ');
  
  if (topKeywords) {
    return `${baseTitle} - ${segmentNumber}. ${topKeywords}`;
  } else {
    return `${baseTitle} - 주제 ${segmentNumber}`;
  }
}

/**
 * 세그먼트를 마크다운으로 변환합니다
 */
function generateSegmentMarkdown(
  segment: ConversationSegment,
  segmentIndex: number,
  totalSegments: number,
  links: SegmentLink[],
  notePaths: string[]
): string {
  const lines: string[] = [];

  // 메타데이터
  lines.push('---');
  lines.push(`segment: ${segmentIndex + 1}/${totalSegments}`);
  lines.push(`keywords: [${segment.keywords.join(', ')}]`);
  lines.push(`avgSimilarity: ${segment.avgSimilarity.toFixed(3)}`);
  lines.push('---');
  lines.push('');

  // 제목
  lines.push(`# 주제 ${segmentIndex + 1}`);
  lines.push('');

  // 키워드
  if (segment.keywords.length > 0) {
    lines.push('## 주요 키워드');
    lines.push('');
    lines.push(segment.keywords.map(k => `- ${k}`).join('\n'));
    lines.push('');
  }

  // 연관 주제 링크
  const relatedLinks = links.filter(
    link => link.fromSegment === segmentIndex || link.toSegment === segmentIndex
  );

  if (relatedLinks.length > 0) {
    lines.push('## 연관 주제');
    lines.push('');

    for (const link of relatedLinks) {
      const targetIndex = link.fromSegment === segmentIndex ? link.toSegment : link.fromSegment;
      
      if (notePaths[targetIndex]) {
        const targetPath = notePaths[targetIndex];
        const targetName = targetPath.split('/').pop()?.replace('.md', '') || `주제 ${targetIndex + 1}`;
        const commonKeywordsText = link.commonKeywords.slice(0, 3).join(', ');
        
        lines.push(`- [[${targetPath.replace('.md', '')}|${targetName}]] (${commonKeywordsText})`);
      }
    }
    lines.push('');
  }

  // 대화 내용
  lines.push('## 대화 내용');
  lines.push('');

  for (const turn of segment.turns) {
    const roleEmoji = turn.role === 'user' ? '👤' : '🤖';
    const roleLabel = turn.role === 'user' ? '사용자' : '어시스턴트';
    
    lines.push(`### ${roleEmoji} ${roleLabel}`);
    
    if (turn.timestamp) {
      const timestamp = typeof turn.timestamp === 'string'
        ? turn.timestamp
        : turn.timestamp.toISOString();
      lines.push(`*${timestamp}*`);
      lines.push('');
    }
    
    lines.push(turn.content);
    lines.push('');
  }

  return lines.join('\n');
}

/**
 * 메인 인덱스 노트를 생성합니다
 */
async function createMainIndexNote(
  vault: Vault,
  segments: ConversationSegment[],
  notePaths: string[],
  baseTitle: string,
  folder: string
): Promise<string> {
  const lines: string[] = [];

  // 제목
  lines.push(`# ${baseTitle} - 전체 인덱스`);
  lines.push('');

  // 메타데이터
  lines.push('---');
  lines.push(`totalSegments: ${segments.length}`);
  lines.push(`createdAt: ${new Date().toISOString()}`);
  lines.push('---');
  lines.push('');

  // 요약
  lines.push('## 개요');
  lines.push('');
  lines.push(`이 대화는 ${segments.length}개의 주제로 분리되었습니다.`);
  lines.push('');

  // 주제 목록
  lines.push('## 주제 목록');
  lines.push('');

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    const notePath = notePaths[i];
    const noteName = notePath.split('/').pop()?.replace('.md', '') || `주제 ${i + 1}`;
    const keywords = segment.keywords.slice(0, 3).join(', ');

    lines.push(`### ${i + 1}. [[${notePath.replace('.md', '')}|${noteName}]]`);
    lines.push('');
    lines.push(`**키워드**: ${keywords}`);
    lines.push(`**턴 수**: ${segment.turns.length}`);
    lines.push(`**유사도**: ${(segment.avgSimilarity * 100).toFixed(1)}%`);
    lines.push('');
  }

  const markdown = lines.join('\n');
  const filename = sanitizeFilename(baseTitle) + '-인덱스.md';
  const targetPath = await ensureUniquePath(
    vault,
    normalizePath(folder ? `${folder}/${filename}` : filename)
  );

  await vault.create(targetPath, markdown);
  return targetPath;
}

/**
 * 파일명을 안전하게 변환합니다
 */
function sanitizeFilename(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    return 'untitled';
  }

  const cleaned = trimmed
    .replace(/[\\/:*?"<>|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return cleaned || 'untitled';
}

/**
 * 폴더가 존재하는지 확인하고 없으면 생성합니다
 */
async function ensureFolderExists(vault: Vault, folder: string): Promise<void> {
  if (!vault.getFolderByPath(folder)) {
    await vault.createFolder(folder);
  }
}

/**
 * 고유한 파일 경로를 보장합니다
 */
async function ensureUniquePath(vault: Vault, path: string): Promise<string> {
  const normalized = normalizePath(path);
  const extensionIndex = normalized.lastIndexOf('.md');
  const base = extensionIndex === -1 ? normalized : normalized.slice(0, extensionIndex);
  const extension = extensionIndex === -1 ? '' : '.md';

  let candidate = normalized;
  let count = 1;

  while (vault.getAbstractFileByPath(candidate) !== null) {
    candidate = `${base}-${count}${extension}`;
    count += 1;
  }

  return candidate;
}
