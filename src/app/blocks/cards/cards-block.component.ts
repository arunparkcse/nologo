import { Component, Input } from '@angular/core';
import { CardsSection } from '../../data/content';

@Component({
  selector: 'app-cards-block',
  standalone: true,
  imports: [],
  templateUrl: './cards-block.component.html',
  styleUrl: './cards-block.component.scss'
})
export class CardsBlockComponent {
  @Input({ required: true }) block!: CardsSection;

  num = (i: number) => String(i + 1).padStart(2, '0');
}
