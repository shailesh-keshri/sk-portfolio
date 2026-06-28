import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService, UiMessage } from '../../services/chat.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent implements AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  isOpen = false;
  userInput = '';
  selectedModel = 'gemini-2.5-flash';
  isModelMenuOpen = false;
  messages: UiMessage[] = [];

  availableModels = [
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash' },
    { id: 'gemini-3.5-flash', name: 'Gemini 3.5 Flash (Medium)' }
  ];

  suggestedMessages = [
    "Skills",
    "Projects",
    "Experience",
    "Freelance Rates",
    "Contact Info"
  ];

  constructor(private chatService: ChatService) {
    this.chatService.messages$.subscribe(msgs => {
      this.messages = msgs;
    });
  }

  sendSuggested(text: string) {
    this.userInput = text;
    this.sendMessage();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  sendMessage() {
    if (this.userInput.trim()) {
      this.chatService.sendMessage(this.userInput, this.selectedModel);
      this.userInput = '';
    }
  }

  toggleModelMenu() {
    this.isModelMenuOpen = !this.isModelMenuOpen;
  }

  selectModel(modelId: string) {
    this.selectedModel = modelId;
    this.isModelMenuOpen = false;
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  formatMessage(text: string): string {
    if (!text) return '';
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    const lines = html.split('\n');
    const processedLines = lines.map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        return `<div class="chat-bullet">• ${trimmed.substring(2)}</div>`;
      }
      return line;
    });

    return processedLines.join('<br>');
  }

  hasPricingKeywords(text: string): boolean {
    if (!text) return false;
    const lower = text.toLowerCase();
    return lower.includes('quotation') || lower.includes('charges') || lower.includes('pricing') || lower.includes('estimated base');
  }

  scrollToPricing() {
    this.chatService.showPricing();
    setTimeout(() => {
      const element = document.getElementById('pricing');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
}
