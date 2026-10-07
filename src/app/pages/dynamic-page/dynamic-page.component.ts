import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Category, CustomPage, getCategory, getCustomPage } from '../../data/content';
import { FilmsComponent } from '../films/films.component';
import { PhotographyComponent } from '../photography/photography.component';
import { CreativeComponent } from '../creative/creative.component';
import { CsrComponent } from '../csr/csr.component';
import { CustomPageComponent } from '../custom-page/custom-page.component';
import { PREVIEW_MODE } from '../../data/preview';

/**
 * Serves every CMS-defined top-level page at /<slug>: portfolio categories (rendered with the
 * layout the category asks for) and custom pages (rendered from their sections).
 * The generator guarantees a slug is never both.
 */
@Component({
  selector: 'app-dynamic-page',
  standalone: true,
  imports: [FilmsComponent, PhotographyComponent, CreativeComponent, CsrComponent, CustomPageComponent],
  template: `
    @if (category) {
      @switch (category.layout) {
        @case ('masonry') { <app-photography [category]="category" /> }
        @case ('showcase') { <app-creative [category]="category" /> }
        @case ('impact') { <app-csr [category]="category" /> }
        @default { <app-films [category]="category" /> }
      }
    } @else if (customPage) {
      <app-custom-page [page]="customPage" />
    }
  `
})
export class DynamicPageComponent implements OnInit {
  category: Category | undefined;
  customPage: CustomPage | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private title: Title) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.category = getCategory(slug);
      this.customPage = this.category ? undefined : getCustomPage(slug);
      const name = this.category?.name ?? this.customPage?.title;
      if (!name) {
        // In the CMS preview a brand-new entry only exists once its draft arrives (then the page
        // is re-created), so wait rather than redirect.
        if (!PREVIEW_MODE) this.router.navigate(['/']);
        return;
      }
      this.title.setTitle(`${name} — No Logo`);
    });
  }
}
