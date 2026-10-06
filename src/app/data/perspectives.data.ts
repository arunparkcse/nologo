// Perspectives articles now live in src/content/perspectives/*.json (editable via the CMS).
import { PERSPECTIVES, Perspective } from './content';

export { PERSPECTIVES };
export type { Perspective };

export function getPerspectiveBySlug(slug: string): Perspective | undefined {
  return PERSPECTIVES.find(p => p.slug === slug);
}
