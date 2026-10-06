// Compiles src/content/** into src/app/data/generated/content.json, which the app imports.
// Runs automatically before `npm start` / `npm run build`. Pass --watch to regenerate on change.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, 'src/content');
const OUT_FILE = path.join(ROOT, 'src/app/data/generated/content.json');

const COLLECTIONS = ['projects', 'perspectives', 'testimonials', 'team'];

class ContentError extends Error {}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    throw new ContentError(`${path.relative(ROOT, file)}: ${err.message}`);
  }
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
  const seen = new Set();
  for (const p of content.projects) {
    if (!p.slug || !p.type || !p.title) errors.push(`project missing slug/type/title: ${JSON.stringify(p).slice(0, 80)}`);
    const key = `${p.type}/${p.slug}`;
    if (seen.has(key)) errors.push(`duplicate project ${key}`);
    seen.add(key);
  }
  const slugs = new Set(content.projects.map(p => p.slug));
  for (const slug of content.pages.home?.selectedWork?.projects ?? []) {
    if (!slugs.has(slug)) errors.push(`home.selectedWork references unknown project "${slug}"`);
  }
  if (errors.length) throw new ContentError(errors.join('\n'));
}

function generate() {
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
  console.log(`[content] ${content.projects.length} projects, ${content.perspectives.length} perspectives, ` +
    `${content.testimonials.length} testimonials, ${content.team.length} team, ${Object.keys(content.pages).length} pages`);
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
