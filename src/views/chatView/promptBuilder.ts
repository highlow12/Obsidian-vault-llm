import type { ConversationTurn } from "../../conversation";

export class ChatPromptBuilder {
  buildWikiSummaryPrompt(turns: ConversationTurn[], enforceLongForm: boolean = false): string {
    const transcript = turns
      .map((turn) => {
        const roleLabel =
          turn.role === "user" ? "사용자" :
          turn.role === "assistant" ? "어시스턴트" :
          "시스템";
        return `[${roleLabel}] ${turn.content}`;
      })
      .join("\n\n");

    const minLength = enforceLongForm ? 1800 : 1200;

    return `다음 대화를 자세한 위키 요약문으로 작성해 주세요.\n\n` +
      `요구사항:\n` +
      `- 출력은 YAML frontmatter 와 본문만 작성\n` +
      `- # 제목은 쓰지 말고 바로 본문부터 시작\n` +
      `- 형식(헤더/목록/표)은 자유롭게 선택하되, 가독성은 유지\n` +
      `- 단순 압축 요약이 아니라 맥락, 근거, 결론, 후속 과제를 충분히 설명\n` +
      `- 대화 흐름(문제 제기 -> 검토 -> 판단/결정 -> 실행 계획)이 보이게 정리\n` +
      `- 등장한 주요 개념, 조건, 제약, 대안, 트레이드오프를 빠짐없이 포함\n` +
      `- 실행 가능한 항목은 구체적 행동 단위로 작성(누가/무엇을/어떻게)\n` +
      `- 불확실한 내용과 추가 확인이 필요한 항목을 분리해서 명시\n` +
      `- 한국어로 작성\n` +
      `- 최소 ${minLength}자 이상으로 충분히 자세히 작성\n` +
      `- "어시스턴트", 타임스탬프, 서문성 멘트, 사족 없이 본문만 출력\n\n` +
      `대화 기록:\n${transcript}`;
  }

  buildSessionTitlePrompt(question: string): string {
    return (
      "다음 질문을 보고 세션 제목을 만들어 주세요. " +
      "조건: 12~20자 내외의 간결한 제목, 이모지/따옴표 금지, 제목만 출력(다른 텍스트 없이).\n\n" +
      `질문: ${question}`
    );
  }

  buildSaveTitlePrompt(turns: ConversationTurn[]): string {
    const transcript = turns
      .map((turn) => {
        const roleLabel =
          turn.role === "user" ? "사용자" :
          turn.role === "assistant" ? "어시스턴트" :
          "시스템";
        return `[${roleLabel}] ${turn.content}`;
      })
      .join("\n\n");

    return (
      "다음 대화 내용을 보고 문장형 제목을 만들어 주세요. " +
      "조건: 20~40자 내외, 이모지/따옴표 금지, 제목만 출력(다른 텍스트 없이).\n\n" +
      `대화:\n${transcript}`
    );
  }
}
