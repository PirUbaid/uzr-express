import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CHATBOT_CONFIG } from '../../chatbot/chatbot.config';
import {
  ChatRole,
  ChatbotHistoryItem,
  ChatbotService,
} from '../../services/chatbot.service';

interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  time: string;
  isError?: boolean;
}

interface QuickAction {
  label: string;
  message: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="chatbot" *ngIf="enabled">
      <button
        type="button"
        class="chatbot-launcher"
        [class.is-open]="isOpen"
        (click)="toggleChat()"
        aria-label="Open UZR Assistant"
        aria-controls="uzr-chatbot-panel"
        [attr.aria-expanded]="isOpen"
      >
        <i class="fa-solid" [class.fa-comments]="!isOpen" [class.fa-xmark]="isOpen"></i>
        <span class="chatbot-launcher__badge" *ngIf="!isOpen">AI</span>
      </button>

      <div
        *ngIf="isOpen"
        #chatPanel
        id="uzr-chatbot-panel"
        class="chatbot-panel"
        role="dialog"
        aria-modal="false"
        aria-labelledby="uzr-chatbot-title"
        tabindex="-1"
        (keydown.escape)="closeChat()"
      >
        <header class="chatbot-header">
          <div class="chatbot-avatar" aria-hidden="true">
            <i class="fa-solid fa-headset"></i>
          </div>
          <div>
            <h2 id="uzr-chatbot-title">UZR Assistant</h2>
            <p>Your UZR Express Customer Assistant</p>
          </div>
          <button type="button" class="chatbot-icon-btn" (click)="closeChat()" aria-label="Close chat">
            <i class="fa-solid fa-minus"></i>
          </button>
        </header>

        <div #messagesArea class="chatbot-messages" aria-live="polite">
          <article
            *ngFor="let message of messages"
            class="chat-message"
            [class.chat-message--user]="message.role === 'user'"
            [class.chat-message--assistant]="message.role === 'assistant'"
            [class.chat-message--error]="message.isError"
          >
            <div class="chat-message__bubble">
              <p>{{ message.text }}</p>
              <time>{{ message.time }}</time>
            </div>
          </article>

          <div class="quick-actions" *ngIf="showQuickActions">
            <button
              type="button"
              *ngFor="let action of quickActions"
              (click)="sendQuickAction(action)"
            >
              {{ action.label }}
            </button>
          </div>

          <article class="chat-message chat-message--assistant" *ngIf="isSending">
            <div class="chat-message__bubble chat-message__typing" aria-label="UZR Assistant is typing">
              <span></span><span></span><span></span>
            </div>
          </article>
        </div>

        <div class="chatbot-support">
          <a [href]="supportWhatsAppUrl" target="_blank" rel="noopener noreferrer">
            <i class="fa-brands fa-whatsapp"></i>
            Talk to Support
          </a>
          <button type="button" (click)="resetChat()">New Chat</button>
        </div>

        <form class="chatbot-composer" (ngSubmit)="sendDraft()">
          <label class="sr-only" for="uzr-chatbot-message">Message UZR Assistant</label>
          <textarea
            #messageInput
            id="uzr-chatbot-message"
            name="message"
            [(ngModel)]="draft"
            rows="1"
            maxlength="1000"
            placeholder="Ask about orders, delivery, services..."
            (keydown)="handleComposerKeydown($event)"
            [disabled]="isSending"
          ></textarea>
          <button type="submit" [disabled]="isSending || !draft.trim()" aria-label="Send message">
            <i class="fa-solid fa-paper-plane"></i>
          </button>
        </form>

