import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  projects = [
    {
      title: 'ProAct (MXDR Platform)',
      type: 'Work | Cybersecurity',
      description: 'Enterprise Managed Detection & Response platform. Engineered critical modules for SOC automation and real-time incident handling.',
      tags: ['Angular', '.NET C#', 'MySQL', 'SOC Automation'],
      highlights: [
        'Shift Handover: Built a real-time SOC handover module with automated shift metrics.',
        'Logstash Manager: Developed a centralized manager for log data ingestion and processing.',
        'Core Monitoring: Enhanced high-concurrency dashboards for Alerts and Incidents.'
      ]
    },
    {
      title: 'Governance Portal',
      type: 'Work | Compliance',
      description: 'A dedicated portal for managing organizational governance, risk, and compliance (GRC) metrics.',
      tags: ['Angular', '.NET C#', 'SISA One', 'Reporting Engine'],
      highlights: [
        'Built automated report builders for Weekly/Monthly compliance reviews.',
        'Integrated dynamic monitoring dashboards for Governance visibility.',
        'Designed scalable UI components for high-fidelity compliance data.'
      ]
    },
    {
      title: 'Threat Advisory Module',
      type: 'Work | Threat Intel',
      description: 'Real-time advisory system providing device, customer, and advisory management features.',
      tags: ['Angular', 'REST APIs', 'Threat Intelligence', 'Real-time Hub'],
      highlights: [
        'Developed comprehensive Threat Advisory management features.',
        'Integrated real-time threat intelligence feeds into the SISA One platform.',
        'Ensured 360-degree visibility into emerging security landscapes.'
      ]
    },
    {
      title: 'Restaurant Management System',
      type: 'Personal | Full-Stack',
      description: 'Complete business solution with Angular and .NET C# for multi-branch restaurant operations.',
      tags: ['Angular', '.NET C#', 'MySQL', 'Live Order Screen'],
      highlights: [
        'Implemented real-time Inventory and Live Order tracking.',
        'Developed multi-location configuration for scalability.',
        'Designed a complete end-to-end business flow.'
      ]
    }
  ];
}
