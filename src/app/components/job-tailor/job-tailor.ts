import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TailorService } from '../../services/tailor.service';
import { ResumeService } from '../../services/resume.service';

@Component({
  selector: 'app-job-tailor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="tailor-panel" [class.collapsed]="isCollapsed()">
      <div class="panel-header" (click)="togglePanel()">
        <h3>✨ AI Resume Tailor</h3>
        <span class="badge" *ngIf="resumeService.isTailored()">Tailored Version Active</span>
        <button class="toggle-btn">{{ isCollapsed() ? '↑' : '↓' }}</button>
      </div>

      <div class="panel-body" *ngIf="!isCollapsed()">
        <div class="input-group">
          <label>1. Provide Gemini API Key (Stored locally)</label>
          <input 
            type="password" 
            [(ngModel)]="apiKey" 
            placeholder="Paste your API key here..."
            (change)="saveKey()"
          >
          <small><a href="https://aistudio.google.com/app/apikey" target="_blank">Get a free key here</a></small>
        </div>

        <div class="input-group">
          <label>2. Paste Job Description</label>
          <textarea 
            [(ngModel)]="jobDescription" 
            placeholder="Paste the target JD here to optimize your resume..."
          ></textarea>
        </div>

        <div class="actions">
          <button 
            (click)="onTailor()" 
            [disabled]="isLoading() || !jobDescription || !apiKey"
            class="btn-sparkle"
          >
            {{ isLoading() ? 'Optimizing...' : 'Tailor My Resume' }}
          </button>
          
          <button 
            *ngIf="resumeService.isTailored()" 
            (click)="onReset()" 
            class="btn-reset"
          >
            Reset to Original
          </button>
        </div>

        <div class="status-msg" *ngIf="statusMsg()">{{ statusMsg() }}</div>
      </div>
    </div>
  `,
  styles: [`
    .tailor-panel {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 400px;
      background: rgba(15, 15, 20, 0.95);
      border: 1px solid var(--primary-glow);
      border-radius: 16px;
      backdrop-filter: blur(20px);
      z-index: 3000;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      color: white;
      overflow: hidden;
    }

    .tailor-panel.collapsed {
      width: auto;
      padding: 0;
    }

    .panel-header {
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      background: linear-gradient(90deg, rgba(0, 242, 255, 0.1), transparent);
    }

    .panel-header h3 {
      font-size: 1rem;
      margin: 0;
      color: var(--primary);
    }

    .panel-body {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .input-group label {
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    input, textarea {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 10px;
      color: white;
      font-family: inherit;
    }

    textarea {
      height: 120px;
      resize: none;
    }

    .actions {
      display: flex;
      gap: 10px;
    }

    .btn-sparkle {
      flex: 1;
      background: var(--primary);
      color: #000;
      padding: 12px;
      border-radius: 8px;
      font-weight: 700;
      border: none;
      transition: all 0.2s;
    }

    .btn-sparkle:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-reset {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      padding: 12px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .status-msg {
      font-size: 0.8rem;
      text-align: center;
      color: var(--primary);
    }

    .badge {
      font-size: 0.7rem;
      background: var(--primary);
      color: #000;
      padding: 2px 8px;
      border-radius: 10px;
      margin-left: 10px;
    }
  `]
})
export class JobTailorComponent {
  private tailorService = inject(TailorService);
  resumeService = inject(ResumeService);

  isCollapsed = signal(true);
  isLoading = signal(false);
  statusMsg = signal('');
  
  apiKey = '';
  jobDescription = '';

  constructor() {
    // Attempt to load key from local storage for convenience
    if (typeof window !== 'undefined') {
      this.apiKey = localStorage.getItem('GEMINI_API_KEY') || '';
    }
  }

  togglePanel() {
    this.isCollapsed.set(!this.isCollapsed());
  }

  saveKey() {
    localStorage.setItem('GEMINI_API_KEY', this.apiKey);
  }

  async onTailor() {
    this.isLoading.set(true);
    this.statusMsg.set('Consulting AI Agent...');
    
    try {
      await this.tailorService.tailorResume(this.jobDescription, this.apiKey);
      this.statusMsg.set('Success! Your resume has been tailored.');
      setTimeout(() => this.isCollapsed.set(true), 2000);
    } catch (error: any) {
      this.statusMsg.set('Error: ' + error.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  onReset() {
    this.resumeService.resetResume();
    this.statusMsg.set('Reset to original version.');
  }
}
