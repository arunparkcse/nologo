import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { TestimonialsSection, TESTIMONIALS } from '../../data/content';

@Component({
  selector: 'app-testimonials-block',
  standalone: true,
  imports: [],
  templateUrl: './testimonials-block.component.html',
  styleUrl: './testimonials-block.component.scss'
})
export class TestimonialsBlockComponent implements OnInit, OnDestroy {
  @Input({ required: true }) block!: TestimonialsSection;

  testimonials = TESTIMONIALS;
  idx = 0;
  private timer: ReturnType<typeof setInterval> | undefined;

  ngOnInit() { this.restart(); }
  ngOnDestroy() { clearInterval(this.timer); }

  go(i: number) {
    const n = this.testimonials.length || 1;
    this.idx = (i + n) % n;
    this.restart();
  }

  private restart() {
    clearInterval(this.timer);
    if (typeof window !== 'undefined') this.timer = setInterval(() => this.go(this.idx + 1), 5000);
  }

  initials(name: string): string {
    return name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
  }
}
