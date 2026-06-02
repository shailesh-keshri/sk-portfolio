import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './achievements.html',
  styleUrl: './achievements.css'
})
export class Achievements {
  awards = [
    {
      title: 'AI/ML Specialization',
      organization: 'Professional Certification (Pursuing)',
      date: 'Apr 2026 - Present',
      icon: 'fa-brain',
      color: 'indigo',
      description: 'Actively studying Artificial Intelligence and Machine Learning architectures, model optimization, and modern data pipelines.'
    },
    {
      title: 'SPOT Award',
      organization: 'SISA Forensic-driven Cybersecurity',
      date: 'Oct - Dec 2025 (Awarded: 4 Feb 2026)',
      icon: 'fa-trophy',
      color: 'gold',
      description: 'Awarded for outstanding technical ownership, dedication, and delivery of critical business features for the ProACT security platform.'
    },
    {
      title: 'Culture Award (Quarterly)',
      organization: 'SISA Forensic-driven Cybersecurity',
      date: 'Awarded: 31st Oct 2025',
      icon: 'fa-heart',
      color: 'cyan',
      description: 'Recognized for embodying core organizational values: exceptional collaboration, proactive ownership, and consistent execution.'
    },
    {
      title: 'Enterprise Delivery Recognition',
      organization: 'SISA Forensic-driven Cybersecurity',
      date: 'Ongoing',
      icon: 'fa-award',
      color: 'purple',
      description: 'Commended for the successful delivery of high-volume cybersecurity, governance reporting, and threat advisory solutions.'
    }
  ];
}
