import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PerspectivesSection, PERSPECTIVES } from '../../data/content';

@Component({
  selector: 'app-perspectives-block',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './perspectives-block.component.html',
  styleUrl: './perspectives-block.component.scss'
})
export class PerspectivesBlockComponent {
  @Input({ required: true }) block!: PerspectivesSection;

  posts = PERSPECTIVES;
}
