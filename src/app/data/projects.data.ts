// Project data now lives in src/content/projects/*.json (editable via the CMS).
import { PROJECTS, Project } from './content';

export { PROJECTS };
export type { Project };

export function getProjectBySlug(type: string, slug: string): Project | undefined {
  return PROJECTS.find(p => p.type === type && p.slug === slug);
}

export function getProjectsByType(type: string): Project[] {
  return PROJECTS.filter(p => p.type === type);
}
