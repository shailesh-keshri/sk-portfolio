import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CosmicFlowComponent } from '../cosmic-flow/cosmic-flow.component';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.css',
})
export class IntroductionComponent {}
