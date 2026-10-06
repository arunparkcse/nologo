// Compiles src/content/** into src/app/data/generated/content.json, which the app imports.
// Runs automatically before `npm start` / `npm run build`. Pass --watch to regenerate on change.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, 'src/content');
const OUT_FILE = path.join(ROOT, 'src/app/data/generated/content.json');

const COLLECTIONS = ['categories', 'projects', 'perspectives', 'testimonials', 'team'];

// Category slugs become top-level URLs, so they can't reuse an existing route or folder.
const RESERVED_SLUGS = new Set(['about', 'careers', 'contact', 'perspectives', 'admin', 'assets']);
const LAYOUTS = new Set(['featured', 'masonry', 'showcase', 'impact']);

class ContentError extends Error {}

const sortKeys = v =>
  Array.isArray(v) ? v.map(sortKeys)
  : v && typeof v === 'object' ? Object.fromEntries(Object.keys(v).sort().map(k => [k, sortKeys(v[k])]))
  : v;

let formatted = 0;

// Reads a content file and rewrites it in canonical form (sorted keys, 2-space indent).
// The CMS saves keys in an unpredictable order; canonicalizing keeps git diffs down to real changes.
function readJson(file) {
  let data;
  const raw = fs.readFileSync(file, 'utf8');
  try {
    data = JSON.parse(raw);
  } catch (err) {
    throw new ContentError(`${path.relative(ROOT, file)}: ${err.message}`);
  }
  const canonical = JSON.stringify(sortKeys(data), null, 2) + '\n';
  if (raw.replace(/\r\n/g, '\n') !== canonical) {
    fs.writeFileSync(file, canonical);
    formatted++;
  }
  return data;
}

function readCollection(name) {
  const dir = path.join(CONTENT_DIR, name);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => readJson(path.join(dir, f)))
    // Entries without an explicit order (e.g. newly added in the CMS) go last.
    .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));
}

function readPages() {
  const dir = path.join(CONTENT_DIR, 'pages');
  return Object.fromEntries(
    fs.readdirSync(dir)
      .filter(f => f.endsWith('.json'))
      .map(f => [path.basename(f, '.json'), readJson(path.join(dir, f))])
  );
}

function validate(content) {
  const errors = [];
  const categorySlugs = new Set();
  for (const c of content.categories) {
    if (!c.slug || !c.name || !c.hero || !c.cta) errors.push(`category missing slug/name/hero/cta: ${c.slug ?? JSON.stringify(c).slice(0, 60)}`);
    if (categorySlugs.has(c.slug)) errors.push(`duplicate category slug "${c.slug}"`);
    if (RESERVED_SLUGS.has(c.slug)) errors.push(`category slug "${c.slug}" is reserved (it would clash with an existing page)`);
    if (!LAYOUTS.has(c.layout)) errors.push(`category "${c.slug}" has unknown layout "${c.layout}" (use one of: ${[...LAYOUTS].join(', ')})`);
    categorySlugs.add(c.slug);
  }
  const seen = new Set();
  for (const p of content.projects) {
    if (!p.slug || !p.type || !p.title) errors.push(`project missing slug/type/title: ${JSON.stringify(p).slice(0, 80)}`);
    const key = `${p.type}/${p.slug}`;
    if (seen.has(key)) errors.push(`duplicate project ${key}`);
    if (p.type && !categorySlugs.has(p.type)) errors.push(`project "${p.slug}" is in unknown category "${p.type}"`);
    seen.add(key);
  }
  const slugs = new Set(content.projects.map(p => p.slug));
  for (const slug of content.pages.home?.selectedWork?.projects ?? []) {
    if (!slugs.has(slug)) errors.push(`home.selectedWork references unknown project "${slug}"`);
  }
  if (errors.length) throw new ContentError(errors.join('\n'));
}

function generate() {
  formatted = 0;
  const content = {
    site: readJson(path.join(CONTENT_DIR, 'site.json')),
    pages: readPages(),
    ...Object.fromEntries(COLLECTIONS.map(c => [c, readCollection(c)]))
  };
  validate(content);
  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  const json = JSON.stringify(content, null, 2) + '\n';
  // Skip identical writes so `ng serve` doesn't rebuild for nothing.
  if (!fs.existsSync(OUT_FILE) || fs.readFileSync(OUT_FILE, 'utf8') !== json) {
    fs.writeFileSync(OUT_FILE, json);
  }
  console.log(`[content] ${content.categories.length} categories, ${content.projects.length} projects, ${content.perspectives.length} perspectives, ` +
    `${content.testimonials.length} testimonials, ${content.team.length} team, ${Object.keys(content.pages).length} pages` +
    (formatted ? ` (formatted ${formatted} file${formatted === 1 ? '' : 's'})` : ''));
}

function run() {
  try {
    generate();
    return true;
  } catch (err) {
    if (!(err instanceof ContentError)) throw err;
    console.error(`[content] ERROR\n${err.message}`);
    return false;
  }
}

if (process.argv.includes('--watch')) {
  run();
  let timer;
  fs.watch(CONTENT_DIR, { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(run, 150);
  });
  console.log('[content] watching src/content for changes…');
} else if (!run()) {
  process.exit(1);
}