        <button
          type="button"
          class="chatbot-retry"
          *ngIf="lastFailedMessage && !isSending"
          (click)="retryLastMessage()"
        >
          <i class="fa-solid fa-rotate-right"></i>
          Retry last message
        </button>
      </div>
    </section>
  `,
  styleUrl: './chatbot.component.scss',
})
export class ChatbotComponent implements AfterViewChecked {
  @ViewChild('chatPanel') private chatPanel?: ElementRef<HTMLElement>;
  @ViewChild('messageInput') private messageInput?: ElementRef<HTMLTextAreaElement>;
  @ViewChild('messagesArea') private messagesArea?: ElementRef<HTMLElement>;

  private readonly chatbotService = inject(ChatbotService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private shouldScrollMessages = false;
  private activeRequestId = '';

  enabled = CHATBOT_CONFIG.enabled;
  isOpen = false;
  isSending = false;
  draft = '';
  lastFailedMessage = '';
  conversationId = this.createConversationId();
  supportWhatsAppUrl = CHATBOT_CONFIG.supportWhatsAppUrl;

  quickActions: QuickAction[] = [
    { label: 'Place an Order', message: 'How can I place an order with UZR Express?' },
    { label: 'Track My Order', message: 'I want to track my UZR Express order.' },
    { label: 'Delivery Information', message: 'Tell me about delivery areas, timing and charges.' },
    { label: 'Services', message: 'What services does UZR Express provide?' },
    { label: 'Contact Support', message: 'I want to talk to UZR Express support.' },
  ];

  messages: ChatMessage[] = [this.createAssistantGreeting()];

  get showQuickActions(): boolean {
    return this.messages.length === 1 && !this.isSending;
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollMessages && this.messagesArea) {
      this.messagesArea.nativeElement.scrollTop = this.messagesArea.nativeElement.scrollHeight;
      this.shouldScrollMessages = false;
    }
  }

  toggleChat(): void {
    this.isOpen ? this.closeChat() : this.openChat();
  }

  openChat(): void {
    this.isOpen = true;
    this.queueScroll();
    setTimeout(() => {
      this.chatPanel?.nativeElement.focus();
      this.messageInput?.nativeElement.focus();
    });
  }

  closeChat(): void {
    this.isOpen = false;
  }

  resetChat(): void {
    this.messages = [this.createAssistantGreeting()];
    this.draft = '';
    this.lastFailedMessage = '';
    this.conversationId = this.createConversationId();
    this.queueScroll();
    setTimeout(() => this.messageInput?.nativeElement.focus());
  }

  sendQuickAction(action: QuickAction): void {
    this.sendMessage(action.message);
  }

  sendDraft(): void {
    this.sendMessage(this.draft);
  }

  retryLastMessage(): void {
    if (this.lastFailedMessage) {
      const message = this.lastFailedMessage;
      this.lastFailedMessage = '';
      this.sendMessage(message);
    }
  }

  handleComposerKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendDraft();
    }
  }

  private async sendMessage(rawMessage: string): Promise<void> {
    const message = rawMessage.trim();

    if (!message || this.isSending) {
      return;
    }

    this.draft = '';
    this.lastFailedMessage = '';
    this.messages.push(this.createMessage('user', message));
    this.isSending = true;
    this.queueScroll();
    const requestId = this.createConversationId();
    this.activeRequestId = requestId;
    const guardTimeoutId = window.setTimeout(() => {
      if (this.activeRequestId === requestId && this.isSending) {
        this.showRequestFailure(message);
      }
    }, 13000);

    try {
      const history = this.toHistory();
      const response = await this.chatbotService.sendMessage(message, this.conversationId, history);
      if (this.activeRequestId !== requestId || !this.isSending) {
        return;
      }
      this.conversationId = response.conversationId;
      this.messages.push(this.createMessage('assistant', response.reply));
    } catch {
      if (this.activeRequestId === requestId) {
        this.showRequestFailure(message);
      }
    } finally {
      window.clearTimeout(guardTimeoutId);
      if (this.activeRequestId === requestId) {
        this.activeRequestId = '';
        this.isSending = false;
      }
      this.queueScroll();
      setTimeout(() => this.messageInput?.nativeElement.focus());
    }
  }

  private toHistory(): ChatbotHistoryItem[] {
    return this.messages
      .filter((message) => !message.isError)
      .slice(-8)
      .map((message) => ({
        role: message.role,
        content: message.text,
      }));
  }

  private createAssistantGreeting(): ChatMessage {
    return this.createMessage(
      'assistant',
      'Assalamualaikum! I am the UZR Assistant. I can help with ordering, delivery information, services, tracking guidance, and support handoff.'
    );
  }

  private createMessage(role: ChatRole, text: string, isError = false): ChatMessage {
    return {
      id: this.createConversationId(),
      role,
      text,
      time: this.formatTime(new Date()),
      isError,
    };
  }

  private formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  private queueScroll(): void {
    this.shouldScrollMessages = true;
  }

  private showRequestFailure(message: string): void {
    this.lastFailedMessage = message;
    this.messages.push(
      this.createMessage(
        'assistant',
        'I could not connect to the assistant right now. Please retry, or tap Talk to Support to continue on WhatsApp.',
        true
      )
    );
    this.activeRequestId = '';
    this.isSending = false;
    this.queueScroll();
    this.changeDetectorRef.detectChanges();
  }

  private createConversationId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }

    return `chat_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  }
}
