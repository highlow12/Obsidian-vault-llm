// Obsidian 볼트 파일 변경 감지 및 자동 인덱싱

import { TFile, Vault, Notice } from "obsidian";
import { Indexer, ProgressCallback } from "./indexing/indexer";
import { IndexingProgress } from "./indexing/types";

export class VaultWatcher {
  private vault: Vault;
  private indexer: Indexer | null = null;
  private isIndexing: boolean = false;
  private indexQueue: Set<string> = new Set();
  private indexingInProgress: Set<string> = new Set(); // 진행 중인 인덱싱 추적

  constructor(vault: Vault) {
    this.vault = vault;
  }

  /**
   * 인덱서 설정
   */
  setIndexer(indexer: Indexer | null): void {
    this.indexer = indexer;
  }

  /**
   * 초기 인덱싱 실행 (진행도 콜백 지원)
   */
  async indexVault(progressCallback?: ProgressCallback): Promise<void> {
    if (!this.indexer) {
      throw new Error("인덱서가 초기화되지 않았습니다");
    }

    if (this.isIndexing) {
      new Notice("이미 인덱싱이 진행 중입니다");
      return;
    }

    this.isIndexing = true;
    this.indexer.resetCancel();

    try {
      const mdFiles = this.vault.getMarkdownFiles();
      console.log(`인덱싱할 파일 수: ${mdFiles.length}`);

      // 초기 진행도 콜백
      if (progressCallback) {
        progressCallback({
          totalFiles: mdFiles.length,
          processedFiles: 0,
          status: "indexing",
        });
      }

      let indexed = 0;
      let failed = 0;

      for (const file of mdFiles) {
        try {
          const content = await this.vault.read(file);
          
          // 파일 수정 시간 가져오기
          const modifiedAt = file.stat?.mtime || undefined;
          
          await this.indexer.indexFile(file.path, content, modifiedAt);
          indexed++;

          // 진행도 업데이트
          if (progressCallback) {
            progressCallback({
              totalFiles: mdFiles.length,
              processedFiles: indexed,
              currentFile: file.path,
              status: "indexing",
            });
          }
        } catch (error: any) {
          if (error.message === "인덱싱이 취소되었습니다") {
            console.log("인덱싱이 사용자에 의해 취소되었습니다");
            if (progressCallback) {
              progressCallback({
                totalFiles: mdFiles.length,
                processedFiles: indexed,
                status: "cancelled",
              });
            }
            return;
          }
          
          console.error(`파일 인덱싱 실패: ${file.path}`, error);
          failed++;
        }
      }

      // 완료 콜백
      if (progressCallback) {
        progressCallback({
          totalFiles: mdFiles.length,
          processedFiles: indexed,
          status: "completed",
        });
      }

      new Notice(`인덱싱 완료: ${indexed}개 성공, ${failed}개 실패`);
    } catch (error) {
      console.error("볼트 인덱싱 중 오류:", error);
      
      if (progressCallback) {
        progressCallback({
          totalFiles: 0,
          processedFiles: 0,
          status: "error",
          error: String(error),
        });
      }
      
      new Notice("인덱싱 중 오류가 발생했습니다");
    } finally {
      this.isIndexing = false;
    }
  }

  /**
   * 인덱싱 취소
   */
  cancelIndexing(): void {
    if (this.indexer) {
      this.indexer.cancel();
    }
  }

  /**
   * 파일 생성 이벤트 처리
   */
  async onFileCreate(file: TFile): Promise<void> {
    if (!this.indexer || file.extension !== "md") {
      return;
    }

    try {
      const content = await this.vault.read(file);
      const modifiedAt = file.stat?.mtime || undefined;
      await this.indexer.indexFile(file.path, content, modifiedAt);
      console.log(`파일 생성 인덱싱: ${file.path}`);
    } catch (error) {
      console.error(`파일 생성 인덱싱 실패: ${file.path}`, error);
    }
  }

  /**
   * 파일 수정 이벤트 처리
   */
  async onFileModify(file: TFile): Promise<void> {
    if (!this.indexer || file.extension !== "md") {
      return;
    }

    // 중복 인덱싱 방지를 위해 큐에 추가
    this.indexQueue.add(file.path);

    // 100ms 후에 인덱싱 (연속 수정 방지)
    setTimeout(async () => {
      if (this.indexQueue.has(file.path) && !this.indexingInProgress.has(file.path)) {
        this.indexQueue.delete(file.path);
        this.indexingInProgress.add(file.path);

        try {
          const content = await this.vault.read(file);
          const modifiedAt = file.stat?.mtime || undefined;
          
          if (this.indexer) {
            await this.indexer.indexFile(file.path, content, modifiedAt);
          }
          console.log(`파일 수정 인덱싱: ${file.path}`);
        } catch (error) {
          console.error(`파일 수정 인덱싱 실패: ${file.path}`, error);
        } finally {
          this.indexingInProgress.delete(file.path);
        }
      }
    }, 100);
  }

  /**
   * 파일 삭제 이벤트 처리
   */
  async onFileDelete(file: TFile): Promise<void> {
    if (!this.indexer || file.extension !== "md") {
      return;
    }

    try {
      await this.indexer.deleteFile(file.path);
      console.log(`파일 삭제 처리: ${file.path}`);
    } catch (error) {
      console.error(`파일 삭제 처리 실패: ${file.path}`, error);
    }
  }

  /**
   * 파일 이름 변경 이벤트 처리
   */
  async onFileRename(file: TFile, oldPath: string): Promise<void> {
    if (!this.indexer || file.extension !== "md") {
      return;
    }

    try {
      // 이전 파일 삭제
      await this.indexer.deleteFile(oldPath);

      // 새 파일 인덱싱
      const content = await this.vault.read(file);
      const modifiedAt = file.stat?.mtime || undefined;
      
      if (this.indexer) {
        await this.indexer.indexFile(file.path, content, modifiedAt);
      }

      console.log(`파일 이름 변경 처리: ${oldPath} -> ${file.path}`);
    } catch (error) {
      console.error(`파일 이름 변경 처리 실패: ${oldPath} -> ${file.path}`, error);
    }
  }
}
