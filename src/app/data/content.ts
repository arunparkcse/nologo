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

export interface CallToAction {
  label: string;
  title: string;
  accent: string;
  buttonLabel: string;
}

/** Which of the four portfolio page designs a category uses. */
export type CategoryLayout = 'featured' | 'masonry' | 'showcase' | 'impact';

/** A portfolio section (Film, Photography, …) — each is a page at /<slug>. */
export interface Category {
  slug: string;
  layout: CategoryLayout;
  /** Browser tab title and portfolio tab label. */
  name: string;
  /** Header menu label; falls back to name. */
  navLabel?: string;
  /** Footer link label; falls back to name. */
  footerLabel?: string;
  showInNav?: boolean;
  showInFooter?: boolean;
  heroImage?: string;
  hero: PageHero;
  cta: CallToAction;
  /** 'featured' layout only. */
  featuredLabel?: string;
  /** 'impact' layout only. */
  stats?: { number: string; label: string }[];
  intro?: { label: string; title: string; paragraphs: string[] };
  servicesLabel?: string;
  services?: string[];
}

// Collections are validated by the generator; the casts narrow JSON's inferred types.
export const CATEGORIES = content.categories as unknown as Category[];
export const PROJECTS = content.projects as unknown as Project[];
export const PERSPECTIVES = content.perspectives as unknown as Perspective[];
export const TESTIMONIALS = content.testimonials as unknown as Testimonial[];
export const TEAM = content.team as unknown as TeamMember[];

// Singletons keep their inferred types, so strictTemplates checks templates against the real content shape.
export const SITE = content.site;
export const PAGES = content.pages;

export const getCategory = (slug: string) => CATEGORIES.find(c => c.slug === slug);
export const navCategories = () => CATEGORIES.filter(c => c.showInNav !== false);
export const footerCategories = () => CATEGORIES.filter(c => c.showInFooter !== false);
