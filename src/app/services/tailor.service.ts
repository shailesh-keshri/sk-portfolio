import { Injectable, inject } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ResumeService, ResumeData } from './resume.service';
import { CoverLetterService, CoverLetterData } from './cover-letter.service';

@Injectable({
  providedIn: 'root'
})
export class TailorService {
  private resumeService = inject(ResumeService);
  private coverLetterService = inject(CoverLetterService);
  
  private apiKey: string = ''; 

  async tailorResume(jobDescription: string, userApiKey?: string): Promise<void> {
    const key = userApiKey || this.apiKey;
    if (!key) {
      throw new Error('API Key missing. Please provide a Gemini API Key.');
    }

    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const baseResume = this.resumeService.getBaseData();
    const baseCover = this.coverLetterService.getBaseData();
    
    const prompt = `
      You are an expert career consultant. 
      I will provide my base resume data, base cover letter data, and a Job Description (JD). 
      Your task is to tailor BOTH the resume and the cover letter to match the JD.

      Instructions:
      1. Tailor the resume summary and bullet points to match the JD keywords.
      2. Tailor the cover letter content to specifically address the company and role in the JD.
      3. Extract the Company Name and Role Title from the JD if possible.
      4. Maintain the professional tone and structure.
      5. Return the response ONLY as a JSON object.

      Base Resume:
      ${JSON.stringify(baseResume)}

      Base Cover Letter:
      ${JSON.stringify(baseCover)}

      Target Job Description:
      ${jobDescription}

      Return only the JSON in this format:
      {
        "resume": { "summary": "...", "experience": [...], "skills": [...] },
        "coverLetter": { "company": "...", "role": "...", "date": "...", "content": ["...", "..."] }
      }
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log('AI Response:', text);

      // Extract JSON using a robust method
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('AI response did not contain a valid JSON object.');
      }

      const tailoringResult = JSON.parse(jsonMatch[0]);
      
      if (tailoringResult.resume) {
        this.resumeService.updateResume(tailoringResult.resume);
      }
      if (tailoringResult.coverLetter) {
        this.coverLetterService.updateCoverLetter(tailoringResult.coverLetter);
      }
    } catch (error: any) {
      console.error('AI Tailoring failed:', error);
      if (error.message?.includes('API_KEY_INVALID')) {
        throw new Error('The API Key you provided is invalid.');
      }
      throw error;
    }
  }
}
