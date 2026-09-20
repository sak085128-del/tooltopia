# ToolTopia — AI Tools Directory

Discover, search, compare and rank the best free AI tools in one place. A production-ready AI tools directory with 110+ real AI tools across 16 categories, built with Next.js (App Router), PostgreSQL (Neon), Drizzle ORM and Auth.js.

## Features

- **110+ real AI tools** across 16 categories (Writing, Image, Video, Audio, Documents, Coding, Marketing, Productivity, Education, Business, Design, Research, 3D, Developer Tools, Social Media, Other)
- **Database-driven** — tools, categories, reviews, favorites, comparisons and submissions live in PostgreSQL; seed script ships all tools
- **Live search with filters** — by query, category, pricing (Free/Freemium/Paid), favorites; sort by popularity, rating, newest, A–Z
- **Tool detail pages** — `/ai-tools/[slug]` with features, tags, pricing, related tools, and user ratings & reviews (moderated)
- **Compare tools** — up to 3 tools side-by-side; curated comparison pages (e.g. ChatGPT vs Claude)
- **Accounts** — Auth.js credentials login with roles (`user` / `editor` / `admin`)
- **Favorites & recently viewed** — persisted per account (favorites) and in localStorage
- **Tool submissions** — visitors can submit tools for admin approval
- **Admin dashboard** — `/admin` for managing tools, categories, submissions and reviews
- **Dark / light theme** toggle (persisted, respects OS preference)
- **SEO** — per-tool metadata, JSON-LD (SoftwareApplication + BreadcrumbList), dynamic sitemap.xml, robots.txt
- **Monetization-ready** — Google AdSense configurable slots; cosmetic Cloudflare Turnstile on the newsletter form
- **PWA** — installable (manifest + network-first service worker)

## Tech Stack

- Next.js 15 (App Router), React 19, TypeScript
- PostgreSQL (Neon serverless) + Drizzle ORM + drizzle-kit migrations
- Auth.js v5 (NextAuth credentials provider, bcrypt password hashing)
- Deployed on Vercel via GitHub integration

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | Yes | Neon PostgreSQL connection string (`postgresql://...`) |
| `AUTH_SECRET` | Yes | NextAuth secret — generate with `npx auth secret` |
| `ADMIN_EMAIL` | No | Email used by the seed script to create the first admin |
| `ADMIN_NAME` | No | Display name for the first admin |
| `ADMIN_PASSWORD` | No | Password for the first admin (only created if provided) |

Copy `.env.example` to `.env.local` and fill in the values. `.env.*` files are gitignored — never commit secrets.

## Local Development

Requires Node.js 18+ and a PostgreSQL database (local or Neon).

```bash
npm install
cp .env.example .env.local   # fill in DATABASE_URL, AUTH_SECRET
npm run db:migrate           # apply drizzle migrations
npm run db:seed              # seed categories, tools, comparisons, admin
npm run dev                  # http://localhost:3000
```

## Database

Schema is defined in `lib/db/schema.ts` (categories, tools, tool_features, tool_tags, users, favorites, reviews, tool_submissions, comparisons).

```bash
npm run db:generate   # generate a migration SQL file from schema changes
npm run db:migrate    # apply pending migrations
npm run db:seed       # idempotent: upserts categories/tools, adds preset comparisons and the first admin
```

## Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build (runs type-checking)
- `npm run start` — run the production build locally
- `npm run typecheck` — `tsc --noEmit`
- `npm run db:generate` / `db:migrate` / `db:seed` — database tooling
- `node scripts/extract-tools.cjs` — re-export the legacy `TOOLS` array from `script.js` into `lib/data/tools.seed.json`

## Deployment (Vercel)

Push to GitHub and the Vercel project auto-deploys. Add the environment variables above in **Vercel → Project → Settings → Environment Variables**, then redeploy.

Production: https://tooltopia.vercel.app

## Project Structure

```
app/                         # Next.js App Router pages + API routes
  api/                       # /api/tools, /api/views, /api/favorites, /api/reviews,
                             # /api/submissions, /api/register, /api/admin/*
  admin/                     # admin dashboard (auth + role protected)
  sitemap.ts                 # dynamic sitemap
  robots.ts                  # robots.txt
components/                  # shared UI components (client + server)
lib/
  db/schema.ts               # Drizzle schema
  db/queries.ts              # read queries (tools, categories, reviews, ...)
  db/admin.ts                # admin queries
  data/tools.seed.json       # seed data for 110+ tools
  data/categories.ts         # categories + legacy name mapping
  auth.config.ts             # NextAuth credentials config
  utils.ts                   # helpers (slugify, formatting, ...)
scripts/
  migrate.ts                 # drizzle migration runner
  seed.ts                    # idempotent seed script
drizzle/                     # generated SQL migrations
public/                      # static assets (icons, images, sw.js, manifest)
middleware.ts                # session middleware, /admin protection
```

## Adding a Tool

Tools are seeded from `lib/data/tools.seed.json` (exported from the legacy `script.js`). New tools added at runtime through the admin dashboard go straight to the database.

## License

All rights reserved. Please ask before reusing the tool data or branding.