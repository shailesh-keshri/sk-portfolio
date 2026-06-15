import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workspace.html',
  styleUrl: './workspace.css',
})
export class Workspace {
  workspaceItems = [
    {
      category: 'Hardware',
      icon: 'fa-solid fa-laptop-code',
      color: 'var(--primary)',
      items: [
        { name: 'MacBook Pro M3 Max', desc: 'Primary machine' },
        { name: 'Dual 27" LG 4K Monitors', desc: 'Extended display' },
        { name: 'Keychron K2 Mechanical', desc: 'Brown switches' },
        { name: 'Logitech MX Master 3S', desc: 'Workflow mouse' }
      ]
    },
    {
      category: 'Software & Tools',
      icon: 'fa-solid fa-code',
      color: 'var(--secondary)',
      items: [
        { name: 'Visual Studio Code', desc: 'One Dark Pro Theme' },
        { name: 'iTerm2 + Zsh', desc: 'Oh My Zsh + Powerlevel10k' },
        { name: 'Postman', desc: 'API Development' },
        { name: 'Figma', desc: 'UI/UX Design' }
      ]
    },
    {
      category: 'Currently Exploring',
      icon: 'fa-solid fa-flask',
      color: '#ec4899',
      items: [
        { name: 'Generative AI', desc: 'LLMs & Prompt Engineering' },
        { name: 'Next.js 14', desc: 'App Router & Server Actions' },
        { name: 'Rust', desc: 'Systems Programming' },
        { name: 'Web3', desc: 'Smart Contracts' }
      ]
    }
  ];
}
