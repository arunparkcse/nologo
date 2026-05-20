import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private revealObserver!: IntersectionObserver;
  private routerSub!: Subscription;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    if (typeof window === 'undefined') return;
    this.initCursor();
    // Run reveal on initial load
    setTimeout(() => this.initReveal(), 120);
    // Re-run on every route change (new page content)
    this.routerSub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => setTimeout(() => this.initReveal(), 120));
  }

  ngOnDestroy() {
    if (this.revealObserver) this.revealObserver.disconnect();
    if (this.routerSub) this.routerSub.unsubscribe();
  }

  private initReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-scale')
        .forEach(el => el.classList.add('visible'));
      return;
    }
    if (this.revealObserver) this.revealObserver.disconnect();
    this.revealObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          this.revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal, .reveal-left, .reveal-scale')
      .forEach(el => {
        el.classList.remove('visible');
        this.revealObserver.observe(el);
      });
  }

  private initCursor() {
    const cursor   = document.getElementById('nl-cursor');
    const follower = document.getElementById('nl-cursor-follower');
    if (!cursor || !follower) return;

    let mx = 0, my = 0, fx = 0, fy = 0;
    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });
    const loop = () => {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      follower.style.left = fx + 'px';
      follower.style.top  = fy + 'px';
      requestAnimationFrame(loop);
    };
    loop();
  }
}
