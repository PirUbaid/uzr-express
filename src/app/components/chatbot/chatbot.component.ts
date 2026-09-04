import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CHATBOT_CONFIG } from '../../chatbot/chatbot.config';
import { CHATBOT_QUICK_ACTIONS } from '../../chatbot/chatbot-knowledge-base';
import {
  ChatRole,
  ChatbotAction,
  ChatbotHistoryItem,
} from '../../chatbot/chatbot.models';
import { ChatbotService } from '../../services/chatbot.service';

interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  time: string;
  actions?: ChatbotAction[];
}

interface StoredChatbotState {
  isOpen?: boolean;
  conversationId?: string;
  messages?: ChatMessage[];
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <section class="chatbot" *ngIf="enabled">
      <button
        #launcherButton
        type="button"
        class="chatbot-launcher"
        [class.is-open]="isOpen"
        (click)="toggleChat()"
        aria-label="Open UZR Assistant"
        aria-controls="uzr-chatbot-panel"
        [attr.aria-expanded]="isOpen"
      >
        <i class="fa-solid" [class.fa-comments]="!isOpen" [class.fa-xmark]="isOpen"></i>
        <span class="chatbot-launcher__badge" *ngIf="!isOpen">HELP</span>
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
            <p>Free local FAQ assistant</p>
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
          >
            <div class="chat-message__bubble">
              <p>{{ message.text }}</p>
              <div class="message-actions" *ngIf="message.actions?.length">
                <ng-container *ngFor="let action of message.actions">
                  <a
                    *ngIf="action.route"
                    [routerLink]="action.route"
                    (click)="closeChat()"
                  >
                    {{ action.label }}
                  </a>
                  <a
                    *ngIf="action.url"
                    [href]="action.url"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ action.label }}
                  </a>
                </ng-container>
              </div>
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
            <div
              class="chat-message__bubble chat-message__typing"
              aria-label="UZR Assistant is typing"
              role="status"
            >
              <span></span><span></span><span></span>
            </div>
          </article>
        </div>

        <div class="chatbot-support">
          <a [href]="supportWhatsAppUrl" target="_blank" rel="noopener noreferrer">
            <i class="fa-brands fa-whatsapp"></i>
            Talk to Support
          </a>
          <button #newChatButton type="button" (click)="requestNewChat()">New Chat</button>
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
            placeholder="Ask about delivery, jewellery, prices..."
            (keydown)="handleComposerKeydown($event)"
            [disabled]="isSending"
          ></textarea>
          <button type="submit" [disabled]="isSending || !draft.trim()" aria-label="Send message">
            <i class="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      </div>

      <div
        *ngIf="isNewChatModalOpen"
        class="chatbot-confirm-backdrop"
        (click)="closeNewChatModal()"
      ></div>
      <section
        *ngIf="isNewChatModalOpen"
        #newChatDialog
        class="chatbot-confirm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="chatbotNewChatTitle"
        tabindex="-1"
        (keydown.escape)="closeNewChatModal()"
      >
        <button type="button" class="chatbot-confirm-close" aria-label="Close new chat confirmation" (click)="closeNewChatModal()">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="chatbot-confirm-icon" aria-hidden="true">
          <i class="fa-solid fa-triangle-exclamation"></i>
        </div>
        <h2 id="chatbotNewChatTitle">Start a New Chat?</h2>
        <p>This will clear only your UZR Assistant conversation. Your cart, checkout details and payment method will stay unchanged.</p>
        <strong>This action cannot be undone.</strong>
        <div class="chatbot-confirm-actions">
          <button type="button" class="chatbot-keep-chat" (click)="closeNewChatModal()">Keep Chat</button>
          <button type="button" class="chatbot-clear-chat" (click)="confirmNewChat()">Yes, Start New Chat</button>
        </div>
      </section>
    </section>
  `,
  styleUrl: './chatbot.component.scss',
})
export class ChatbotComponent implements AfterViewChecked, OnInit, OnDestroy {
  @ViewChild('chatPanel') private chatPanel?: ElementRef<HTMLElement>;
  @ViewChild('launcherButton') private launcherButton?: ElementRef<HTMLButtonElement>;
  @ViewChild('messageInput') private messageInput?: ElementRef<HTMLTextAreaElement>;
  @ViewChild('messagesArea') private messagesArea?: ElementRef<HTMLElement>;
  @ViewChild('newChatButton') private newChatButton?: ElementRef<HTMLButtonElement>;
  @ViewChild('newChatDialog') private newChatDialog?: ElementRef<HTMLElement>;

  private readonly chatbotService = inject(ChatbotService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly storageKey = 'uzr_chatbot_v1';
  private readonly maxMessages = 50;
  private shouldScrollMessages = false;
  private typingTimerId = 0;

  enabled = CHATBOT_CONFIG.enabled;
  isOpen = false;
  isSending = false;
  isNewChatModalOpen = false;
  draft = '';
  conversationId = this.createConversationId();
  supportWhatsAppUrl = CHATBOT_CONFIG.supportWhatsAppUrl;
  quickActions = CHATBOT_QUICK_ACTIONS;
  messages: ChatMessage[] = [this.createAssistantGreeting()];

  get showQuickActions(): boolean {
    return this.messages.length === 1 && !this.isSending;
  }

  ngOnInit(): void {
    this.restoreState();
    if (this.isOpen) {
      setTimeout(() => this.messageInput?.nativeElement.focus());
    }
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollMessages && this.messagesArea) {
      this.messagesArea.nativeElement.scrollTop = this.messagesArea.nativeElement.scrollHeight;
      this.shouldScrollMessages = false;
    }
  }

  ngOnDestroy(): void {
    window.clearTimeout(this.typingTimerId);
    this.updateBodyScrollLock(false);
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.isNewChatModalOpen) {
      this.closeNewChatModal();
      return;
    }

    if (this.isOpen) {
      this.closeChat();
    }
  }

  toggleChat(): void {
    this.isOpen ? this.closeChat() : this.openChat();
  }

  openChat(): void {
    this.isOpen = true;
    this.saveState();
    this.queueScroll();
    setTimeout(() => {
      this.chatPanel?.nativeElement.focus();
      this.messageInput?.nativeElement.focus();
    });
  }

  closeChat(): void {
    this.isOpen = false;
    this.saveState();
    setTimeout(() => this.launcherButton?.nativeElement.focus());
  }

  requestNewChat(): void {
    if (this.messages.length <= 1) {
      this.resetChat();
      return;
    }

    this.isNewChatModalOpen = true;
    this.updateBodyScrollLock(true);
    setTimeout(() => this.newChatDialog?.nativeElement.focus());
  }

  confirmNewChat(): void {
    this.resetChat();
    this.closeNewChatModal({ restoreFocus: false });
    setTimeout(() => this.messageInput?.nativeElement.focus());
  }

  closeNewChatModal(options: { restoreFocus?: boolean } = {}): void {
    const { restoreFocus = true } = options;
    this.isNewChatModalOpen = false;
    this.updateBodyScrollLock(false);

    if (restoreFocus) {
      setTimeout(() => this.newChatButton?.nativeElement.focus());
    }
  }

  sendQuickAction(action: ChatbotAction): void {
    this.sendMessage(action.label);
  }

  sendDraft(): void {
    this.sendMessage(this.draft);
  }

  handleComposerKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendDraft();
    }
  }

  private sendMessage(rawMessage: string): void {
    const message = rawMessage.trim();

    if (!message || this.isSending) {
      return;
    }

    this.draft = '';
    this.messages.push(this.createMessage('user', message));
    this.trimMessages();
    this.isSending = true;
    this.queueScroll();
    this.saveState();

    const delay = 400 + Math.floor(Math.random() * 301);
    window.clearTimeout(this.typingTimerId);
    this.typingTimerId = window.setTimeout(() => {
      const response = this.chatbotService.sendMessage(message, this.conversationId, this.toHistory());
      this.conversationId = response.conversationId;
      this.messages.push(this.createMessage('assistant', response.reply, response.actions));
      this.trimMessages();
      this.isSending = false;
      this.queueScroll();
      this.saveState();
      this.changeDetectorRef.detectChanges();
      setTimeout(() => this.messageInput?.nativeElement.focus());
    }, delay);
  }

  private toHistory(): ChatbotHistoryItem[] {
    return this.messages
      .slice(-8)
      .map((message) => ({
        role: message.role,
        content: message.text,
      }));
  }

  private createAssistantGreeting(): ChatMessage {
    return this.createMessage(
      'assistant',
      'Assalam-o-Alaikum! Welcome to UZR Express. How can I help you today?'
    );
  }

  private createMessage(role: ChatRole, text: string, actions?: ChatbotAction[]): ChatMessage {
    return {
      id: this.createConversationId(),
      role,
      text,
      time: this.formatTime(new Date()),
      actions,
    };
  }

  private resetChat(): void {
    this.messages = [this.createAssistantGreeting()];
    this.draft = '';
    this.isSending = false;
    window.clearTimeout(this.typingTimerId);
    this.conversationId = this.createConversationId();
    this.removeStorageItem(this.storageKey);
    this.saveState();
    this.queueScroll();
  }

  private restoreState(): void {
    const storedState = this.readJson<StoredChatbotState>(this.storageKey);

    if (!storedState) {
      return;
    }

    this.isOpen = storedState.isOpen === true;
    this.conversationId =
      typeof storedState.conversationId === 'string' && storedState.conversationId
        ? storedState.conversationId
        : this.createConversationId();

    if (Array.isArray(storedState.messages)) {
      const restoredMessages = storedState.messages
        .filter((message) => this.isValidStoredMessage(message))
        .slice(-this.maxMessages);

      this.messages = restoredMessages.length ? restoredMessages : [this.createAssistantGreeting()];
    }
  }

  private saveState(): void {
    this.writeJson(this.storageKey, {
      isOpen: this.isOpen,
      conversationId: this.conversationId,
      messages: this.messages.slice(-this.maxMessages),
    });
  }

  private isValidStoredMessage(value: unknown): value is ChatMessage {
    const message = value as ChatMessage;
    const actionsAreValid =
      message?.actions === undefined ||
      (Array.isArray(message.actions) &&
        message.actions.every(
          (action) =>
            typeof action?.label === 'string' &&
            (typeof action.route === 'string' || typeof action.url === 'string')
        ));

    return (
      !!message &&
      (message.role === 'user' || message.role === 'assistant') &&
      typeof message.text === 'string' &&
      message.text.trim().length > 0 &&
      typeof message.time === 'string' &&
      actionsAreValid
    );
  }

  private trimMessages(): void {
    this.messages = this.messages.slice(-this.maxMessages);
  }

  private formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  private queueScroll(): void {
    this.shouldScrollMessages = true;
  }

  private updateBodyScrollLock(isLocked: boolean): void {
    document.body.classList.toggle('chatbot-modal-open', isLocked);
  }

  private readJson<T>(key: string): T | null {
    const storage = this.getStorage();

    if (!storage) {
      return null;
    }

    try {
      const value = storage.getItem(key);
      return value ? JSON.parse(value) as T : null;
    } catch {
      this.removeStorageItem(key);
      return null;
    }
  }

  private writeJson(key: string, value: unknown): void {
    const storage = this.getStorage();

    if (!storage) {
      return;
    }

    try {
      storage.setItem(key, JSON.stringify(value));
    } catch {
      // Chat remains usable if browser storage is unavailable.
    }
  }

  private removeStorageItem(key: string): void {
    const storage = this.getStorage();

    if (!storage) {
      return;
    }

    try {
      storage.removeItem(key);
    } catch {
      // Chat remains usable if browser storage is unavailable.
    }
  }

  private getStorage(): Storage | null {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      return window.localStorage;
    } catch {
      return null;
    }
  }

  private createConversationId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }

    return `chat_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  }
}
