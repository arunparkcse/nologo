import { Component, Input } from '@angular/core';
import { TeamSection, TEAM } from '../../data/content';

@Component({
  selector: 'app-team-block',
  standalone: true,
  imports: [],
  templateUrl: './team-block.component.html',
  styleUrl: './team-block.component.scss'
})
export class TeamBlockComponent {
  @Input({ required: true }) block!: TeamSection;

  team = TEAM;
  fallback(e: Event) {
    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80';
  }
}
