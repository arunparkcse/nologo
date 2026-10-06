import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PAGES, SITE } from '../../data/content';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.scss'
})
export class CareersComponent {
  page = PAGES.careers;
  site = SITE;
}
