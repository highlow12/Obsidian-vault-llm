"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => OvlPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian7 = require("obsidian");

// src/conversationStore.ts
var import_obsidian = require("obsidian");

// src/conversation.ts
function convertToMarkdown(conversation) {
  const lines = [];
  lines.push(`# \uB300\uD654 \uAE30\uB85D - ${conversation.sessionId}`);
  lines.push("");
  lines.push(`\uC0DD\uC131\uC77C: ${conversation.createdAt.toISOString()}`);
  lines.push("");
  lines.push("---");
  lines.push("");
  for (const turn of conversation.turns) {
    const roleLabel = turn.role === "user" ? "\u{1F464} \uC0AC\uC6A9\uC790" : turn.role === "assistant" ? "\u{1F916} \uC5B4\uC2DC\uC2A4\uD134\uD2B8" : "\u2699\uFE0F \uC2DC\uC2A4\uD15C";
    lines.push(`## ${roleLabel}`);
    if (turn.timestamp) {
      const timestamp = typeof turn.timestamp === "string" ? turn.timestamp : turn.timestamp.toISOString();
      lines.push(`*${timestamp}*`);
      lines.push("");
    }
    lines.push(turn.content);
    lines.push("");
  }
  return lines.join("\n");
}

// src/conversationStore.ts
async function saveConversationFromTurns(vault, sessionId, turns, outputFolder) {
  const conversation = {
    sessionId,
    turns,
    createdAt: /* @__PURE__ */ new Date()
  };
  const markdown = convertToMarkdown(conversation);
  const filename = buildFileName(conversation);
  const cleanedFolder = outputFolder ? (0, import_obsidian.normalizePath)(outputFolder).replace(/^\/+/, "") : "";
  const targetPath = await ensureUniquePath(
    vault,
    (0, import_obsidian.normalizePath)(cleanedFolder ? `${cleanedFolder}/${filename}` : filename)
  );
  if (cleanedFolder) {
    await ensureFolderExists(vault, cleanedFolder);
  }
  await vault.create(targetPath, markdown);
  return targetPath;
}
function buildFileName(conversation) {
  const date = conversation.createdAt.toISOString().split("T")[0];
  return `${date}-${conversation.sessionId}.md`;
}
async function ensureFolderExists(vault, folder) {
  const exists = await vault.adapter.exists(folder);
  if (!exists) {
    await vault.createFolder(folder);
  }
}
async function ensureUniquePath(vault, path) {
  const normalized = (0, import_obsidian.normalizePath)(path);
  const extensionIndex = normalized.lastIndexOf(".md");
  const base = extensionIndex === -1 ? normalized : normalized.slice(0, extensionIndex);
  const extension = extensionIndex === -1 ? "" : ".md";
  let candidate = normalized;
  let count = 1;
  while (await vault.adapter.exists(candidate)) {
    candidate = `${base}-${count}${extension}`;
    count += 1;
  }
  return candidate;
}

// src/api.ts
var import_obsidian2 = require("obsidian");

// src/types.ts
var PROVIDER_PRESETS = {
  gemini: {
    apiUrl: "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash:generateContent",
    model: "gemini-3-flash"
  },
  openai: {
    apiUrl: "https://api.openai.com/v1/chat/completions",
    model: "gpt-4o-mini"
  },
  ollama: {
    apiUrl: "http://localhost:11434/v1/chat/completions",
    model: "llama3.1"
  },
  custom: {
    apiUrl: "",
    model: ""
  }
};
var DEFAULT_SETTINGS = {
  provider: "gemini",
  apiUrl: PROVIDER_PRESETS.gemini.apiUrl,
  apiKey: "",
  model: PROVIDER_PRESETS.gemini.model,
  systemPrompt: "",
  defaultOutputFolder: ""
};

