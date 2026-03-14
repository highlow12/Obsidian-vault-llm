import type { FrontmatterComparison, SearchFilter } from "./types";

export type ParsedSearchQuery = {
  query: string;
  filter?: SearchFilter;
};

const TOKEN_REGEX = /"([^"]+)"|(\S+)/g;

function parsePrimitive(value: string): unknown {
  const trimmed = value.trim();
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
  return trimmed;
}

function normalizeFolderPath(value: string): string {
  return value.replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
}

function parseDateValue(value: string): Date | undefined {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }
  return date;
}

function parseTerms(value: string): string[] {
  const trimmed = value.trim();
  if (!trimmed) {
    return [];
  }

  if (/\s+OR\s+/i.test(trimmed)) {
    return trimmed
      .split(/\s+OR\s+/i)
      .map((term) => term.trim().replace(/^"|"$/g, ""))
      .filter((term) => term.length > 0);
  }

  const terms: string[] = [];
  const matches = trimmed.matchAll(TOKEN_REGEX);
  for (const match of matches) {
    const token = (match[1] ?? match[2] ?? "").trim();
    if (token) {
      terms.push(token);
    }
  }
  return terms;
}

function parseOrTerms(value: string): string[] {
  const trimmed = value.trim();
  if (!trimmed) return [];
  return trimmed
    .split(/\s+OR\s+/i)
    .map((term) => term.trim().replace(/^"|"$/g, ""))
    .filter((term) => term.length > 0);
}

function pushFrontmatterFilter(filter: SearchFilter, key: string, value: string): void {
  const trimmedKey = key.trim();
  const trimmedValue = value.trim();
  if (!trimmedKey || !trimmedValue) {
    return;
  }

  filter.frontmatter = {
    ...(filter.frontmatter ?? {}),
    [trimmedKey]: parsePrimitive(trimmedValue),
  };
}

function pushExcludedFrontmatterFilter(filter: SearchFilter, key: string, value: string): void {
  const trimmedKey = key.trim();
  const trimmedValue = value.trim();
  if (!trimmedKey || !trimmedValue) {
    return;
  }

  filter.excludedFrontmatter = {
    ...(filter.excludedFrontmatter ?? {}),
    [trimmedKey]: parsePrimitive(trimmedValue),
  };
}

function addTerms(target: string[] | undefined, values: string[]): string[] | undefined {
  if (values.length === 0) {
    return target;
  }
  return [...(target ?? []), ...values];
}

/**
 * 비교 연산자 접두사를 파싱합니다.
 * 예) ">5" → { op: ">", value: "5" }
 */
function parseComparisonValue(raw: string): { op: FrontmatterComparison["op"]; value: string } | undefined {
  if (raw.startsWith(">=")) return { op: ">=", value: raw.slice(2) };
  if (raw.startsWith("<=")) return { op: "<=", value: raw.slice(2) };
  if (raw.startsWith("!=")) return { op: "!=", value: raw.slice(2) };
  if (raw.startsWith(">")) return { op: ">", value: raw.slice(1) };
  if (raw.startsWith("<")) return { op: "<", value: raw.slice(1) };
  return undefined;
}

/**
 * takeOperatorValues: rawQuery에서 `operator:value` 패턴을 추출합니다.
 * 음성 연산자 접두사(-) 앞에 붙는 양성 연산자는 제외됩니다.
 * 예) "file:" 연산자는 "-file:value"는 매칭하지 않습니다.
 */
function takeOperatorValues(rawQuery: string, operator: string): { values: string[]; remaining: string } {
  let remaining = rawQuery;
  const values: string[] = [];

  // 부정 lookbehind (?<!-): 연산자 앞에 '-'가 없는 경우만 매칭
  const parenPattern = new RegExp(`(?<!-)${operator}:\\(([^)]*)\\)`, "gi");
  remaining = remaining.replace(parenPattern, (_, group) => {
    values.push(group.trim());
    return " ";
  });

  const quotePattern = new RegExp(`(?<!-)${operator}:"([^"]*)"`, "gi");
  remaining = remaining.replace(quotePattern, (_, quoted) => {
    values.push(quoted.trim());
    return " ";
  });

  const plainPattern = new RegExp(`(?<!-)${operator}:([^\\s]+)`, "gi");
  remaining = remaining.replace(plainPattern, (_, plain) => {
    values.push(String(plain).trim());
    return " ";
  });

  return { values: values.filter((v) => v.length > 0), remaining };
}

