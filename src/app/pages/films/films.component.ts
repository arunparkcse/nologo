import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project, getProjectsByType } from '../../data/projects.data';
import { PAGES } from '../../data/content';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './films.component.html',
  styleUrl: './films.component.scss'
})
export class FilmsComponent {
  page = PAGES.films;
  films: Project[] = getProjectsByType('films');
}
