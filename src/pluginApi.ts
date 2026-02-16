import type { ConversationTurn } from "./conversation";
import type { OvlSettings } from "./types";

export type PluginChatApi = {
  settings: OvlSettings;
  requestAssistantReply: (turns: ConversationTurn[]) => Promise<string>;
  saveConversationFromTurns: (
    sessionId: string,
    turns: ConversationTurn[],
    outputFolder: string
  ) => Promise<string>;
};
