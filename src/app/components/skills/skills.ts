import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  skillCategories = [
    {
      name: 'Frontend',
      icon: 'code',
      skills: ['Angular', 'React', 'TypeScript', 'JavaScript', 'HTML5/CSS3', 'Ionic']
    },
    {
      name: 'Backend & Database',
      icon: 'database',
      skills: ['.NET C#', 'RESTful APIs', 'MySQL (Optimization)', 'SQL Server']
    },
    {
      name: 'AI & Innovation',
      icon: 'cpu',
      highlight: true,
      skills: ['Antigravity', 'Claude', 'ChatGPT', 'Gemini', 'Prompt Engineering']
    },
    {
      name: 'DevOps & Tools',
      icon: 'terminal',
      skills: ['AWS (S3, EC2)', 'Azure DevOps', 'Git', 'CI/CD Pipelines']
    }
  ];
}
