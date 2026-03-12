import type { ConversationTurn } from "./conversation";
import type { OvlSettings } from "./types";
import type { Chunk, NoteMetadata, SearchFilter } from "./indexing/types";
import type { App, PluginManifest } from "obsidian";
import type { ChatSessionSummary } from "./chatSessionStore";
import type { MultiNoteSaveResult } from "./topicSeparation";

export type AssistantReplyStreamOptions = {
  signal?: AbortSignal;
  onToken: (token: string) => void;
  onUsage?: (usage: AssistantTokenUsage) => void;
};

export type AssistantTokenUsage = {
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
};

export type PluginChatApi = {
  app: App;
  manifest: PluginManifest;
  settings: OvlSettings;
  requestAssistantReply: (turns: ConversationTurn[]) => Promise<string>;
  requestAssistantReplyStream: (
    turns: ConversationTurn[],
    options: AssistantReplyStreamOptions
  ) => Promise<string>;
  requestTitleReply: (prompt: string) => Promise<string>;
  requestSummaryReply: (prompt: string) => Promise<string>;
  saveConversationFromTurns: (
    sessionId: string,
    turns: ConversationTurn[],
    outputFolder: string
  ) => Promise<string>;
  saveChatSession: (sessionId: string, turns: ConversationTurn[]) => Promise<string>;
  listChatSessions: () => Promise<ChatSessionSummary[]>;
  loadChatSession: (sessionId: string) => Promise<ConversationTurn[]>;
  deleteChatSession: (sessionId: string) => Promise<void>;
  search: (
    query: string,
    filter?: SearchFilter
  ) => Promise<Array<{ chunk: Chunk; note: NoteMetadata; score: number }>>;
  saveWithEmbeddingTopicSeparation: (
    turns: ConversationTurn[],
    baseTitle: string,
    outputFolder: string
  ) => Promise<MultiNoteSaveResult>;
};
