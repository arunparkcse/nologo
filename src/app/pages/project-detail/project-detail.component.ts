import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Project, getProjectBySlug, getProjectsByType } from '../../data/projects.data';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  project: Project | undefined;
  related: Project[] = [];
  activeImage = 0;
  safeVideoUrl: SafeResourceUrl | null = null;

  // Lightbox
  lightboxOpen = false;
  lightboxIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const type = params['type'];
      const slug = params['slug'];
      this.project = getProjectBySlug(type, slug);
      if (!this.project) {
        this.router.navigate(['/']);
        return;
      }
      this.activeImage = 0;
      this.lightboxOpen = false;
      this.related = getProjectsByType(type)
        .filter(p => p.slug !== slug)
        .slice(0, 3);
      if (this.project.videoId) {
        const url = this.project.videoType === 'vimeo'
          ? `https://player.vimeo.com/video/${this.project.videoId}?title=0&byline=0&badge=0`
          : `https://www.youtube.com/embed/${this.project.videoId}?rel=0&showinfo=0`;
        this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      } else {
        this.safeVideoUrl = null;
      }
    });
  }

  ngOnDestroy(): void {
    this.closeLightbox();
  }

  setActive(i: number): void {
    this.activeImage = i;
  }

  openLightbox(i: number): void {
    this.lightboxIndex = i;
    this.lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
    document.body.style.overflow = '';
  }

  lightboxPrev(): void {
    if (!this.project) return;
    this.lightboxIndex = (this.lightboxIndex - 1 + this.project.images.length) % this.project.images.length;
  }

  lightboxNext(): void {
    if (!this.project) return;
    this.lightboxIndex = (this.lightboxIndex + 1) % this.project.images.length;
  }

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent): void {
    if (!this.lightboxOpen) return;
    if (e.key === 'ArrowLeft')  this.lightboxPrev();
    if (e.key === 'ArrowRight') this.lightboxNext();
    if (e.key === 'Escape')     this.closeLightbox();
  }

  goBack(): void {
    if (this.project) {
      this.router.navigate(['/' + this.project.type]);
    }
  }
}
