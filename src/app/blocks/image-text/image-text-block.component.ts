import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImageTextSection } from '../../data/content';
import { RichTextPipe } from '../../shared/rich-text.pipe';
import { isInternal } from '../block-utils';

@Component({
  selector: 'app-image-text-block',
  standalone: true,
  imports: [RichTextPipe, RouterLink],
  templateUrl: './image-text-block.component.html',
  styleUrl: './image-text-block.component.scss'
})
export class ImageTextBlockComponent {
  @Input({ required: true }) block!: ImageTextSection;
  isInternal = isInternal;
}
