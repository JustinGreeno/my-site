# justingreeno.dev

Personal portfolio and web development showcase. Hosted on GitHub Pages at [justingreeno.dev](https://justingreeno.dev).

## Structure

```
/
├── index.html              → Main site landing (justingreeno.dev)
├── about.html
├── work.html               → Portfolio with filter (Client / Concept / Dev)
├── pixel-art.html
├── devlogs.html
├── games.html              → Browser games
├── resume.html
├── contact.html            → Contact form (formsubmit.co)
├── CNAME                   → justingreeno.dev
│
├── css/
│   ├── ghost.css           → Ghost design system (current site)
│   └── my_style.css        → Legacy styles (used by grove/)
├── js/ghost.js             → Ghost site scripts
├── javascript/             → Legacy scripts (used by grove/)
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

## Ghost Design System

The current site is a complete redesign of the portfolio. The earlier site is preserved at `/grove/`.

**Principles:**
- Pure black and white only
- No shadows, no border-radius, no material design
- 1px solid rules as all dividers
- Inverted hover states (black bg flips white, white text flips black)
- Typographic hierarchy over decorative elements
- CSS Grid throughout
- Scroll reveal via IntersectionObserver (no libraries)

**Fonts:** Space Grotesk (headings/body) + DM Mono (labels/tags/nav)

## Development

No build step required — pure HTML, CSS, and vanilla JS.

Open any `.html` file with a local server (VS Code Live Server, `python -m http.server`, etc.).

The ghost pages use Google Fonts via CDN — an internet connection is needed for correct font rendering.

## Deployment

Push to `main` branch. GitHub Pages serves from root with the custom domain configured in `CNAME`.

## Client Work

- **Cumberland County Exhibition** — moved to external repo (URL TBD)
- **Nelly's Pugwash** — [nellyspugwash.com](https://nellyspugwash.com) — moved to external repo
