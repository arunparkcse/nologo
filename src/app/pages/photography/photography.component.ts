import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project, getProjectsByType } from '../../data/projects.data';

@Component({
  selector: 'app-photography',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './photography.component.html',
  styleUrl: './photography.component.scss'
})
export class PhotographyComponent {
  photos: Project[] = getProjectsByType('photography');
}
