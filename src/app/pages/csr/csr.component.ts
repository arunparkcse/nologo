import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project, getProjectsByType } from '../../data/projects.data';

@Component({
  selector: 'app-csr',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './csr.component.html',
  styleUrl: './csr.component.scss'
})
export class CsrComponent {
  projects: Project[] = getProjectsByType('csr');

  services = [
    'CSR Branding', 'CSR Campaigns', 'Social Media Outreach',
    'Video Production', 'Print & Digital Design', 'Impact Reporting',
    'Annual Reports', 'Fundraising Campaigns', 'Advocacy Films'
  ];

  stats = [
    { number: '14+', label: 'CSR Campaigns' },
    { number: '8+', label: 'NGO Partners' },
    { number: '10+', label: 'Years of Impact' },
    { number: '∞', label: 'Lives Touched' }
  ];
}
