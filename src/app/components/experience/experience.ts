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
  experiences = [
    {
      company: 'SISA Forensic-driven Cybersecurity',
      location: 'Bangalore, KA',
      role: 'Associate Consultant (Full-Stack Developer)',
      period: 'Jun 2024 – Present',
      description: 'Lead developer for enterprise-grade Managed Detection & Response (MXDR) and unified security platforms.',
      achievements: [
        'Architected ProAct security components using Angular and .NET C# for SOC operations.',
        'Unified security, compliance, and privacy products under the SISA One platform.',
        'Engineered a real-time Shift Handover module with automated SOC operational metrics.',
        'Optimized MySQL schemas and designed high-concurrency RESTful APIs for mission-critical security features.',
        'Integrated multi-AI (Antigravity, Claude, Gemini) workflows for rapid boilerplate generation and test-driven development.'
      ]
    },
    {
      company: 'Infinity Learn Pvt. Ltd.',
      location: 'Bangalore, KA',
      role: 'UI Developer',
      period: 'Mar 2022 – Mar 2024',
      description: 'Built scalable Ed-Tech solutions focusing on interactive development environments and data-secure management systems.',
      achievements: [
        'Developed a modular App Builder using Blockly and JavaScript with live CSS preview.',
        'Architecture of a secure Drive Management system with granular RBAC and link-sharing compliance.',
        'Scaled an enterprise reporting engine producing 1,000+ monthly reports with visualized analytics.',
        'Collaborated with UX teams to deliver high-fidelity components for millions of users.'
      ]
    }
  ];
}
