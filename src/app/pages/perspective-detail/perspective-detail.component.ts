import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Perspective, getPerspectiveBySlug } from '../../data/perspectives.data';

@Component({
  selector: 'app-perspective-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './perspective-detail.component.html',
  styleUrl: './perspective-detail.component.scss'
})
export class PerspectiveDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  post: Perspective | undefined;
  private revealObserver!: IntersectionObserver;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.post = getPerspectiveBySlug(params['slug']);
      if (typeof window !== 'undefined') window.scrollTo(0, 0);
    });
  }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    this.revealObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          this.revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => this.revealObserver.observe(el));
  }

  ngOnDestroy(): void {
    if (this.revealObserver) this.revealObserver.disconnect();
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  onImgError(event: Event): void {
    (event.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80';
  }
}
