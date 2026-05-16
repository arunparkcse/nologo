import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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

  portfolioCards = [
    {
      slug: 'igsss-life-freedom-dignity',
      type: 'films',
      category: 'Brand Film',
      title: 'Life Freedom Dignity',
      img: 'https://www.nologo.in/assets/images/csr/life_freedom_dignity.jpg',
      fallback: 'https://template.dsngrid.com/mexdot/light/assets/img/portfolio/project1/1.jpg'
    },
    {
      slug: 'faces-can-talk',
      type: 'photography',
      category: 'Photography',
      title: 'Faces Can Talk',
      img: 'https://www.nologo.in/assets/images/work/photography/1/thumb.jpg',
      fallback: 'https://template.dsngrid.com/mexdot/light/assets/img/portfolio/project2/1.jpg'
    },
    {
      slug: 'co-optex-bold',
      type: 'creative',
      category: 'Creative Design',
      title: 'Co-optex Bold',
      img: 'https://www.nologo.in/assets/images/work/design/12/thumb.jpg',
      fallback: 'https://template.dsngrid.com/mexdot/light/assets/img/portfolio/project3/1.jpg'
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

  testimonials = [
    {
      quote: 'Nologo brought our CSR story to life in a way we never imagined possible. The film moved our employees to tears and inspired action.',
      author: 'Head of CSR',
      company: 'Hinduja Global Solutions',
      avatar: 'https://template.dsngrid.com/mexdot/light/assets/img/team/1.jpg',
      stars: 5
    },
    {
      quote: 'Their eye for photography is unmatched. The Co-optex campaigns they shot redefined how our brand is perceived. Sales followed.',
      author: 'Marketing Director',
      company: 'Co-optex',
      avatar: 'https://template.dsngrid.com/mexdot/light/assets/img/team/2.jpg',
      stars: 5
    },
    {
      quote: 'Working with Nologo felt like a true collaboration. They understood the soul of our work and translated it into visuals perfectly.',
      author: 'Communications Lead',
      company: 'The Banyan',
      avatar: 'https://template.dsngrid.com/mexdot/light/assets/img/team/3.jpg',
      stars: 5
    },
    {
      quote: 'The annual report they designed for us was unlike anything we had seen. Clean, impactful and human — exactly what we wanted.',
      author: 'Executive Director',
      company: 'Ekam Oneness Foundation',
      avatar: 'https://template.dsngrid.com/mexdot/light/assets/img/team/4.jpg',
      stars: 5
    }
  ];

  team = [
    { img: 'assets/team/goutham.jpg', name: 'Goutham Jho', role: 'Creative Director', dept: 'Film & Photography' },
    { img: 'assets/team/sanjay.jpg', name: 'Sanjay S', role: 'Brand Strategy', dept: 'Creative & Design' },
    { img: 'assets/team/natisha.jpg', name: 'Natisha Xavier', role: 'CSR Lead', dept: 'Social Impact' },
    { img: 'assets/team/acchuthan.jpg', name: 'Acchuthan KR', role: 'Production', dept: 'Film & Video' }
  ];

  blogs = [
    {
      img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
      date: 'March 2024',
      title: 'Why CSR Films Outperform Traditional Corporate Videos'
    },
    {
      img: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80',
      date: 'Feb 2024',
      title: 'The Power of Documentary Photography in Brand Storytelling'
    },
    {
      img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80',
      date: 'Jan 2024',
      title: 'Annual Report Design: From Data to Narrative'
    }
  ];

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
}
