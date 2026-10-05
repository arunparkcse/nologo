import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PERSPECTIVES } from '../../data/perspectives.data';

interface Testimonial {
  quote: string;
  author: string;
  company: string;
  role?: string;
  avatar?: string;
  stars?: number;
}

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

  // Featuring 3 of the "Selected Work" case studies from the Sept 2026 brief.
  // PLACEHOLDER MEDIA — see projects.data.ts for the full note.
  portfolioCards = [
    {
      slug: 'treasures-of-tamil-nadu',
      type: 'films',
      category: 'Documentary Film',
      title: 'Treasures of Tamil Nadu',
      img: 'https://template.dsngrid.com/mexdot/light/assets/img/portfolio/project1/1.jpg',
      fallback: 'https://template.dsngrid.com/mexdot/light/assets/img/portfolio/project1/1.jpg'
    },
    {
      slug: 'unicef-be-a-champion',
      type: 'films',
      category: 'Social Impact Film',
      title: 'UNICEF ‘Be A Champion’',
      img: 'https://template.dsngrid.com/mexdot/light/assets/img/photography/14.jpg',
      fallback: 'https://template.dsngrid.com/mexdot/light/assets/img/photography/14.jpg'
    },
    {
      slug: 'vijaya-hospitals-rebrand',
      type: 'creative',
      category: 'Brand Identity',
      title: 'Vijaya Hospitals',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
      fallback: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80'
    }
  ];

  services = [
    {
      num: '01',
      title: 'Film Production',
      desc: 'From concept to screen — we craft compelling films that move audiences, ignite conversation and drive meaningful change.',
      tags: ['Corporate Films', 'Documentaries', 'CSR Films', 'Ad Films'],
      link: '/films'
    },
    {
      num: '02',
      title: 'Photography',
      desc: 'We capture moments that speak volumes. Our photography spans brands, people, products and the worlds in between.',
      tags: ['Brand Photography', 'Product Shoots', 'Editorial', 'Portraiture'],
      link: '/photography'
    },
    {
      num: '03',
      title: 'Creative Design',
      desc: 'Visual storytelling through print, digital and motion. We build identities that resonate and campaigns that convert.',
      tags: ['Brand Identity', 'Print Design', 'Annual Reports', 'Campaigns'],
      link: '/creative'
    }
  ];

  // Real client testimonials. More are expected to come in — append new
  // entries here (avatar/stars are optional; omit rather than fabricate).
  testimonials: Testimonial[] = [
    {
      quote: 'Nologo has been a trusted creative partner across multiple film production projects. Their team consistently delivers high-quality visual storytelling that is closely aligned with project objectives and briefs. Beyond strong execution, Nologo brings valuable creative insight and strategic direction to every engagement, while remaining highly collaborative and responsive to feedback. We have appreciated their professionalism, flexibility, and commitment to producing impactful content.',
      author: 'Sudeshna Mukherjee',
      role: 'Head of Communications',
      company: 'UN Women India Country Office'
    }
  ];

  team = [
    { img: 'assets/team/goutham.jpg', name: 'Goutham Jho', role: 'Creative Director', dept: 'Film & Photography' },
    { img: 'assets/team/sanjay.jpg', name: 'Sanjay S', role: 'Brand Strategy', dept: 'Creative & Design' },
    { img: 'assets/team/natisha.jpg', name: 'Natisha Xavier', role: 'CSR Lead', dept: 'Social Impact' },
    { img: 'assets/team/acchuthan.jpg', name: 'Acchuthan KR', role: 'Production', dept: 'Film & Video' }
  ];

  blogs = PERSPECTIVES;

  clients = [
    'HGS', 'Co-optex', 'CBM India', 'Quess Corp', 'The Banyan',
    'Hand in Hand', 'UCAM', 'Ma Foi Foundation', 'Sharon', 'Karghaa',
    'Cheyyar SEZ', 'Ekam', 'IGSSS', 'Sakthi Foundation',
    'HGS', 'Co-optex', 'CBM India', 'Quess Corp', 'The Banyan',
    'Hand in Hand', 'UCAM', 'Ma Foi Foundation', 'Sharon', 'Karghaa',
    'Cheyyar SEZ', 'Ekam', 'IGSSS', 'Sakthi Foundation'
  ];

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
    if (this.testimonials.length <= 1) return;
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
