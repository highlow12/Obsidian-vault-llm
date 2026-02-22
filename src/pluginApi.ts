import type { ConversationTurn } from "./conversation";
import type { OvlSettings } from "./types";
import type { Chunk, NoteMetadata } from "./indexing/types";
import type { PluginManifest } from "obsidian";
import type { ChatSessionSummary } from "./chatSessionStore";

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
  manifest: PluginManifest;
  settings: OvlSettings;
  requestAssistantReply: (turns: ConversationTurn[]) => Promise<string>;
  requestAssistantReplyStream: (
    turns: ConversationTurn[],
    options: AssistantReplyStreamOptions
  ) => Promise<string>;
  requestTitleReply: (prompt: string) => Promise<string>;
  saveConversationFromTurns: (
    sessionId: string,
    turns: ConversationTurn[],
    outputFolder: string
  ) => Promise<string>;
  saveChatSession: (sessionId: string, turns: ConversationTurn[]) => Promise<string>;
  listChatSessions: () => Promise<ChatSessionSummary[]>;
  loadChatSession: (sessionId: string) => Promise<ConversationTurn[]>;
  deleteChatSession: (sessionId: string) => Promise<void>;
  search: (query: string) => Promise<Array<{ chunk: Chunk; note: NoteMetadata; score: number }>>;
};
