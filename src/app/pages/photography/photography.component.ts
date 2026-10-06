import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project, getProjectsByType } from '../../data/projects.data';
import { CATEGORIES, Category } from '../../data/content';

/** Page design for categories with layout: 'masonry'. Rendered by CategoryPageComponent. */
@Component({
  selector: 'app-photography',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './photography.component.html',
  styleUrl: './photography.component.scss'
})
export class PhotographyComponent {
  page!: Category;
  photos: Project[] = [];
  tabs = CATEGORIES;

  @Input({ required: true }) set category(c: Category) {
    this.page = c;
    this.photos = getProjectsByType(c.slug);
  }
}
