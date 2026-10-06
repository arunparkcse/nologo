import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CtaSection } from '../../data/content';
import { isInternal } from '../block-utils';

@Component({
  selector: 'app-cta-block',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cta-block.component.html',
  styleUrl: './cta-block.component.scss'
})
export class CtaBlockComponent {
  @Input({ required: true }) block!: CtaSection;
  isInternal = isInternal;

  get link() { return this.block.buttonLink || '/contact'; }
}
