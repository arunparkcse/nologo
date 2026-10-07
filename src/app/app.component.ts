import { Component, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { applyPreview, PreviewMessage, PREVIEW_MODE } from './data/preview';

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

  /** CMS live preview: only in development builds, and only when loaded by the CMS preview pane. */
  readonly previewMode = PREVIEW_MODE;
  /** Toggled off and on to re-create the whole page with the CMS draft applied. */
  showShell = true;
  private remountTimer: ReturnType<typeof setTimeout> | undefined;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  private onPreviewMessage = (e: MessageEvent) => {
    if (e.origin !== window.location.origin || (e.data as PreviewMessage)?.type !== 'cms-preview') return;
    if (applyPreview(e.data as PreviewMessage)) this.remount();
  };

  // Re-creating header, page and footer rebuilds every derived list (menus, project grids, …).
  private remount() {
    clearTimeout(this.remountTimer);
    this.remountTimer = setTimeout(() => {
      const y = window.scrollY;
      this.showShell = false;
      this.cdr.detectChanges();
      this.showShell = true;
      this.cdr.detectChanges();
      requestAnimationFrame(() => window.scrollTo(0, y));
    }, 120);
  }

  ngAfterViewInit() {
    if (typeof window === 'undefined') return;
    if (this.previewMode) {
      document.documentElement.classList.add('cms-preview');
      window.addEventListener('message', this.onPreviewMessage);
      window.parent.postMessage({ type: 'cms-preview-ready' }, window.location.origin);
    }
    this.initCursor();
    // Run reveal on initial load
    setTimeout(() => this.initReveal(), 120);
    // Re-run on every route change (new page content)
    this.routerSub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => setTimeout(() => this.initReveal(), 120));
  }

  ngOnDestroy() {
    window.removeEventListener('message', this.onPreviewMessage);
    clearTimeout(this.remountTimer);
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
