import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.html',
  styleUrl: './pricing.css'
})
export class Pricing {
  isDollar = false;
  isVisible = false;

  constructor(private chatService: ChatService) {
    this.chatService.showPricing$.subscribe(visible => {
      if (visible) {
        this.isVisible = true;
      }
    });
  }

  packages = [
    {
      title: 'Single Page App / Landing Page',
      icon: 'fa-window-maximize',
      inrPrice: '30,000 - 60,000',
      usdPrice: '400 - 800',
      features: [
        'Highly responsive Angular or React UI',
        'Sleek modern animations & custom styling',
        'Contact form & API integrations',
        'SEO & Performance Optimized',
        '1 month free post-launch support'
      ]
    },
    {
      title: 'Full-Stack Web App (Medium Scale)',
      icon: 'fa-layer-group',
      inrPrice: '1,20,000 - 2,50,000',
      usdPrice: '1,500 - 3,000',
      features: [
        'Client portal (Angular/React) + backend API (.NET/Python)',
        'Database design & integration (MySQL/PostgreSQL)',
        'Secure user authentication (JWT/OAuth)',
        'Admin dashboard & analytics reporting',
        '3 months free post-launch support'
      ]
    },
    {
      title: 'Custom Feature / Component Integration',
      icon: 'fa-puzzle-piece',
      inrPrice: '15,000 - 40,000',
      usdPrice: '200 - 500',
      features: [
        'Integrating Blockly drag-and-drop builders',
        'Real-time notifications / WebSockets',
        'Interactive reporting charts & dashboards',
        'Third-party API payment / auth integrations',
        'Detailed documentation & hand-off'
      ]
    },
    {
      title: 'Performance Audit & Refactoring',
      icon: 'fa-gauge-high',
      inrPrice: '25,000 - 50,000',
      usdPrice: '300 - 600',
      features: [
        'Detailed bundle analysis & loading audit',
        'Framework upgrade (e.g. Angular versions)',
        'Improving Core Web Vitals & PageSpeed',
        'Code refactoring & cleaning memory leaks',
        'Performance comparison report'
      ]
    }
  ];

  toggleCurrency() {
    this.isDollar = !this.isDollar;
  }

  bookProject(packageName: string) {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      
      // Attempt to prefill the contact form
      setTimeout(() => {
        const purposeSelect = document.getElementById('purpose') as HTMLSelectElement;
        const subjectInput = document.getElementById('subject') as HTMLInputElement;
        const messageTextarea = document.getElementById('message') as HTMLTextAreaElement;

        if (purposeSelect) {
          purposeSelect.value = 'Freelance';
          purposeSelect.dispatchEvent(new Event('change'));
        }
        if (subjectInput) {
          subjectInput.value = `Inquiry: ${packageName}`;
          subjectInput.dispatchEvent(new Event('input'));
        }
        if (messageTextarea) {
          messageTextarea.focus();
        }
      }, 800);
    }
  }

  revealPricing() {
    this.isVisible = true;
  }
}