/**
 * applyPropertyToken: [property] 또는 [property:value] 형식의 토큰을 파싱하여 필터에 적용합니다.
 * OR 다중값과 비교 연산자를 지원합니다.
 */
function applyPropertyToken(filter: SearchFilter, token: string, isExcluded: boolean): void {
  const content = token.slice(isExcluded ? 2 : 1, -1);
  const colonIndex = content.indexOf(":");

  if (colonIndex < 0) {
    const propertyName = content.trim();
    if (!propertyName) return;
    if (isExcluded) {
      filter.excludedProperties = [...(filter.excludedProperties ?? []), propertyName];
    } else {
      filter.requiredProperties = [...(filter.requiredProperties ?? []), propertyName];
    }
    return;
  }

  const key = content.slice(0, colonIndex).trim();
  const value = content.slice(colonIndex + 1).trim();
  if (!key || !value) {
    return;
  }

  // 비교 연산자 처리: [property:>5], [property:<=10], [property:!=done]
  // 음성 비교([-property:>5])는 excluded=true 플래그와 함께 저장됩니다.
  const comparison = parseComparisonValue(value);
  if (comparison) {
    const parsed = parsePrimitive(comparison.value);
    const entry = isExcluded
      ? { key, op: comparison.op, value: parsed, excluded: true as const }
      : { key, op: comparison.op, value: parsed };
    filter.frontmatterComparisons = [
      ...(filter.frontmatterComparisons ?? []),
      entry,
    ];
    return;
  }

  // OR 다중값 처리: [property:val1 OR val2], -[property:val1 OR val2]
  const orParts = parseOrTerms(value);
  if (orParts.length > 1) {
    const orValues = orParts.map((v) => parsePrimitive(v));
    if (isExcluded) {
      filter.excludedFrontmatterOR = {
        ...(filter.excludedFrontmatterOR ?? {}),
        [key]: orValues,
      };
    } else {
      filter.frontmatterOR = {
        ...(filter.frontmatterOR ?? {}),
        [key]: orValues,
      };
    }
    return;
  }

  // 단일 값
  if (isExcluded) {
    pushExcludedFrontmatterFilter(filter, key, value.replace(/^"|"$/g, ""));
  } else {
    pushFrontmatterFilter(filter, key, value.replace(/^"|"$/g, ""));
  }
}

