import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-resume-view',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './resume-view.html',
  styleUrl: './resume-view.css',
})
export class ResumeView {
  downloadPdf() {
    const link = document.createElement('a');
    link.href = 'assets/resume/SkResume.pdf';
    link.download = 'Shailesh_Keshri_Resume.pdf';
    link.click();
  }
}
