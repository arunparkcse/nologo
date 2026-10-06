import { Component, Input } from '@angular/core';
import { CustomPage } from '../../data/content';
import { HeroBlockComponent } from '../../blocks/hero/hero-block.component';
import { TextBlockComponent } from '../../blocks/text/text-block.component';
import { ImageTextBlockComponent } from '../../blocks/image-text/image-text-block.component';
import { StatsBlockComponent } from '../../blocks/stats/stats-block.component';
import { CardsBlockComponent } from '../../blocks/cards/cards-block.component';
import { QuoteBlockComponent } from '../../blocks/quote/quote-block.component';
import { ServicesBlockComponent } from '../../blocks/services/services-block.component';
import { ProjectsBlockComponent } from '../../blocks/projects/projects-block.component';
import { TeamBlockComponent } from '../../blocks/team/team-block.component';
import { TestimonialsBlockComponent } from '../../blocks/testimonials/testimonials-block.component';
import { PerspectivesBlockComponent } from '../../blocks/perspectives/perspectives-block.component';
import { ClientsBlockComponent } from '../../blocks/clients/clients-block.component';
import { GalleryBlockComponent } from '../../blocks/gallery/gallery-block.component';
import { VideoBlockComponent } from '../../blocks/video/video-block.component';
import { CtaBlockComponent } from '../../blocks/cta/cta-block.component';

/** Renders a CMS-built page: each section is drawn by the block of the same type. */
@Component({
  selector: 'app-custom-page',
  standalone: true,
  imports: [
    HeroBlockComponent, TextBlockComponent, ImageTextBlockComponent, StatsBlockComponent, CardsBlockComponent,
    QuoteBlockComponent, ServicesBlockComponent, ProjectsBlockComponent, TeamBlockComponent,
    TestimonialsBlockComponent, PerspectivesBlockComponent, ClientsBlockComponent, GalleryBlockComponent,
    VideoBlockComponent, CtaBlockComponent,
  ],
  // $any: @switch doesn't narrow the Section union, but each case only ever receives its own type.
  template: `
    @for (s of page.sections; track $index) {
      @switch (s.type) {
        @case ('hero') { <app-hero-block [block]="$any(s)" /> }
        @case ('text') { <app-text-block [block]="$any(s)" /> }
        @case ('imageText') { <app-image-text-block [block]="$any(s)" /> }
        @case ('stats') { <app-stats-block [block]="$any(s)" /> }
        @case ('cards') { <app-cards-block [block]="$any(s)" /> }
        @case ('quote') { <app-quote-block [block]="$any(s)" /> }
        @case ('services') { <app-services-block [block]="$any(s)" /> }
        @case ('projects') { <app-projects-block [block]="$any(s)" /> }
        @case ('team') { <app-team-block [block]="$any(s)" /> }
        @case ('testimonials') { <app-testimonials-block [block]="$any(s)" /> }
        @case ('perspectives') { <app-perspectives-block [block]="$any(s)" /> }
        @case ('clients') { <app-clients-block [block]="$any(s)" /> }
        @case ('gallery') { <app-gallery-block [block]="$any(s)" /> }
        @case ('video') { <app-video-block [block]="$any(s)" /> }
        @case ('cta') { <app-cta-block [block]="$any(s)" /> }
      }
    }
  `
})
export class CustomPageComponent {
  @Input({ required: true }) page!: CustomPage;
}
