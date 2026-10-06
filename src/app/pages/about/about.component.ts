import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PAGES, TEAM } from '../../data/content';
import { RichTextPipe } from '../../shared/rich-text.pipe';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, RichTextPipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  private revealObserver!: IntersectionObserver;

  page = PAGES.about;
  team = TEAM;

  ngAfterViewInit() {
    if (typeof window === 'undefined') return;
    this.revealObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          this.revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal, .reveal-left')
      .forEach(el => this.revealObserver.observe(el));
  }

  ngOnDestroy() {
    if (this.revealObserver) this.revealObserver.disconnect();
  }

  onImgError(event: Event, fallback: string) {
    (event.target as HTMLImageElement).src = fallback;
  }
}
