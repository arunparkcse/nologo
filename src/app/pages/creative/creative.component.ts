import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project, getProjectsByType } from '../../data/projects.data';

@Component({
  selector: 'app-creative',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './creative.component.html',
  styleUrl: './creative.component.scss'
})
export class CreativeComponent {
  works: Project[] = getProjectsByType('creative');
}
