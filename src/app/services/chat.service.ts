import { Injectable, NgZone } from '@angular/core';
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

  constructor(private http: HttpClient, private ngZone: NgZone) {}

  async sendMessage(text: string, model: string = 'gemini-2.5-flash') {
    if (!text.trim()) return;

    const currentMessages = this.messagesSubject.value;
    
    // Add user message to UI immediately
    this.ngZone.run(() => {
      this.messagesSubject.next([
        ...currentMessages,
        { text, isUser: true },
        { text: '', isUser: false, isLoading: true } // Typing indicator
      ]);
    });

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: this.history, model })
      });

      if (!response.ok) {
        let serverError = `Server returned status: ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData && errorData.error) {
            serverError = errorData.error;
          }
        } catch (e) {} // ignore json parse errors
        throw new Error(serverError);
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
              this.ngZone.run(() => {
                this.messagesSubject.next([...baseMessages, aiMessage]);
              });
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
      
      let errorMessage = 'Oops! The AI backend seems to be down right now. Please try again later.';
      
      if (error.message) {
        const lowerError = error.message.toLowerCase();
        if (lowerError.includes('429') || lowerError.includes('quota') || lowerError.includes('limit')) {
          errorMessage = "This AI model is currently receiving too many requests and has reached its limit. Please select a different model from the menu icon next to the Send button.";
        } else if (error.message.includes('Backend Error')) {
          errorMessage = error.message.replace('Backend Error:', '').trim();
        }
      }

      // Remove the typing indicator AND push the error message
      this.ngZone.run(() => {
        const updatedMessages = this.messagesSubject.value.filter(m => !m.isLoading);
        this.messagesSubject.next([
          ...updatedMessages,
          { text: `⚠️ **Error:** ${errorMessage}`, isUser: false }
        ]);
      });
    }
  }
}
