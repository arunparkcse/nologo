// One-time migration: moves hardcoded content out of TS/HTML into src/content/**.
// Kept for reference; not part of the build. Run from nologo-ng/: node scripts/migrate/migrate-to-content.mjs
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, 'src/content');

async function importTs(rel) {
  const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  const out = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 }
  }).outputText;
  const tmp = path.join(os.tmpdir(), `nologo-migrate-${path.basename(rel, '.ts')}-${Date.now()}.mjs`);
  fs.writeFileSync(tmp, out);
  try {
    return await import(pathToFileURL(tmp).href);
  } finally {
    fs.unlinkSync(tmp);
  }
}

function write(rel, data) {
  const file = path.join(CONTENT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
}

const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// ── Projects ──
const { PROJECTS } = await importTs('src/app/data/projects.data.ts');
PROJECTS.forEach((p, i) => write(`projects/${p.slug}.json`, { order: i + 1, ...p }));

// ── Perspectives ──
const { PERSPECTIVES } = await importTs('src/app/data/perspectives.data.ts');
PERSPECTIVES.forEach((p, i) => write(`perspectives/${p.slug}.json`, { order: i + 1, ...p }));

// ── Testimonials ──
const testimonials = [
  {
    quote: 'Nologo has been a trusted creative partner across multiple film production projects. Their team consistently delivers high-quality visual storytelling that is closely aligned with project objectives and briefs. Beyond strong execution, Nologo brings valuable creative insight and strategic direction to every engagement, while remaining highly collaborative and responsive to feedback. We have appreciated their professionalism, flexibility, and commitment to producing impactful content.',
    author: 'Sudeshna Mukherjee',
    role: 'Head of Communications',
    company: 'UN Women India Country Office'
  }
];
testimonials.forEach((t, i) => write(`testimonials/${slugify(t.author)}.json`, { order: i + 1, ...t }));

// ── Team ──
const team = [
  { img: 'assets/team/goutham.jpg',   name: 'Goutham Jho',    role: 'Creative Director', dept: 'Film & Photography' },
  { img: 'assets/team/sanjay.jpg',    name: 'Sanjay S',       role: 'Brand Strategy',    dept: 'Creative & Design' },
  { img: 'assets/team/natisha.jpg',   name: 'Natisha Xavier', role: 'CSR Lead',          dept: 'Social Impact' },
  { img: 'assets/team/acchuthan.jpg', name: 'Acchuthan KR',   role: 'Production',        dept: 'Film & Video' }
];
team.forEach((m, i) => write(`team/${slugify(m.name)}.json`, { order: i + 1, ...m }));

console.log(`Migrated ${PROJECTS.length} projects, ${PERSPECTIVES.length} perspectives, ${testimonials.length} testimonials, ${team.length} team members.`);
