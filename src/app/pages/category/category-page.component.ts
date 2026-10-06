import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Category, getCategory } from '../../data/content';
import { FilmsComponent } from '../films/films.component';
import { PhotographyComponent } from '../photography/photography.component';
import { CreativeComponent } from '../creative/creative.component';
import { CsrComponent } from '../csr/csr.component';

/**
 * Serves every portfolio category page (/films, /photography, … and any category added in
 * the CMS) by rendering the layout the category's content asks for.
 */
@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [FilmsComponent, PhotographyComponent, CreativeComponent, CsrComponent],
  template: `
    @if (category) {
      @switch (category.layout) {
        @case ('masonry') { <app-photography [category]="category" /> }
        @case ('showcase') { <app-creative [category]="category" /> }
        @case ('impact') { <app-csr [category]="category" /> }
        @default { <app-films [category]="category" /> }
      }
    }
  `
})
export class CategoryPageComponent implements OnInit {
  category: Category | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private title: Title) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = getCategory(params['category']);
      if (!this.category) {
        this.router.navigate(['/']);
        return;
      }
      this.title.setTitle(`${this.category.name} — No Logo`);
    });
  }
}
