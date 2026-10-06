import { Component, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { PAGES, PROJECTS, PERSPECTIVES, TESTIMONIALS, TEAM, Project } from '../../data/content';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private revealObserver!: IntersectionObserver;
  private teInterval: any;
  teIdx = 0;
  heroSlide = 0;
  ytActive = false;
  private heroInterval: any;

  page = PAGES.home;

  // Featured projects are picked by slug in the CMS; card image/title come from the project itself.
  selectedWork: Project[] = this.page.selectedWork.projects
    .map(slug => PROJECTS.find(p => p.slug === slug))
    .filter((p): p is Project => !!p);

  // Doubled so the CSS marquee/ticker loops seamlessly.
  ticker = [...this.page.hero.ticker, ...this.page.hero.ticker];
  clients = [...this.page.clients.items, ...this.page.clients.items];

  testimonials = TESTIMONIALS;
  team = TEAM;
  blogs = PERSPECTIVES;

  showreelId = encodeURIComponent(this.page.hero.showreelYoutubeId);
  showreelUrl = inject(DomSanitizer).bypassSecurityTrustResourceUrl(
    `https://www.youtube.com/embed/${this.showreelId}?autoplay=1&rel=0`
  );

  goToHeroSlide(n: number) {
    this.heroSlide = n;
    if (n !== 1) this.ytActive = false;
    clearInterval(this.heroInterval);
    this.startHeroAuto();
  }

  activateYT() { this.ytActive = true; clearInterval(this.heroInterval); }

  private startHeroAuto() {
    this.heroInterval = setInterval(() => {
      if (this.heroSlide === 1 && this.ytActive) return;
      this.heroSlide = this.heroSlide === 0 ? 1 : 0;
      if (this.heroSlide !== 1) this.ytActive = false;
    }, 30000);
  }

  ngAfterViewInit() {
    if (typeof window === 'undefined') return;
    this.initReveal();
    this.startTestimonialAuto();
    this.startHeroAuto();
  }

  ngOnDestroy() {
    if (this.revealObserver) this.revealObserver.disconnect();
    if (this.teInterval) clearInterval(this.teInterval);
    if (this.heroInterval) clearInterval(this.heroInterval);
  }

  private initReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal, .reveal-left').forEach(el => el.classList.add('visible'));
      return;
    }
    this.revealObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          this.revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal, .reveal-left').forEach(el => this.revealObserver.observe(el));
  }

  private startTestimonialAuto() {
    this.teInterval = setInterval(() => { this.nextTestimonial(); }, 5000);
  }

  goToTestimonial(n: number) {
    this.teIdx = n;
    clearInterval(this.teInterval);
    this.startTestimonialAuto();
  }

  nextTestimonial() {
    this.teIdx = (this.teIdx + 1) % this.testimonials.length;
  }

  prevTestimonial() {
    this.teIdx = (this.teIdx - 1 + this.testimonials.length) % this.testimonials.length;
  }

  onImgError(event: Event, fallback: string) {
    (event.target as HTMLImageElement).src = fallback;
  }

  initials(name: string): string {
    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(w => w[0].toUpperCase())
      .join('');
  }
}
