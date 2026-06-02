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
    summary: 'Full-Stack Developer with 4+ years of experience building enterprise-grade applications in Cybersecurity and EdTech. Proficient in Angular, TypeScript, C#, REST APIs, and MySQL, with a strong track record of delivering security operations platforms, governance reporting systems, and threat advisory tools at scale. Adept at owning features end-to-end, driving performance improvements, and working closely with cross-functional teams to ship products that matter.',
    experience: [
      {
        role: 'Software Engineer',
        company: 'SISA Forensic-driven Cybersecurity',
        location: 'Bangalore, KA',
        period: 'Jun 2024 – Present',
        bullets: [
          'Developed and maintained enterprise cybersecurity applications using Angular, C#, REST APIs, and MySQL.',
          'Built real-time monitoring and management modules for Logs, Alerts, Incidents, and Ticket Management workflows.',
          'Built and deployed a C# backend scheduler service to automatically generate and deliver scheduled security and operational reports directly to clients and SOC leads.',
          'Developed shift handover functionality enabling analysts to manage alerts, incidents, escalations, and operational updates across shifts.',
          'Developed the Threat Advisory Platform for creating, managing, and distributing security advisories to enterprise customers.',
          'Designed and developed the Governance Reporting Platform supporting executive and customer reporting (CXO, Weekly, Monthly, and QMR reports).',
          'Resolved code-level and package-level vulnerabilities by identifying security risks and upgrading dependencies to maintain a secure codebase.',
          'Contributed to the consolidation of security, compliance, and privacy products into the SISA One unified platform using reusable Angular components and MySQL migrations.'
        ]
      },
      {
        role: 'Frontend Developer',
        company: 'Infinity Learn Pvt. Ltd.',
        location: 'Bangalore, KA',
        period: 'Mar 2022 – Mar 2024',
        bullets: [
          'Developed an interactive drag-and-drop App Builder using JavaScript and Blockly with live CSS configuration.',
          'Created reusable blocks enabling non-technical users to build and configure applications visually.',
          'Improved maintainability by modularizing business logic and UI workflows.',
          'Built secure Enterprise Drive Management System featuring role-based access control and secure link-sharing.',
          'Automated reporting workflows and certificate generation to reduce manual operational efforts.'
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
      role: 'Software Engineer',
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
      role: 'Frontend Developer',
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
