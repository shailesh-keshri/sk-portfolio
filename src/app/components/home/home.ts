import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hero } from '../hero/hero';
import { About } from '../about/about';
import { Skills } from '../skills/skills';
import { Experience } from '../experience/experience';
import { Projects } from '../projects/projects';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Hero, About, Skills, Experience, Projects],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {}
