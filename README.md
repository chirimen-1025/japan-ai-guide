# Japan AI Guide

Free browser-based tools (trip planner, budget calculator, phrase generator,
restaurant helper) plus travel and culture guides for first-time visitors to
Japan. Statically exported with Next.js — no server, no database, and no
running costs beyond free hosting-tier limits.

## Tech

- Next.js 16 (`output: "export"` — every route is pre-rendered to plain
  HTML/CSS/JS at build time; nothing runs server-side)
- Tailwind CSS 4
- Zero external APIs, zero paid services. All 283+ travel/culture articles
  and all four tools live entirely in this repo and run in the visitor's
  browser.

## Local development

```bash
npm install
npm run dev       # http://localhost:3000
```

## Building

```bash
npm run build      # outputs static files to ./out
npm run lint        # eslint
npx tsc --noEmit    # typecheck
```

To preview the static build locally the way a real host would serve it
(important: do NOT use `serve -s`, which enables SPA-rewrite mode and
breaks routing for this kind of static export):

```bash
npx serve -l 3100 ./out
```

## Deploying to Cloudflare Pages (free tier)

1. Push this repo to GitHub (or GitLab).
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect
   to Git**, and select this repository.
3. Build settings:
   - Framework preset: **Next.js (Static HTML Export)**
   - Build command: `npm run build`
   - Build output directory: `out`
4. Deploy. Cloudflare assigns a free URL like
   `https://<project-name>.pages.dev`.
5. **Set the site's real URL.** Go to the Pages project's
   **Settings → Environment variables** and add:
   - `NEXT_PUBLIC_SITE_URL` = `https://<project-name>.pages.dev` (the exact
     URL Cloudflare assigned in step 4)
6. Trigger a redeploy (Settings → Deployments → Retry deployment, or push
   any commit) so the sitemap, robots.txt, canonical URLs, and Open Graph
   tags pick up the real domain instead of the placeholder.

This project reads `NEXT_PUBLIC_SITE_URL` from a single place —
`src/lib/site-config.ts` — so that one environment variable is the only
thing that needs setting after deploy. Everything else (sitemap.xml,
robots.txt, canonical links, OGP/Twitter card image URLs) derives from it
automatically.

If you later attach a custom domain in Cloudflare Pages, update
`NEXT_PUBLIC_SITE_URL` to the custom domain and redeploy again.

### Before going fully public

- [ ] Set `NEXT_PUBLIC_SITE_URL` (see above) — without it, canonical URLs
      and OGP tags point at an obviously-fake placeholder domain.
- [ ] Replace the placeholder contact address in `src/lib/site-config.ts`
      (`CONTACT_EMAIL`) with a real, monitored inbox. It's referenced on the
      About, Privacy, and Terms pages.
- [ ] Submit `https://<your-domain>/sitemap.xml` to Google Search Console
      and Bing Webmaster Tools once the real domain is live.

## Content

- `src/lib/data/travel-articles.ts` — all region/prefecture travel and
  food-culture articles (283 as of 2026-08-22). Every article has been
  through at least one independent fact-checking pass; see the `about`
  page for how that process works.
- `src/lib/data/culture.ts` — general culture/etiquette guides.
- Articles that mention time-sensitive details (prices, hours, seasonal
  closures) flag it explicitly rather than stating a number that could go
  stale; see `needsVerification` on the `TravelArticle` type.

## Guardrails this project follows

- No paid APIs, no paid hosting, no server costs — everything ships on
  free tiers.
- No fabricated facts; volatile details are hedged ("verify locally")
  rather than guessed.
- Food-culture articles never name or imply a review of specific
  restaurants/shops — they cover dishes, ingredients, and food culture
  generically.
- No ads, affiliate links, analytics, or paid service integrations have
  been added without the project owner's explicit go-ahead.
