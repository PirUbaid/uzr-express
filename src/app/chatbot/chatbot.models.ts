export type ChatRole = 'user' | 'assistant';

export interface ChatbotAction {
  label: string;
  route?: string;
  url?: string;
}

export interface ChatbotHistoryItem {
  role: ChatRole;
  content: string;
}

export interface ChatbotReply {
  reply: string;
  conversationId: string;
  actions?: ChatbotAction[];
}

export interface ChatbotIntent {
  id: string;
  keywords: Record<string, number>;
  phrases?: string[];
  reply: string;
  actions?: ChatbotAction[];
  threshold?: number;
}
