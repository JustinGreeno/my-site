# justingreeno.dev

Personal portfolio and web development showcase. Hosted on GitHub Pages at [justingreeno.dev](https://justingreeno.dev).

## Structure

```
/
├── index.html              → Redirects to /ghostindex/index.html
├── CNAME                   → justingreeno.dev
│
├── ghostindex/             → Main site (justingreeno.dev)
│   ├── index.html          → Landing
│   ├── about.html
│   ├── work.html           → Portfolio with filter (Client / Concept / Dev)
│   ├── pixel-art.html
│   ├── devlogs.html
│   ├── games.html          → Browser games
│   ├── resume.html
│   ├── contact.html        → Contact form (formsubmit.co)
│   ├── css/ghost.css
│   └── js/ghost.js
│
├── grove/                  → Legacy site, preserved as demo
│   ├── index.html
│   └── ...
│
├── images/                 → Shared assets
├── fonts/                  → Local font files
├── pdf/                    → Resume PDFs
│
└── Sub-sites (design concepts / client previews)
    ├── sheryls/            → Sheryl's Bakery
    ├── sociables/          → Sociables Pub
    └── whatsfordinner/     → What's For Dinner
```

## Ghost Index Design System

`/ghostindex` is a complete redesign of the portfolio — same content, entirely different visual language.

**Principles:**
- Pure black `#000` and white `#fff` only
- No shadows, no border-radius, no material design
- 1px solid rules as all dividers
- Inverted hover states (black bg flips white, white text flips black)
- Typographic hierarchy over decorative elements
- CSS Grid throughout — no flex hacks
- Scroll reveal via IntersectionObserver (no libraries)

**Fonts:** Space Grotesk (headings/body) + DM Mono (labels/tags/nav)

**To upgrade to a proper React build:**
Install Node.js, then:
```bash
cd ghostindex
npm create vite@latest . -- --template react
```
The current vanilla JS is structured to map 1:1 to React components.

## Development

No build step required — pure HTML, CSS, and vanilla JS.

Open any `.html` file with a local server (VS Code Live Server, `python -m http.server`, etc.).

The ghost pages use Google Fonts via CDN — an internet connection is needed for correct font rendering.

## Deployment

Push to `main` branch. GitHub Pages serves from root with the custom domain configured in `CNAME`.

## Client Work

- **Cumberland County Exhibition** — moved to external repo (URL TBD)
- **Nelly's Pugwash** — [nellyspugwash.com](https://nellyspugwash.com) — moved to external repo
