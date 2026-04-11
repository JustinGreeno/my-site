# Nelly's Grill & Dairy Bar — Website

A fully static, single-page-capable website for **Nelly's Grill & Dairy Bar** in West Pugwash, Nova Scotia. No server, no build step, no dependencies — just HTML, CSS, and vanilla JS.

---

## Pages

| File | Description |
|------|-------------|
| `index.html` | Homepage — Ken Burns hero, food carousel, hours, contact info |
| `menu.html` | Full menu with live search, tag filters, and food carousel |
| `specials.html` | Weekly specials with prices, auto-highlights today's special |
| `photos.html` | Photo gallery and food carousel |
| `contact.html` | Contact info, hours, embedded Google Map |
| `secret.html` | Hidden page (linked from footer "J") — menu design preview slideshow |
| `sitemap.xml` | SEO sitemap for search engine indexing |

---

## Tech Stack

- **HTML5 / CSS3 / Vanilla JS** — zero frameworks, zero build tools
- **Google Fonts** — Pacifico, Fredoka One, Nunito (loaded via CDN)
- **Schema.org JSON-LD** on homepage for Google rich results (restaurant hours, address, cuisine)
- **Open Graph meta tags** on all pages for clean social sharing previews

---

## File Structure

```
nellys/
├── index.html
├── menu.html
├── specials.html
├── photos.html
├── contact.html
├── secret.html
├── sitemap.xml
├── README.md
├── css/
│   └── nellys.css          # All styles — variables, layout, components, responsive
├── js/
│   └── nellys-search.js    # Live search, tag system, menu data, hamburger toggle
└── images/
    ├── exit.png             # Restaurant exterior photo
    ├── logos/
    │   └── Nelly Logo This One.png
    ├── food/
    │   ├── fish-and-chips-with-fried-pickle.png
    │   ├── chicken-tenders-and-loaded-fries-baskets.png
    │   ├── hawaiian-pizza-pineapple-ham.png
    │   ├── nellys-menu-food-3.png
    │   ├── nellys-menu-food-4.png
    │   ├── nellys-daily-food-1.png
    │   └── nellys-daily-food-2.png
    └── menu options/
        ├── blue ocean.png
        ├── chalk board.png
        ├── classy beach.png
        ├── gold elegance.png
        ├── grainny beef.png
        ├── news paper.png
        ├── retro diner.png
        ├── soft beach.png
        └── sunny days.png
```

---

## Key Features

- **Live menu search** — real-time dropdown on every page, navigates to filtered menu results
- **Tag filter system** — filter by Fish/Seafood, Chicken, Beef, Spicy, Vegetarian, Vegan
- **Today's Special** — auto-detects the day and highlights/scrolls to the current special on the Specials page
- **Open/Closed status** — live footer badge and homepage banner based on current time (Thu–Sun 11AM–7PM)
- **Ken Burns hero** — smooth animated hero on homepage
- **Mobile hamburger menu** — collapses nav on screens ≤ 768px, animated slide-down
- **Menu design showcase** — auto-rotating crossfade slideshow on the secret page, constrained to viewport height

---

## Hours

| Day | Hours |
|-----|-------|
| Thursday | 11:00 AM – 7:00 PM |
| Friday | 11:00 AM – 7:00 PM |
| Saturday | 11:00 AM – 7:00 PM |
| Sunday | 11:00 AM – 7:00 PM |
| Monday – Wednesday | Closed |

---

## Contact

- **Phone:** (902) 243-2129
- **Address:** 8890 RT-6, West Pugwash, NS B0K 1K0
- **Facebook:** [facebook.com/nellysgrillanddairybar](https://www.facebook.com/nellysgrillanddairybar)

---

## Deployment

Drop the entire `nellys/` folder onto any static web host (Netlify, GitHub Pages, cPanel file manager, etc.). No configuration needed.

> **Note:** Update the `<loc>` URLs in `sitemap.xml` to match the live domain before deploying.

---

*Website by Justin Greeno*
