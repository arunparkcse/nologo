import { Component, Input } from '@angular/core';
import { ClientsSection } from '../../data/content';

@Component({
  selector: 'app-clients-block',
  standalone: true,
  imports: [],
  templateUrl: './clients-block.component.html',
  styleUrl: './clients-block.component.scss'
})
export class ClientsBlockComponent {
  @Input({ required: true }) block!: ClientsSection;

  get looped() { return [...this.block.items, ...this.block.items]; }
}
