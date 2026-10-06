import { Component, Input } from '@angular/core';
import { HeroSection } from '../../data/content';

@Component({
  selector: 'app-hero-block',
  standalone: true,
  imports: [],
  templateUrl: './hero-block.component.html'
})
export class HeroBlockComponent {
  @Input({ required: true }) block!: HeroSection;
}
