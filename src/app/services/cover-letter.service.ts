import { Injectable, signal } from '@angular/core';

export interface CoverLetterData {
  company: string;
  role: string;
  date: string;
  content: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CoverLetterService {
  private baseData: CoverLetterData = {
    company: '[Company Name]',
    role: 'Full-Stack Developer',
    date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
    content: [
      'I’m writing to express my interest in the Full-Stack Developer position at [Company Name]. Over the past 3 years, I’ve been focused on building enterprise-grade software for cybersecurity and education. I’ve developed a strong foundation in the Angular and .NET C# ecosystem, and I genuinely enjoy the process of turning complex requirements into reliable, user-friendly applications.',
      'In my current role at SISA Forensic-driven Cybersecurity, I’ve been a core contributor to ProAct, our Managed Detection & Response platform. I’ve had the chance to lead the development of key modules like Shift Handover and the Logstash Manager, where I was responsible for everything from the MySQL backend to the final UI. I take a lot of pride in seeing a feature through from the initial design phase to a successful production release.',
      'I also pride myself on my ability to work efficiently by leveraging modern development tools. By integrating AI-assisted workflows into my daily tasks, I’m able to handle boilerplate and testing quickly, which allows me to spend more of my energy on high-level architecture and solving the core problems that matter most to the project.',
      'I’m drawn to [Company Name] because of your focus on innovation and technical quality. I’m confident that my technical versatility and my proactive approach to new technologies would make me a valuable addition to your engineering team.'
    ]
  };

  coverData = signal<CoverLetterData>(this.baseData);
  isTailored = signal<boolean>(false);

  updateCoverLetter(newData: CoverLetterData) {
    // Sanitize content paragraphs to ensure they are strings
    const sanitizedData = {
      ...newData,
      content: newData.content.map(p => typeof p === 'object' ? (p as any).text : p)
    };
    this.coverData.set(sanitizedData);
    this.isTailored.set(true);
  }

  resetCoverLetter() {
    this.coverData.set(this.baseData);
    this.isTailored.set(false);
  }

  getBaseData() {
    return this.baseData;
  }
}
