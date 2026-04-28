import { Injectable, signal } from '@angular/core';

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface Project {
  title: string;
  technologies: string;
  bullets: string[];
}

export interface ResumeData {
  summary: string;
  experience: Experience[];
  projects: Project[];
  skills: {
    category: string;
    items: string[];
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private baseData: ResumeData = {
    summary: 'Full-Stack Developer with 3+ years of experience building enterprise security and ed-tech platforms. Proficient in Angular, React, and .NET C# for end-to-end feature delivery — from responsive UI components to REST API design and MySQL schema management. Currently a core contributor to ProACT (an MXDR security platform) and SISA One (a unified security, compliance & privacy platform) at SISA. Actively leverages AI tools including Claude, ChatGPT, Gemini, and GitHub Copilot to accelerate development and improve code quality. Experienced with cloud deployment on AWS and Azure DevOps.',
    experience: [
      {
        role: 'Full-Stack Developer (Associate Consultant)',
        company: 'SISA Forensic-driven Cybersecurity',
        location: 'Bangalore, KA',
        period: 'Jun 2024 – Present',
        bullets: [
          'Contributing to ProACT, SISA\'s MXDR (Managed Detection & Response) security platform — building and enhancing features across frontend (Angular) and backend (.NET C#) for enterprise SOC operations.',
          'Contributing to SISA One, a unified platform consolidating SISA\'s security, compliance, and privacy products.',
          'Built the Shift Handover module providing shift-wise alerts and cluster-level incident metrics.',
          'Designed and developed REST APIs and implemented business logic layers with Managed MySQL schema changes.',
          'Delivered flexible weekly, monthly, and quarterly report builders with monitoring dashboards.',
          'Developed the Threat Advisory module including device, customer, and advisory management features.',
          'Enhanced core monitoring modules — Logs, Alerts, Incidents, and Ticket Management.',
          'Leveraged Claude, ChatGPT, and GitHub Copilot daily to accelerate feature development and generate boilerplate.',
          'Awarded the SPOT Award for technical ownership and the Culture Award for collaboration and consistent delivery.'
        ]
      },
      {
        role: 'UI Developer',
        company: 'Infinity Learn Pvt. Ltd.',
        location: 'Bangalore, KA',
        period: 'Mar 2022 – Mar 2024',
        bullets: [
          'Developed an interactive App Builder using JavaScript, HTML/CSS, and Blockly, featuring live CSS configuration.',
          'Built a secure Drive Management module with folder creation, uploads, role-based permissions, and expiry-based link sharing.',
          'Developed a reporting engine generating 1,000+ monthly certificates and performance reports with visualized data summaries.',
          'Designed and shipped scalable UI components through collaboration with multi-functional teams.',
          'Used ChatGPT and Gemini to accelerate frontend debugging and generate reusable component patterns.'
        ]
      }
    ],
    projects: [
      {
        title: 'Restaurant Management System',
        technologies: 'Java & Angular',
        bullets: [
          'Built a full-stack system covering order flow, table handling, billing, payments, and inventory management.',
          'Developed modules for menu and cart-level offers, expense tracking, and profit & loss statements.',
          'Implemented an Inventory Management module for real-time stock level tracking and a Live Order Screen.'
        ]
      }
    ],
    skills: [
      {
        category: 'Frontend',
        items: ['Angular', 'React', 'JavaScript', 'TypeScript', 'HTML & CSS', 'Ionic']
      },
      {
        category: 'Backend',
        items: ['.NET C#', 'REST API', 'Node.js']
      },
      {
        category: 'DB & Cloud',
        items: ['MySQL / SQL', 'Git', 'AWS', 'Azure DevOps']
      },
      {
        category: 'AI Tools',
        items: ['Claude / ChatGPT', 'Gemini / Copilot']
      }
    ]
  };

  resumeData = signal<ResumeData>(this.baseData);
  isTailored = signal<boolean>(false);

  // New Detailed Data for the 2-page version
  detailedExperience = signal<any[]>([
    {
      company: 'SISA Forensic-driven Cybersecurity',
      location: 'Bangalore, KA',
      period: 'Jun 2024 – Present',
      role: 'Full-Stack Developer (Associate Consultant)',
      internalProjects: [
        {
          name: 'ProACT (Managed Detection & Response Platform)',
          summary: 'A security platform for enterprise SOC operations.',
          bullets: [
            'Building and enhancing features across frontend (Angular) and backend (.NET C#).',
            'Implemented real-time incident monitoring and response flows.',
            'Optimized REST APIs for high-throughput security data processing.'
          ]
        },
        {
          name: 'SISA One (Unified Security & Compliance Platform)',
          summary: 'Integrated platform for security, compliance, and privacy.',
          bullets: [
            'Core contributor to the platform consolidation effort.',
            'Developed shared UI components used across the entire SISA product suite.',
            'Managed MySQL schema migrations for cross-platform data synchronization.'
          ]
        },
        {
          name: 'Shift Handover & Operations Module',
          summary: 'Critical operational tool for SOC teams.',
          bullets: [
            'Built the complete module from scratch providing shift-wise alerts.',
            'Visualized cluster-level incident metrics for operational handovers.',
            'Integrated automated reporting for daily security posture summaries.'
          ]
        },
        {
          name: 'Threat Advisory & Monitoring Service',
          summary: 'Real-time threat intelligence and monitoring.',
          bullets: [
            'Developed device-level advisory management features.',
            'Enhanced core monitoring for Logs, Alerts, and Ticket Management.',
            'Implemented daily AI-assisted boilerplate generation using Claude and Copilot.'
          ]
        }
      ]
    },
    {
      company: 'Infinity Learn Pvt. Ltd.',
      location: 'Bangalore, KA',
      period: 'Mar 2022 – Mar 2024',
      role: 'UI Developer',
      internalProjects: [
        {
          name: 'Interactive App Builder',
          bullets: [
            'Developed a drag-and-drop builder using JavaScript and Blockly.',
            'Implemented live CSS configuration and modularized block logic.',
            'Enabled non-technical teams to create custom applications visually.'
          ]
        },
        {
          name: 'Enterprise Drive Management',
          bullets: [
            'Built secure file management with role-based permissions.',
            'Implemented folder creation and expiry-based link sharing.',
            'Reduced manual documentation overhead through automated reporting.'
          ]
        }
      ]
    }
  ]);

  updateResume(newData: ResumeData) {
    const sanitizedData = {
      ...newData,
      experience: newData.experience.map(exp => ({
        ...exp,
        bullets: exp.bullets.map(b => typeof b === 'object' ? (b as any).text : b)
      })),
      projects: (newData.projects || []).map(proj => ({
        ...proj,
        bullets: proj.bullets.map(b => typeof b === 'object' ? (b as any).text : b)
      }))
    };
    this.resumeData.set(sanitizedData);
    this.isTailored.set(true);
  }

  resetResume() {
    this.resumeData.set(this.baseData);
    this.isTailored.set(false);
  }

  getBaseData() {
    return this.baseData;
  }
}
