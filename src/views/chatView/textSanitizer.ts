export class ChatTextSanitizer {
  cleanTitle(title: string): string {
    return title
      .replace(/["'`]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  cleanSummary(summary: string): string {
    const lines = summary.split("\n");
    const cleaned = [] as string[];
    let index = 0;

    while (index < lines.length) {
      const line = lines[index].trim();
      if (line.startsWith("## 🤖") || line.startsWith("## 어시스턴트")) {
        index += 1;
        while (index < lines.length && lines[index].trim().startsWith("*")) {
          index += 1;
        }
        while (index < lines.length && lines[index].trim() === "") {
          index += 1;
        }
        continue;
      }
      if (line.startsWith("다음은 ") && line.includes("요약")) {
        index += 1;
        while (index < lines.length && lines[index].trim() === "") {
          index += 1;
        }
        continue;
      }
      cleaned.push(lines[index]);
      index += 1;
    }

    return cleaned.join("\n").trim();
  }

  isSummaryTooShort(summary: string): boolean {
    const compact = summary
      .replace(/```[\s\S]*?```/g, "")
      .replace(/\s+/g, "")
      .trim();

    return compact.length < 900;
  }
}
