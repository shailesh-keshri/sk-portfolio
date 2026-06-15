import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroductionComponent } from '../introduction/introduction.component';
import { About } from '../about/about';
import { Skills } from '../skills/skills';
import { Experience } from '../experience/experience';
import { Projects } from '../projects/projects';
import { Achievements } from '../achievements/achievements';
import { ContactComponent } from '../contact/contact.component';
import { Workspace } from '../workspace/workspace';
import { GithubActivity } from '../github-activity/github-activity';
import { CodeSnippets } from '../code-snippets/code-snippets';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IntroductionComponent, About, Skills, CodeSnippets, Experience, Projects, Achievements, GithubActivity, Workspace, ContactComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {}
