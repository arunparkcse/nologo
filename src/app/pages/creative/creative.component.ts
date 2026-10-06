import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project, getProjectsByType } from '../../data/projects.data';
import { CATEGORIES, Category } from '../../data/content';

/** Page design for categories with layout: 'showcase'. Rendered by CategoryPageComponent. */
@Component({
  selector: 'app-creative',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './creative.component.html',
  styleUrl: './creative.component.scss'
})
export class CreativeComponent {
  page!: Category;
  works: Project[] = [];
  tabs = CATEGORIES;

  @Input({ required: true }) set category(c: Category) {
    this.page = c;
    this.works = getProjectsByType(c.slug);
  }
}
