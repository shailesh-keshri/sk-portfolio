import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CoverLetterService } from '../../services/cover-letter.service';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-cover-letter-view',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cover-letter-view.html',
  styleUrl: './cover-letter-view.css',
})
export class CoverLetterView {
  public coverLetterService = inject(CoverLetterService);
  private pdfService = inject(PdfService);
  
  downloadPdf() {
    this.pdfService.generateCoverLetterPdf(this.coverLetterService.coverData());
  }
}
