import { Component, Input } from '@angular/core';
import { GallerySection } from '../../data/content';

@Component({
  selector: 'app-gallery-block',
  standalone: true,
  imports: [],
  templateUrl: './gallery-block.component.html',
  styleUrl: './gallery-block.component.scss'
})
export class GalleryBlockComponent {
  @Input({ required: true }) block!: GallerySection;
}
