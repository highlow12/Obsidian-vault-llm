import { Modal } from "obsidian";
import type { Plugin } from "obsidian";

export type SaveConversationForm = {
  inputPath: string;
  sessionId: string;
  outputFolder: string;
};

export class SaveConversationModal extends Modal {
  private readonly onSubmit: (value: SaveConversationForm) => void;

  constructor(plugin: Plugin, onSubmit: (value: SaveConversationForm) => void) {
    super(plugin.app);
    this.onSubmit = onSubmit;
  }

  onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();

    contentEl.createEl("h2", { text: "대화 JSON 저장" });

    const inputPathEl = contentEl.createEl("input", { type: "text" });
    inputPathEl.placeholder = "JSON 파일 경로 (볼트 기준)";

    const sessionIdEl = contentEl.createEl("input", { type: "text" });
    sessionIdEl.placeholder = "세션 ID";

    const outputFolderEl = contentEl.createEl("input", { type: "text" });
    outputFolderEl.placeholder = "저장 폴더 (선택, 볼트 기준)";

    const submitButton = contentEl.createEl("button", { text: "저장" });
    submitButton.addEventListener("click", () => {
      this.onSubmit({
        inputPath: inputPathEl.value.trim(),
        sessionId: sessionIdEl.value.trim(),
        outputFolder: outputFolderEl.value.trim()
      });
      this.close();
    });
  }
}
