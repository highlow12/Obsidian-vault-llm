// 마크다운 파서 - frontmatter, 태그, 링크 추출

import matter from "gray-matter";
import { createHash } from "crypto";

export interface ParsedNote {
  content: string;
  frontmatter: Record<string, unknown>;
  tags: string[];
  links: string[];
  title: string;
  sections: Section[];
}

export interface Section {
  heading: string;
  content: string;
  level: number;
  position: number;
}

/**
 * 마크다운 파일을 파싱하여 메타데이터를 추출합니다.
 */
export function parseMarkdown(filePath: string, content: string): ParsedNote {
  // Frontmatter 파싱
  const parsed = matter(content);
  const frontmatter = parsed.data as Record<string, unknown>;
  const bodyContent = parsed.content;

  // 제목 추출 (frontmatter의 title 또는 파일명)
  const title = (frontmatter.title as string) || extractTitleFromPath(filePath);

  // 태그 추출 (#태그 형식)
  const tags = extractTags(bodyContent, frontmatter);

  // 링크 추출 ([[링크]] 형식)
  const links = extractLinks(bodyContent);

  // 섹션 분리
  const sections = extractSections(bodyContent);

  return {
    content: bodyContent,
    frontmatter,
    tags,
    links,
    title,
    sections,
  };
}

/**
 * 파일 경로에서 제목 추출
 */
function extractTitleFromPath(filePath: string): string {
  const fileName = filePath.split("/").pop() || "";
  return fileName.replace(/\.md$/, "");
}

/**
 * 본문과 frontmatter에서 태그 추출
 */
function extractTags(content: string, frontmatter: Record<string, unknown>): string[] {
  const tags = new Set<string>();

  // Frontmatter의 tags 필드
  if (Array.isArray(frontmatter.tags)) {
    frontmatter.tags.forEach((tag) => {
      if (typeof tag === "string") {
        tags.add(tag.replace(/^#/, ""));
      }
    });
  }

  // 본문에서 #태그 추출
  const hashtagRegex = /#([a-zA-Z0-9가-힣_-]+)/g;
  let match;
  while ((match = hashtagRegex.exec(content)) !== null) {
    tags.add(match[1]);
  }

  return Array.from(tags);
}

/**
 * Obsidian 링크 추출 ([[링크]] 형식)
 */
function extractLinks(content: string): string[] {
  const links = new Set<string>();
  const linkRegex = /\[\[([^\]]+)\]\]/g;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    // 별칭 처리 [[링크|별칭]]
    const link = match[1].split("|")[0].trim();
    links.add(link);
  }
  return Array.from(links);
}

/**
 * 헤더 기준으로 섹션 분리
 */
function extractSections(content: string): Section[] {
  const sections: Section[] = [];
  const lines = content.split("\n");

  let currentSection: Section | null = null;
  let currentContent: string[] = [];
  let position = 0;

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)$/);

    if (headerMatch) {
      // 이전 섹션 저장
      if (currentSection) {
        currentSection.content = currentContent.join("\n").trim();
        sections.push(currentSection);
      }

      // 새 섹션 시작
      currentSection = {
        heading: headerMatch[2].trim(),
        content: "",
        level: headerMatch[1].length,
        position,
      };
      currentContent = [];
    } else if (currentSection) {
      currentContent.push(line);
    } else {
      // 헤더 없는 첫 부분
      if (sections.length === 0) {
        currentSection = {
          heading: "",
          content: "",
          level: 0,
          position,
        };
      }
      currentContent.push(line);
    }

    position += line.length + 1; // +1 for newline
  }

  // 마지막 섹션 저장
  if (currentSection) {
    currentSection.content = currentContent.join("\n").trim();
    sections.push(currentSection);
  }

  return sections;
}

/**
 * 파일 내용의 해시 생성
 */
export function computeHash(content: string): string {
  return createHash("sha256").update(content).digest("hex");
}
