import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-github-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './github-activity.html',
  styleUrl: './github-activity.css',
})
export class GithubActivity implements OnInit {
  // Mock 365 days of contribution data
  contributionDays: number[] = [];
  
  ngOnInit() {
    // Generate mock data for the heatmap (values from 0 to 4 representing contribution intensity)
    for (let i = 0; i < 364; i++) {
      // Create some random clusters of activity to make it look realistic
      const isWeekend = (i % 7 === 0 || i % 7 === 6);
      const randomFactor = Math.random();
      
      let intensity = 0;
      if (!isWeekend && randomFactor > 0.4) intensity = 1;
      if (!isWeekend && randomFactor > 0.7) intensity = 2;
      if (!isWeekend && randomFactor > 0.85) intensity = 3;
      if (!isWeekend && randomFactor > 0.95) intensity = 4;
      
      // Sometimes code on weekends too!
      if (isWeekend && randomFactor > 0.8) intensity = 1;
      if (isWeekend && randomFactor > 0.9) intensity = 2;
      
      this.contributionDays.push(intensity);
    }
  }

  getIntensityClass(intensity: number): string {
    return `intensity-${intensity}`;
  }
}
