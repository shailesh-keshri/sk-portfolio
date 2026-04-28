import { Injectable } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ResumeData } from './resume.service';
import { CoverLetterData } from './cover-letter.service';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private initialized = false;

  constructor() {
    this.initPdfMake();
  }

  private initPdfMake() {
    if (this.initialized) return;
    
    try {
      const pm: any = pdfMake;
      const fonts = (pdfFonts as any).pdfMake ? (pdfFonts as any).pdfMake.vfs : (pdfFonts as any).vfs;
      pm.vfs = fonts;
      this.initialized = true;
    } catch (e) {
      console.error('PdfMake initialization failed', e);
    }
  }

  generateResumePdf(data: ResumeData, detailedExp?: any[]) {
    const isDetailed = !!detailedExp;
    const expSource = isDetailed ? detailedExp : data.experience;

    const docDefinition: any = {
      pageSize: 'A4',
      pageMargins: [40, 40, 40, 40],
      content: [
        { text: 'SHAILESH KESHRI', style: 'header', alignment: 'center' },
        { text: 'FULL-STACK DEVELOPER', style: 'subheader', alignment: 'center', margin: [0, 0, 0, 5] },
        { 
          text: [
            { text: '9340728264   |   ', color: '#444' },
            { text: 'shailesh0398@gmail.com   |   ', color: '#0077cc' },
            { text: 'linkedin.com/in/shailesh-keshri', color: '#0077cc' }
          ], 
          alignment: 'center', 
          fontSize: 9.5, 
          margin: [0, 0, 0, 20] 
        },

        { text: 'SUMMARY', style: 'sectionTitle' },
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1.5, lineColor: '#333333' }], margin: [0, 2, 0, 10] },
        { text: data.summary, style: 'body', margin: [0, 0, 0, 20] },

        { text: 'TECHNICAL SKILLS', style: 'sectionTitle' },
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1.5, lineColor: '#333333' }], margin: [0, 2, 0, 10] },
        {
          stack: data.skills.map(skill => ({
            text: [
              { text: `${skill.category}: `, bold: true },
              { text: skill.items.join(', ') }
            ],
            fontSize: 10,
            margin: [0, 0, 0, 5]
          })),
          margin: [0, 0, 0, 20]
        },

        { text: isDetailed ? 'PROFESSIONAL EXPERIENCE & INTERNAL PROJECTS' : 'EXPERIENCE', style: 'sectionTitle' },
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1.5, lineColor: '#333333' }], margin: [0, 2, 0, 10] },
        
        ...expSource!.map((exp: any) => [
          {
            columns: [
              { text: exp.company, bold: true, fontSize: 11 },
              { text: exp.period, alignment: 'right', fontSize: 10, color: '#444' }
            ],
            margin: [0, 8, 0, 2]
          },
          {
            columns: [
              { text: exp.role, italic: true, fontSize: 10, color: '#333' },
              { text: exp.location, alignment: 'right', fontSize: 10, color: '#444' }
            ],
            margin: [0, 0, 0, 6]
          },
          
          ...(exp.internalProjects && isDetailed 
            ? exp.internalProjects.map((p: any) => [
                { text: `Project: ${p.name}`, bold: true, color: '#0077cc', fontSize: 10, margin: [10, 5, 0, 2] },
                { text: p.summary || '', italic: true, fontSize: 9, color: '#666', margin: [10, 0, 0, 5] },
                { ul: p.bullets, fontSize: 9.5, margin: [20, 0, 0, 10] }
              ]).flat()
            : [{ ul: exp.bullets, margin: [15, 0, 0, 10], fontSize: 10, lineHeight: 1.4, color: '#222' }]
          )
        ]).flat(),

        { text: 'OTHER PERSONAL PROJECTS', style: 'sectionTitle', margin: [0, 15, 0, 0] },
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1.5, lineColor: '#333333' }], margin: [0, 2, 0, 10] },
        ...data.projects.map(proj => [
          {
            columns: [
              { text: proj.title, bold: true, fontSize: 11 },
              { text: proj.technologies, alignment: 'right', fontSize: 10, color: '#444' }
            ],
            margin: [0, 8, 0, 2]
          },
          {
            ul: proj.bullets,
            margin: [15, 0, 0, 12],
            fontSize: 10,
            lineHeight: 1.4,
            color: '#222'
          }
        ]).flat(),

        { text: 'EDUCATION', style: 'sectionTitle', margin: [0, 15, 0, 0] },
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1.5, lineColor: '#333333' }], margin: [0, 2, 0, 10] },
        {
          columns: [
            { text: 'R.G.P.V. University, Bhopal', bold: true, fontSize: 11 },
            { text: 'Jun 2017 – Jul 2021', alignment: 'right', fontSize: 10, color: '#444' }
          ],
          margin: [0, 8, 0, 2]
        },
        { text: 'Bachelor of Technology in Computer Science', italic: true, fontSize: 10, color: '#333' },
        { text: 'Millennium Institute of Technology and Science', fontSize: 10, color: '#555', margin: [0, 0, 0, 12] },

        {
          columns: [
            { text: 'H.N.K Inter College, Arrah', bold: true, fontSize: 11 },
            { text: 'May 2014 – May 2016', alignment: 'right', fontSize: 10, color: '#444' }
          ],
          margin: [0, 8, 0, 2]
        },
        { text: 'Intermediate in Science', italic: true, fontSize: 10, color: '#333' }
      ],
      styles: {
        header: { fontSize: 28, bold: true, color: '#000' },
        sectionTitle: { fontSize: 12.5, bold: true, color: '#0077cc' },
        subheader: { fontSize: 11, bold: true, color: '#444' },
        body: { fontSize: 9.5, color: '#222', lineHeight: 1.3 }
      },
      defaultStyle: { font: 'Roboto' }
    };

    (pdfMake as any).createPdf(docDefinition).download(isDetailed ? 'Shailesh_Keshri_Resume_Detailed.pdf' : 'Shailesh_Keshri_Resume.pdf');
  }

  generateCoverLetterPdf(data: CoverLetterData) {
    const docDefinition: any = {
      content: [
        { text: 'SHAILESH KESHRI', style: 'header', alignment: 'center' },
        { 
          text: 'shailesh0398@gmail.com   |   9340728264   |   linkedin.com/in/shailesh-keshri', 
          alignment: 'center', fontSize: 10, color: '#0077cc', margin: [0, 5, 0, 30] 
        },
        { text: data.date, margin: [0, 0, 0, 20], fontSize: 10.5 },
        { text: 'Hiring Manager', bold: true, fontSize: 11 },
        { text: data.company, bold: true, margin: [0, 0, 0, 20], fontSize: 11 },
        { text: `Subject: Application for ${data.role} – Shailesh Keshri`, bold: true, margin: [0, 0, 0, 15], decoration: 'underline', fontSize: 11 },
        { text: 'Dear Hiring Manager,', margin: [0, 0, 0, 15], fontSize: 10.5 },
        ...data.content.map(para => ({ text: para, margin: [0, 0, 0, 15], lineHeight: 1.5, fontSize: 10.5 })),
        { text: 'Sincerely,', margin: [0, 25, 0, 5], fontSize: 10.5 },
        { text: 'Shailesh Keshri', bold: true, fontSize: 11 }
      ],
      styles: { header: { fontSize: 26, bold: true } }
    };

    (pdfMake as any).createPdf(docDefinition).download(`Cover_Letter_${data.company.replace(/\s+/g, '_')}.pdf`);
  }
}
