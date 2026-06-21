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
  messages: UiMessage[] = [];

  suggestedMessages = [
    "Skills",
    "Projects",
    "Experience",
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
      this.chatService.sendMessage(this.userInput);
      this.userInput = '';
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
}
