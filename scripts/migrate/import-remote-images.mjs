// One-off: copies images hosted on nologo.in into the project, resized/compressed, and repoints
// the content at the local copies. Safe to re-run (skips files that already exist).
// Run from nologo-ng/: node scripts/migrate/import-remote-images.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const REMOTE = /https:\/\/(?:www\.)?nologo\.in\/[^"'\s)]+/g;
const UPLOADS = 'src/assets/uploads';
const BRAND = 'src/assets/brand';
const MAX = 2000; // px, longest side; smaller images are never enlarged

// Site chrome that must not be deletable from the CMS Media library.
const TEMPLATES = ['src/app/shared/header/header.component.html', 'src/app/shared/footer/footer.component.html'];

const walk = dir => fs.readdirSync(dir, { withFileTypes: true })
  .flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : e.name.endsWith('.json') ? [path.join(dir, e.name)] : []);
const contentFiles = walk('src/content');

// assets/images/work/photography/1/image1.jpg -> work-photography-1-image1.jpg (paths keep names unique)
const localName = url => new URL(url).pathname.replace(/^\/(assets\/images\/)?/, '').replace(/\//g, '-').toLowerCase();

async function download(url, tries = 4) {
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(url.replace('://www.', '://'), { signal: AbortSignal.timeout(60000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return Buffer.from(await res.arrayBuffer());
    } catch (err) {
      if (i >= tries) throw err;
      await new Promise(r => setTimeout(r, 1500 * i));
    }
  }
}

async function optimise(input) {
  const img = sharp(input).rotate(); // apply EXIF orientation before metadata is stripped
  const { format } = await img.metadata();
  const resized = img.resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true });
  const out = format === 'png'
    ? await resized.png({ compressionLevel: 9 }).toBuffer()
    : await resized.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
  return out.length < input.length ? out : input; // never make a file bigger
}

async function importUrl(url, dir) {
  const name = localName(url);
  const file = path.join(dir, name);
  if (fs.existsSync(file)) return { name, skipped: true, before: 0, after: fs.statSync(file).size };
  const input = await download(url);
  const output = await optimise(input);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, output);
  return { name, before: input.length, after: output.length };
}

// Collect URLs
const contentUrls = new Set(contentFiles.flatMap(f => fs.readFileSync(f, 'utf8').match(REMOTE) ?? []));
const templateUrls = new Set(TEMPLATES.flatMap(f => fs.readFileSync(f, 'utf8').match(REMOTE) ?? []));
console.log(`${contentUrls.size} content images, ${templateUrls.size} template images`);

// Download + optimise, a few at a time (the server struggles with more)
const results = new Map();
const failures = [];
const jobs = [...[...contentUrls].map(u => [u, UPLOADS]), ...[...templateUrls].map(u => [u, BRAND])];
let done = 0;
async function worker() {
  while (jobs.length) {
    const [url, dir] = jobs.shift();
    try { results.set(url, { dir, ...(await importUrl(url, dir)) }); }
    catch (err) { failures.push(`${url}: ${err.message}`); }
    if (++done % 20 === 0) console.log(`  ${done} done`);
  }
}
await Promise.all([worker(), worker(), worker()]);

if (failures.length) {
  console.error(`\n${failures.length} failed — nothing repointed. Re-run to retry:\n${failures.join('\n')}`);
  process.exit(1);
}

// Repoint content and templates at the local copies
const localPath = url => `assets/${path.basename(results.get(url).dir)}/${results.get(url).name}`;
for (const f of [...contentFiles, ...TEMPLATES]) {
  const src = fs.readFileSync(f, 'utf8');
  const out = src.replace(REMOTE, url => localPath(url));
  if (out !== src) fs.writeFileSync(f, out);
}

const fresh = [...results.values()].filter(r => !r.skipped);
const mb = n => (n / 1048576).toFixed(1);
console.log(`\nimported ${fresh.length} (${results.size - fresh.length} already present)`);
console.log(`size: ${mb(fresh.reduce((s, r) => s + r.before, 0))} MB downloaded -> ${mb(fresh.reduce((s, r) => s + r.after, 0))} MB stored`);
