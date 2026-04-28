import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ResumeService } from '../../services/resume.service';
import { PdfService } from '../../services/pdf.service';
import { JobTailorComponent } from '../job-tailor/job-tailor';

@Component({
  selector: 'app-resume-view',
  standalone: true,
  imports: [CommonModule, RouterLink, JobTailorComponent],
  templateUrl: './resume-view.html',
  styleUrl: './resume-view.css',
})
export class ResumeView {
  public resumeService = inject(ResumeService);
  private pdfService = inject(PdfService);

  downloadPdf() {
    this.pdfService.generateResumePdf(this.resumeService.resumeData());
  }
}
