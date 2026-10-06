import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE, footerCategories } from '../../data/content';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  site = SITE;
  categories = footerCategories();

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
