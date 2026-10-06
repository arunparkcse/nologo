import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project, getProjectsByType } from '../../data/projects.data';
import { CATEGORIES, Category } from '../../data/content';

/** Page design for categories with layout: 'featured'. Rendered by CategoryPageComponent. */
@Component({
  selector: 'app-films',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './films.component.html',
  styleUrl: './films.component.scss'
})
export class FilmsComponent {
  page!: Category;
  films: Project[] = [];
  tabs = CATEGORIES;

  @Input({ required: true }) set category(c: Category) {
    this.page = c;
    this.films = getProjectsByType(c.slug);
  }
}
