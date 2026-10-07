// CMS live preview (development builds only): applies the CMS's unsaved draft of one entry to the
// in-memory content, so the page can be re-rendered with it. Never active in production.
import { isDevMode } from '@angular/core';
import { PAGES, SITE, CATEGORIES, CUSTOM_PAGES, PROJECTS, PERSPECTIVES, TESTIMONIALS, TEAM } from './content';

/** True only in a development build loaded by the CMS preview pane (…?cmsPreview=1). */
export const PREVIEW_MODE = isDevMode() && typeof window !== 'undefined'
  && new URLSearchParams(window.location.search).has('cmsPreview');

export interface PreviewMessage {
  type: 'cms-preview';
  /** CMS collection name, e.g. 'projects', 'pages'. */
  collection: string;
  /** Entry file name (pages: 'home', 'about', …); empty for a new, unsaved entry. */
  file: string;
  data: Record<string, unknown>;
}

type Item = Record<string, unknown>;

const COLLECTIONS: Record<string, Item[]> = {
  categories: CATEGORIES as unknown as Item[],
  customPages: CUSTOM_PAGES as unknown as Item[],
  projects: PROJECTS as unknown as Item[],
  perspectives: PERSPECTIVES as unknown as Item[],
  testimonials: TESTIMONIALS as unknown as Item[],
  team: TEAM as unknown as Item[],
};

// Mutate in place: components hold references to these objects.
function replaceContents(target: Item, data: Item) {
  for (const key of Object.keys(target)) delete target[key];
  Object.assign(target, data);
}

/** Returns false if the message doesn't match any known content. */
export function applyPreview(msg: PreviewMessage): boolean {
  if (msg.collection === 'pages') {
    const page = (PAGES as unknown as Record<string, Item>)[msg.file];
    if (!page) return false;
    replaceContents(page, msg.data);
    return true;
  }
  if (msg.collection === 'settings') {
    replaceContents(SITE as unknown as Item, msg.data);
    return true;
  }
  const list = COLLECTIONS[msg.collection];
  if (!list) return false;
  // A new entry has no file yet; keep updating the same placeholder item while it's drafted.
  const file = msg.file || '__new__';
  const item = list.find(i => i['__file'] === file);
  if (item) replaceContents(item, { ...msg.data, __file: file });
  else list.push({ ...msg.data, __file: file });
  // Same ordering rule as the generator: by display order, unordered entries last.
  list.sort((a, b) => ((a['order'] as number) ?? Infinity) - ((b['order'] as number) ?? Infinity));
  return true;
}
