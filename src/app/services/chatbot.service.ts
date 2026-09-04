import { Injectable } from '@angular/core';
import {
  CHATBOT_FALLBACK_REPLY,
  CHATBOT_INTENTS,
  CHATBOT_SYNONYMS,
  UZR_SUPPORT_WHATSAPP_URL,
} from '../chatbot/chatbot-knowledge-base';
import { ChatbotHistoryItem, ChatbotIntent, ChatbotReply } from '../chatbot/chatbot.models';

@Injectable({ providedIn: 'root' })
export class ChatbotService {
  sendMessage(
    message: string,
    conversationId: string,
    _history: ChatbotHistoryItem[]
  ): ChatbotReply {
    const normalizedMessage = this.normalizeMessage(message);
    const tokens = this.tokenize(normalizedMessage);
    const intent = this.findBestIntent(normalizedMessage, tokens);

    if (!intent) {
      return {
        reply: CHATBOT_FALLBACK_REPLY,
        conversationId,
        actions: [{ label: 'Contact WhatsApp', url: UZR_SUPPORT_WHATSAPP_URL }],
      };
    }

    return {
      reply: intent.reply,
      conversationId,
      actions: intent.actions,
    };
  }

  private findBestIntent(message: string, tokens: string[]): ChatbotIntent | null {
    let bestIntent: ChatbotIntent | null = null;
    let bestScore = 0;

    for (const intent of CHATBOT_INTENTS) {
      let score = 0;

      Object.entries(intent.keywords).forEach(([keyword, weight]) => {
        if (tokens.includes(keyword)) {
          score += weight;
        }

        const synonyms = CHATBOT_SYNONYMS[keyword] || [];
        if (synonyms.some((synonym) => tokens.includes(synonym))) {
          score += Math.max(1, weight - 1);
        }
      });

      (intent.phrases || []).forEach((phrase) => {
        if (message.includes(this.normalizeMessage(phrase))) {
          score += 6;
        }
      });

      if (score >= bestScore) {
        bestScore = score;
        bestIntent = intent;
      }
    }

    if (!bestIntent || bestScore < (bestIntent.threshold || 4)) {
      return null;
    }

    return bestIntent;
  }

  private normalizeMessage(value: string): string {
    return value
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s/+-]/gu, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private tokenize(value: string): string[] {
    return value.split(' ').filter(Boolean);
  }
}
