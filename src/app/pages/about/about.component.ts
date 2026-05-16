import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  private revealObserver!: IntersectionObserver;

  team = [
    {
      img: 'assets/team/goutham.jpg',
      fallback: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
      name: 'Goutham Jho',    role: 'Creative Director', dept: 'Film & Photography'
    },
    {
      img: 'assets/team/sanjay.jpg',
      fallback: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80',
      name: 'Sanjay S',       role: 'Brand Strategy',    dept: 'Creative & Design'
    },
    {
      img: 'assets/team/natisha.jpg',
      fallback: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80',
      name: 'Natisha Xavier', role: 'CSR Lead',          dept: 'Social Impact'
    },
    {
      img: 'assets/team/acchuthan.jpg',
      fallback: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
      name: 'Acchuthan KR',   role: 'Production',        dept: 'Film & Video'
    }
  ];

  values = [
    { icon: '01', title: 'Authenticity', desc: 'Every story we tell is rooted in truth. We seek genuine human experiences and translate them into communication that resonates.' },
    { icon: '02', title: 'Exploration',  desc: 'We are constantly seeking uncharted territories — pushing the boundaries of medium, message and meaning.' },
    { icon: '03', title: 'Impact',       desc: 'From brand films to CSR campaigns, we measure success by the ripples our work creates in the world.' },
    { icon: '04', title: 'Craft',        desc: 'Every frame, every layout, every word is chosen with intention. The quality of our craft is non-negotiable.' }
  ];

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
