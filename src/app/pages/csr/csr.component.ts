import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project, getProjectsByType } from '../../data/projects.data';
import { PAGES } from '../../data/content';

@Component({
  selector: 'app-csr',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './csr.component.html',
  styleUrl: './csr.component.scss'
})
export class CsrComponent {
  projects: Project[] = getProjectsByType('csr');

  page = PAGES.csr;
}
