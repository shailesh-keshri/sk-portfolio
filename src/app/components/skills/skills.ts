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
  coreSkills = [
    {
      name: 'Frontend',
      icon: 'fa-solid fa-layer-group',
      color: 'var(--primary)',
      skills: [
        { name: 'TypeScript', icon: 'fa-brands fa-js', color: '#3178C6', proficiency: 90 },
        { name: 'JavaScript', icon: 'fa-brands fa-js', color: '#F7DF1E', proficiency: 95 },
        { name: 'HTML5', icon: 'fa-brands fa-html5', color: '#E34F26', proficiency: 95 },
        { name: 'CSS3', icon: 'fa-brands fa-css3-alt', color: '#1572b6', proficiency: 90 }
      ]
    },
    {
      name: 'Backend & Database',
      icon: 'fa-solid fa-server',
      color: '#10b981',
      skills: [
        { name: 'Python', icon: 'fa-brands fa-python', color: '#3776AB', proficiency: 85 },
        { name: 'C#', icon: 'fa-brands fa-microsoft', color: '#239120', proficiency: 80 },
        { name: 'RESTful APIs', icon: 'fa-solid fa-network-wired', color: '#8b5cf6', proficiency: 90 },
        { name: 'SQL', icon: 'fa-solid fa-database', color: '#f59e0b', proficiency: 85 }
      ]
    }
  ];

  toolCategory = {
    name: 'Frameworks, Tools & Ecosystem',
    icon: 'fa-solid fa-toolbox',
    color: '#ec4899',
    skills: [
      { name: 'Angular', icon: 'fa-brands fa-angular', color: '#DD0031' },
      { name: 'React', icon: 'fa-brands fa-react', color: '#61DAFB' },
      { name: 'Ionic', icon: 'fa-solid fa-mobile-screen', color: '#3880ff' },
      { name: 'Bootstrap', icon: 'fa-brands fa-bootstrap', color: '#7952b3' },
      { name: 'AWS', icon: 'fa-brands fa-aws', color: '#FF9900' },
      { name: 'Git', icon: 'fa-brands fa-git-alt', color: '#F05032' },
      { name: 'Azure DevOps', icon: 'fa-brands fa-microsoft', color: '#0078D7' },
      { name: 'CI/CD Pipelines', icon: 'fa-solid fa-infinity', color: '#8b5cf6' }
    ]
  };
}
