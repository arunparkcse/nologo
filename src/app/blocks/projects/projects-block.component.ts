import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../data/content';
import { ProjectsSection, PROJECTS } from '../../data/content';

@Component({
  selector: 'app-projects-block',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './projects-block.component.html',
  styleUrl: './projects-block.component.scss'
})
export class ProjectsBlockComponent {
  @Input({ required: true }) block!: ProjectsSection;

  get items(): Project[] {
    const b = this.block;
    const list = b.projects?.length
      ? b.projects.map(slug => PROJECTS.find(p => p.slug === slug)).filter((p): p is Project => !!p)
      : PROJECTS.filter(p => !b.category || p.type === b.category);
    return b.limit ? list.slice(0, b.limit) : list;
  }
}
