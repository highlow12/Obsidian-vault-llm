import { Notice, Plugin, PluginSettingTab, Setting, requestUrl } from "obsidian";
import type { ApiProvider, OvlSettings } from "./types";
import { PROVIDER_PRESETS } from "./types";

export type SettingsHost = Plugin & {
  settings: OvlSettings;
  saveSettings: () => Promise<void>;
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
