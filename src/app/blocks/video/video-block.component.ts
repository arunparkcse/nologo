import { Component, Input, OnChanges, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoSection } from '../../data/content';

@Component({
  selector: 'app-video-block',
  standalone: true,
  imports: [],
  templateUrl: './video-block.component.html',
  styleUrl: './video-block.component.scss'
})
export class VideoBlockComponent implements OnChanges {
  @Input({ required: true }) block!: VideoSection;

  url: SafeResourceUrl | null = null;
  private sanitizer = inject(DomSanitizer);

  ngOnChanges() {
    const id = encodeURIComponent(this.block.videoId);
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.block.videoType === 'vimeo'
      ? `https://player.vimeo.com/video/${id}?title=0&byline=0&badge=0`
      : `https://www.youtube.com/embed/${id}?rel=0`);
  }
}
