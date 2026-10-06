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
- A project's **URL slug** is its page address; changing it on an existing project breaks old links. The same goes for moving a project to another category (`/films/x` → `/events/x`).
- The CMS needs internet access the first time it loads (the editor itself is loaded from a CDN).

### Adding a new portfolio page

Portfolio pages (Film, Photography, Creative, CSR) are **Categories**. To add one, e.g. "Events":

1. **Categories → New Category page**: set the URL slug (`events` → `/events`), name, page design, hero and call-to-action. Publish.
2. Open each project that belongs there and set **Portfolio page** to the new category.

The page, its top-menu link, footer link and portfolio tab appear automatically. Page designs available: **Featured** (like Film), **Masonry** (like Photography), **Showcase** (like Creative), **Impact** (like CSR).

A category can't be deleted while projects still use it — the build stops and lists them. Move or delete those projects first.

### Building a custom page

For a one-off page (Awards, a campaign, an event), use **Custom Pages → New Custom page**: set the URL slug (`awards` → `/awards`) and title, then **Add section** for each part of the page, in order. Drag sections to reorder.

Sections are copies of the site's existing designs, so every page matches the rest of the site on desktop and mobile:

| Section | Looks like |
|---------|------------|
| Hero | top of any page |
| Text | Careers / CSR intro |
| Image + text | About "Our Story" (image left or right, optional badge and button) |
| Stats bar | About stats |
| Numbered cards | About "Our Values" (dark) or "What We Do" (light) |
| Quote | Home "Our Philosophy" |
| Service cards | Home "What We Do" |
| Projects grid | portfolio grids — pick projects, or show a category |
| Team / Testimonials / Perspectives articles | the Home sections, filled from those collections |
| Clients marquee | Home "Trusted by" |
| Image gallery | Careers image strip |
| Video | YouTube or Vimeo embed |
| Call-to-action band | dark band at the bottom of pages |

Custom pages are hidden from the menu and footer unless **Show in top menu / Show in footer** is ticked. A slug can't match a category or a reserved name. Need a section type that doesn't exist yet? It's a one-time developer job (a new component in `src/app/blocks/` plus its form in `src/admin/config.yml`), then usable on any page.

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
│   │   ├── blocks/                 # Section designs (copied from existing pages) used by custom pages
│   │   └── pages/
│   │       ├── home/               # Home — mexdot-style hero, portfolio, services, CTA
│   │       ├── about/              # About — story + image, stats, values, team, pills
│   │       ├── dynamic-page/       # Serves every /:slug page — a category (layout below) or a custom page
│   │       ├── custom-page/        # Renders a custom page's sections with the blocks
│   │       ├── films/              # Layout 'featured' — featured item + grid
│   │       ├── photography/        # Layout 'masonry' — full-width featured + masonry grid
│   │       ├── creative/           # Layout 'showcase' — 2-col hero row + 3-col grid
│   │       ├── csr/                # Layout 'impact' — stats band + intro + services + grid
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
| `/careers` | CareersComponent | Culture strip + openings |
| `/contact` | ContactComponent | Offices + contact form |
| `/:slug` | DynamicPageComponent | A category (films, photography, creative, csr, …) rendered with its layout, or a custom page rendered from its sections |
| `/perspectives/:slug` | PerspectiveDetailComponent | Perspectives article |
| `/:type/:slug` | ProjectDetailComponent | Detail page for any project (`type` = category slug) |

## Content (`src/content/`)

All copy, images and lists shown on the site live here as JSON — no content is hardcoded in components.

| Path | What | One file per |
|------|------|--------------|
| `categories/*.json` | Portfolio pages (films, photography, creative, csr, …) — each is a page at `/<slug>` | category |
| `custom-pages/*.json` | Pages built from sections — each is a page at `/<slug>` | page |
| `projects/*.json` | Portfolio projects, each assigned to a category | project |
| `perspectives/*.json` | Perspectives articles | article |
| `testimonials/*.json` | Client testimonials | testimonial |
| `team/*.json` | Team members | person |
| `pages/*.json` | Page copy for home, about, contact, careers | page |
| `site.json` | Shared contact details, socials, footer text | — |

- Adding/removing an item = adding/removing a file in its folder.
- Collections are sorted by each file's `order` field; files without one sort last.
- Text fields use `\n` for line breaks. In paragraphs, `**text**` renders bold.
- Home "Selected Work" lists project **slugs** in `pages/home.json` — the card uses that project's own thumb and title.
- Files are auto-formatted (sorted keys) on every generate, so `git diff` after a CMS edit shows only real changes.
- `npm run content` regenerates and validates (missing fields, duplicate slugs, reserved or clashing page slugs, projects in a missing category, unknown section types, Projects sections pointing at missing projects/categories, unknown Selected Work slugs) without a full build.

Each project has: `slug`, `type` (the slug of its category), `title`, `category`, `client`, `year`, `thumb`, `images[]`, `description`, `tags[]`, and optional `videoId` + `videoType` (`youtube` | `vimeo`).

## Design System

- **Fonts:** Barlow Condensed (display) + Barlow (body) via Google Fonts  
- **Accent:** `#c8102e` red  
- **Background:** `#f8f7f4` off-white  
- **Nav:** Full-screen hamburger overlay  
- **Breakpoints:** 900 / 768 / 640 / 560px
