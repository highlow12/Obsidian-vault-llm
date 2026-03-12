import type { SearchFilter } from "./types";

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

function takeOperatorValues(rawQuery: string, operator: string): { values: string[]; remaining: string } {
  let remaining = rawQuery;
  const values: string[] = [];

  const parenPattern = new RegExp(`${operator}:\\(([^)]*)\\)`, "gi");
  remaining = remaining.replace(parenPattern, (_, group) => {
    values.push(group.trim());
    return " ";
  });

  const quotePattern = new RegExp(`${operator}:\"([^\"]*)\"`, "gi");
  remaining = remaining.replace(quotePattern, (_, quoted) => {
    values.push(quoted.trim());
    return " ";
  });

  const plainPattern = new RegExp(`${operator}:([^\\s]+)`, "gi");
  remaining = remaining.replace(plainPattern, (_, plain) => {
    values.push(String(plain).trim());
    return " ";
  });

  return { values: values.filter((v) => v.length > 0), remaining };
}

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

  const terms = parseTerms(value);
  if (terms.length <= 1) {
    if (isExcluded) {
      pushExcludedFrontmatterFilter(filter, key, value.replace(/^"|"$/g, ""));
    } else {
      pushFrontmatterFilter(filter, key, value.replace(/^"|"$/g, ""));
    }
    return;
  }

  // OR 그룹은 현재 구현에서 다중 허용값 집합으로 저장하지 않으므로,
  // 연산자 문자열을 일반 쿼리에 남겨 Obsidian 1차 검색이 처리하도록 합니다.
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

  const pathParsed = takeOperatorValues(workingQuery, "path");
  workingQuery = pathParsed.remaining;
  filter.folders = addTerms(filter.folders, pathParsed.values.map((v) => normalizeFolderPath(v)));

  const minusPathParsed = takeOperatorValues(workingQuery, "-path");
  workingQuery = minusPathParsed.remaining;
  filter.excludedFolders = addTerms(
    filter.excludedFolders,
    minusPathParsed.values.map((v) => normalizeFolderPath(v))
  );

  const fileParsed = takeOperatorValues(workingQuery, "file");
  workingQuery = fileParsed.remaining;
  filter.filePaths = addTerms(filter.filePaths, fileParsed.values.map((v) => normalizeFolderPath(v)));

  const minusFileParsed = takeOperatorValues(workingQuery, "-file");
  workingQuery = minusFileParsed.remaining;
  filter.excludedFilePaths = addTerms(
    filter.excludedFilePaths,
    minusFileParsed.values.map((v) => normalizeFolderPath(v))
  );

  const folderParsed = takeOperatorValues(workingQuery, "folder");
  workingQuery = folderParsed.remaining;
  filter.folders = addTerms(filter.folders, folderParsed.values.map((v) => normalizeFolderPath(v)));

  const minusFolderParsed = takeOperatorValues(workingQuery, "-folder");
  workingQuery = minusFolderParsed.remaining;
  filter.excludedFolders = addTerms(
    filter.excludedFolders,
    minusFolderParsed.values.map((v) => normalizeFolderPath(v))
  );

  const tagParsed = takeOperatorValues(workingQuery, "tag");
  workingQuery = tagParsed.remaining;
  filter.tags = addTerms(
    filter.tags,
    tagParsed.values.map((v) => v.replace(/^#/, "").trim().toLowerCase())
  );

  const minusTagParsed = takeOperatorValues(workingQuery, "-tag");
  workingQuery = minusTagParsed.remaining;
  filter.excludedTags = addTerms(
    filter.excludedTags,
    minusTagParsed.values.map((v) => v.replace(/^#/, "").trim().toLowerCase())
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

  // 커스텀 하위호환 문법
  const matches = workingQuery.matchAll(TOKEN_REGEX);
  for (const match of matches) {
    const token = (match[1] ?? match[2] ?? "").trim();
    if (!token) {
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
    filter.caseMode === "match" ||
    filter.caseMode === "ignore" ||
    !!filter.dateRange?.from ||
    !!filter.dateRange?.to;

  return {
    query: terms.join(" ").trim(),
    filter: hasFilter ? filter : undefined,
  };
}
