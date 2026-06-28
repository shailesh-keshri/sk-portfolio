import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroductionComponent } from '../introduction/introduction.component';
import { About } from '../about/about';
import { Skills } from '../skills/skills';
import { Experience } from '../experience/experience';
import { Projects } from '../projects/projects';
import { Achievements } from '../achievements/achievements';
import { ContactComponent } from '../contact/contact.component';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { CosmicFlowComponent } from '../cosmic-flow/cosmic-flow.component';
import { Pricing } from '../pricing/pricing';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    IntroductionComponent,
    About,
    Skills,
    Experience,
    Projects,
    Achievements,
    Pricing,
    ContactComponent,
    ChatbotComponent,
    CosmicFlowComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {}
