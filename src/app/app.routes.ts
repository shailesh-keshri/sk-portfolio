import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { ResumeView } from './components/resume-view/resume-view';
import { ResumeDetailed } from './components/resume-detailed/resume-detailed';
import { CoverLetterView } from './components/cover-letter-view/cover-letter-view';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Shailesh Keshri | Full-Stack Developer' },
  { path: 'resume', component: ResumeView, title: 'Resume | Shailesh Keshri' },
  { path: 'resume-detailed', component: ResumeDetailed, title: 'Detailed Experience | Shailesh Keshri' },
  { path: 'cover-letter', component: CoverLetterView, title: 'Cover Letter | Shailesh Keshri' },
  { path: '**', redirectTo: '' }
];
