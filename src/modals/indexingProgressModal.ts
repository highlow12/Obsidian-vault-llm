import { Modal, App } from "obsidian";
import type { IndexingProgress } from "../indexing/types";

export class IndexingProgressModal extends Modal {
  private progress: IndexingProgress;
  private progressBarEl: HTMLElement | null = null;
  private statusEl: HTMLElement | null = null;
  private detailsEl: HTMLElement | null = null;
  private cancelButton: HTMLButtonElement | null = null;
  private onCancel: (() => void) | null = null;

  constructor(app: App, onCancel?: () => void) {
    super(app);
    this.progress = {
      totalFiles: 0,
      processedFiles: 0,
      status: "initializing",
    };
    this.onCancel = onCancel || null;
  }

  onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("indexing-progress-modal");

    // 제목
    contentEl.createEl("h2", { text: "볼트 인덱싱 진행 중" });

    // 상태 텍스트
    this.statusEl = contentEl.createDiv({ cls: "indexing-status" });
    this.updateStatusText();

    // 진행도 바 컨테이너
    const progressContainer = contentEl.createDiv({ cls: "indexing-progress-container" });
    const progressBarBg = progressContainer.createDiv({ cls: "indexing-progress-bg" });
    this.progressBarEl = progressBarBg.createDiv({ cls: "indexing-progress-bar" });

    // 진행도 퍼센트
    const progressText = contentEl.createDiv({ cls: "indexing-progress-text" });
    progressText.textContent = "0%";
    this.progressBarEl.dataset.textEl = progressText.id = "progress-text";

    // 세부 정보
    this.detailsEl = contentEl.createDiv({ cls: "indexing-details" });
    this.updateDetails();

    // 취소 버튼
    if (this.onCancel) {
      const buttonContainer = contentEl.createDiv({ cls: "indexing-button-container" });
      this.cancelButton = buttonContainer.createEl("button", { text: "취소" });
      this.cancelButton.addEventListener("click", () => {
        if (this.onCancel) {
          this.onCancel();
          this.close();
        }
      });
    }
  }

  /**
   * 진행도 업데이트
   */
  updateProgress(progress: IndexingProgress): void {
    this.progress = progress;
    this.updateStatusText();
    this.updateProgressBar();
    this.updateDetails();

    // 완료되면 자동으로 닫기
    if (progress.status === "completed") {
      setTimeout(() => this.close(), 1500);
    }
  }

  /**
   * 상태 텍스트 업데이트
   */
  private updateStatusText(): void {
    if (!this.statusEl) return;

    let statusText = "";
    switch (this.progress.status) {
      case "initializing":
        statusText = "초기화 중...";
        break;
      case "indexing":
        statusText = `인덱싱 중... (${this.progress.processedFiles}/${this.progress.totalFiles})`;
        break;
      case "completed":
        statusText = "인덱싱 완료!";
        break;
      case "error":
        statusText = `에러 발생: ${this.progress.error || "알 수 없는 오류"}`;
        break;
      case "cancelled":
        statusText = "인덱싱이 취소되었습니다";
        break;
    }

    this.statusEl.textContent = statusText;
  }

  /**
   * 진행도 바 업데이트
   */
  private updateProgressBar(): void {
    if (!this.progressBarEl) return;

    const percentage =
      this.progress.totalFiles > 0
        ? Math.round((this.progress.processedFiles / this.progress.totalFiles) * 100)
        : 0;

    this.progressBarEl.style.width = `${percentage}%`;

    const progressText = document.getElementById("progress-text");
    if (progressText) {
      progressText.textContent = `${percentage}%`;
    }
  }

  /**
   * 세부 정보 업데이트
   */
  private updateDetails(): void {
    if (!this.detailsEl) return;

    let details = "";
    if (this.progress.currentFile) {
      // 파일명만 표시 (경로 제외)
      const fileName = this.progress.currentFile.split("/").pop() || this.progress.currentFile;
      details = `현재 파일: ${fileName}`;
    } else if (this.progress.status === "initializing") {
      details = "파일 목록을 스캔하는 중...";
    } else if (this.progress.status === "completed") {
      details = `총 ${this.progress.totalFiles}개의 파일을 처리했습니다`;
    }

    this.detailsEl.textContent = details;
  }

  onClose(): void {
    const { contentEl } = this;
    contentEl.empty();
  }
}
