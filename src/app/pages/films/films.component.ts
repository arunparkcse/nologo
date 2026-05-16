import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project, getProjectsByType } from '../../data/projects.data';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './films.component.html',
  styleUrl: './films.component.scss'
})
export class FilmsComponent {
  films: Project[] = getProjectsByType('films');
}
