import { Pipe, PipeTransform } from '@angular/core';

/**
 * Renders CMS text safely for [innerHTML]: escapes everything, then allows
 * only **bold** and line breaks.
 */
@Pipe({ name: 'richText', standalone: true })
export class RichTextPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }
}
