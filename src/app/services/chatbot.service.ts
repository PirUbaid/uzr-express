import { Injectable } from '@angular/core';
import { CHATBOT_CONFIG } from '../chatbot/chatbot.config';

export type ChatRole = 'user' | 'assistant';

export interface ChatbotHistoryItem {
  role: ChatRole;
  content: string;
}

export interface ChatbotReply {
  reply: string;
  conversationId: string;
}

@Injectable({ providedIn: 'root' })
export class ChatbotService {
  async sendMessage(
    message: string,
    conversationId: string,
    history: ChatbotHistoryItem[]
  ): Promise<ChatbotReply> {
    let timeoutId = 0;

    const request = fetch(CHATBOT_CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        conversationId,
        messages: history.slice(-8),
      }),
    });

    const timeout = new Promise<Response>((_, reject) => {
      timeoutId = window.setTimeout(() => {
        reject(new Error('Chatbot request timed out'));
      }, 12000);
    });

    const response = await Promise.race([request, timeout]).finally(() =>
      window.clearTimeout(timeoutId)
    );

    if (!response.ok) {
      throw new Error('Chatbot request failed');
    }

    const data = (await response.json()) as Partial<ChatbotReply>;

    if (!data.reply || !data.conversationId) {
      throw new Error('Chatbot response was incomplete');
    }

    return {
      reply: data.reply,
      conversationId: data.conversationId,
    };
  }
}
