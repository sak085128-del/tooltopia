# ToolTopia — AI Tools Directory

Discover, search, compare and rank the best free AI tools in one place. A single-page directory with 100+ real AI tools across 10 categories, built with vanilla HTML/CSS/JS and deployable to any static host.

## Features

- **110+ real AI tools** across 10 categories (Writing, Image, Video, Audio, Documents, Coding, Marketing, Education, Productivity, Business)
- **Live search** with autocomplete suggestions and popular search chips
- **Rankings** — tools are ranked by popularity with #1–#3 badges
- **Compare tools** — pick up to 3 tools and compare side-by-side in a modal
- **Favorites & Recently Viewed** — persisted in localStorage, with a filter chip in the directory
- **Filters & sorting** — by category, pricing (Free/Freemium/Paid), favorites; sort by popularity, rating, newest, A–Z
- **Dark / light theme** toggle (persisted, respects OS preference)
- **PWA** — installable (manifest + network-first service worker)
- **Share** — copy link, X, WhatsApp, Telegram, LinkedIn from the tool modal
- **Related tools**, dynamic hero stats, cookie consent, back-to-top, online/offline toasts
- **SEO** — Open Graph, Twitter cards, JSON-LD, sitemap.xml, robots.txt
- **Monetization-ready** — ad slots wired for display/push ad networks

## Tech Stack

- Vanilla HTML5 + CSS3 (custom properties, dark/light theming, responsive)
- Vanilla JavaScript (no build step, no dependencies)
- Deployed on Vercel via GitHub integration

## Local Development

```bash
# No build step needed — serve the folder
npx --yes serve .
```

Then open the port shown by serve.

## Deployment

### Vercel (primary)

Push to GitHub (or `vercel --prod` from this folder) — `vercel.json` is already configured with clean URLs plus cache & security headers. Every push auto-deploys.

Production: https://tooltopia.vercel.app

## Project Structure

```
├── index.html              # Single page layout
├── style.css               # Design tokens, dark/light themes, components
├── script.js               # Data (TOOLS) + all UI logic
├── vercel.json             # Vercel headers / clean URLs
├── sw.js                   # Network-first service worker
├── manifest.webmanifest    # PWA manifest
├── robots.txt
├── sitemap.xml
└── assets/
    ├── icons/
    └── images/
```

## Adding a Tool

All tools live in the `TOOLS` array at the top of `script.js`. Each entry uses this shape:

```js
{
  id: 'chatgpt',
  name: 'ChatGPT',
  slug: 'chatgpt',
  icon: '🦾',            // emoji fallback shown as a colored tile
  category: 'Writing',   // one of the 10 categories
  desc: '...',           // 1-2 sentence description
  features: ['...', '...'],
  website: 'openai.com',
  url: 'https://openai.com/chatgpt',
  price: 'Freemium',     // Free | Freemium | Paid
  rating: 4.8,
  ratings: 15000,
  isNew: false,
  added: '2026-09-01',   // YYYY-MM-DD
  pop: 97,               // popularity 0-100, drives rankings
  tags: ['chat', 'writing', 'assistant'],
  logo: 'https://www.google.com/s2/favicons?sz=128&domain=openai.com' // google s2 favicon
}
```

## License

All rights reserved. Please ask before reusing the tool data or branding.