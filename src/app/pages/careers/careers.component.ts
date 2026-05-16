import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.scss'
})
export class CareersComponent {
  openings = [
    { role: 'Cinematographer', dept: 'Film', type: 'Full-time', location: 'Chennai' },
    { role: 'Photographer', dept: 'Photography', type: 'Full-time', location: 'Chennai / Delhi' },
    { role: 'Graphic Designer', dept: 'Creative', type: 'Full-time', location: 'Chennai' },
  ];

  perks = [
    { icon: '◎', label: 'Creative Freedom', desc: 'Work on meaningful projects that make a real difference.' },
    { icon: '◈', label: 'Travel', desc: 'Explore new places as part of your work — literally.' },
    { icon: '◇', label: 'Growth', desc: 'Continuously learn, evolve and expand your craft.' },
    { icon: '✦', label: 'Impact', desc: 'Your work will reach audiences and change minds.' },
  ];
}
