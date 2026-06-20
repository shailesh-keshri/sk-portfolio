import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience {
  expandedIndex: number | null = null;

  toggleExpand(index: number) {
    if (this.expandedIndex === index) {
      this.expandedIndex = null;
    } else {
      this.expandedIndex = index;
    }
  }

  experiences = [
    {
      company: 'SISA Forensic-driven Cybersecurity',
      location: 'Bangalore, KA',
      role: 'Software Engineer',
      period: 'Jun 2024 – Present',
      description: 'Develop and maintain enterprise-grade Managed Detection & Response (MXDR) and compliance platforms.',
      skills: ['Angular', 'C#', 'REST APIs', 'MySQL'],
      achievements: [
        'Developed and maintained enterprise cybersecurity applications using Angular, C#, REST APIs, and MySQL.',
        'Built real-time monitoring and management modules for Logs, Alerts, Incidents, and Ticket Management workflows.',
        'Engineered a backend scheduler service in C# to automatically generate and deliver scheduled security and operational reports.',
        'Designed and implemented a shift handover module allowing SOC analysts to track alerts, incidents, escalations, and handovers.',
        'Developed the Threat Advisory Platform and executive Governance Reporting modules (CXO, weekly, and monthly reports).',
        'Contributed to the SISA One unified platform by building reusable Angular component libraries and managing MySQL schema updates.'
      ]
    },
    {
      company: 'Infinity Learn Pvt. Ltd.',
      location: 'Bangalore, KA',
      role: 'Frontend Developer',
      period: 'Mar 2022 – Mar 2024',
      description: 'Built scalable Ed-Tech solutions focusing on interactive development environments and data-secure management systems.',
      skills: ['JavaScript', 'Blockly', 'CSS', 'Web Security'],
      achievements: [
        'Developed an interactive drag-and-drop App Builder using JavaScript and Blockly with live CSS configuration.',
        'Created reusable blocks enabling non-technical users to build and configure custom web applications visually.',
        'Built secure file management capabilities featuring role-based access control and expiry-based link sharing.',
        'Automated reporting workflows and certificate generation to reduce manual operational efforts.'
      ]
    }
  ];
}
