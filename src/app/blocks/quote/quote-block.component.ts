import { Component, Input } from '@angular/core';
import { QuoteSection } from '../../data/content';

@Component({
  selector: 'app-quote-block',
  standalone: true,
  imports: [],
  templateUrl: './quote-block.component.html',
  styleUrl: './quote-block.component.scss'
})
export class QuoteBlockComponent {
  @Input({ required: true }) block!: QuoteSection;
}
