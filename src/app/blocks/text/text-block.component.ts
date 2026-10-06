import { Component, Input } from '@angular/core';
import { TextSection } from '../../data/content';
import { RichTextPipe } from '../../shared/rich-text.pipe';

@Component({
  selector: 'app-text-block',
  standalone: true,
  imports: [RichTextPipe],
  templateUrl: './text-block.component.html',
  styleUrl: './text-block.component.scss'
})
export class TextBlockComponent {
  @Input({ required: true }) block!: TextSection;
}
