import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  values = [
    { icon: '✦', title: 'Authenticity', desc: 'Every story we tell is rooted in truth. We seek genuine human experiences and translate them into communication that resonates.' },
    { icon: '◎', title: 'Exploration', desc: 'We are constantly seeking uncharted territories — pushing the boundaries of medium, message and meaning.' },
    { icon: '◈', title: 'Impact', desc: 'From brand films to CSR campaigns, we measure success by the ripples our work creates in the world.' },
    { icon: '◇', title: 'Craft', desc: 'Every frame, every layout, every word is chosen with intention. The quality of our craft is non-negotiable.' }
  ];
}
