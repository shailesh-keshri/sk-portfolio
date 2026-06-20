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
  expandedIndex: number | null = null;

  toggleExpand(index: number) {
    if (this.expandedIndex === index) {
      this.expandedIndex = null;
    } else {
      this.expandedIndex = index;
    }
  }

  projects = [
    {
      title: 'ProAct (MXDR Platform)',
      type: 'Work | Cybersecurity',
      icon: 'fa-shield-halved',
      hoverClass: 'hover-cyan',
      description: 'Enterprise Managed Detection & Response platform. Engineered critical modules for SOC automation and real-time incident handling.',
      tags: ['Angular', '.NET C#', 'MySQL', 'SOC Automation'],
      highlights: [
        'Threat Detection: Aggregates and correlates network security logs to identify anomalies in real-time.',
        'Automated Triage: Uses intelligent playbooks to automatically classify and prioritize incoming alerts.',
        'Incident Response: Enables SOC teams to quickly isolate compromised assets and mitigate active risks.',
        '24/7 Monitoring: Provides high-performance dashboards for continuous visibility into the threat landscape.',
        'Data Ingestion: Features a robust log management system to handle massive volumes of enterprise security data.'
      ]
    },
    {
      title: 'Governance Platform',
      type: 'Work | Compliance & Reporting',
      icon: 'fa-chart-pie',
      hoverClass: 'hover-purple',
      description: 'A comprehensive organizational governance platform featuring dynamic layout-based reporting and data-driven insights.',
      tags: ['Angular', '.NET C#', 'Data Visualization', 'Report Engine'],
      highlights: [
        'Custom Report Builder: Engineered a dynamic generation engine for Weekly, Monthly, and Quarterly reports, allowing users to configure custom layouts (single, dual, or triple sections).',
        'Insight Hub: Developed a sub-module to aggregate and store critical security data including KeyRisks, KeyHighlights, WhitelistTracker, ActionTracker, and Cyber Defence.',
        'KPI Widgets: Built selectable widgets that utilize Insight Hub data to visualize metrics like Alerts, Events, Incidents, Usecases, and MTTD/MTTR graphs inside the reports.'
      ]
    },
    {
      title: 'Threat Advisory',
      type: 'Work | Threat Intel',
      icon: 'fa-envelope-open-text',
      hoverClass: 'hover-orange',
      description: 'A proactive security communication system for designing and distributing threat advisories.',
      tags: ['Angular', 'Email Automation', 'Template Engine', 'Security'],
      highlights: [
        'Template Engine: Developed a dynamic templating system to create formatted security advisory templates.',
        'Automated Distribution: Engineered an automated email pipeline to share critical advisories with registered customers.',
        'Customer Management: Integrated with the customer registry to ensure targeted and reliable alert delivery.'
      ]
    },
    {
      title: 'Ticket Management',
      type: 'Work | Workflow Automation',
      icon: 'fa-list-check',
      hoverClass: 'hover-green',
      description: 'An internal issue-tracking and workflow system built within ProACT, modeled after enterprise tools like Azure DevOps.',
      tags: ['Angular', '.NET C#', 'Real-time', 'Collaboration'],
      highlights: [
        'Robust Tracking: Supported Tasks, Bugs, Issues, and Features with rich text descriptions and Root Cause Analysis (RCA).',
        'Complex Workflows: Implemented parent-child ticket hierarchies and a complete activity audit log for state changes.',
        'Collaboration: Developed interactive discussion threads featuring @mentions and automated email notifications.'
      ]
    },
    {
      title: 'App Builder for Kids',
      type: 'Work | EdTech',
      icon: 'fa-cubes',
      hoverClass: 'hover-cyan',
      description: 'An interactive educational platform where children can drag and drop Google Blockly code blocks and HTML elements to build functional web applications.',
      tags: ['JavaScript', 'Google Blockly', 'HTML/CSS', 'Drag & Drop'],
      highlights: [
        'Visual Programming: Integrated Google Blockly to allow kids to learn programming logic through an intuitive drag-and-drop interface.',
        'UI Builder: Implemented a feature to drag HTML elements (inputs, buttons) onto a canvas to construct real application interfaces.',
        'Interactive Learning: Enabled the creation of functional mini-apps, such as traffic lights and basic calculators, directly within the browser.'
      ]
    },
    {
      title: 'Restaurant Management System',
      type: 'Personal | Full-Stack',
      icon: 'fa-utensils',
      hoverClass: 'hover-red',
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
