import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface UiMessage {
  text: string;
  isUser: boolean;
  isLoading?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private history: ChatMessage[] = [];
  
  private messagesSubject = new BehaviorSubject<UiMessage[]>([
    { text: "Hi! I'm Shailesh's AI assistant. Ask me anything about his experience, projects, or skills!", isUser: false }
  ]);
  public messages$ = this.messagesSubject.asObservable();

  // If running locally using ng serve, we hit localhost:3000 (if vercel dev is running) 
  // or proxy it. In production, Vercel routes /api requests to the serverless function.
  // For safety, we will just use /api/chat and rely on Vercel or proxy.
  private apiUrl = '/api/chat';

  constructor(private http: HttpClient) {}

  async sendMessage(text: string) {
    if (!text.trim()) return;

    const currentMessages = this.messagesSubject.value;
    
    // Add user message to UI immediately
    this.messagesSubject.next([
      ...currentMessages,
      { text, isUser: true },
      { text: '', isUser: false, isLoading: true } // Typing indicator
    ]);

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: this.history })
      });

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      if (!response.body) throw new Error("No response body stream");

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      
      // Remove the typing indicator immediately since streaming has begun
      const baseMessages = this.messagesSubject.value.filter(m => !m.isLoading);
      
      // Add an empty AI message that we will progressively fill
      const aiMessage = { text: '', isUser: false };
      this.messagesSubject.next([...baseMessages, aiMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            if (line.includes('[DONE]')) continue;
            try {
              const data = JSON.parse(line.slice(6));
              aiMessage.text += data.text;
              
              // Force UI update progressively
              this.messagesSubject.next([...baseMessages, aiMessage]);
            } catch (e) {
              // Ignore incomplete JSON parsing errors on stream boundaries
            }
          }
        }
      }

      // Update history for future context once stream is fully finished
      this.history.push({ role: 'user', parts: [{ text }] });
      this.history.push({ role: 'model', parts: [{ text: aiMessage.text }] });

    } catch (error: any) {
      console.error('Chat API Error:', error);
      const errorMessage = 'Oops! The AI backend seems to be down right now. Please try again later.';

      const updatedMessages = this.messagesSubject.value.filter(m => !m.isLoading);
      this.messagesSubject.next([
        ...updatedMessages,
        { text: errorMessage, isUser: false }
      ]);
    }
  }
}