// src/api.ts
var OvlApiClient = class {
  constructor(getSettings, log) {
    this.getSettings = getSettings;
    this.log = log;
  }
  async requestAssistantReply(turns) {
    const settings = this.getSettings();
    if (settings.provider === "gemini") {
      return this.requestGeminiReply(settings, turns);
    }
    return this.requestOpenAiCompatibleReply(settings, turns);
  }
  async requestOpenAiCompatibleReply(settings, turns) {
    var _a, _b, _c, _d, _e, _f;
    const apiUrl = settings.apiUrl.trim();
    if (!apiUrl) {
      throw new Error("API URL\uC744 \uC124\uC815\uD574 \uC8FC\uC138\uC694.");
    }
    const messages = this.buildOpenAiMessages(settings, turns);
    const payload = {
      model: settings.model.trim() || PROVIDER_PRESETS.openai.model,
      messages
    };
    const body = JSON.stringify(payload);
    const headers = {
      "Content-Type": "application/json"
    };
    if (settings.apiKey.trim()) {
      headers.Authorization = `Bearer ${settings.apiKey.trim()}`;
    }
    let response;
    try {
      response = await (0, import_obsidian2.requestUrl)({
        url: apiUrl,
        method: "POST",
        headers,
        body
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await this.log("openai-compatible request failed", {
        url: apiUrl,
        body,
        error: message
      });
      throw new Error(`API \uC694\uCCAD \uC2E4\uD328: ${message}`);
    }
    const status = response.status;
    if (status && status >= 400) {
      await this.log("openai-compatible response error", {
        url: apiUrl,
        body,
        status,
        response: response.text
      });
      throw new Error(`API \uC624\uB958: ${status}`);
    }
    const data = this.parseJsonResponse(response.text, response.json);
    const content = (_f = (_e = (_d = (_c = (_b = (_a = data == null ? void 0 : data.choices) == null ? void 0 : _a[0]) == null ? void 0 : _b.message) == null ? void 0 : _c.content) != null ? _d : data == null ? void 0 : data.reply) != null ? _e : data == null ? void 0 : data.content) != null ? _f : data == null ? void 0 : data.message;
    if (!content || typeof content !== "string") {
      throw new Error("\uC751\uB2F5 \uD615\uC2DD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
    }
    return content.trim();
  }
  async requestGeminiReply(settings, turns) {
    var _a, _b, _c;
    const apiUrl = settings.apiUrl.trim();
    if (!apiUrl) {
      throw new Error("API URL\uC744 \uC124\uC815\uD574 \uC8FC\uC138\uC694.");
    }
    const apiKey = settings.apiKey.trim();
    if (!apiKey) {
      throw new Error("Gemini API \uD0A4\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
    }
    const systemPrompt = settings.systemPrompt.trim();
    const contents = turns.map((turn) => {
      const role = turn.role === "assistant" ? "model" : "user";
      const text2 = turn.role === "system" ? `[\uC2DC\uC2A4\uD15C] ${turn.content}` : turn.content;
      return {
        role,
        parts: [{ text: text2 }]
      };
    });
    const payload = {
      systemInstruction: systemPrompt ? { parts: [{ text: systemPrompt }] } : void 0,
      contents,
      generationConfig: {
        responseMimeType: "text/plain"
      }
    };
    const body = JSON.stringify(payload);
    const modelName = settings.model.trim();
    if (!modelName) {
      throw new Error("Gemini \uBAA8\uB378 \uC774\uB984\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
    }
    const normalizedModel = modelName.startsWith("models/") ? modelName : `models/${modelName}`;
    let baseUrl = apiUrl;
    if (!apiUrl.includes("/models/")) {
      if (apiUrl.endsWith("/v1beta")) {
        baseUrl = `${apiUrl}/models`;
      } else if (apiUrl.endsWith("/v1beta/")) {
        baseUrl = `${apiUrl}models`;
      } else if (apiUrl.endsWith("/models")) {
        baseUrl = apiUrl;
      } else if (apiUrl.endsWith("/models/")) {
        baseUrl = apiUrl.slice(0, -1);
      }
    }
    const fullUrl = apiUrl.includes(":generateContent") ? apiUrl : `${baseUrl.replace(/\/$/, "")}/${normalizedModel}:generateContent`;
    const requestUrlValue = new URL(fullUrl);
    if (!requestUrlValue.searchParams.get("key")) {
      requestUrlValue.searchParams.set("key", apiKey);
    }
    let response;
    try {
      response = await (0, import_obsidian2.requestUrl)({
        url: requestUrlValue.toString(),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await this.log("gemini request failed", {
        url: requestUrlValue.toString(),
        body,
        error: message
      });
      throw new Error(`Gemini \uC694\uCCAD \uC2E4\uD328: ${message}`);
    }
    const status = response.status;
    if (status && status >= 400) {
      await this.log("gemini response error", {
        url: requestUrlValue.toString(),
        body,
        status,
        response: response.text
      });
      throw new Error(`Gemini \uC624\uB958: ${status}`);
    }
    const data = this.parseJsonResponse(response.text, response.json);
    const parts = (_c = (_b = (_a = data == null ? void 0 : data.candidates) == null ? void 0 : _a[0]) == null ? void 0 : _b.content) == null ? void 0 : _c.parts;
    const text = Array.isArray(parts) ? parts.map((part) => {
      var _a2;
      return (_a2 = part.text) != null ? _a2 : "";
    }).join("").trim() : "";
    if (!text) {
      throw new Error("\uC751\uB2F5 \uD615\uC2DD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
    }
    return text;
  }
  buildOpenAiMessages(settings, turns) {
    const messages = [];
    const systemPrompt = settings.systemPrompt.trim();
    if (systemPrompt) {
      messages.push({ role: "system", content: systemPrompt });
    }
    for (const turn of turns) {
      messages.push({ role: turn.role, content: turn.content });
    }
    return messages;
  }
  parseJsonResponse(text, json) {
    if (json) {
      return json;
    }
    try {
      return JSON.parse(text);
    } catch (e) {
      throw new Error("API \uC751\uB2F5\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    }
  }
};

// src/logging.ts
var import_obsidian3 = require("obsidian");
function getPluginLogPath(app, manifest) {
  var _a;
  const pluginId = (_a = manifest == null ? void 0 : manifest.id) != null ? _a : "obsidian-vault-llm";
  return (0, import_obsidian3.normalizePath)(`${app.vault.configDir}/plugins/${pluginId}/log.txt`);
}
async function appendErrorLog(app, manifest, context, detail) {
  const logPath = getPluginLogPath(app, manifest);
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const detailText = toSafeString(detail);
  const entry = `
[${timestamp}] ${context}
${detailText}
`;
  try {
    const exists = await app.vault.adapter.exists(logPath);
    if (exists) {
      const current = await app.vault.adapter.read(logPath);
      await app.vault.adapter.write(logPath, `${current}${entry}`);
    } else {
      await app.vault.adapter.write(logPath, entry.trimStart());
    }
  } catch (error) {
    console.error("Failed to write plugin log", error);
  }
}
function toSafeString(detail) {
  var _a;
  if (detail === null || detail === void 0) {
    return String(detail);
  }
  if (typeof detail === "string") {
    return detail;
  }
  if (detail instanceof Error) {
    return (_a = detail.stack) != null ? _a : detail.message;
  }
  try {
    const seen = /* @__PURE__ */ new WeakSet();
    return JSON.stringify(
      detail,
      (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return "[\uC21C\uD658 \uCC38\uC870]";
          }
          seen.add(value);
        }
        return value;
      },
      2
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return `\uC9C1\uB82C\uD654 \uC2E4\uD328: ${message}`;
  }
}

// src/modals/saveConversationModal.ts
var import_obsidian4 = require("obsidian");
var SaveConversationModal = class extends import_obsidian4.Modal {
  constructor(plugin, onSubmit) {
    super(plugin.app);
    this.onSubmit = onSubmit;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: "\uB300\uD654 JSON \uC800\uC7A5" });
    const inputPathEl = contentEl.createEl("input", { type: "text" });
    inputPathEl.placeholder = "JSON \uD30C\uC77C \uACBD\uB85C (\uBCFC\uD2B8 \uAE30\uC900)";
    const sessionIdEl = contentEl.createEl("input", { type: "text" });
    sessionIdEl.placeholder = "\uC138\uC158 ID";
    const outputFolderEl = contentEl.createEl("input", { type: "text" });
    outputFolderEl.placeholder = "\uC800\uC7A5 \uD3F4\uB354 (\uC120\uD0DD, \uBCFC\uD2B8 \uAE30\uC900)";
    const submitButton = contentEl.createEl("button", { text: "\uC800\uC7A5" });
    submitButton.addEventListener("click", () => {
      this.onSubmit({
        inputPath: inputPathEl.value.trim(),
        sessionId: sessionIdEl.value.trim(),
        outputFolder: outputFolderEl.value.trim()
      });
      this.close();
    });
  }
};

// src/parseTurns.ts
function parseTurns(content) {
  let data;
  try {
    data = JSON.parse(content);
  } catch (e) {
    throw new Error("JSON \uD615\uC2DD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
  }
  if (!Array.isArray(data)) {
    throw new Error("JSON\uC740 \uBC30\uC5F4\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4.");
  }
  return data.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new Error(`\uC798\uBABB\uB41C \uD56D\uBAA9: ${index + 1}\uBC88\uC9F8`);
    }
    const role = item.role;
    const contentValue = item.content;
    const timestampValue = item.timestamp;
    if (role !== "user" && role !== "assistant" && role !== "system") {
      throw new Error(`role\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4: ${index + 1}\uBC88\uC9F8`);
    }
    if (typeof contentValue !== "string" || !contentValue.trim()) {
      throw new Error(`content\uAC00 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4: ${index + 1}\uBC88\uC9F8`);
    }
    return {
      role,
      content: contentValue,
      timestamp: timestampValue
    };
  });
}

// src/settings.ts
var import_obsidian5 = require("obsidian");
var OvlSettingTab = class extends import_obsidian5.PluginSettingTab {
  constructor(plugin) {
    super(plugin.app, plugin);
    this.geminiModels = [];
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "OVL \uC124\uC815" });
    let apiUrlInput = null;
    let modelInput = null;
    new import_obsidian5.Setting(containerEl).setName("API \uC81C\uACF5\uC0AC").setDesc("\uC0AC\uC6A9\uD560 API \uC81C\uACF5\uC0AC\uB97C \uC120\uD0DD\uD558\uC138\uC694. (Ollama \uD3EC\uD568)").addDropdown((dropdown) => {
      dropdown.addOptions({
        gemini: "Google Gemini",
        openai: "OpenAI \uD638\uD658",
        ollama: "Ollama (\uB85C\uCEEC)",
        custom: "\uC0AC\uC6A9\uC790 \uC9C0\uC815"
      }).setValue(this.plugin.settings.provider).onChange(async (value) => {
        const provider = value;
        this.plugin.settings.provider = provider;
        const preset = PROVIDER_PRESETS[provider];
        this.plugin.settings.apiUrl = preset.apiUrl;
        this.plugin.settings.model = preset.model;
        apiUrlInput == null ? void 0 : apiUrlInput.setValue(preset.apiUrl);
        modelInput == null ? void 0 : modelInput.setValue(preset.model);
        await this.plugin.saveSettings();
        this.display();
      });
    });
    new import_obsidian5.Setting(containerEl).setName("API URL").setDesc("\uC81C\uACF5\uC0AC\uBCC4 \uCC44\uD305 \uC5D4\uB4DC\uD3EC\uC778\uD2B8 URL").addText((text) => {
      apiUrlInput = text;
      text.setPlaceholder("http://localhost:11434/v1/chat/completions").setValue(this.plugin.settings.apiUrl).onChange(async (value) => {
        this.plugin.settings.apiUrl = value.trim();
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(containerEl).setName("API \uD0A4").setDesc("\uD544\uC694\uD55C \uACBD\uC6B0 Bearer \uD1A0\uD070 \uB610\uB294 \uC81C\uACF5\uC0AC \uD0A4\uB97C \uC785\uB825\uD558\uC138\uC694.").addText(
      (text) => text.setPlaceholder("\uC120\uD0DD").setValue(this.plugin.settings.apiKey).onChange(async (value) => {
        this.plugin.settings.apiKey = value;
        await this.plugin.saveSettings();
      })
    );
    if (this.plugin.settings.provider === "gemini") {
      new import_obsidian5.Setting(containerEl).setName("Gemini \uBAA8\uB378 \uBAA9\uB85D").setDesc("Google\uC5D0\uC11C \uC81C\uACF5\uD558\uB294 \uBAA8\uB378\uC744 \uBD88\uB7EC\uC640 \uC120\uD0DD\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.").addButton((button) => {
        button.setButtonText("\uBAA9\uB85D \uBD88\uB7EC\uC624\uAE30").onClick(async () => {
          await this.loadGeminiModels();
          this.display();
        });
      });
      if (this.geminiModels.length > 0) {
        new import_obsidian5.Setting(containerEl).setName("Gemini \uBAA8\uB378 \uC120\uD0DD").setDesc("\uBAA9\uB85D\uC5D0 \uC5C6\uB294 \uBAA8\uB378\uC740 \uC544\uB798\uC5D0\uC11C \uC9C1\uC811 \uC785\uB825\uD558\uC138\uC694.").addDropdown((dropdown) => {
          const options = this.geminiModels.reduce(
            (acc, name) => {
              acc[name] = name;
              return acc;
            },
            {}
          );
          dropdown.addOptions(options).setValue(this.plugin.settings.model).onChange(async (value) => {
            this.plugin.settings.model = value;
            modelInput == null ? void 0 : modelInput.setValue(value);
            await this.plugin.saveSettings();
          });
        });
      }
    }
    new import_obsidian5.Setting(containerEl).setName("\uBAA8\uB378").setDesc("\uC81C\uACF5\uC0AC\uBCC4 \uBAA8\uB378 \uC774\uB984 (\uC9C1\uC811 \uC785\uB825 \uAC00\uB2A5)").addText((text) => {
      modelInput = text;
      text.setPlaceholder("gpt-4o-mini").setValue(this.plugin.settings.model).onChange(async (value) => {
        this.plugin.settings.model = value.trim();
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(containerEl).setName("\uC2DC\uC2A4\uD15C \uD504\uB86C\uD504\uD2B8").setDesc("\uBAA8\uB4E0 \uC694\uCCAD\uC5D0 \uD3EC\uD568\uB420 \uC2DC\uC2A4\uD15C \uBA54\uC2DC\uC9C0").addTextArea(
      (text) => text.setPlaceholder("\uC608: \uB108\uB294 Obsidian \uB9AC\uC11C\uCE58 \uC5B4\uC2DC\uC2A4\uD134\uD2B8\uB2E4.").setValue(this.plugin.settings.systemPrompt).onChange(async (value) => {
        this.plugin.settings.systemPrompt = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian5.Setting(containerEl).setName("\uAE30\uBCF8 \uC800\uC7A5 \uD3F4\uB354").setDesc("\uB300\uD654\uB97C \uC800\uC7A5\uD560 \uAE30\uBCF8 \uD3F4\uB354 (\uBCFC\uD2B8 \uAE30\uC900)").addText(
      (text) => text.setPlaceholder("\uC608: Conversations").setValue(this.plugin.settings.defaultOutputFolder).onChange(async (value) => {
        this.plugin.settings.defaultOutputFolder = value.trim();
        await this.plugin.saveSettings();
      })
    );
  }
  async loadGeminiModels() {
    var _a;
    const apiKey = this.plugin.settings.apiKey.trim();
    if (!apiKey) {
      new import_obsidian5.Notice("Gemini API \uD0A4\uB97C \uBA3C\uC800 \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
      return;
    }
    try {
      const response = await (0, import_obsidian5.requestUrl)({
        url: `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
      });
      const data = response.json;
      const models = (_a = data == null ? void 0 : data.models) != null ? _a : [];
      this.geminiModels = models.filter((model) => {
        var _a2;
        return (_a2 = model.supportedGenerationMethods) == null ? void 0 : _a2.includes("generateContent");
      }).map((model) => model.name).filter((name) => Boolean(name));
      if (this.geminiModels.length === 0) {
        new import_obsidian5.Notice("\uC0AC\uC6A9 \uAC00\uB2A5\uD55C Gemini \uBAA8\uB378\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
      } else {
        new import_obsidian5.Notice("Gemini \uBAA8\uB378 \uBAA9\uB85D\uC744 \uBD88\uB7EC\uC654\uC2B5\uB2C8\uB2E4.");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      new import_obsidian5.Notice(`Gemini \uBAA8\uB378 \uBAA9\uB85D \uC2E4\uD328: ${message}`);
    }
  }
};

// src/views/chatView.ts
var import_obsidian6 = require("obsidian");
var VIEW_TYPE_OVL_CHAT = "ovl-chat-view";
var ChatView = class extends import_obsidian6.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.messages = [];
    this.messagesEl = null;
    this.inputEl = null;
    this.sendButtonEl = null;
    this.saveButtonEl = null;
    this.sessionIdEl = null;
    this.plugin = plugin;
  }
  getViewType() {
    return VIEW_TYPE_OVL_CHAT;
  }
  getDisplayText() {
    return "OVL \uB300\uD654";
  }
  getIcon() {
    return "message-circle";
  }
  async onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("ovl-chat-view");
    const headerEl = contentEl.createEl("div", { cls: "ovl-chat-header" });
    headerEl.createEl("div", { cls: "ovl-chat-title", text: "OVL \uB300\uD654" });
    const sessionWrapEl = headerEl.createEl("div", { cls: "ovl-chat-session" });
    sessionWrapEl.createEl("span", { text: "\uC138\uC158" });
    const sessionInputEl = sessionWrapEl.createEl("input", { type: "text" });
    sessionInputEl.value = this.buildSessionId();
    this.sessionIdEl = sessionInputEl;
    const controlsEl = headerEl.createEl("div", { cls: "ovl-chat-controls" });
    const saveButtonEl = controlsEl.createEl("button", { text: "\uC800\uC7A5" });
    saveButtonEl.addEventListener("click", () => {
      void this.handleSave();
    });
    this.saveButtonEl = saveButtonEl;
    const messagesEl = contentEl.createEl("div", { cls: "ovl-chat-messages" });
    this.messagesEl = messagesEl;
    const inputWrapEl = contentEl.createEl("div", { cls: "ovl-chat-input" });
    const textareaEl = inputWrapEl.createEl("textarea");
    textareaEl.placeholder = "\uBA54\uC2DC\uC9C0\uB97C \uC785\uB825\uD558\uC138\uC694. (Ctrl+Enter \uC804\uC1A1)";
    this.inputEl = textareaEl;
    const sendButtonEl = inputWrapEl.createEl("button", { text: "\uC804\uC1A1" });
    sendButtonEl.addEventListener("click", () => {
      void this.handleSend();
    });
    this.sendButtonEl = sendButtonEl;
    textareaEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        void this.handleSend();
      }
    });
  }
  buildSessionId() {
    const stamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    return `session-${stamp}`;
  }
  setBusy(isBusy) {
    if (this.sendButtonEl) {
      this.sendButtonEl.disabled = isBusy;
    }
    if (this.saveButtonEl) {
      this.saveButtonEl.disabled = isBusy;
    }
    if (this.inputEl) {
      this.inputEl.disabled = isBusy;
    }
    if (isBusy) {
      this.contentEl.addClass("ovl-chat-busy");
    } else {
      this.contentEl.removeClass("ovl-chat-busy");
    }
  }
  appendMessage(turn) {
    this.messages.push(turn);
    if (!this.messagesEl) {
      return;
    }
    const messageEl = this.messagesEl.createEl("div", {
      cls: `ovl-chat-message ovl-chat-${turn.role}`
    });
    messageEl.createEl("div", {
      cls: "ovl-chat-role",
      text: this.getRoleLabel(turn.role)
    });
    messageEl.createEl("div", {
      cls: "ovl-chat-content",
      text: turn.content
    });
    if (turn.timestamp) {
      const timestamp = typeof turn.timestamp === "string" ? turn.timestamp : turn.timestamp.toISOString();
      messageEl.createEl("div", {
        cls: "ovl-chat-timestamp",
        text: timestamp
      });
    }
    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
  }
  getRoleLabel(role) {
    if (role === "user") {
      return "\uC0AC\uC6A9\uC790";
    }
    if (role === "assistant") {
      return "\uC5B4\uC2DC\uC2A4\uD134\uD2B8";
    }
    return "\uC2DC\uC2A4\uD15C";
  }
  async handleSend() {
    var _a, _b;
    const input = (_b = (_a = this.inputEl) == null ? void 0 : _a.value.trim()) != null ? _b : "";
    if (!input) {
      new import_obsidian6.Notice("\uBA54\uC2DC\uC9C0\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
      return;
    }
    this.appendMessage({
      role: "user",
      content: input,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    if (this.inputEl) {
      this.inputEl.value = "";
    }
    this.setBusy(true);
    try {
      const reply = await this.plugin.requestAssistantReply(this.messages);
      this.appendMessage({
        role: "assistant",
        content: reply,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      new import_obsidian6.Notice(`\uB300\uD654 \uC2E4\uD328: ${message}`);
    } finally {
      this.setBusy(false);
    }
  }
  async handleSave() {
    var _a, _b;
    if (this.messages.length === 0) {
      new import_obsidian6.Notice("\uC800\uC7A5\uD560 \uB300\uD654\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return;
    }
    const sessionId = (_b = (_a = this.sessionIdEl) == null ? void 0 : _a.value.trim()) != null ? _b : "";
    if (!sessionId) {
      new import_obsidian6.Notice("\uC138\uC158 ID\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
      return;
    }
    try {
      const targetPath = await this.plugin.saveConversationFromTurns(
        sessionId,
        this.messages,
        this.plugin.settings.defaultOutputFolder
      );
      new import_obsidian6.Notice(`\uB300\uD654 \uC800\uC7A5 \uC644\uB8CC: ${targetPath}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      new import_obsidian6.Notice(`\uC800\uC7A5 \uC2E4\uD328: ${message}`);
    }
  }
};

// src/main.ts
var OvlPlugin = class extends import_obsidian7.Plugin {
  constructor() {
    super(...arguments);
    this.settings = { ...DEFAULT_SETTINGS };
    this.apiClient = null;
  }
  async onload() {
    await this.loadSettings();
    this.apiClient = new OvlApiClient(
      () => this.settings,
      (context, detail) => appendErrorLog(this.app, this.manifest, context, detail)
    );
    this.registerView(VIEW_TYPE_OVL_CHAT, (leaf) => new ChatView(leaf, this));
    this.addRibbonIcon("message-circle", "OVL \uB300\uD654 \uC5F4\uAE30", () => {
      void this.openChatView();
    });
    this.addCommand({
      id: "ovl-open-chat",
      name: "OVL \uB300\uD654 \uCC3D \uC5F4\uAE30",
      callback: () => {
        void this.openChatView();
      }
    });
    this.addCommand({
      id: "ovl-save-conversation",
      name: "\uB300\uD654 JSON\uC5D0\uC11C \uB9C8\uD06C\uB2E4\uC6B4 \uC800\uC7A5",
      callback: () => {
        new SaveConversationModal(this, (form) => {
          void this.handleSaveConversation(form);
        }).open();
      }
    });
    this.addSettingTab(new OvlSettingTab(this));
  }
  onunload() {
    this.app.workspace.getLeavesOfType(VIEW_TYPE_OVL_CHAT).forEach((leaf) => {
      leaf.detach();
    });
  }
  async openChatView() {
    const existingLeaf = this.app.workspace.getLeavesOfType(VIEW_TYPE_OVL_CHAT)[0];
    const leaf = existingLeaf != null ? existingLeaf : this.app.workspace.getRightLeaf(false);
    if (!leaf) {
      new import_obsidian7.Notice("\uB300\uD654 \uCC3D\uC744 \uC5F4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return;
    }
    await leaf.setViewState({ type: VIEW_TYPE_OVL_CHAT, active: true });
    this.app.workspace.revealLeaf(leaf);
  }
  async requestAssistantReply(turns) {
    if (!this.apiClient) {
      throw new Error("API \uD074\uB77C\uC774\uC5B8\uD2B8\uB97C \uCD08\uAE30\uD654\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    }
    return this.apiClient.requestAssistantReply(turns);
  }
  async saveConversationFromTurns(sessionId, turns, outputFolder) {
    return saveConversationFromTurns(this.app.vault, sessionId, turns, outputFolder);
  }
  async loadSettings() {
    this.settings = { ...DEFAULT_SETTINGS, ...await this.loadData() };
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  async handleSaveConversation(form) {
    try {
      if (!form.inputPath) {
        new import_obsidian7.Notice("JSON \uD30C\uC77C \uACBD\uB85C\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
        return;
      }
      if (!form.sessionId) {
        new import_obsidian7.Notice("\uC138\uC158 ID\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
        return;
      }
      const jsonPath = (0, import_obsidian7.normalizePath)(form.inputPath).replace(/^\/+/, "");
      const jsonExists = await this.app.vault.adapter.exists(jsonPath);
      if (!jsonExists) {
        new import_obsidian7.Notice("JSON \uD30C\uC77C\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
        return;
      }
      const jsonContent = await this.app.vault.adapter.read(jsonPath);
      const turns = parseTurns(jsonContent);
      const outputFolder = form.outputFolder ? (0, import_obsidian7.normalizePath)(form.outputFolder).replace(/^\/+/, "") : "";
      const targetPath = await saveConversationFromTurns(
        this.app.vault,
        form.sessionId,
        turns,
        outputFolder
      );
      new import_obsidian7.Notice(`\uB300\uD654 \uC800\uC7A5 \uC644\uB8CC: ${targetPath}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      new import_obsidian7.Notice(`\uC800\uC7A5 \uC2E4\uD328: ${message}`);
    }
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL21haW4udHMiLCAic3JjL2NvbnZlcnNhdGlvblN0b3JlLnRzIiwgInNyYy9jb252ZXJzYXRpb24udHMiLCAic3JjL2FwaS50cyIsICJzcmMvdHlwZXMudHMiLCAic3JjL2xvZ2dpbmcudHMiLCAic3JjL21vZGFscy9zYXZlQ29udmVyc2F0aW9uTW9kYWwudHMiLCAic3JjL3BhcnNlVHVybnMudHMiLCAic3JjL3NldHRpbmdzLnRzIiwgInNyYy92aWV3cy9jaGF0Vmlldy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgTm90aWNlLCBQbHVnaW4sIG5vcm1hbGl6ZVBhdGggfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHVybiB9IGZyb20gXCIuL2NvbnZlcnNhdGlvblwiO1xuaW1wb3J0IHsgc2F2ZUNvbnZlcnNhdGlvbkZyb21UdXJucyB9IGZyb20gXCIuL2NvbnZlcnNhdGlvblN0b3JlXCI7XG5pbXBvcnQgeyBPdmxBcGlDbGllbnQgfSBmcm9tIFwiLi9hcGlcIjtcbmltcG9ydCB7IGFwcGVuZEVycm9yTG9nIH0gZnJvbSBcIi4vbG9nZ2luZ1wiO1xuaW1wb3J0IHsgU2F2ZUNvbnZlcnNhdGlvbk1vZGFsLCBTYXZlQ29udmVyc2F0aW9uRm9ybSB9IGZyb20gXCIuL21vZGFscy9zYXZlQ29udmVyc2F0aW9uTW9kYWxcIjtcbmltcG9ydCB7IHBhcnNlVHVybnMgfSBmcm9tIFwiLi9wYXJzZVR1cm5zXCI7XG5pbXBvcnQgeyBPdmxTZXR0aW5nVGFiIH0gZnJvbSBcIi4vc2V0dGluZ3NcIjtcbmltcG9ydCB7IERFRkFVTFRfU0VUVElOR1MsIE92bFNldHRpbmdzIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IENoYXRWaWV3LCBWSUVXX1RZUEVfT1ZMX0NIQVQgfSBmcm9tIFwiLi92aWV3cy9jaGF0Vmlld1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPdmxQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuICBwdWJsaWMgc2V0dGluZ3M6IE92bFNldHRpbmdzID0geyAuLi5ERUZBVUxUX1NFVFRJTkdTIH07XG4gIHByaXZhdGUgYXBpQ2xpZW50OiBPdmxBcGlDbGllbnQgfCBudWxsID0gbnVsbDtcblxuICBhc3luYyBvbmxvYWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcblxuICAgIC8vIEFQSSBcdUQ2MzhcdUNEOUMgXHVCODVDXHVDOUMxXHVDNzQ0IFx1QkQ4NFx1QjlBQ1x1RDU3NCBcdUMwQzFcdUQwRENcdUI5N0MgXHVDNzIwXHVDOUMwXHVENTY5XHVCMkM4XHVCMkU0LlxuICAgIHRoaXMuYXBpQ2xpZW50ID0gbmV3IE92bEFwaUNsaWVudChcbiAgICAgICgpID0+IHRoaXMuc2V0dGluZ3MsXG4gICAgICAoY29udGV4dCwgZGV0YWlsKSA9PiBhcHBlbmRFcnJvckxvZyh0aGlzLmFwcCwgdGhpcy5tYW5pZmVzdCwgY29udGV4dCwgZGV0YWlsKVxuICAgICk7XG5cbiAgICAvLyBcdUMwQUNcdUM3NzRcdUI0RENcdUJDMTQgXHVDQzQ0XHVEMzA1IFx1QkRGMCBcdUI0RjFcdUI4NURcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhWSUVXX1RZUEVfT1ZMX0NIQVQsIChsZWFmKSA9PiBuZXcgQ2hhdFZpZXcobGVhZiwgdGhpcykpO1xuXG4gICAgdGhpcy5hZGRSaWJib25JY29uKFwibWVzc2FnZS1jaXJjbGVcIiwgXCJPVkwgXHVCMzAwXHVENjU0IFx1QzVGNFx1QUUzMFwiLCAoKSA9PiB7XG4gICAgICB2b2lkIHRoaXMub3BlbkNoYXRWaWV3KCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6IFwib3ZsLW9wZW4tY2hhdFwiLFxuICAgICAgbmFtZTogXCJPVkwgXHVCMzAwXHVENjU0IFx1Q0MzRCBcdUM1RjRcdUFFMzBcIixcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgIHZvaWQgdGhpcy5vcGVuQ2hhdFZpZXcoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICBpZDogXCJvdmwtc2F2ZS1jb252ZXJzYXRpb25cIixcbiAgICAgIG5hbWU6IFwiXHVCMzAwXHVENjU0IEpTT05cdUM1RDBcdUMxMUMgXHVCOUM4XHVEMDZDXHVCMkU0XHVDNkI0IFx1QzgwMFx1QzdBNVwiLFxuICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgbmV3IFNhdmVDb252ZXJzYXRpb25Nb2RhbCh0aGlzLCAoZm9ybSkgPT4ge1xuICAgICAgICAgIHZvaWQgdGhpcy5oYW5kbGVTYXZlQ29udmVyc2F0aW9uKGZvcm0pO1xuICAgICAgICB9KS5vcGVuKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZFNldHRpbmdUYWIobmV3IE92bFNldHRpbmdUYWIodGhpcykpO1xuICB9XG5cbiAgb251bmxvYWQoKTogdm9pZCB7XG4gICAgdGhpcy5hcHAud29ya3NwYWNlLmdldExlYXZlc09mVHlwZShWSUVXX1RZUEVfT1ZMX0NIQVQpLmZvckVhY2goKGxlYWYpID0+IHtcbiAgICAgIGxlYWYuZGV0YWNoKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIG9wZW5DaGF0VmlldygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBleGlzdGluZ0xlYWYgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0TGVhdmVzT2ZUeXBlKFZJRVdfVFlQRV9PVkxfQ0hBVClbMF07XG4gICAgY29uc3QgbGVhZiA9IGV4aXN0aW5nTGVhZiA/PyB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0UmlnaHRMZWFmKGZhbHNlKTtcbiAgICBpZiAoIWxlYWYpIHtcbiAgICAgIG5ldyBOb3RpY2UoXCJcdUIzMDBcdUQ2NTQgXHVDQzNEXHVDNzQ0IFx1QzVGNCBcdUMyMTggXHVDNUM2XHVDMkI1XHVCMkM4XHVCMkU0LlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhd2FpdCBsZWFmLnNldFZpZXdTdGF0ZSh7IHR5cGU6IFZJRVdfVFlQRV9PVkxfQ0hBVCwgYWN0aXZlOiB0cnVlIH0pO1xuICAgIHRoaXMuYXBwLndvcmtzcGFjZS5yZXZlYWxMZWFmKGxlYWYpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlcXVlc3RBc3Npc3RhbnRSZXBseSh0dXJuczogQ29udmVyc2F0aW9uVHVybltdKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBpZiAoIXRoaXMuYXBpQ2xpZW50KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBUEkgXHVEMDc0XHVCNzdDXHVDNzc0XHVDNUI4XHVEMkI4XHVCOTdDIFx1Q0QwOFx1QUUzMFx1RDY1NFx1RDU2MCBcdUMyMTggXHVDNUM2XHVDMkI1XHVCMkM4XHVCMkU0LlwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYXBpQ2xpZW50LnJlcXVlc3RBc3Npc3RhbnRSZXBseSh0dXJucyk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2F2ZUNvbnZlcnNhdGlvbkZyb21UdXJucyhcbiAgICBzZXNzaW9uSWQ6IHN0cmluZyxcbiAgICB0dXJuczogQ29udmVyc2F0aW9uVHVybltdLFxuICAgIG91dHB1dEZvbGRlcjogc3RyaW5nXG4gICk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHNhdmVDb252ZXJzYXRpb25Gcm9tVHVybnModGhpcy5hcHAudmF1bHQsIHNlc3Npb25JZCwgdHVybnMsIG91dHB1dEZvbGRlcik7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGxvYWRTZXR0aW5ncygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLnNldHRpbmdzID0geyAuLi5ERUZBVUxUX1NFVFRJTkdTLCAuLi4oYXdhaXQgdGhpcy5sb2FkRGF0YSgpKSB9O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHNhdmVTZXR0aW5ncygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVTYXZlQ29udmVyc2F0aW9uKGZvcm06IFNhdmVDb252ZXJzYXRpb25Gb3JtKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghZm9ybS5pbnB1dFBhdGgpIHtcbiAgICAgICAgbmV3IE5vdGljZShcIkpTT04gXHVEMzBDXHVDNzdDIFx1QUNCRFx1Qjg1Q1x1Qjk3QyBcdUM3ODVcdUI4MjVcdUQ1NzQgXHVDOEZDXHVDMTM4XHVDNjk0LlwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCFmb3JtLnNlc3Npb25JZCkge1xuICAgICAgICBuZXcgTm90aWNlKFwiXHVDMTM4XHVDMTU4IElEXHVCOTdDIFx1Qzc4NVx1QjgyNVx1RDU3NCBcdUM4RkNcdUMxMzhcdUM2OTQuXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGpzb25QYXRoID0gbm9ybWFsaXplUGF0aChmb3JtLmlucHV0UGF0aCkucmVwbGFjZSgvXlxcLysvLCBcIlwiKTtcbiAgICAgIGNvbnN0IGpzb25FeGlzdHMgPSBhd2FpdCB0aGlzLmFwcC52YXVsdC5hZGFwdGVyLmV4aXN0cyhqc29uUGF0aCk7XG4gICAgICBpZiAoIWpzb25FeGlzdHMpIHtcbiAgICAgICAgbmV3IE5vdGljZShcIkpTT04gXHVEMzBDXHVDNzdDXHVDNzQ0IFx1Q0MzRVx1Qzc0NCBcdUMyMTggXHVDNUM2XHVDMkI1XHVCMkM4XHVCMkU0LlwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QganNvbkNvbnRlbnQgPSBhd2FpdCB0aGlzLmFwcC52YXVsdC5hZGFwdGVyLnJlYWQoanNvblBhdGgpO1xuICAgICAgY29uc3QgdHVybnMgPSBwYXJzZVR1cm5zKGpzb25Db250ZW50KTtcblxuICAgICAgY29uc3Qgb3V0cHV0Rm9sZGVyID0gZm9ybS5vdXRwdXRGb2xkZXJcbiAgICAgICAgPyBub3JtYWxpemVQYXRoKGZvcm0ub3V0cHV0Rm9sZGVyKS5yZXBsYWNlKC9eXFwvKy8sIFwiXCIpXG4gICAgICAgIDogXCJcIjtcbiAgICAgIGNvbnN0IHRhcmdldFBhdGggPSBhd2FpdCBzYXZlQ29udmVyc2F0aW9uRnJvbVR1cm5zKFxuICAgICAgICB0aGlzLmFwcC52YXVsdCxcbiAgICAgICAgZm9ybS5zZXNzaW9uSWQsXG4gICAgICAgIHR1cm5zLFxuICAgICAgICBvdXRwdXRGb2xkZXJcbiAgICAgICk7XG4gICAgICBuZXcgTm90aWNlKGBcdUIzMDBcdUQ2NTQgXHVDODAwXHVDN0E1IFx1QzY0NFx1QjhDQzogJHt0YXJnZXRQYXRofWApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpO1xuICAgICAgbmV3IE5vdGljZShgXHVDODAwXHVDN0E1IFx1QzJFNFx1RDMyODogJHttZXNzYWdlfWApO1xuICAgIH1cbiAgfVxufVxuIiwgImltcG9ydCB0eXBlIHsgVmF1bHQgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB7IG5vcm1hbGl6ZVBhdGggfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uLCBDb252ZXJzYXRpb25UdXJuIH0gZnJvbSBcIi4vY29udmVyc2F0aW9uXCI7XG5pbXBvcnQgeyBjb252ZXJ0VG9NYXJrZG93biB9IGZyb20gXCIuL2NvbnZlcnNhdGlvblwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZUNvbnZlcnNhdGlvbkZyb21UdXJucyhcbiAgdmF1bHQ6IFZhdWx0LFxuICBzZXNzaW9uSWQ6IHN0cmluZyxcbiAgdHVybnM6IENvbnZlcnNhdGlvblR1cm5bXSxcbiAgb3V0cHV0Rm9sZGVyOiBzdHJpbmdcbik6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uID0ge1xuICAgIHNlc3Npb25JZCxcbiAgICB0dXJucyxcbiAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKClcbiAgfTtcblxuICBjb25zdCBtYXJrZG93biA9IGNvbnZlcnRUb01hcmtkb3duKGNvbnZlcnNhdGlvbik7XG4gIGNvbnN0IGZpbGVuYW1lID0gYnVpbGRGaWxlTmFtZShjb252ZXJzYXRpb24pO1xuICBjb25zdCBjbGVhbmVkRm9sZGVyID0gb3V0cHV0Rm9sZGVyID8gbm9ybWFsaXplUGF0aChvdXRwdXRGb2xkZXIpLnJlcGxhY2UoL15cXC8rLywgXCJcIikgOiBcIlwiO1xuICBjb25zdCB0YXJnZXRQYXRoID0gYXdhaXQgZW5zdXJlVW5pcXVlUGF0aChcbiAgICB2YXVsdCxcbiAgICBub3JtYWxpemVQYXRoKGNsZWFuZWRGb2xkZXIgPyBgJHtjbGVhbmVkRm9sZGVyfS8ke2ZpbGVuYW1lfWAgOiBmaWxlbmFtZSlcbiAgKTtcblxuICBpZiAoY2xlYW5lZEZvbGRlcikge1xuICAgIGF3YWl0IGVuc3VyZUZvbGRlckV4aXN0cyh2YXVsdCwgY2xlYW5lZEZvbGRlcik7XG4gIH1cblxuICBhd2FpdCB2YXVsdC5jcmVhdGUodGFyZ2V0UGF0aCwgbWFya2Rvd24pO1xuICByZXR1cm4gdGFyZ2V0UGF0aDtcbn1cblxuZnVuY3Rpb24gYnVpbGRGaWxlTmFtZShjb252ZXJzYXRpb246IENvbnZlcnNhdGlvbik6IHN0cmluZyB7XG4gIGNvbnN0IGRhdGUgPSBjb252ZXJzYXRpb24uY3JlYXRlZEF0LnRvSVNPU3RyaW5nKCkuc3BsaXQoXCJUXCIpWzBdO1xuICByZXR1cm4gYCR7ZGF0ZX0tJHtjb252ZXJzYXRpb24uc2Vzc2lvbklkfS5tZGA7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGVuc3VyZUZvbGRlckV4aXN0cyh2YXVsdDogVmF1bHQsIGZvbGRlcjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGV4aXN0cyA9IGF3YWl0IHZhdWx0LmFkYXB0ZXIuZXhpc3RzKGZvbGRlcik7XG4gIGlmICghZXhpc3RzKSB7XG4gICAgYXdhaXQgdmF1bHQuY3JlYXRlRm9sZGVyKGZvbGRlcik7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZW5zdXJlVW5pcXVlUGF0aCh2YXVsdDogVmF1bHQsIHBhdGg6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVQYXRoKHBhdGgpO1xuICBjb25zdCBleHRlbnNpb25JbmRleCA9IG5vcm1hbGl6ZWQubGFzdEluZGV4T2YoXCIubWRcIik7XG4gIGNvbnN0IGJhc2UgPSBleHRlbnNpb25JbmRleCA9PT0gLTEgPyBub3JtYWxpemVkIDogbm9ybWFsaXplZC5zbGljZSgwLCBleHRlbnNpb25JbmRleCk7XG4gIGNvbnN0IGV4dGVuc2lvbiA9IGV4dGVuc2lvbkluZGV4ID09PSAtMSA/IFwiXCIgOiBcIi5tZFwiO1xuXG4gIGxldCBjYW5kaWRhdGUgPSBub3JtYWxpemVkO1xuICBsZXQgY291bnQgPSAxO1xuXG4gIHdoaWxlIChhd2FpdCB2YXVsdC5hZGFwdGVyLmV4aXN0cyhjYW5kaWRhdGUpKSB7XG4gICAgY2FuZGlkYXRlID0gYCR7YmFzZX0tJHtjb3VudH0ke2V4dGVuc2lvbn1gO1xuICAgIGNvdW50ICs9IDE7XG4gIH1cblxuICByZXR1cm4gY2FuZGlkYXRlO1xufVxuIiwgImltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG4vLyBcdUIzMDBcdUQ2NTRcdUM3NTggXHVBQzAxIFx1RDEzNFx1Qzc0NCBcdUIwOThcdUQwQzBcdUIwQjRcdUIyOTQgXHVEMEMwXHVDNzg1XG5leHBvcnQgdHlwZSBDb252ZXJzYXRpb25UdXJuID0ge1xuICByb2xlOiBcInVzZXJcIiB8IFwiYXNzaXN0YW50XCIgfCBcInN5c3RlbVwiO1xuICBjb250ZW50OiBzdHJpbmc7XG4gIHRpbWVzdGFtcD86IERhdGUgfCBzdHJpbmc7XG59O1xuXG4vLyBcdUIzMDBcdUQ2NTQgXHVDODA0XHVDQ0I0XHVCOTdDIFx1QjA5OFx1RDBDMFx1QjBCNFx1QjI5NCBcdUQwQzBcdUM3ODVcbmV4cG9ydCB0eXBlIENvbnZlcnNhdGlvbiA9IHtcbiAgc2Vzc2lvbklkOiBzdHJpbmc7XG4gIHR1cm5zOiBDb252ZXJzYXRpb25UdXJuW107XG4gIGNyZWF0ZWRBdDogRGF0ZTtcbn07XG5cbi8vIFx1QjMwMFx1RDY1NFx1Qjk3QyBcdUI5QzhcdUQwNkNcdUIyRTRcdUM2QjQgXHVENjE1XHVDMkREXHVDNzNDXHVCODVDIFx1QkNDMFx1RDY1OFxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRUb01hcmtkb3duKGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uKTogc3RyaW5nIHtcbiAgY29uc3QgbGluZXM6IHN0cmluZ1tdID0gW107XG4gIFxuICAvLyBcdUQ1RTRcdUIzNTQ6IFx1QzgxQ1x1QkFBOVx1QUNGQyBcdUJBNTRcdUQwQzBcdUIzNzBcdUM3NzRcdUQxMzBcbiAgbGluZXMucHVzaChgIyBcdUIzMDBcdUQ2NTQgXHVBRTMwXHVCODVEIC0gJHtjb252ZXJzYXRpb24uc2Vzc2lvbklkfWApO1xuICBsaW5lcy5wdXNoKFwiXCIpO1xuICBsaW5lcy5wdXNoKGBcdUMwRERcdUMxMzFcdUM3N0M6ICR7Y29udmVyc2F0aW9uLmNyZWF0ZWRBdC50b0lTT1N0cmluZygpfWApO1xuICBsaW5lcy5wdXNoKFwiXCIpO1xuICBsaW5lcy5wdXNoKFwiLS0tXCIpO1xuICBsaW5lcy5wdXNoKFwiXCIpO1xuICBcbiAgLy8gXHVBQzAxIFx1RDEzNFx1Qzc0NCBcdUI5QzhcdUQwNkNcdUIyRTRcdUM2QjRcdUM3M0NcdUI4NUMgXHVCQ0MwXHVENjU4XG4gIGZvciAoY29uc3QgdHVybiBvZiBjb252ZXJzYXRpb24udHVybnMpIHtcbiAgICBjb25zdCByb2xlTGFiZWwgPSB0dXJuLnJvbGUgPT09IFwidXNlclwiID8gXCJcdUQ4M0RcdURDNjQgXHVDMEFDXHVDNkE5XHVDNzkwXCIgOiBcbiAgICAgICAgICAgICAgICAgICAgIHR1cm4ucm9sZSA9PT0gXCJhc3Npc3RhbnRcIiA/IFwiXHVEODNFXHVERDE2IFx1QzVCNFx1QzJEQ1x1QzJBNFx1RDEzNFx1RDJCOFwiIDogXG4gICAgICAgICAgICAgICAgICAgICBcIlx1MjY5OVx1RkUwRiBcdUMyRENcdUMyQTRcdUQxNUNcIjtcbiAgICBcbiAgICBsaW5lcy5wdXNoKGAjIyAke3JvbGVMYWJlbH1gKTtcbiAgICBcbiAgICBpZiAodHVybi50aW1lc3RhbXApIHtcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IHR5cGVvZiB0dXJuLnRpbWVzdGFtcCA9PT0gXCJzdHJpbmdcIiBcbiAgICAgICAgPyB0dXJuLnRpbWVzdGFtcCBcbiAgICAgICAgOiB0dXJuLnRpbWVzdGFtcC50b0lTT1N0cmluZygpO1xuICAgICAgbGluZXMucHVzaChgKiR7dGltZXN0YW1wfSpgKTtcbiAgICAgIGxpbmVzLnB1c2goXCJcIik7XG4gICAgfVxuICAgIFxuICAgIGxpbmVzLnB1c2godHVybi5jb250ZW50KTtcbiAgICBsaW5lcy5wdXNoKFwiXCIpO1xuICB9XG4gIFxuICByZXR1cm4gbGluZXMuam9pbihcIlxcblwiKTtcbn1cblxuLy8gXHVCMzAwXHVENjU0XHVCOTdDIFx1RDMwQ1x1Qzc3Q1x1Qjg1QyBcdUM4MDBcdUM3QTVcbmV4cG9ydCBmdW5jdGlvbiBzYXZlQ29udmVyc2F0aW9uKFxuICBjb252ZXJzYXRpb246IENvbnZlcnNhdGlvbixcbiAgdGFyZ2V0RGlyOiBzdHJpbmdcbik6IHN0cmluZyB7XG4gIGlmICghZnMuZXhpc3RzU3luYyh0YXJnZXREaXIpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBcdUIzMDBcdUMwQzEgXHVCNTE0XHVCODA5XHVEMUEwXHVCOUFDXHVBQzAwIFx1Qzg3NFx1QzdBQ1x1RDU1OFx1QzlDMCBcdUM1NEFcdUMyQjVcdUIyQzhcdUIyRTQ6ICR7dGFyZ2V0RGlyfWApO1xuICB9XG4gIFxuICBjb25zdCBtYXJrZG93biA9IGNvbnZlcnRUb01hcmtkb3duKGNvbnZlcnNhdGlvbik7XG4gIFxuICAvLyBcdUQzMENcdUM3N0NcdUJBODUgXHVDMEREXHVDMTMxOiBZWVlZLU1NLURELXNlc3Npb25JZC5tZFxuICBjb25zdCBkYXRlID0gY29udmVyc2F0aW9uLmNyZWF0ZWRBdC50b0lTT1N0cmluZygpLnNwbGl0KFwiVFwiKVswXTtcbiAgY29uc3QgZmlsZW5hbWUgPSBgJHtkYXRlfS0ke2NvbnZlcnNhdGlvbi5zZXNzaW9uSWR9Lm1kYDtcbiAgY29uc3QgZmlsZXBhdGggPSBwYXRoLmpvaW4odGFyZ2V0RGlyLCBmaWxlbmFtZSk7XG4gIFxuICBmcy53cml0ZUZpbGVTeW5jKGZpbGVwYXRoLCBtYXJrZG93biwgXCJ1dGYtOFwiKTtcbiAgXG4gIHJldHVybiBmaWxlcGF0aDtcbn1cbiIsICJpbXBvcnQgeyByZXF1ZXN0VXJsIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR1cm4gfSBmcm9tIFwiLi9jb252ZXJzYXRpb25cIjtcbmltcG9ydCB0eXBlIHsgT3ZsU2V0dGluZ3MgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgUFJPVklERVJfUFJFU0VUUyB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbnR5cGUgTG9nV3JpdGVyID0gKGNvbnRleHQ6IHN0cmluZywgZGV0YWlsOiB1bmtub3duKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG50eXBlIFNldHRpbmdzR2V0dGVyID0gKCkgPT4gT3ZsU2V0dGluZ3M7XG5cbmV4cG9ydCBjbGFzcyBPdmxBcGlDbGllbnQge1xuICBwcml2YXRlIHJlYWRvbmx5IGdldFNldHRpbmdzOiBTZXR0aW5nc0dldHRlcjtcbiAgcHJpdmF0ZSByZWFkb25seSBsb2c6IExvZ1dyaXRlcjtcblxuICBjb25zdHJ1Y3RvcihnZXRTZXR0aW5nczogU2V0dGluZ3NHZXR0ZXIsIGxvZzogTG9nV3JpdGVyKSB7XG4gICAgdGhpcy5nZXRTZXR0aW5ncyA9IGdldFNldHRpbmdzO1xuICAgIHRoaXMubG9nID0gbG9nO1xuICB9XG5cbiAgYXN5bmMgcmVxdWVzdEFzc2lzdGFudFJlcGx5KHR1cm5zOiBDb252ZXJzYXRpb25UdXJuW10pOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHNldHRpbmdzID0gdGhpcy5nZXRTZXR0aW5ncygpO1xuICAgIGlmIChzZXR0aW5ncy5wcm92aWRlciA9PT0gXCJnZW1pbmlcIikge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEdlbWluaVJlcGx5KHNldHRpbmdzLCB0dXJucyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdE9wZW5BaUNvbXBhdGlibGVSZXBseShzZXR0aW5ncywgdHVybnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyByZXF1ZXN0T3BlbkFpQ29tcGF0aWJsZVJlcGx5KFxuICAgIHNldHRpbmdzOiBPdmxTZXR0aW5ncyxcbiAgICB0dXJuczogQ29udmVyc2F0aW9uVHVybltdXG4gICk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgYXBpVXJsID0gc2V0dGluZ3MuYXBpVXJsLnRyaW0oKTtcbiAgICBpZiAoIWFwaVVybCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQVBJIFVSTFx1Qzc0NCBcdUMxMjRcdUM4MTVcdUQ1NzQgXHVDOEZDXHVDMTM4XHVDNjk0LlwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlcyA9IHRoaXMuYnVpbGRPcGVuQWlNZXNzYWdlcyhzZXR0aW5ncywgdHVybnMpO1xuICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICBtb2RlbDogc2V0dGluZ3MubW9kZWwudHJpbSgpIHx8IFBST1ZJREVSX1BSRVNFVFMub3BlbmFpLm1vZGVsLFxuICAgICAgbWVzc2FnZXNcbiAgICB9O1xuICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeShwYXlsb2FkKTtcblxuICAgIGNvbnN0IGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgIH07XG4gICAgaWYgKHNldHRpbmdzLmFwaUtleS50cmltKCkpIHtcbiAgICAgIGhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHtzZXR0aW5ncy5hcGlLZXkudHJpbSgpfWA7XG4gICAgfVxuXG4gICAgbGV0IHJlc3BvbnNlOiB7IHRleHQ6IHN0cmluZzsganNvbj86IHVua25vd247IHN0YXR1cz86IG51bWJlciB9O1xuICAgIHRyeSB7XG4gICAgICByZXNwb25zZSA9IGF3YWl0IHJlcXVlc3RVcmwoe1xuICAgICAgICB1cmw6IGFwaVVybCxcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVycyxcbiAgICAgICAgYm9keVxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcik7XG4gICAgICBhd2FpdCB0aGlzLmxvZyhcIm9wZW5haS1jb21wYXRpYmxlIHJlcXVlc3QgZmFpbGVkXCIsIHtcbiAgICAgICAgdXJsOiBhcGlVcmwsXG4gICAgICAgIGJvZHksXG4gICAgICAgIGVycm9yOiBtZXNzYWdlXG4gICAgICB9KTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQVBJIFx1QzY5NFx1Q0NBRCBcdUMyRTRcdUQzMjg6ICR7bWVzc2FnZX1gKTtcbiAgICB9XG5cbiAgICBjb25zdCBzdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgaWYgKHN0YXR1cyAmJiBzdGF0dXMgPj0gNDAwKSB7XG4gICAgICBhd2FpdCB0aGlzLmxvZyhcIm9wZW5haS1jb21wYXRpYmxlIHJlc3BvbnNlIGVycm9yXCIsIHtcbiAgICAgICAgdXJsOiBhcGlVcmwsXG4gICAgICAgIGJvZHksXG4gICAgICAgIHN0YXR1cyxcbiAgICAgICAgcmVzcG9uc2U6IHJlc3BvbnNlLnRleHRcbiAgICAgIH0pO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBBUEkgXHVDNjI0XHVCOTU4OiAke3N0YXR1c31gKTtcbiAgICB9XG5cbiAgICBjb25zdCBkYXRhID0gdGhpcy5wYXJzZUpzb25SZXNwb25zZShyZXNwb25zZS50ZXh0LCByZXNwb25zZS5qc29uKTtcbiAgICBjb25zdCBjb250ZW50ID1cbiAgICAgIChkYXRhIGFzIHsgY2hvaWNlcz86IEFycmF5PHsgbWVzc2FnZT86IHsgY29udGVudD86IHN0cmluZyB9IH0+IH0pPy5jaG9pY2VzPy5bMF0/Lm1lc3NhZ2VcbiAgICAgICAgPy5jb250ZW50ID8/XG4gICAgICAoZGF0YSBhcyB7IHJlcGx5Pzogc3RyaW5nIH0pPy5yZXBseSA/P1xuICAgICAgKGRhdGEgYXMgeyBjb250ZW50Pzogc3RyaW5nIH0pPy5jb250ZW50ID8/XG4gICAgICAoZGF0YSBhcyB7IG1lc3NhZ2U/OiBzdHJpbmcgfSk/Lm1lc3NhZ2U7XG5cbiAgICBpZiAoIWNvbnRlbnQgfHwgdHlwZW9mIGNvbnRlbnQgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlx1Qzc1MVx1QjJGNSBcdUQ2MTVcdUMyRERcdUM3NzQgXHVDNjJDXHVCQzE0XHVCOTc0XHVDOUMwIFx1QzU0QVx1QzJCNVx1QjJDOFx1QjJFNC5cIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnRlbnQudHJpbSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyByZXF1ZXN0R2VtaW5pUmVwbHkoXG4gICAgc2V0dGluZ3M6IE92bFNldHRpbmdzLFxuICAgIHR1cm5zOiBDb252ZXJzYXRpb25UdXJuW11cbiAgKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBhcGlVcmwgPSBzZXR0aW5ncy5hcGlVcmwudHJpbSgpO1xuICAgIGlmICghYXBpVXJsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBUEkgVVJMXHVDNzQ0IFx1QzEyNFx1QzgxNVx1RDU3NCBcdUM4RkNcdUMxMzhcdUM2OTQuXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IGFwaUtleSA9IHNldHRpbmdzLmFwaUtleS50cmltKCk7XG4gICAgaWYgKCFhcGlLZXkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbWluaSBBUEkgXHVEMEE0XHVCOTdDIFx1Qzc4NVx1QjgyNVx1RDU3NCBcdUM4RkNcdUMxMzhcdUM2OTQuXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHN5c3RlbVByb21wdCA9IHNldHRpbmdzLnN5c3RlbVByb21wdC50cmltKCk7XG4gICAgY29uc3QgY29udGVudHMgPSB0dXJucy5tYXAoKHR1cm4pID0+IHtcbiAgICAgIGNvbnN0IHJvbGUgPSB0dXJuLnJvbGUgPT09IFwiYXNzaXN0YW50XCIgPyBcIm1vZGVsXCIgOiBcInVzZXJcIjtcbiAgICAgIGNvbnN0IHRleHQgPSB0dXJuLnJvbGUgPT09IFwic3lzdGVtXCIgPyBgW1x1QzJEQ1x1QzJBNFx1RDE1Q10gJHt0dXJuLmNvbnRlbnR9YCA6IHR1cm4uY29udGVudDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJvbGUsXG4gICAgICAgIHBhcnRzOiBbeyB0ZXh0IH1dXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgIHN5c3RlbUluc3RydWN0aW9uOiBzeXN0ZW1Qcm9tcHQgPyB7IHBhcnRzOiBbeyB0ZXh0OiBzeXN0ZW1Qcm9tcHQgfV0gfSA6IHVuZGVmaW5lZCxcbiAgICAgIGNvbnRlbnRzLFxuICAgICAgZ2VuZXJhdGlvbkNvbmZpZzoge1xuICAgICAgICByZXNwb25zZU1pbWVUeXBlOiBcInRleHQvcGxhaW5cIlxuICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpO1xuXG4gICAgY29uc3QgbW9kZWxOYW1lID0gc2V0dGluZ3MubW9kZWwudHJpbSgpO1xuICAgIGlmICghbW9kZWxOYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW1pbmkgXHVCQUE4XHVCMzc4IFx1Qzc3NFx1Qjk4NFx1Qzc0NCBcdUM3ODVcdUI4MjVcdUQ1NzQgXHVDOEZDXHVDMTM4XHVDNjk0LlwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBub3JtYWxpemVkTW9kZWwgPSBtb2RlbE5hbWUuc3RhcnRzV2l0aChcIm1vZGVscy9cIilcbiAgICAgID8gbW9kZWxOYW1lXG4gICAgICA6IGBtb2RlbHMvJHttb2RlbE5hbWV9YDtcblxuICAgIGxldCBiYXNlVXJsID0gYXBpVXJsO1xuICAgIGlmICghYXBpVXJsLmluY2x1ZGVzKFwiL21vZGVscy9cIikpIHtcbiAgICAgIGlmIChhcGlVcmwuZW5kc1dpdGgoXCIvdjFiZXRhXCIpKSB7XG4gICAgICAgIGJhc2VVcmwgPSBgJHthcGlVcmx9L21vZGVsc2A7XG4gICAgICB9IGVsc2UgaWYgKGFwaVVybC5lbmRzV2l0aChcIi92MWJldGEvXCIpKSB7XG4gICAgICAgIGJhc2VVcmwgPSBgJHthcGlVcmx9bW9kZWxzYDtcbiAgICAgIH0gZWxzZSBpZiAoYXBpVXJsLmVuZHNXaXRoKFwiL21vZGVsc1wiKSkge1xuICAgICAgICBiYXNlVXJsID0gYXBpVXJsO1xuICAgICAgfSBlbHNlIGlmIChhcGlVcmwuZW5kc1dpdGgoXCIvbW9kZWxzL1wiKSkge1xuICAgICAgICBiYXNlVXJsID0gYXBpVXJsLnNsaWNlKDAsIC0xKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBmdWxsVXJsID0gYXBpVXJsLmluY2x1ZGVzKFwiOmdlbmVyYXRlQ29udGVudFwiKVxuICAgICAgPyBhcGlVcmxcbiAgICAgIDogYCR7YmFzZVVybC5yZXBsYWNlKC9cXC8kLywgXCJcIil9LyR7bm9ybWFsaXplZE1vZGVsfTpnZW5lcmF0ZUNvbnRlbnRgO1xuXG4gICAgY29uc3QgcmVxdWVzdFVybFZhbHVlID0gbmV3IFVSTChmdWxsVXJsKTtcbiAgICBpZiAoIXJlcXVlc3RVcmxWYWx1ZS5zZWFyY2hQYXJhbXMuZ2V0KFwia2V5XCIpKSB7XG4gICAgICByZXF1ZXN0VXJsVmFsdWUuc2VhcmNoUGFyYW1zLnNldChcImtleVwiLCBhcGlLZXkpO1xuICAgIH1cblxuICAgIGxldCByZXNwb25zZTogeyB0ZXh0OiBzdHJpbmc7IGpzb24/OiB1bmtub3duOyBzdGF0dXM/OiBudW1iZXIgfTtcbiAgICB0cnkge1xuICAgICAgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0VXJsKHtcbiAgICAgICAgdXJsOiByZXF1ZXN0VXJsVmFsdWUudG9TdHJpbmcoKSxcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgIFwieC1nb29nLWFwaS1rZXlcIjogYXBpS2V5XG4gICAgICAgIH0sXG4gICAgICAgIGJvZHlcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpO1xuICAgICAgYXdhaXQgdGhpcy5sb2coXCJnZW1pbmkgcmVxdWVzdCBmYWlsZWRcIiwge1xuICAgICAgICB1cmw6IHJlcXVlc3RVcmxWYWx1ZS50b1N0cmluZygpLFxuICAgICAgICBib2R5LFxuICAgICAgICBlcnJvcjogbWVzc2FnZVxuICAgICAgfSk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEdlbWluaSBcdUM2OTRcdUNDQUQgXHVDMkU0XHVEMzI4OiAke21lc3NhZ2V9YCk7XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgIGlmIChzdGF0dXMgJiYgc3RhdHVzID49IDQwMCkge1xuICAgICAgYXdhaXQgdGhpcy5sb2coXCJnZW1pbmkgcmVzcG9uc2UgZXJyb3JcIiwge1xuICAgICAgICB1cmw6IHJlcXVlc3RVcmxWYWx1ZS50b1N0cmluZygpLFxuICAgICAgICBib2R5LFxuICAgICAgICBzdGF0dXMsXG4gICAgICAgIHJlc3BvbnNlOiByZXNwb25zZS50ZXh0XG4gICAgICB9KTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgR2VtaW5pIFx1QzYyNFx1Qjk1ODogJHtzdGF0dXN9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YSA9IHRoaXMucGFyc2VKc29uUmVzcG9uc2UocmVzcG9uc2UudGV4dCwgcmVzcG9uc2UuanNvbik7XG4gICAgY29uc3QgcGFydHMgPSAoZGF0YSBhcyB7IGNhbmRpZGF0ZXM/OiBBcnJheTx7IGNvbnRlbnQ/OiB7IHBhcnRzPzogQXJyYXk8eyB0ZXh0Pzogc3RyaW5nIH0+IH0gfT4gfSlcbiAgICAgID8uY2FuZGlkYXRlcz8uWzBdPy5jb250ZW50Py5wYXJ0cztcbiAgICBjb25zdCB0ZXh0ID0gQXJyYXkuaXNBcnJheShwYXJ0cylcbiAgICAgID8gcGFydHMubWFwKChwYXJ0KSA9PiBwYXJ0LnRleHQgPz8gXCJcIikuam9pbihcIlwiKS50cmltKClcbiAgICAgIDogXCJcIjtcblxuICAgIGlmICghdGV4dCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXHVDNzUxXHVCMkY1IFx1RDYxNVx1QzJERFx1Qzc3NCBcdUM2MkNcdUJDMTRcdUI5NzRcdUM5QzAgXHVDNTRBXHVDMkI1XHVCMkM4XHVCMkU0LlwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGV4dDtcbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRPcGVuQWlNZXNzYWdlcyhcbiAgICBzZXR0aW5nczogT3ZsU2V0dGluZ3MsXG4gICAgdHVybnM6IENvbnZlcnNhdGlvblR1cm5bXVxuICApOiBBcnJheTx7IHJvbGU6IHN0cmluZzsgY29udGVudDogc3RyaW5nIH0+IHtcbiAgICBjb25zdCBtZXNzYWdlcyA9IFtdIGFzIEFycmF5PHsgcm9sZTogc3RyaW5nOyBjb250ZW50OiBzdHJpbmcgfT47XG4gICAgY29uc3Qgc3lzdGVtUHJvbXB0ID0gc2V0dGluZ3Muc3lzdGVtUHJvbXB0LnRyaW0oKTtcbiAgICBpZiAoc3lzdGVtUHJvbXB0KSB7XG4gICAgICBtZXNzYWdlcy5wdXNoKHsgcm9sZTogXCJzeXN0ZW1cIiwgY29udGVudDogc3lzdGVtUHJvbXB0IH0pO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHR1cm4gb2YgdHVybnMpIHtcbiAgICAgIG1lc3NhZ2VzLnB1c2goeyByb2xlOiB0dXJuLnJvbGUsIGNvbnRlbnQ6IHR1cm4uY29udGVudCB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG1lc3NhZ2VzO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUpzb25SZXNwb25zZSh0ZXh0OiBzdHJpbmcsIGpzb24/OiB1bmtub3duKTogdW5rbm93biB7XG4gICAgaWYgKGpzb24pIHtcbiAgICAgIHJldHVybiBqc29uO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGV4dCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBUEkgXHVDNzUxXHVCMkY1XHVDNzQ0IFx1RDU3NFx1QzExRFx1RDU2MCBcdUMyMTggXHVDNUM2XHVDMkI1XHVCMkM4XHVCMkU0LlwiKTtcbiAgICB9XG4gIH1cbn1cbiIsICJleHBvcnQgdHlwZSBBcGlQcm92aWRlciA9IFwiZ2VtaW5pXCIgfCBcIm9wZW5haVwiIHwgXCJvbGxhbWFcIiB8IFwiY3VzdG9tXCI7XG5cbmV4cG9ydCB0eXBlIE92bFNldHRpbmdzID0ge1xuICBwcm92aWRlcjogQXBpUHJvdmlkZXI7XG4gIGFwaVVybDogc3RyaW5nO1xuICBhcGlLZXk6IHN0cmluZztcbiAgbW9kZWw6IHN0cmluZztcbiAgc3lzdGVtUHJvbXB0OiBzdHJpbmc7XG4gIGRlZmF1bHRPdXRwdXRGb2xkZXI6IHN0cmluZztcbn07XG5cbmV4cG9ydCBjb25zdCBQUk9WSURFUl9QUkVTRVRTOiBSZWNvcmQ8QXBpUHJvdmlkZXIsIHsgYXBpVXJsOiBzdHJpbmc7IG1vZGVsOiBzdHJpbmcgfT4gPSB7XG4gIGdlbWluaToge1xuICAgIGFwaVVybDogXCJodHRwczovL2dlbmVyYXRpdmVsYW5ndWFnZS5nb29nbGVhcGlzLmNvbS92MWJldGEvbW9kZWxzL2dlbWluaS0zLWZsYXNoOmdlbmVyYXRlQ29udGVudFwiLFxuICAgIG1vZGVsOiBcImdlbWluaS0zLWZsYXNoXCJcbiAgfSxcbiAgb3BlbmFpOiB7XG4gICAgYXBpVXJsOiBcImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEvY2hhdC9jb21wbGV0aW9uc1wiLFxuICAgIG1vZGVsOiBcImdwdC00by1taW5pXCJcbiAgfSxcbiAgb2xsYW1hOiB7XG4gICAgYXBpVXJsOiBcImh0dHA6Ly9sb2NhbGhvc3Q6MTE0MzQvdjEvY2hhdC9jb21wbGV0aW9uc1wiLFxuICAgIG1vZGVsOiBcImxsYW1hMy4xXCJcbiAgfSxcbiAgY3VzdG9tOiB7XG4gICAgYXBpVXJsOiBcIlwiLFxuICAgIG1vZGVsOiBcIlwiXG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1NFVFRJTkdTOiBPdmxTZXR0aW5ncyA9IHtcbiAgcHJvdmlkZXI6IFwiZ2VtaW5pXCIsXG4gIGFwaVVybDogUFJPVklERVJfUFJFU0VUUy5nZW1pbmkuYXBpVXJsLFxuICBhcGlLZXk6IFwiXCIsXG4gIG1vZGVsOiBQUk9WSURFUl9QUkVTRVRTLmdlbWluaS5tb2RlbCxcbiAgc3lzdGVtUHJvbXB0OiBcIlwiLFxuICBkZWZhdWx0T3V0cHV0Rm9sZGVyOiBcIlwiXG59O1xuIiwgImltcG9ydCB0eXBlIHsgQXBwLCBQbHVnaW5NYW5pZmVzdCB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgbm9ybWFsaXplUGF0aCB9IGZyb20gXCJvYnNpZGlhblwiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGx1Z2luTG9nUGF0aChhcHA6IEFwcCwgbWFuaWZlc3Q/OiBQbHVnaW5NYW5pZmVzdCk6IHN0cmluZyB7XG4gIGNvbnN0IHBsdWdpbklkID0gbWFuaWZlc3Q/LmlkID8/IFwib2JzaWRpYW4tdmF1bHQtbGxtXCI7XG4gIHJldHVybiBub3JtYWxpemVQYXRoKGAke2FwcC52YXVsdC5jb25maWdEaXJ9L3BsdWdpbnMvJHtwbHVnaW5JZH0vbG9nLnR4dGApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXBwZW5kRXJyb3JMb2coXG4gIGFwcDogQXBwLFxuICBtYW5pZmVzdDogUGx1Z2luTWFuaWZlc3QgfCB1bmRlZmluZWQsXG4gIGNvbnRleHQ6IHN0cmluZyxcbiAgZGV0YWlsOiB1bmtub3duXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgbG9nUGF0aCA9IGdldFBsdWdpbkxvZ1BhdGgoYXBwLCBtYW5pZmVzdCk7XG4gIGNvbnN0IHRpbWVzdGFtcCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgY29uc3QgZGV0YWlsVGV4dCA9IHRvU2FmZVN0cmluZyhkZXRhaWwpO1xuICBjb25zdCBlbnRyeSA9IGBcXG5bJHt0aW1lc3RhbXB9XSAke2NvbnRleHR9XFxuJHtkZXRhaWxUZXh0fVxcbmA7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBleGlzdHMgPSBhd2FpdCBhcHAudmF1bHQuYWRhcHRlci5leGlzdHMobG9nUGF0aCk7XG4gICAgaWYgKGV4aXN0cykge1xuICAgICAgY29uc3QgY3VycmVudCA9IGF3YWl0IGFwcC52YXVsdC5hZGFwdGVyLnJlYWQobG9nUGF0aCk7XG4gICAgICBhd2FpdCBhcHAudmF1bHQuYWRhcHRlci53cml0ZShsb2dQYXRoLCBgJHtjdXJyZW50fSR7ZW50cnl9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IGFwcC52YXVsdC5hZGFwdGVyLndyaXRlKGxvZ1BhdGgsIGVudHJ5LnRyaW1TdGFydCgpKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byB3cml0ZSBwbHVnaW4gbG9nXCIsIGVycm9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB0b1NhZmVTdHJpbmcoZGV0YWlsOiB1bmtub3duKTogc3RyaW5nIHtcbiAgaWYgKGRldGFpbCA9PT0gbnVsbCB8fCBkZXRhaWwgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBTdHJpbmcoZGV0YWlsKTtcbiAgfVxuICBpZiAodHlwZW9mIGRldGFpbCA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBkZXRhaWw7XG4gIH1cbiAgaWYgKGRldGFpbCBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgcmV0dXJuIGRldGFpbC5zdGFjayA/PyBkZXRhaWwubWVzc2FnZTtcbiAgfVxuICB0cnkge1xuICAgIGNvbnN0IHNlZW4gPSBuZXcgV2Vha1NldDxvYmplY3Q+KCk7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KFxuICAgICAgZGV0YWlsLFxuICAgICAgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGlmIChzZWVuLmhhcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBcIltcdUMyMUNcdUQ2NTggXHVDQzM4XHVDODcwXVwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZWVuLmFkZCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfSxcbiAgICAgIDJcbiAgICApO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcik7XG4gICAgcmV0dXJuIGBcdUM5QzFcdUI4MkNcdUQ2NTQgXHVDMkU0XHVEMzI4OiAke21lc3NhZ2V9YDtcbiAgfVxufVxuIiwgImltcG9ydCB7IE1vZGFsIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgdHlwZSB7IFBsdWdpbiB9IGZyb20gXCJvYnNpZGlhblwiO1xuXG5leHBvcnQgdHlwZSBTYXZlQ29udmVyc2F0aW9uRm9ybSA9IHtcbiAgaW5wdXRQYXRoOiBzdHJpbmc7XG4gIHNlc3Npb25JZDogc3RyaW5nO1xuICBvdXRwdXRGb2xkZXI6IHN0cmluZztcbn07XG5cbmV4cG9ydCBjbGFzcyBTYXZlQ29udmVyc2F0aW9uTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG4gIHByaXZhdGUgcmVhZG9ubHkgb25TdWJtaXQ6ICh2YWx1ZTogU2F2ZUNvbnZlcnNhdGlvbkZvcm0pID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IocGx1Z2luOiBQbHVnaW4sIG9uU3VibWl0OiAodmFsdWU6IFNhdmVDb252ZXJzYXRpb25Gb3JtKSA9PiB2b2lkKSB7XG4gICAgc3VwZXIocGx1Z2luLmFwcCk7XG4gICAgdGhpcy5vblN1Ym1pdCA9IG9uU3VibWl0O1xuICB9XG5cbiAgb25PcGVuKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgY29udGVudEVsIH0gPSB0aGlzO1xuICAgIGNvbnRlbnRFbC5lbXB0eSgpO1xuXG4gICAgY29udGVudEVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiBcIlx1QjMwMFx1RDY1NCBKU09OIFx1QzgwMFx1QzdBNVwiIH0pO1xuXG4gICAgY29uc3QgaW5wdXRQYXRoRWwgPSBjb250ZW50RWwuY3JlYXRlRWwoXCJpbnB1dFwiLCB7IHR5cGU6IFwidGV4dFwiIH0pO1xuICAgIGlucHV0UGF0aEVsLnBsYWNlaG9sZGVyID0gXCJKU09OIFx1RDMwQ1x1Qzc3QyBcdUFDQkRcdUI4NUMgKFx1QkNGQ1x1RDJCOCBcdUFFMzBcdUM5MDApXCI7XG5cbiAgICBjb25zdCBzZXNzaW9uSWRFbCA9IGNvbnRlbnRFbC5jcmVhdGVFbChcImlucHV0XCIsIHsgdHlwZTogXCJ0ZXh0XCIgfSk7XG4gICAgc2Vzc2lvbklkRWwucGxhY2Vob2xkZXIgPSBcIlx1QzEzOFx1QzE1OCBJRFwiO1xuXG4gICAgY29uc3Qgb3V0cHV0Rm9sZGVyRWwgPSBjb250ZW50RWwuY3JlYXRlRWwoXCJpbnB1dFwiLCB7IHR5cGU6IFwidGV4dFwiIH0pO1xuICAgIG91dHB1dEZvbGRlckVsLnBsYWNlaG9sZGVyID0gXCJcdUM4MDBcdUM3QTUgXHVEM0Y0XHVCMzU0IChcdUMxMjBcdUQwREQsIFx1QkNGQ1x1RDJCOCBcdUFFMzBcdUM5MDApXCI7XG5cbiAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBjb250ZW50RWwuY3JlYXRlRWwoXCJidXR0b25cIiwgeyB0ZXh0OiBcIlx1QzgwMFx1QzdBNVwiIH0pO1xuICAgIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5vblN1Ym1pdCh7XG4gICAgICAgIGlucHV0UGF0aDogaW5wdXRQYXRoRWwudmFsdWUudHJpbSgpLFxuICAgICAgICBzZXNzaW9uSWQ6IHNlc3Npb25JZEVsLnZhbHVlLnRyaW0oKSxcbiAgICAgICAgb3V0cHV0Rm9sZGVyOiBvdXRwdXRGb2xkZXJFbC52YWx1ZS50cmltKClcbiAgICAgIH0pO1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH0pO1xuICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UdXJuIH0gZnJvbSBcIi4vY29udmVyc2F0aW9uXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVR1cm5zKGNvbnRlbnQ6IHN0cmluZyk6IENvbnZlcnNhdGlvblR1cm5bXSB7XG4gIGxldCBkYXRhOiB1bmtub3duO1xuICB0cnkge1xuICAgIGRhdGEgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xuICB9IGNhdGNoIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJKU09OIFx1RDYxNVx1QzJERFx1Qzc3NCBcdUM2MkNcdUJDMTRcdUI5NzRcdUM5QzAgXHVDNTRBXHVDMkI1XHVCMkM4XHVCMkU0LlwiKTtcbiAgfVxuXG4gIGlmICghQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkpTT05cdUM3NDAgXHVCQzMwXHVDNUY0XHVDNzc0XHVDNUI0XHVDNTdDIFx1RDU2OVx1QjJDOFx1QjJFNC5cIik7XG4gIH1cblxuICByZXR1cm4gZGF0YS5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgaWYgKCFpdGVtIHx8IHR5cGVvZiBpdGVtICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFx1Qzc5OFx1QkFCQlx1QjQxQyBcdUQ1NkRcdUJBQTk6ICR7aW5kZXggKyAxfVx1QkM4OFx1QzlGOGApO1xuICAgIH1cblxuICAgIGNvbnN0IHJvbGUgPSAoaXRlbSBhcyB7IHJvbGU/OiBzdHJpbmcgfSkucm9sZTtcbiAgICBjb25zdCBjb250ZW50VmFsdWUgPSAoaXRlbSBhcyB7IGNvbnRlbnQ/OiBzdHJpbmcgfSkuY29udGVudDtcbiAgICBjb25zdCB0aW1lc3RhbXBWYWx1ZSA9IChpdGVtIGFzIHsgdGltZXN0YW1wPzogc3RyaW5nIH0pLnRpbWVzdGFtcDtcblxuICAgIGlmIChyb2xlICE9PSBcInVzZXJcIiAmJiByb2xlICE9PSBcImFzc2lzdGFudFwiICYmIHJvbGUgIT09IFwic3lzdGVtXCIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgcm9sZVx1Qzc3NCBcdUM2MkNcdUJDMTRcdUI5NzRcdUM5QzAgXHVDNTRBXHVDMkI1XHVCMkM4XHVCMkU0OiAke2luZGV4ICsgMX1cdUJDODhcdUM5RjhgKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBjb250ZW50VmFsdWUgIT09IFwic3RyaW5nXCIgfHwgIWNvbnRlbnRWYWx1ZS50cmltKCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgY29udGVudFx1QUMwMCBcdUM2MkNcdUJDMTRcdUI5NzRcdUM5QzAgXHVDNTRBXHVDMkI1XHVCMkM4XHVCMkU0OiAke2luZGV4ICsgMX1cdUJDODhcdUM5RjhgKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcm9sZSxcbiAgICAgIGNvbnRlbnQ6IGNvbnRlbnRWYWx1ZSxcbiAgICAgIHRpbWVzdGFtcDogdGltZXN0YW1wVmFsdWVcbiAgICB9O1xuICB9KTtcbn1cbiIsICJpbXBvcnQgeyBOb3RpY2UsIFBsdWdpbiwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZywgcmVxdWVzdFVybCB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHR5cGUgeyBBcGlQcm92aWRlciwgT3ZsU2V0dGluZ3MgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgUFJPVklERVJfUFJFU0VUUyB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCB0eXBlIFNldHRpbmdzSG9zdCA9IFBsdWdpbiAmIHtcbiAgc2V0dGluZ3M6IE92bFNldHRpbmdzO1xuICBzYXZlU2V0dGluZ3M6ICgpID0+IFByb21pc2U8dm9pZD47XG59O1xuXG5leHBvcnQgY2xhc3MgT3ZsU2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuICBwcml2YXRlIHJlYWRvbmx5IHBsdWdpbjogU2V0dGluZ3NIb3N0O1xuICBwcml2YXRlIGdlbWluaU1vZGVsczogc3RyaW5nW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihwbHVnaW46IFNldHRpbmdzSG9zdCkge1xuICAgIHN1cGVyKHBsdWdpbi5hcHAsIHBsdWdpbik7XG4gICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gIH1cblxuICBkaXNwbGF5KCk6IHZvaWQge1xuICAgIGNvbnN0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XG4gICAgY29udGFpbmVyRWwuZW1wdHkoKTtcblxuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiBcIk9WTCBcdUMxMjRcdUM4MTVcIiB9KTtcblxuICAgIGxldCBhcGlVcmxJbnB1dDogeyBzZXRWYWx1ZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQgfSB8IG51bGwgPSBudWxsO1xuICAgIGxldCBtb2RlbElucHV0OiB7IHNldFZhbHVlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZCB9IHwgbnVsbCA9IG51bGw7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiQVBJIFx1QzgxQ1x1QUNGNVx1QzBBQ1wiKVxuICAgICAgLnNldERlc2MoXCJcdUMwQUNcdUM2QTlcdUQ1NjAgQVBJIFx1QzgxQ1x1QUNGNVx1QzBBQ1x1Qjk3QyBcdUMxMjBcdUQwRERcdUQ1NThcdUMxMzhcdUM2OTQuIChPbGxhbWEgXHVEM0VDXHVENTY4KVwiKVxuICAgICAgLmFkZERyb3Bkb3duKChkcm9wZG93bikgPT4ge1xuICAgICAgICBkcm9wZG93blxuICAgICAgICAgIC5hZGRPcHRpb25zKHtcbiAgICAgICAgICAgIGdlbWluaTogXCJHb29nbGUgR2VtaW5pXCIsXG4gICAgICAgICAgICBvcGVuYWk6IFwiT3BlbkFJIFx1RDYzOFx1RDY1OFwiLFxuICAgICAgICAgICAgb2xsYW1hOiBcIk9sbGFtYSAoXHVCODVDXHVDRUVDKVwiLFxuICAgICAgICAgICAgY3VzdG9tOiBcIlx1QzBBQ1x1QzZBOVx1Qzc5MCBcdUM5QzBcdUM4MTVcIlxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnByb3ZpZGVyKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gdmFsdWUgYXMgQXBpUHJvdmlkZXI7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5wcm92aWRlciA9IHByb3ZpZGVyO1xuICAgICAgICAgICAgY29uc3QgcHJlc2V0ID0gUFJPVklERVJfUFJFU0VUU1twcm92aWRlcl07XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5hcGlVcmwgPSBwcmVzZXQuYXBpVXJsO1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubW9kZWwgPSBwcmVzZXQubW9kZWw7XG4gICAgICAgICAgICBhcGlVcmxJbnB1dD8uc2V0VmFsdWUocHJlc2V0LmFwaVVybCk7XG4gICAgICAgICAgICBtb2RlbElucHV0Py5zZXRWYWx1ZShwcmVzZXQubW9kZWwpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIkFQSSBVUkxcIilcbiAgICAgIC5zZXREZXNjKFwiXHVDODFDXHVBQ0Y1XHVDMEFDXHVCQ0M0IFx1Q0M0NFx1RDMwNSBcdUM1RDRcdUI0RENcdUQzRUNcdUM3NzhcdUQyQjggVVJMXCIpXG4gICAgICAuYWRkVGV4dCgodGV4dCkgPT4ge1xuICAgICAgICBhcGlVcmxJbnB1dCA9IHRleHQ7XG4gICAgICAgIHRleHRcbiAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJodHRwOi8vbG9jYWxob3N0OjExNDM0L3YxL2NoYXQvY29tcGxldGlvbnNcIilcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuYXBpVXJsKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmFwaVVybCA9IHZhbHVlLnRyaW0oKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiQVBJIFx1RDBBNFwiKVxuICAgICAgLnNldERlc2MoXCJcdUQ1NDRcdUM2OTRcdUQ1NUMgXHVBQ0JEXHVDNkIwIEJlYXJlciBcdUQxQTBcdUQwNzAgXHVCNjEwXHVCMjk0IFx1QzgxQ1x1QUNGNVx1QzBBQyBcdUQwQTRcdUI5N0MgXHVDNzg1XHVCODI1XHVENTU4XHVDMTM4XHVDNjk0LlwiKVxuICAgICAgLmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgIHRleHRcbiAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJcdUMxMjBcdUQwRERcIilcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuYXBpS2V5KVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmFwaUtleSA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MucHJvdmlkZXIgPT09IFwiZ2VtaW5pXCIpIHtcbiAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAuc2V0TmFtZShcIkdlbWluaSBcdUJBQThcdUIzNzggXHVCQUE5XHVCODVEXCIpXG4gICAgICAgIC5zZXREZXNjKFwiR29vZ2xlXHVDNUQwXHVDMTFDIFx1QzgxQ1x1QUNGNVx1RDU1OFx1QjI5NCBcdUJBQThcdUIzNzhcdUM3NDQgXHVCRDg4XHVCN0VDXHVDNjQwIFx1QzEyMFx1RDBERFx1RDU2MCBcdUMyMTggXHVDNzg4XHVDMkI1XHVCMkM4XHVCMkU0LlwiKVxuICAgICAgICAuYWRkQnV0dG9uKChidXR0b24pID0+IHtcbiAgICAgICAgICBidXR0b24uc2V0QnV0dG9uVGV4dChcIlx1QkFBOVx1Qjg1RCBcdUJEODhcdUI3RUNcdUM2MjRcdUFFMzBcIikub25DbGljayhhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmxvYWRHZW1pbmlNb2RlbHMoKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgaWYgKHRoaXMuZ2VtaW5pTW9kZWxzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgLnNldE5hbWUoXCJHZW1pbmkgXHVCQUE4XHVCMzc4IFx1QzEyMFx1RDBERFwiKVxuICAgICAgICAgIC5zZXREZXNjKFwiXHVCQUE5XHVCODVEXHVDNUQwIFx1QzVDNlx1QjI5NCBcdUJBQThcdUIzNzhcdUM3NDAgXHVDNTQ0XHVCNzk4XHVDNUQwXHVDMTFDIFx1QzlDMVx1QzgxMSBcdUM3ODVcdUI4MjVcdUQ1NThcdUMxMzhcdUM2OTQuXCIpXG4gICAgICAgICAgLmFkZERyb3Bkb3duKChkcm9wZG93bikgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuZ2VtaW5pTW9kZWxzLnJlZHVjZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PihcbiAgICAgICAgICAgICAgKGFjYywgbmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgIGFjY1tuYW1lXSA9IG5hbWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBkcm9wZG93blxuICAgICAgICAgICAgICAuYWRkT3B0aW9ucyhvcHRpb25zKVxuICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubW9kZWwpXG4gICAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5tb2RlbCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIG1vZGVsSW5wdXQ/LnNldFZhbHVlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIlx1QkFBOFx1QjM3OFwiKVxuICAgICAgLnNldERlc2MoXCJcdUM4MUNcdUFDRjVcdUMwQUNcdUJDQzQgXHVCQUE4XHVCMzc4IFx1Qzc3NFx1Qjk4NCAoXHVDOUMxXHVDODExIFx1Qzc4NVx1QjgyNSBcdUFDMDBcdUIyQTUpXCIpXG4gICAgICAuYWRkVGV4dCgodGV4dCkgPT4ge1xuICAgICAgICBtb2RlbElucHV0ID0gdGV4dDtcbiAgICAgICAgdGV4dFxuICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcImdwdC00by1taW5pXCIpXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLm1vZGVsKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLm1vZGVsID0gdmFsdWUudHJpbSgpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJcdUMyRENcdUMyQTRcdUQxNUMgXHVENTA0XHVCODZDXHVENTA0XHVEMkI4XCIpXG4gICAgICAuc2V0RGVzYyhcIlx1QkFBOFx1QjRFMCBcdUM2OTRcdUNDQURcdUM1RDAgXHVEM0VDXHVENTY4XHVCNDIwIFx1QzJEQ1x1QzJBNFx1RDE1QyBcdUJBNTRcdUMyRENcdUM5QzBcIilcbiAgICAgIC5hZGRUZXh0QXJlYSgodGV4dCkgPT5cbiAgICAgICAgdGV4dFxuICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcIlx1QzYwODogXHVCMTA4XHVCMjk0IE9ic2lkaWFuIFx1QjlBQ1x1QzExQ1x1Q0U1OCBcdUM1QjRcdUMyRENcdUMyQTRcdUQxMzRcdUQyQjhcdUIyRTQuXCIpXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnN5c3RlbVByb21wdClcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zeXN0ZW1Qcm9tcHQgPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIlx1QUUzMFx1QkNGOCBcdUM4MDBcdUM3QTUgXHVEM0Y0XHVCMzU0XCIpXG4gICAgICAuc2V0RGVzYyhcIlx1QjMwMFx1RDY1NFx1Qjk3QyBcdUM4MDBcdUM3QTVcdUQ1NjAgXHVBRTMwXHVCQ0Y4IFx1RDNGNFx1QjM1NCAoXHVCQ0ZDXHVEMkI4IFx1QUUzMFx1QzkwMClcIilcbiAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PlxuICAgICAgICB0ZXh0XG4gICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiXHVDNjA4OiBDb252ZXJzYXRpb25zXCIpXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmRlZmF1bHRPdXRwdXRGb2xkZXIpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZGVmYXVsdE91dHB1dEZvbGRlciA9IHZhbHVlLnRyaW0oKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBsb2FkR2VtaW5pTW9kZWxzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGFwaUtleSA9IHRoaXMucGx1Z2luLnNldHRpbmdzLmFwaUtleS50cmltKCk7XG4gICAgaWYgKCFhcGlLZXkpIHtcbiAgICAgIG5ldyBOb3RpY2UoXCJHZW1pbmkgQVBJIFx1RDBBNFx1Qjk3QyBcdUJBM0NcdUM4MDAgXHVDNzg1XHVCODI1XHVENTc0IFx1QzhGQ1x1QzEzOFx1QzY5NC5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcmVxdWVzdFVybCh7XG4gICAgICAgIHVybDogYGh0dHBzOi8vZ2VuZXJhdGl2ZWxhbmd1YWdlLmdvb2dsZWFwaXMuY29tL3YxYmV0YS9tb2RlbHM/a2V5PSR7YXBpS2V5fWBcbiAgICAgIH0pO1xuICAgICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmpzb24gYXNcbiAgICAgICAgfCB7IG1vZGVscz86IEFycmF5PHsgbmFtZT86IHN0cmluZzsgc3VwcG9ydGVkR2VuZXJhdGlvbk1ldGhvZHM/OiBzdHJpbmdbXSB9PiB9XG4gICAgICAgIHwgdW5kZWZpbmVkO1xuICAgICAgY29uc3QgbW9kZWxzID0gZGF0YT8ubW9kZWxzID8/IFtdO1xuICAgICAgdGhpcy5nZW1pbmlNb2RlbHMgPSBtb2RlbHNcbiAgICAgICAgLmZpbHRlcigobW9kZWwpID0+IG1vZGVsLnN1cHBvcnRlZEdlbmVyYXRpb25NZXRob2RzPy5pbmNsdWRlcyhcImdlbmVyYXRlQ29udGVudFwiKSlcbiAgICAgICAgLm1hcCgobW9kZWwpID0+IG1vZGVsLm5hbWUpXG4gICAgICAgIC5maWx0ZXIoKG5hbWUpOiBuYW1lIGlzIHN0cmluZyA9PiBCb29sZWFuKG5hbWUpKTtcblxuICAgICAgaWYgKHRoaXMuZ2VtaW5pTW9kZWxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBuZXcgTm90aWNlKFwiXHVDMEFDXHVDNkE5IFx1QUMwMFx1QjJBNVx1RDU1QyBHZW1pbmkgXHVCQUE4XHVCMzc4XHVDNzQ0IFx1Q0MzRVx1QzlDMCBcdUJBQkJcdUQ1ODhcdUMyQjVcdUIyQzhcdUIyRTQuXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3IE5vdGljZShcIkdlbWluaSBcdUJBQThcdUIzNzggXHVCQUE5XHVCODVEXHVDNzQ0IFx1QkQ4OFx1QjdFQ1x1QzY1NFx1QzJCNVx1QjJDOFx1QjJFNC5cIik7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcik7XG4gICAgICBuZXcgTm90aWNlKGBHZW1pbmkgXHVCQUE4XHVCMzc4IFx1QkFBOVx1Qjg1RCBcdUMyRTRcdUQzMjg6ICR7bWVzc2FnZX1gKTtcbiAgICB9XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBJdGVtVmlldywgTm90aWNlLCBXb3Jrc3BhY2VMZWFmIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR1cm4gfSBmcm9tIFwiLi4vY29udmVyc2F0aW9uXCI7XG5pbXBvcnQgdHlwZSB7IFBsdWdpbkNoYXRBcGkgfSBmcm9tIFwiLi4vcGx1Z2luQXBpXCI7XG5cbmV4cG9ydCBjb25zdCBWSUVXX1RZUEVfT1ZMX0NIQVQgPSBcIm92bC1jaGF0LXZpZXdcIjtcblxuZXhwb3J0IGNsYXNzIENoYXRWaWV3IGV4dGVuZHMgSXRlbVZpZXcge1xuICBwcml2YXRlIHJlYWRvbmx5IHBsdWdpbjogUGx1Z2luQ2hhdEFwaTtcbiAgcHJpdmF0ZSBtZXNzYWdlczogQ29udmVyc2F0aW9uVHVybltdID0gW107XG4gIHByaXZhdGUgbWVzc2FnZXNFbDogSFRNTERpdkVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBpbnB1dEVsOiBIVE1MVGV4dEFyZWFFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgc2VuZEJ1dHRvbkVsOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHNhdmVCdXR0b25FbDogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBzZXNzaW9uSWRFbDogSFRNTElucHV0RWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKGxlYWY6IFdvcmtzcGFjZUxlYWYsIHBsdWdpbjogUGx1Z2luQ2hhdEFwaSkge1xuICAgIHN1cGVyKGxlYWYpO1xuICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICB9XG5cbiAgZ2V0Vmlld1R5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gVklFV19UWVBFX09WTF9DSEFUO1xuICB9XG5cbiAgZ2V0RGlzcGxheVRleHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCJPVkwgXHVCMzAwXHVENjU0XCI7XG4gIH1cblxuICBnZXRJY29uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFwibWVzc2FnZS1jaXJjbGVcIjtcbiAgfVxuXG4gIGFzeW5jIG9uT3BlbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IGNvbnRlbnRFbCB9ID0gdGhpcztcbiAgICBjb250ZW50RWwuZW1wdHkoKTtcbiAgICBjb250ZW50RWwuYWRkQ2xhc3MoXCJvdmwtY2hhdC12aWV3XCIpO1xuXG4gICAgY29uc3QgaGVhZGVyRWwgPSBjb250ZW50RWwuY3JlYXRlRWwoXCJkaXZcIiwgeyBjbHM6IFwib3ZsLWNoYXQtaGVhZGVyXCIgfSk7XG4gICAgaGVhZGVyRWwuY3JlYXRlRWwoXCJkaXZcIiwgeyBjbHM6IFwib3ZsLWNoYXQtdGl0bGVcIiwgdGV4dDogXCJPVkwgXHVCMzAwXHVENjU0XCIgfSk7XG5cbiAgICBjb25zdCBzZXNzaW9uV3JhcEVsID0gaGVhZGVyRWwuY3JlYXRlRWwoXCJkaXZcIiwgeyBjbHM6IFwib3ZsLWNoYXQtc2Vzc2lvblwiIH0pO1xuICAgIHNlc3Npb25XcmFwRWwuY3JlYXRlRWwoXCJzcGFuXCIsIHsgdGV4dDogXCJcdUMxMzhcdUMxNThcIiB9KTtcbiAgICBjb25zdCBzZXNzaW9uSW5wdXRFbCA9IHNlc3Npb25XcmFwRWwuY3JlYXRlRWwoXCJpbnB1dFwiLCB7IHR5cGU6IFwidGV4dFwiIH0pO1xuICAgIHNlc3Npb25JbnB1dEVsLnZhbHVlID0gdGhpcy5idWlsZFNlc3Npb25JZCgpO1xuICAgIHRoaXMuc2Vzc2lvbklkRWwgPSBzZXNzaW9uSW5wdXRFbDtcblxuICAgIGNvbnN0IGNvbnRyb2xzRWwgPSBoZWFkZXJFbC5jcmVhdGVFbChcImRpdlwiLCB7IGNsczogXCJvdmwtY2hhdC1jb250cm9sc1wiIH0pO1xuICAgIGNvbnN0IHNhdmVCdXR0b25FbCA9IGNvbnRyb2xzRWwuY3JlYXRlRWwoXCJidXR0b25cIiwgeyB0ZXh0OiBcIlx1QzgwMFx1QzdBNVwiIH0pO1xuICAgIHNhdmVCdXR0b25FbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdm9pZCB0aGlzLmhhbmRsZVNhdmUoKTtcbiAgICB9KTtcbiAgICB0aGlzLnNhdmVCdXR0b25FbCA9IHNhdmVCdXR0b25FbDtcblxuICAgIGNvbnN0IG1lc3NhZ2VzRWwgPSBjb250ZW50RWwuY3JlYXRlRWwoXCJkaXZcIiwgeyBjbHM6IFwib3ZsLWNoYXQtbWVzc2FnZXNcIiB9KTtcbiAgICB0aGlzLm1lc3NhZ2VzRWwgPSBtZXNzYWdlc0VsO1xuXG4gICAgY29uc3QgaW5wdXRXcmFwRWwgPSBjb250ZW50RWwuY3JlYXRlRWwoXCJkaXZcIiwgeyBjbHM6IFwib3ZsLWNoYXQtaW5wdXRcIiB9KTtcbiAgICBjb25zdCB0ZXh0YXJlYUVsID0gaW5wdXRXcmFwRWwuY3JlYXRlRWwoXCJ0ZXh0YXJlYVwiKTtcbiAgICB0ZXh0YXJlYUVsLnBsYWNlaG9sZGVyID0gXCJcdUJBNTRcdUMyRENcdUM5QzBcdUI5N0MgXHVDNzg1XHVCODI1XHVENTU4XHVDMTM4XHVDNjk0LiAoQ3RybCtFbnRlciBcdUM4MDRcdUMxQTEpXCI7XG4gICAgdGhpcy5pbnB1dEVsID0gdGV4dGFyZWFFbDtcblxuICAgIGNvbnN0IHNlbmRCdXR0b25FbCA9IGlucHV0V3JhcEVsLmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHsgdGV4dDogXCJcdUM4MDRcdUMxQTFcIiB9KTtcbiAgICBzZW5kQnV0dG9uRWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHZvaWQgdGhpcy5oYW5kbGVTZW5kKCk7XG4gICAgfSk7XG4gICAgdGhpcy5zZW5kQnV0dG9uRWwgPSBzZW5kQnV0dG9uRWw7XG5cbiAgICB0ZXh0YXJlYUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChldmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFbnRlclwiICYmIChldmVudC5jdHJsS2V5IHx8IGV2ZW50Lm1ldGFLZXkpKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZvaWQgdGhpcy5oYW5kbGVTZW5kKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkU2Vzc2lvbklkKCk6IHN0cmluZyB7XG4gICAgY29uc3Qgc3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgvWzouXS9nLCBcIi1cIik7XG4gICAgcmV0dXJuIGBzZXNzaW9uLSR7c3RhbXB9YDtcbiAgfVxuXG4gIHByaXZhdGUgc2V0QnVzeShpc0J1c3k6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zZW5kQnV0dG9uRWwpIHtcbiAgICAgIHRoaXMuc2VuZEJ1dHRvbkVsLmRpc2FibGVkID0gaXNCdXN5O1xuICAgIH1cbiAgICBpZiAodGhpcy5zYXZlQnV0dG9uRWwpIHtcbiAgICAgIHRoaXMuc2F2ZUJ1dHRvbkVsLmRpc2FibGVkID0gaXNCdXN5O1xuICAgIH1cbiAgICBpZiAodGhpcy5pbnB1dEVsKSB7XG4gICAgICB0aGlzLmlucHV0RWwuZGlzYWJsZWQgPSBpc0J1c3k7XG4gICAgfVxuICAgIGlmIChpc0J1c3kpIHtcbiAgICAgIHRoaXMuY29udGVudEVsLmFkZENsYXNzKFwib3ZsLWNoYXQtYnVzeVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb250ZW50RWwucmVtb3ZlQ2xhc3MoXCJvdmwtY2hhdC1idXN5XCIpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXBwZW5kTWVzc2FnZSh0dXJuOiBDb252ZXJzYXRpb25UdXJuKTogdm9pZCB7XG4gICAgdGhpcy5tZXNzYWdlcy5wdXNoKHR1cm4pO1xuICAgIGlmICghdGhpcy5tZXNzYWdlc0VsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbWVzc2FnZUVsID0gdGhpcy5tZXNzYWdlc0VsLmNyZWF0ZUVsKFwiZGl2XCIsIHtcbiAgICAgIGNsczogYG92bC1jaGF0LW1lc3NhZ2Ugb3ZsLWNoYXQtJHt0dXJuLnJvbGV9YFxuICAgIH0pO1xuICAgIG1lc3NhZ2VFbC5jcmVhdGVFbChcImRpdlwiLCB7XG4gICAgICBjbHM6IFwib3ZsLWNoYXQtcm9sZVwiLFxuICAgICAgdGV4dDogdGhpcy5nZXRSb2xlTGFiZWwodHVybi5yb2xlKVxuICAgIH0pO1xuICAgIG1lc3NhZ2VFbC5jcmVhdGVFbChcImRpdlwiLCB7XG4gICAgICBjbHM6IFwib3ZsLWNoYXQtY29udGVudFwiLFxuICAgICAgdGV4dDogdHVybi5jb250ZW50XG4gICAgfSk7XG4gICAgaWYgKHR1cm4udGltZXN0YW1wKSB7XG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSB0eXBlb2YgdHVybi50aW1lc3RhbXAgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyB0dXJuLnRpbWVzdGFtcFxuICAgICAgICA6IHR1cm4udGltZXN0YW1wLnRvSVNPU3RyaW5nKCk7XG4gICAgICBtZXNzYWdlRWwuY3JlYXRlRWwoXCJkaXZcIiwge1xuICAgICAgICBjbHM6IFwib3ZsLWNoYXQtdGltZXN0YW1wXCIsXG4gICAgICAgIHRleHQ6IHRpbWVzdGFtcFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5tZXNzYWdlc0VsLnNjcm9sbFRvcCA9IHRoaXMubWVzc2FnZXNFbC5zY3JvbGxIZWlnaHQ7XG4gIH1cblxuICBwcml2YXRlIGdldFJvbGVMYWJlbChyb2xlOiBDb252ZXJzYXRpb25UdXJuW1wicm9sZVwiXSk6IHN0cmluZyB7XG4gICAgaWYgKHJvbGUgPT09IFwidXNlclwiKSB7XG4gICAgICByZXR1cm4gXCJcdUMwQUNcdUM2QTlcdUM3OTBcIjtcbiAgICB9XG4gICAgaWYgKHJvbGUgPT09IFwiYXNzaXN0YW50XCIpIHtcbiAgICAgIHJldHVybiBcIlx1QzVCNFx1QzJEQ1x1QzJBNFx1RDEzNFx1RDJCOFwiO1xuICAgIH1cbiAgICByZXR1cm4gXCJcdUMyRENcdUMyQTRcdUQxNUNcIjtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgaGFuZGxlU2VuZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBpbnB1dCA9IHRoaXMuaW5wdXRFbD8udmFsdWUudHJpbSgpID8/IFwiXCI7XG4gICAgaWYgKCFpbnB1dCkge1xuICAgICAgbmV3IE5vdGljZShcIlx1QkE1NFx1QzJEQ1x1QzlDMFx1Qjk3QyBcdUM3ODVcdUI4MjVcdUQ1NzQgXHVDOEZDXHVDMTM4XHVDNjk0LlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmFwcGVuZE1lc3NhZ2Uoe1xuICAgICAgcm9sZTogXCJ1c2VyXCIsXG4gICAgICBjb250ZW50OiBpbnB1dCxcbiAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgfSk7XG4gICAgaWYgKHRoaXMuaW5wdXRFbCkge1xuICAgICAgdGhpcy5pbnB1dEVsLnZhbHVlID0gXCJcIjtcbiAgICB9XG5cbiAgICB0aGlzLnNldEJ1c3kodHJ1ZSk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlcGx5ID0gYXdhaXQgdGhpcy5wbHVnaW4ucmVxdWVzdEFzc2lzdGFudFJlcGx5KHRoaXMubWVzc2FnZXMpO1xuICAgICAgdGhpcy5hcHBlbmRNZXNzYWdlKHtcbiAgICAgICAgcm9sZTogXCJhc3Npc3RhbnRcIixcbiAgICAgICAgY29udGVudDogcmVwbHksXG4gICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKTtcbiAgICAgIG5ldyBOb3RpY2UoYFx1QjMwMFx1RDY1NCBcdUMyRTRcdUQzMjg6ICR7bWVzc2FnZX1gKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5zZXRCdXN5KGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGhhbmRsZVNhdmUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHRoaXMubWVzc2FnZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBuZXcgTm90aWNlKFwiXHVDODAwXHVDN0E1XHVENTYwIFx1QjMwMFx1RDY1NFx1QUMwMCBcdUM1QzZcdUMyQjVcdUIyQzhcdUIyRTQuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNlc3Npb25JZCA9IHRoaXMuc2Vzc2lvbklkRWw/LnZhbHVlLnRyaW0oKSA/PyBcIlwiO1xuICAgIGlmICghc2Vzc2lvbklkKSB7XG4gICAgICBuZXcgTm90aWNlKFwiXHVDMTM4XHVDMTU4IElEXHVCOTdDIFx1Qzc4NVx1QjgyNVx1RDU3NCBcdUM4RkNcdUMxMzhcdUM2OTQuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCB0YXJnZXRQYXRoID0gYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZUNvbnZlcnNhdGlvbkZyb21UdXJucyhcbiAgICAgICAgc2Vzc2lvbklkLFxuICAgICAgICB0aGlzLm1lc3NhZ2VzLFxuICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWZhdWx0T3V0cHV0Rm9sZGVyXG4gICAgICApO1xuICAgICAgbmV3IE5vdGljZShgXHVCMzAwXHVENjU0IFx1QzgwMFx1QzdBNSBcdUM2NDRcdUI4Q0M6ICR7dGFyZ2V0UGF0aH1gKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKTtcbiAgICAgIG5ldyBOb3RpY2UoYFx1QzgwMFx1QzdBNSBcdUMyRTRcdUQzMjg6ICR7bWVzc2FnZX1gKTtcbiAgICB9XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBQUFBLG1CQUE4Qzs7O0FDQzlDLHNCQUE4Qjs7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U0FBUyxFQUFFLFFBQVEsUUFBUSxFQUFFO0FBQ2pFLFlBQU0sYUFBYSxNQUFNLEtBQUssSUFBSSxNQUFNLFFBQVEsT0FBTyxRQUFRO0FBQy9ELFVBQUksQ0FBQyxZQUFZO0FBQ2YsWUFBSSx3QkFBTyx1RUFBcUI7QUFDaEM7QUFBQSxNQUNGO0FBQ0EsWUFBTSxjQUFjLE1BQU0sS0FBSyxJQUFJLE1BQU0sUUFBUSxLQUFLLFFBQVE7QUFDOUQsWUFBTSxRQUFRLFdBQVcsV0FBVztBQUVwQyxZQUFNLGVBQWUsS0FBSyxtQkFDdEIsZ0NBQWMsS0FBSyxZQUFZLEVBQUUsUUFBUSxRQUFRLEVBQUUsSUFDbkQ7QUFDSixZQUFNLGFBQWEsTUFBTTtBQUFBLFFBQ3ZCLEtBQUssSUFBSTtBQUFBLFFBQ1QsS0FBSztBQUFBLFFBQ0w7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUNBLFVBQUksd0JBQU8sMkNBQWEsVUFBVSxFQUFFO0FBQUEsSUFDdEMsU0FBUyxPQUFPO0FBQ2QsWUFBTSxVQUFVLGlCQUFpQixRQUFRLE1BQU0sVUFBVSxPQUFPLEtBQUs7QUFDckUsVUFBSSx3QkFBTyw4QkFBVSxPQUFPLEVBQUU7QUFBQSxJQUNoQztBQUFBLEVBQ0Y7QUFDRjsiLAogICJuYW1lcyI6IFsiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJ0ZXh0IiwgIl9hIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgIl9hIiwgImltcG9ydF9vYnNpZGlhbiJdCn0K
