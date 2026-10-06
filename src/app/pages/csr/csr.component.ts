import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project, getProjectsByType } from '../../data/projects.data';
import { CATEGORIES, Category } from '../../data/content';

/** Page design for categories with layout: 'impact'. Rendered by CategoryPageComponent. */
@Component({
  selector: 'app-csr',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './csr.component.html',
  styleUrl: './csr.component.scss'
})
export class CsrComponent {
  page!: Category;
  projects: Project[] = [];
  tabs = CATEGORIES;

  @Input({ required: true }) set category(c: Category) {
    this.page = c;
    this.projects = getProjectsByType(c.slug);
  }
}
