import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ResumeService } from '../../services/resume.service';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-resume-detailed',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './resume-detailed.html',
  styleUrls: ['./resume-detailed.css']
})
export class ResumeDetailed {
  constructor(
    public resumeService: ResumeService,
    private pdfService: PdfService
  ) {}

  downloadPdf() {
    this.pdfService.generateResumePdf(
      this.resumeService.resumeData(), 
      this.resumeService.detailedExperience()
    );
  }
}
