// Obsidian 볼트 파일 변경 감지 및 자동 인덱싱

import { TFile, Vault, Notice } from "obsidian";
import { Indexer } from "./indexing/indexer";

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
   * 초기 인덱싱 실행
   */
  async indexVault(): Promise<void> {
    if (!this.indexer) {
      throw new Error("인덱서가 초기화되지 않았습니다");
    }

    if (this.isIndexing) {
      new Notice("이미 인덱싱이 진행 중입니다");
      return;
    }

    this.isIndexing = true;
    new Notice("볼트 인덱싱을 시작합니다...");

    try {
      const mdFiles = this.vault.getMarkdownFiles();
      console.log(`인덱싱할 파일 수: ${mdFiles.length}`);

      let indexed = 0;
      let failed = 0;

      for (const file of mdFiles) {
        try {
          const content = await this.vault.read(file);
          await this.indexer.indexFile(file.path, content);
          indexed++;

          // 진행 상황 표시 (10개마다)
          if (indexed % 10 === 0) {
            new Notice(`인덱싱 진행 중: ${indexed}/${mdFiles.length}`);
          }
        } catch (error) {
          console.error(`파일 인덱싱 실패: ${file.path}`, error);
          failed++;
        }
      }

      new Notice(`인덱싱 완료: ${indexed}개 성공, ${failed}개 실패`);
    } catch (error) {
      console.error("볼트 인덱싱 중 오류:", error);
      new Notice("인덱싱 중 오류가 발생했습니다");
    } finally {
      this.isIndexing = false;
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
      await this.indexer.indexFile(file.path, content);
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
          if (this.indexer) {
            await this.indexer.indexFile(file.path, content);
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
  onFileDelete(file: TFile): void {
    if (!this.indexer || file.extension !== "md") {
      return;
    }

    try {
      this.indexer.deleteFile(file.path);
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
      this.indexer.deleteFile(oldPath);

      // 새 파일 인덱싱
      const content = await this.vault.read(file);
      if (this.indexer) {
        await this.indexer.indexFile(file.path, content);
      }

      console.log(`파일 이름 변경 처리: ${oldPath} -> ${file.path}`);
    } catch (error) {
      console.error(`파일 이름 변경 처리 실패: ${oldPath} -> ${file.path}`, error);
    }
  }
}
