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
    { icon: '01', title: 'Stay curious',         desc: 'We ask questions, look closer and never assume we already know the answer.' },
    { icon: '02', title: 'Keep it simple',        desc: 'We believe clarity takes thinking. We strip away the unnecessary until the idea speaks for itself.' },
    { icon: '03', title: 'Be original',           desc: 'We don’t chase what’s already been done. We look for an approach that feels right for the brand, the audience and the moment.' },
    { icon: '04', title: 'Stay human',            desc: 'People are at the centre of everything we create. We listen, respect context and never lose sight of who we’re communicating with.' },
    { icon: '05', title: 'Care about the work',   desc: 'From the first thought to the final frame, we care about the details — and about making something we can stand behind.' },
    { icon: '06', title: 'Do it together',        desc: 'The best ideas rarely belong to one person. We believe in open conversations, different perspectives and making the work better together.' }
  ];

  whatWeDo = [
    { num: '01', title: 'Brand Strategy',            desc: 'Positioning, purpose, messaging and communication strategy.' },
    { num: '02', title: 'Brand Identity',            desc: 'Naming, visual identity, brand language and guidelines.' },
    { num: '03', title: 'Campaigns',                 desc: 'Big ideas, creative platforms and integrated campaigns.' },
    { num: '04', title: 'Films',                     desc: 'Brand films, corporate films, documentaries, impact films and digital video.' },
    { num: '05', title: 'Design',                    desc: 'Print, digital, publications, presentations and visual communication.' },
    { num: '06', title: 'Content',                   desc: 'Copywriting, editorial, scripts, social content and branded content.' },
    { num: '07', title: 'Digital & Social',          desc: 'Digital campaigns, social media strategy, content and creative.' },
    { num: '08', title: 'Animation & Motion',        desc: 'Explainers, motion graphics, animation and visual storytelling.' },
    { num: '09', title: 'Photography',               desc: 'Brand, people, products, events and documentary photography.' },
    { num: '10', title: 'Communication Collateral',  desc: 'Brochures, reports, presentations, toolkits and campaign material.' }
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
