import type { ConversationTurn } from "./conversation";
import type { OvlSettings } from "./types";
import type { Chunk, NoteMetadata } from "./indexing/types";
import type { PluginManifest } from "obsidian";

export type PluginChatApi = {
  manifest: PluginManifest;
  settings: OvlSettings;
  requestAssistantReply: (turns: ConversationTurn[]) => Promise<string>;
  requestTitleReply: (prompt: string) => Promise<string>;
  saveConversationFromTurns: (
    sessionId: string,
    turns: ConversationTurn[],
    outputFolder: string
  ) => Promise<string>;
  search: (query: string) => Promise<Array<{ chunk: Chunk; note: NoteMetadata; score: number }>>;
};
