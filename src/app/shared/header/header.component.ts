import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  mobileOpen = false;
  scrolled = false;
  preloaderHidden = false;
  preloaderCount = 0;

  ngOnInit() {
    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 8) + 3;
      if (count >= 100) {
        count = 100;
        clearInterval(interval);
        setTimeout(() => { this.preloaderHidden = true; }, 400);
      }
      this.preloaderCount = count;
    }, 60);
  }

  @HostListener('window:scroll')
  onScroll() { this.scrolled = window.scrollY > 40; }

  @HostListener('document:keydown.escape')
  onEsc() { this.closeMobileMenu(); }

  toggleMobile() {
    this.mobileOpen = !this.mobileOpen;
    document.body.classList.toggle('menu-open', this.mobileOpen);
  }

  closeMobileMenu() {
    this.mobileOpen = false;
    document.body.classList.remove('menu-open');
  }

  logoErr(event: Event) {
    (event.target as HTMLImageElement).style.display = 'none';
  }

  navItems = [
    { label: 'Home',         path: '/'           },
    { label: 'About',        path: '/about'       },
    { label: 'Film',         path: '/films'       },
    { label: 'Photography',  path: '/photography' },
    { label: 'Creative',     path: '/creative'    },
    { label: 'CSR',          path: '/csr'         },
    { label: 'Careers',      path: '/careers'     },
    { label: 'Contact',      path: '/contact'     },
  ];
}
