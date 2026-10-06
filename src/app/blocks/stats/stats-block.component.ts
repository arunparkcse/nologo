import { Component, Input } from '@angular/core';
import { StatsSection } from '../../data/content';

@Component({
  selector: 'app-stats-block',
  standalone: true,
  imports: [],
  templateUrl: './stats-block.component.html',
  styleUrl: './stats-block.component.scss'
})
export class StatsBlockComponent {
  @Input({ required: true }) block!: StatsSection;
}