export function parseSearchQuery(rawQuery: string): ParsedSearchQuery {
  let workingQuery = rawQuery;
  const terms: string[] = [];
  const filter: SearchFilter = {};

  // property 연산자: [property], [property:value], -[property], -[property:value]
  workingQuery = workingQuery.replace(/-?\[[^\]]+\]/g, (token) => {
    if (token.startsWith("-[") && token.endsWith("]")) {
      applyPropertyToken(filter, token, true);
      return " ";
    }
    if (token.startsWith("[") && token.endsWith("]")) {
      applyPropertyToken(filter, token, false);
      return " ";
    }
    return token;
  });

  // 정규식 검색 /regex/: 슬래시로 둘러싸인 패턴 추출
  workingQuery = workingQuery.replace(/\/([^/]+)\//g, (_, pattern) => {
    try {
      filter.regexTerms = [...(filter.regexTerms ?? []), new RegExp(pattern, "i")];
    } catch {
      // 유효하지 않은 정규식은 무시
    }
    return " ";
  });

  // 음성 연산자(-operator:value)를 먼저 처리하여 양성 연산자가 잘못 소비하지 않도록 합니다.
  const minusPathParsed = takeOperatorValues(workingQuery, "-path");
  workingQuery = minusPathParsed.remaining;
  filter.excludedFolders = addTerms(
    filter.excludedFolders,
    minusPathParsed.values.map((v) => normalizeFolderPath(v))
  );

  const pathParsed = takeOperatorValues(workingQuery, "path");
  workingQuery = pathParsed.remaining;
  filter.folders = addTerms(filter.folders, pathParsed.values.map((v) => normalizeFolderPath(v)));

  const minusFileParsed = takeOperatorValues(workingQuery, "-file");
  workingQuery = minusFileParsed.remaining;
  filter.excludedFilePaths = addTerms(
    filter.excludedFilePaths,
    minusFileParsed.values.map((v) => normalizeFolderPath(v))
  );

  const fileParsed = takeOperatorValues(workingQuery, "file");
  workingQuery = fileParsed.remaining;
  filter.filePaths = addTerms(filter.filePaths, fileParsed.values.map((v) => normalizeFolderPath(v)));

  const minusFolderParsed = takeOperatorValues(workingQuery, "-folder");
  workingQuery = minusFolderParsed.remaining;
  filter.excludedFolders = addTerms(
    filter.excludedFolders,
    minusFolderParsed.values.map((v) => normalizeFolderPath(v))
  );

  const folderParsed = takeOperatorValues(workingQuery, "folder");
  workingQuery = folderParsed.remaining;
  filter.folders = addTerms(filter.folders, folderParsed.values.map((v) => normalizeFolderPath(v)));

  const minusTagParsed = takeOperatorValues(workingQuery, "-tag");
  workingQuery = minusTagParsed.remaining;
  filter.excludedTags = addTerms(
    filter.excludedTags,
    minusTagParsed.values.map((v) => v.replace(/^#/, "").trim().toLowerCase())
  );

  const tagParsed = takeOperatorValues(workingQuery, "tag");
  workingQuery = tagParsed.remaining;
  filter.tags = addTerms(
    filter.tags,
    tagParsed.values.map((v) => v.replace(/^#/, "").trim().toLowerCase())
  );

  const contentParsed = takeOperatorValues(workingQuery, "content");
  workingQuery = contentParsed.remaining;
  filter.contentTerms = addTerms(filter.contentTerms, contentParsed.values.flatMap((v) => parseTerms(v)));

  const lineParsed = takeOperatorValues(workingQuery, "line");
  workingQuery = lineParsed.remaining;
  filter.lineTerms = addTerms(filter.lineTerms, lineParsed.values.flatMap((v) => parseTerms(v)));

  const blockParsed = takeOperatorValues(workingQuery, "block");
  workingQuery = blockParsed.remaining;
  filter.blockTerms = addTerms(filter.blockTerms, blockParsed.values.flatMap((v) => parseTerms(v)));

  const sectionParsed = takeOperatorValues(workingQuery, "section");
  workingQuery = sectionParsed.remaining;
  filter.sectionTerms = addTerms(filter.sectionTerms, sectionParsed.values.flatMap((v) => parseTerms(v)));

  const taskParsed = takeOperatorValues(workingQuery, "task");
  workingQuery = taskParsed.remaining;
  filter.taskTerms = addTerms(filter.taskTerms, taskParsed.values.flatMap((v) => parseTerms(v)));

  const taskTodoParsed = takeOperatorValues(workingQuery, "task-todo");
  workingQuery = taskTodoParsed.remaining;
  filter.taskTodoTerms = addTerms(filter.taskTodoTerms, taskTodoParsed.values.flatMap((v) => parseTerms(v)));

  const taskDoneParsed = takeOperatorValues(workingQuery, "task-done");
  workingQuery = taskDoneParsed.remaining;
  filter.taskDoneTerms = addTerms(filter.taskDoneTerms, taskDoneParsed.values.flatMap((v) => parseTerms(v)));

  const matchCaseParsed = takeOperatorValues(workingQuery, "match-case");
  workingQuery = matchCaseParsed.remaining;
  if (matchCaseParsed.values.length > 0) {
    filter.caseMode = "match";
    terms.push(...matchCaseParsed.values.flatMap((v) => parseTerms(v)));
  }

  const ignoreCaseParsed = takeOperatorValues(workingQuery, "ignore-case");
  workingQuery = ignoreCaseParsed.remaining;
  if (ignoreCaseParsed.values.length > 0) {
    filter.caseMode = "ignore";
    terms.push(...ignoreCaseParsed.values.flatMap((v) => parseTerms(v)));
  }

  // 나머지 토큰 파싱: 커스텀 하위호환 문법 및 일반 검색어
  const matches = workingQuery.matchAll(TOKEN_REGEX);
  for (const match of matches) {
    const token = (match[1] ?? match[2] ?? "").trim();
    if (!token) {
      continue;
    }

    // 단독 제외 항: -term (연산자가 아닌 일반 단어 앞에 붙은 '-')
    if (match[2] && token.startsWith("-") && token.length > 1 && !token.includes(":")) {
      const excluded = token.slice(1);
      if (excluded) {
        filter.excludedTerms = [...(filter.excludedTerms ?? []), excluded];
        continue;
      }
    }

    if (token === "OR") {
      continue;
    }

    if (token.startsWith("meta.")) {
      const colonIndex = token.indexOf(":");
      if (colonIndex > 5) {
        const key = token.slice(5, colonIndex).trim();
        const value = token.slice(colonIndex + 1).trim();
        pushFrontmatterFilter(filter, key, value);
        continue;
      }
    }

    if (token.startsWith("-meta.")) {
      const colonIndex = token.indexOf(":");
      if (colonIndex > 6) {
        const key = token.slice(6, colonIndex).trim();
        const value = token.slice(colonIndex + 1).trim();
        pushExcludedFrontmatterFilter(filter, key, value);
        continue;
      }
    }

    if (token.startsWith("fm.")) {
      const colonIndex = token.indexOf(":");
      if (colonIndex > 3) {
        const key = token.slice(3, colonIndex).trim();
        const value = token.slice(colonIndex + 1).trim();
        pushFrontmatterFilter(filter, key, value);
        continue;
      }
    }

    if (token.startsWith("-fm.")) {
      const colonIndex = token.indexOf(":");
      if (colonIndex > 4) {
        const key = token.slice(4, colonIndex).trim();
        const value = token.slice(colonIndex + 1).trim();
        pushExcludedFrontmatterFilter(filter, key, value);
        continue;
      }
    }

    if (token.startsWith("date>=")) {
      const from = parseDateValue(token.slice("date>=".length));
      if (from) {
        filter.dateRange = {
          ...(filter.dateRange ?? {}),
          from,
        };
      }
      continue;
    }

    if (token.startsWith("date<=")) {
      const to = parseDateValue(token.slice("date<=".length));
      if (to) {
        filter.dateRange = {
          ...(filter.dateRange ?? {}),
          to,
        };
      }
      continue;
    }

    terms.push(token);
  }

  if (filter.tags && filter.tags.length > 0) {
    filter.tagOperator = "OR";
  }

  const hasFilter =
    (filter.folders?.length ?? 0) > 0 ||
    (filter.excludedFolders?.length ?? 0) > 0 ||
    (filter.filePaths?.length ?? 0) > 0 ||
    (filter.excludedFilePaths?.length ?? 0) > 0 ||
    (filter.contentTerms?.length ?? 0) > 0 ||
    (filter.lineTerms?.length ?? 0) > 0 ||
    (filter.blockTerms?.length ?? 0) > 0 ||
    (filter.sectionTerms?.length ?? 0) > 0 ||
    (filter.taskTerms?.length ?? 0) > 0 ||
    (filter.taskTodoTerms?.length ?? 0) > 0 ||
    (filter.taskDoneTerms?.length ?? 0) > 0 ||
    (filter.tags?.length ?? 0) > 0 ||
    (filter.excludedTags?.length ?? 0) > 0 ||
    (filter.requiredProperties?.length ?? 0) > 0 ||
    (filter.excludedProperties?.length ?? 0) > 0 ||
    Object.keys(filter.frontmatter ?? {}).length > 0 ||
    Object.keys(filter.excludedFrontmatter ?? {}).length > 0 ||
    Object.keys(filter.frontmatterOR ?? {}).length > 0 ||
    Object.keys(filter.excludedFrontmatterOR ?? {}).length > 0 ||
    (filter.frontmatterComparisons?.length ?? 0) > 0 ||
    (filter.excludedTerms?.length ?? 0) > 0 ||
    (filter.regexTerms?.length ?? 0) > 0 ||
    filter.caseMode === "match" ||
    filter.caseMode === "ignore" ||
    !!filter.dateRange?.from ||
    !!filter.dateRange?.to;

  return {
    query: terms.join(" ").trim(),
    filter: hasFilter ? filter : undefined,
  };
}
