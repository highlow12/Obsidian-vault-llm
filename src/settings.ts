import { Notice, Plugin, PluginSettingTab, Setting, requestUrl } from "obsidian";
import type { ApiProvider, OvlSettings, EmbeddingProvider } from "./types";
import { PROVIDER_PRESETS, EMBEDDING_PRESETS } from "./types";

export type SettingsHost = Plugin & {
  settings: OvlSettings;
  saveSettings: () => Promise<void>;
  indexVaultAll: () => Promise<void>;
  indexNewFilesOnly: () => Promise<void>;
};

export class OvlSettingTab extends PluginSettingTab {
  private readonly plugin: SettingsHost;
  private geminiModels: string[] = [];

  constructor(plugin: SettingsHost) {
    super(plugin.app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("h2", { text: "OVL 설정" });

    let apiUrlInput: { setValue: (value: string) => void } | null = null;
    let modelInput: { setValue: (value: string) => void } | null = null;

    new Setting(containerEl)
      .setName("API 제공사")
      .setDesc("사용할 API 제공사를 선택하세요. (Ollama 포함)")
      .addDropdown((dropdown) => {
        dropdown
          .addOptions({
            gemini: "Google Gemini",
            openai: "OpenAI 호환",
            ollama: "Ollama (로컬)",
            custom: "사용자 지정"
          })
          .setValue(this.plugin.settings.provider)
          .onChange(async (value) => {
            const provider = value as ApiProvider;
            this.plugin.settings.provider = provider;
            const preset = PROVIDER_PRESETS[provider];
            this.plugin.settings.apiUrl = preset.apiUrl;
            this.plugin.settings.model = preset.model;
            apiUrlInput?.setValue(preset.apiUrl);
            modelInput?.setValue(preset.model);
            await this.plugin.saveSettings();
            this.display();
          });
      });

    new Setting(containerEl)
      .setName("API URL")
      .setDesc("제공사별 채팅 엔드포인트 URL")
      .addText((text) => {
        apiUrlInput = text;
        text
          .setPlaceholder("http://localhost:11434/v1/chat/completions")
          .setValue(this.plugin.settings.apiUrl)
          .onChange(async (value) => {
            this.plugin.settings.apiUrl = value.trim();
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName("API 키")
      .setDesc("필요한 경우 Bearer 토큰 또는 제공사 키를 입력하세요.")
      .addText((text) =>
        text
          .setPlaceholder("선택")
          .setValue(this.plugin.settings.apiKey)
          .onChange(async (value) => {
            this.plugin.settings.apiKey = value;
            await this.plugin.saveSettings();
          })
      );

    if (this.plugin.settings.provider === "gemini") {
      new Setting(containerEl)
        .setName("Gemini 모델 목록")
        .setDesc("Google에서 제공하는 모델을 불러와 선택할 수 있습니다.")
        .addButton((button) => {
          button.setButtonText("목록 불러오기").onClick(async () => {
            await this.loadGeminiModels();
            this.display();
          });
        });

      if (this.geminiModels.length > 0) {
        new Setting(containerEl)
          .setName("Gemini 모델 선택")
          .setDesc("목록에 없는 모델은 아래에서 직접 입력하세요.")
          .addDropdown((dropdown) => {
            const options = this.geminiModels.reduce<Record<string, string>>(
              (acc, name) => {
                acc[name] = name;
                return acc;
              },
              {}
            );
            dropdown
              .addOptions(options)
              .setValue(this.plugin.settings.model)
              .onChange(async (value) => {
                this.plugin.settings.model = value;
                modelInput?.setValue(value);
                await this.plugin.saveSettings();
              });
          });
      }
    }

    new Setting(containerEl)
      .setName("모델")
      .setDesc("제공사별 모델 이름 (직접 입력 가능)")
      .addText((text) => {
        modelInput = text;
        text
          .setPlaceholder("gpt-4o-mini")
          .setValue(this.plugin.settings.model)
          .onChange(async (value) => {
            this.plugin.settings.model = value.trim();
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName("제목 생성 모델")
      .setDesc("세션/저장 제목 생성에 사용할 모델 (비어있으면 기본 모델 사용)")
      .addText((text) =>
        text
          .setPlaceholder("gpt-4o-mini")
          .setValue(this.plugin.settings.titleModel)
          .onChange(async (value) => {
            this.plugin.settings.titleModel = value.trim();
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("시스템 프롬프트")
      .setDesc("모든 요청에 포함될 시스템 메시지")
      .addTextArea((text) =>
        text
          .setPlaceholder("예: 너는 Obsidian 리서치 어시스턴트다.")
          .setValue(this.plugin.settings.systemPrompt)
          .onChange(async (value) => {
            this.plugin.settings.systemPrompt = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("기본 저장 폴더")
      .setDesc("대화를 저장할 기본 폴더 (볼트 기준)")
      .addText((text) =>
        text
          .setPlaceholder("예: Conversations")
          .setValue(this.plugin.settings.defaultOutputFolder)
          .onChange(async (value) => {
            this.plugin.settings.defaultOutputFolder = value.trim();
            await this.plugin.saveSettings();
          })
      );

    containerEl.createEl("h3", { text: "인덱싱 및 검색 설정" });

    new Setting(containerEl)
      .setName("인덱싱 활성화")
      .setDesc("볼트 파일을 인덱싱하여 벡터 검색을 활성화합니다.")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.indexingEnabled)
          .onChange(async (value) => {
            this.plugin.settings.indexingEnabled = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("전체 볼트 임베딩")
      .setDesc("볼트의 모든 노트를 임베딩 및 인덱싱합니다. (시간이 걸릴 수 있음)")
      .addButton((button) => {
        button
          .setButtonText("전체 임베딩 시작")
          .setCta()
          .onClick(async () => {
            button.setDisabled(true);
            button.setButtonText("진행 중...");
            try {
              await this.plugin.indexVaultAll();
              new Notice("전체 임베딩 완료!");
            } catch (error) {
              const message = error instanceof Error ? error.message : String(error);
              new Notice(`임베딩 실패: ${message}`);
            } finally {
              button.setDisabled(false);
              button.setButtonText("전체 임베딩 시작");
            }
          });
      });

    new Setting(containerEl)
      .setName("신규 노트만 임베딩")
      .setDesc("마지막 인덱싱 이후 생성되거나 수정된 노트만 임베딩합니다.")
      .addButton((button) => {
        button
          .setButtonText("신규 임베딩 시작")
          .onClick(async () => {
            button.setDisabled(true);
            button.setButtonText("진행 중...");
            try {
              await this.plugin.indexNewFilesOnly();
              new Notice("신규 임베딩 완료!");
            } catch (error) {
              const message = error instanceof Error ? error.message : String(error);
              new Notice(`임베딩 실패: ${message}`);
            } finally {
              button.setDisabled(false);
              button.setButtonText("신규 임베딩 시작");
            }
          });
      });

    new Setting(containerEl)
      .setName("청크 크기")
      .setDesc("텍스트를 분할할 때 각 청크의 최대 토큰 수 (기본: 400)")
      .addText((text) =>
        text
          .setPlaceholder("400")
          .setValue(String(this.plugin.settings.chunkSize))
          .onChange(async (value) => {
            const num = parseInt(value);
            if (!isNaN(num) && num > 0) {
              this.plugin.settings.chunkSize = num;
              await this.plugin.saveSettings();
            }
          })
      );

    new Setting(containerEl)
      .setName("청크 오버랩")
      .setDesc("인접한 청크 간 중복되는 토큰 수 (기본: 50)")
      .addText((text) =>
        text
          .setPlaceholder("50")
          .setValue(String(this.plugin.settings.chunkOverlap))
          .onChange(async (value) => {
            const num = parseInt(value);
            if (!isNaN(num) && num >= 0) {
              this.plugin.settings.chunkOverlap = num;
              await this.plugin.saveSettings();
            }
          })
      );

    new Setting(containerEl)
      .setName("검색 결과 수 (Top-K)")
      .setDesc("검색 시 반환할 최대 결과 수 (기본: 8)")
      .addText((text) =>
        text
          .setPlaceholder("8")
          .setValue(String(this.plugin.settings.topK))
          .onChange(async (value) => {
            const num = parseInt(value);
            if (!isNaN(num) && num > 0) {
              this.plugin.settings.topK = num;
              await this.plugin.saveSettings();
            }
          })
      );

    new Setting(containerEl)
      .setName("검색 유사도 임계값")
      .setDesc("RAG 검색 결과로 채택할 최소 유사도 (0~1, 기본: 0.35)")
      .addText((text) =>
        text
          .setPlaceholder("0.35")
          .setValue(String(this.plugin.settings.searchSimilarityThreshold))
          .onChange(async (value) => {
            const num = Number.parseFloat(value);
            if (!Number.isNaN(num) && num >= 0 && num <= 1) {
              this.plugin.settings.searchSimilarityThreshold = num;
              await this.plugin.saveSettings();
            }
          })
      );

    new Setting(containerEl)
      .setName("저장 유사도 임계값")
      .setDesc("대화 저장 시 주제 분리 기준 유사도 (0~1, 기본: 0.75)")
      .addText((text) =>
        text
          .setPlaceholder("0.75")
          .setValue(String(this.plugin.settings.saveSimilarityThreshold))
          .onChange(async (value) => {
            const num = Number.parseFloat(value);
            if (!Number.isNaN(num) && num >= 0 && num <= 1) {
              this.plugin.settings.saveSimilarityThreshold = num;
              await this.plugin.saveSettings();
            }
          })
      );

    containerEl.createEl("h3", { text: "임베딩 설정" });

    let embeddingModelInput: { setValue: (value: string) => void } | null = null;
    let embeddingApiUrlInput: { setValue: (value: string) => void } | null = null;

    new Setting(containerEl)
      .setName("임베딩 제공자")
      .setDesc("임베딩 생성에 사용할 제공자를 선택하세요")
      .addDropdown((dropdown) => {
        dropdown
          .addOptions({
            gemini: "Google Gemini (API)",
            openai: "OpenAI (API)",
            local: "로컬 모델 (HuggingFace)",
            custom: "커스텀 API"
          })
          .setValue(this.plugin.settings.embeddingProvider)
          .onChange(async (value) => {
            const provider = value as EmbeddingProvider;
            this.plugin.settings.embeddingProvider = provider;
            const preset = EMBEDDING_PRESETS[provider];
            this.plugin.settings.embeddingModel = preset.model;
            this.plugin.settings.embeddingApiUrl = preset.apiUrl || "";
            embeddingModelInput?.setValue(preset.model);
            embeddingApiUrlInput?.setValue(preset.apiUrl || "");
            await this.plugin.saveSettings();
            this.display();
          });
      });

    if (this.plugin.settings.embeddingProvider !== "local") {
      new Setting(containerEl)
        .setName("임베딩 API URL")
        .setDesc("임베딩 요청 엔드포인트 URL (비어있으면 제공자 기본값 사용)")
        .addText((text) => {
          embeddingApiUrlInput = text;
          text
            .setPlaceholder("https://api.openai.com/v1/embeddings")
            .setValue(this.plugin.settings.embeddingApiUrl)
            .onChange(async (value) => {
              this.plugin.settings.embeddingApiUrl = value.trim();
              await this.plugin.saveSettings();
            });
        });
    }

    if (this.plugin.settings.embeddingProvider !== "local") {
      new Setting(containerEl)
        .setName("임베딩 API 키")
        .setDesc("임베딩 API 키 (비어있으면 LLM API 키 사용)")
        .addText((text) =>
          text
            .setPlaceholder("선택")
            .setValue(this.plugin.settings.embeddingApiKey)
            .onChange(async (value) => {
              this.plugin.settings.embeddingApiKey = value;
              await this.plugin.saveSettings();
            })
        );
    }

    new Setting(containerEl)
      .setName("임베딩 모델")
      .setDesc("사용할 임베딩 모델")
      .addText((text) => {
        embeddingModelInput = text;
        text
          .setPlaceholder("모델명")
          .setValue(this.plugin.settings.embeddingModel)
          .onChange(async (value) => {
            this.plugin.settings.embeddingModel = value.trim();
            await this.plugin.saveSettings();
          });
      });
  }

  private async loadGeminiModels(): Promise<void> {
    const apiKey = this.plugin.settings.apiKey.trim();
    if (!apiKey) {
      new Notice("Gemini API 키를 먼저 입력해 주세요.");
      return;
    }

    try {
      const response = await requestUrl({
        url: `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
      });
      const data = response.json as
        | { models?: Array<{ name?: string; supportedGenerationMethods?: string[] }> }
        | undefined;
      const models = data?.models ?? [];
      this.geminiModels = models
        .filter((model) => model.supportedGenerationMethods?.includes("generateContent"))
        .map((model) => model.name)
        .filter((name): name is string => Boolean(name));

      if (this.geminiModels.length === 0) {
        new Notice("사용 가능한 Gemini 모델을 찾지 못했습니다.");
      } else {
        new Notice("Gemini 모델 목록을 불러왔습니다.");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      new Notice(`Gemini 모델 목록 실패: ${message}`);
    }
  }
}
