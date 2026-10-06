import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServicesSection } from '../../data/content';
import { isInternal } from '../block-utils';

@Component({
  selector: 'app-services-block',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './services-block.component.html',
  styleUrl: './services-block.component.scss'
})
export class ServicesBlockComponent {
  @Input({ required: true }) block!: ServicesSection;
  isInternal = isInternal;

  num = (i: number) => String(i + 1).padStart(2, '0');
}
