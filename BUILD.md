# nologo-ng — Angular Build Instructions

## Prerequisites
- Node.js 18+ and npm 9+

## Install & Build

```bash
cd nologo-ng
npm install
npx ng build --configuration production
```

Output goes to `../docs/` (configured in angular.json).  
After build, open `docs/index.html` in a browser or serve via any static host.

## Development Server

```bash
npx ng serve
# Open http://localhost:4200
```

## Project Structure

```
nologo-ng/
├── src/
│   ├── app/
│   │   ├── app.component.*         # Root shell (preloader, nav, header)
│   │   ├── app.routes.ts           # All routes including :type/:slug detail
│   │   ├── app.config.ts           # Angular app config (standalone)
│   │   ├── data/
│   │   │   └── projects.data.ts    # Central JSON data for all projects
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
│   ├── styles.scss                 # Global styles (Mexdot Creative theme)
│   └── index.html                  # App shell
├── angular.json                    # Build config (outputPath: ../docs)
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

## Project Data (`projects.data.ts`)

All project data lives in one file. Each project has:
- `slug` — URL-safe identifier
- `type` — `films` | `photography` | `creative` | `csr`
- `title`, `category`, `client`, `year`
- `thumb` — thumbnail image URL
- `images[]` — gallery images
- `description` — project description
- `tags[]` — categories/labels
- `videoId` + `videoType` — optional YouTube or Vimeo embed

Images use real nologo.in CDN paths + YouTube thumbnails for films.

## Design System

- **Fonts:** Barlow Condensed (display) + Barlow (body) via Google Fonts  
- **Accent:** `#c8102e` red  
- **Background:** `#f8f7f4` off-white  
- **Nav:** Full-screen hamburger overlay  
- **Breakpoints:** 900 / 768 / 640 / 560px
