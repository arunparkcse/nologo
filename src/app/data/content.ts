// Typed access to the CMS-managed content in src/content/**.
// generated/content.json is produced by scripts/generate-content.mjs — don't edit it by hand.
import content from './generated/content.json';

export interface Project {
  slug: string;
  type: string;
  title: string;
  category: string;
  client: string;
  year: string;
  thumb: string;
  images: string[];
  description: string;
  tags: string[];
  videoId?: string;
  videoType?: 'youtube' | 'vimeo';
}

export interface Perspective {
  slug: string;
  title: string;
  /** Left blank until editorial confirms one; templates hide the date when empty. */
  date: string;
  excerpt: string;
  image: string;
  body: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  company: string;
  role?: string;
  avatar?: string;
  stars?: number;
}

export interface TeamMember {
  name: string;
  role: string;
  dept: string;
  img: string;
}

/** Shared shape for every page's top hero. `title`/`sub` use \n for line breaks. */
export interface PageHero {
  label: string;
  title: string;
  accent: string;
  sub: string;
}

// Collections are validated by the generator; the casts narrow JSON's inferred types.
export const PROJECTS = content.projects as unknown as Project[];
export const PERSPECTIVES = content.perspectives as unknown as Perspective[];
export const TESTIMONIALS = content.testimonials as unknown as Testimonial[];
export const TEAM = content.team as unknown as TeamMember[];

// Singletons keep their inferred types, so strictTemplates checks templates against the real content shape.
export const SITE = content.site;
export const PAGES = content.pages;
