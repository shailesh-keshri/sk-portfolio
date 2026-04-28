import { Component, AfterViewInit, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, AfterViewInit {
  title = 'Shailesh Keshri | Portfolio';
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Re-trigger scroll animations whenever the route changes
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.setupScrollAnimations();
        // Also scroll to top on navigation
        window.scrollTo(0, 0);
      });
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollAnimations();
    }
  }

  private setupScrollAnimations() {
    if (!isPlatformBrowser(this.platformId)) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    // Using a slightly longer timeout for route transitions
    setTimeout(() => {
      const elements = document.querySelectorAll('.reveal');
      elements.forEach(el => {
        // Reset active state if navigating back so it can re-animate
        // el.classList.remove('active'); 
        observer.observe(el);
      });
    }, 300);
  }
}
