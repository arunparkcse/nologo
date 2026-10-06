# nologo-ng — Angular Build Instructions

## Prerequisites
- Node.js 18+ and npm 9+

## Install & Build

```bash
cd nologo-ng
npm install
npm run build
```

Output goes to `docs/` inside this folder (configured in angular.json) — that's the folder GitHub Pages actually serves, since the git repo root is `nologo-ng/`.  
After build, open `docs/index.html` in a browser or serve via any static host.

> Always use `npm run build` / `npm start`, not `npx ng build` / `npx ng serve` directly — the npm scripts generate the content bundle first, and the app won't compile without it.

## Development Server

```bash
npm start
# Open http://localhost:4200 — edits under src/content/ reload live
```

## Editing Content (local CMS)

The site has a content manager (Decap CMS) for editing everything without touching code. It runs **only on your machine** — it is never part of the deployed site.

1. `npm start`
2. Open **http://localhost:4200/nologo/admin/index.html** and click **Login** (no password — it's local)
3. Edit, add or delete content, then **Publish → Publish now**. The site at http://localhost:4200/nologo/ updates within a second or two.
4. When happy, build and deploy as usual (`npm run build`, then copy/push `docs/`). Changes are plain files under `src/content/` and `src/assets/uploads/` — commit them with git.

What's editable: Projects, Perspectives, Testimonials, Team, every page's copy (Pages), and contact details / footer (Site settings).

Notes:
- "Publish" in the CMS only saves files on your machine — nothing goes live until you build and deploy.
- Uploaded images go to `src/assets/uploads/`. Deleting an entry doesn't delete its image; remove unused images from the CMS **Media** tab.
- Use **Sort by → Display order** in a list to see entries in the order the site shows them.
- A project's **URL slug** is its page address; changing it on an existing project breaks old links.
- The CMS needs internet access the first time it loads (the editor itself is loaded from a CDN).

## Project Structure

```
nologo-ng/
├── src/
│   ├── app/
│   │   ├── app.component.*         # Root shell (preloader, nav, header)
│   │   ├── app.routes.ts           # All routes including :type/:slug detail
│   │   ├── app.config.ts           # Angular app config (standalone)
│   │   ├── data/
│   │   │   ├── content.ts          # Typed access to all site content
│   │   │   ├── projects.data.ts    # Project lookups (getProjectBySlug, getProjectsByType)
│   │   │   └── generated/          # Built from src/content/ — gitignored, never edit
│   │   └── pages/
│   │       ├── home/               # Home — mexdot-style hero, portfolio, services, CTA
│   │       ├── about/              # About — story + image, stats, values, team, pills
│   │       ├── films/              # Films — featured film + grid, each tile → detail page
│   │       ├── photography/        # Photos — full-width featured + masonry grid
│   │       ├── creative/           # Creative — 2-col hero row + 3-col grid
│   │       ├── csr/                # CSR — stats band + intro + portfolio grid
│   │       ├── careers/            # Careers — culture strip + perks + job openings
│   │       ├── contact/            # Contact — offices + form
│   │       └── project-detail/     # Generic detail page (reads :type/:slug from route)
│   ├── admin/                      # Local CMS (dev builds only, never in docs/)
│   ├── content/                    # ALL editable site content (see below)
│   ├── styles.scss                 # Global styles (Mexdot Creative theme)
│   └── index.html                  # App shell
├── scripts/
│   ├── generate-content.mjs        # src/content/ → src/app/data/generated/content.json (+ validate, format)
│   └── dev.mjs                     # npm start: content watcher + CMS backend + ng serve
├── angular.json                    # Build config (outputPath: docs)
└── package.json
```

## Routing

| Route | Component | Notes |
|-------|-----------|-------|
| `/` | HomeComponent | Full mexdot-style home |
| `/about` | AboutComponent | Story + team section |
| `/films` | FilmsComponent | Featured + grid, tiles linked |
| `/photography` | PhotographyComponent | Featured + masonry grid |
| `/creative` | CreativeComponent | Hero row + grid, tiles linked |
| `/csr` | CsrComponent | Stats + services + grid |
| `/careers` | CareersComponent | Culture strip + openings |
| `/contact` | ContactComponent | Offices + contact form |
| `/:type/:slug` | ProjectDetailComponent | Detail page for any project |

## Content (`src/content/`)

All copy, images and lists shown on the site live here as JSON — no content is hardcoded in components.

| Path | What | One file per |
|------|------|--------------|
| `projects/*.json` | Portfolio projects (films, photography, creative, csr) | project |
| `perspectives/*.json` | Perspectives articles | article |
| `testimonials/*.json` | Client testimonials | testimonial |
| `team/*.json` | Team members | person |
| `pages/*.json` | Page copy for home, about, contact, careers, films, photography, creative, csr | page |
| `site.json` | Shared contact details, socials, footer text | — |

- Adding/removing an item = adding/removing a file in its folder.
- Collections are sorted by each file's `order` field; files without one sort last.
- Text fields use `
` for line breaks. In paragraphs, `**text**` renders bold.
- Home "Selected Work" lists project **slugs** in `pages/home.json` — the card uses that project's own thumb and title.
- Files are auto-formatted (sorted keys) on every generate, so `git diff` after a CMS edit shows only real changes.
- `npm run content` regenerates and validates (missing fields, duplicate slugs, unknown Selected Work slugs) without a full build.

Each project has: `slug`, `type` (`films` | `photography` | `creative` | `csr`), `title`, `category`, `client`, `year`, `thumb`, `images[]`, `description`, `tags[]`, and optional `videoId` + `videoType` (`youtube` | `vimeo`).

## Design System

- **Fonts:** Barlow Condensed (display) + Barlow (body) via Google Fonts  
- **Accent:** `#c8102e` red  
- **Background:** `#f8f7f4` off-white  
- **Nav:** Full-screen hamburger overlay  
- **Breakpoints:** 900 / 768 / 640 / 560px
