# Monetization architecture plan

This documents the planned path from the current site (fully static, zero
server, zero database) to the backend features the monetization spec
calls for (admin dashboard with auth, Premium purchases, AI-backed
tools, email automation, click/conversion tracking). It is a plan, not
an implementation — nothing described below has been built yet.

## Current state

- Next.js `output: "export"` — every route is pre-rendered to static
  HTML/CSS/JS at build time. There is no server at runtime.
- No database. All content (283+ articles, tool logic) lives in
  TypeScript data files in `src/lib/data/` and is baked into the static
  output at build time.
- No auth, no API routes, no external API calls of any kind. The four
  visitor tools (Trip Planner, Budget Calculator, Phrase Generator,
  Restaurant Helper) run entirely client-side against local data.
- Hosted on Cloudflare Pages (free tier), deployed by pushing to the
  `main` branch on GitHub.

This is a deliberate design choice (see README.md), not an oversight —
it's what makes the site free to run at any traffic level. The
monetization spec's Phase 1+ features (admin CMS, Premium purchases,
lead capture, AI writer/assistant, affiliate click analytics) all
require some form of persistent server-side state that a purely static
site cannot provide, so they need a real architectural addition, not
just new pages.

## Chosen direction: Cloudflare Pages Functions + D1

Cloudflare Pages supports adding serverless functions (a `functions/`
directory, or `src/app/**/route.ts` with the Edge runtime) alongside a
statically-exported site, plus **D1** (Cloudflare's managed SQLite) and
**KV**/**R2** for storage — all with meaningful free-tier limits. This
lets the site keep its current static pages and zero-cost baseline while
adding real backend capability incrementally, which is why it was chosen
over moving off Cloudflare Pages entirely or staying purely static.

Concretely, this means:

- `output: "export"` stays for the content/tool pages that don't need a
  server (all 283+ articles, the 4 existing tools stay static).
- New server-backed routes (admin dashboard, Premium checkout, click
  tracking, AI proxy endpoints) are added as Pages Functions, which is a
  different deploy mode from static export — this is the biggest single
  change and needs to be planned and tested on its own before any
  feature that depends on it is built.
- D1 holds the tables below; KV or R2 only if a feature needs
  key-value/object storage specifically (e.g. generated PDFs).

## Planned D1 schema (draft — not yet created)

These are the tables named in the monetization spec (section 46), sketched
at a high level. Exact columns will be refined per-feature, not created
all at once.

| Table | Purpose |
|---|---|
| `users` | Admin accounts (content editors), not visitor accounts |
| `leads` | Email capture (free PDF checklist, etc.) |
| `trips` | Saved/Premium trip plans |
| `articles` | Only if content management moves off the static TS files — not needed for STEP 1 |
| `keywords` | SEO keyword database (status: idea/researching/draft/review/published/update-needed) |
| `affiliate_providers` | Same shape as `src/lib/data/affiliate-providers.ts` today, moved server-side once providers need to be edited without a code deploy |
| `affiliate_clicks` | provider, category, page, position, country, device, timestamp — no personally identifying data |
| `products` | Digital products (PDF guides) |
| `orders` | Purchases (Premium plan, digital products) |
| `analytics_events` | lead_created, trip_created, premium_started, pdf_downloaded, affiliate_clicked |
| `ai_usage` | model, tokens, request, feature, timestamp, estimated cost — for the AI cost dashboard |
| `content_updates` | Tracks `needsVerification` / update-cycle state per article |

## Rollout order (why STEP 1 doesn't touch any of this yet)

1. **STEP 1 (done this session)** — client-side-only foundation:
   `feature-flags.ts`, `affiliate-providers.ts` (empty), and the
   Affiliate CTA components. No D1, no Functions, no real provider data.
   Everything stays inert until a flag is turned on *and* real data
   exists.
2. **Before any STEP that needs a backend** — provision D1 and a Pages
   Functions route as an isolated, minimal test (e.g. a single
   `affiliate_clicks` insert endpoint), verify it deploys and works
   without breaking the static pages, *then* build features on top of it.
3. **Admin dashboard + auth** comes with or after the first real D1
   table, since an admin UI with no auth in front of it is not safe to
   ship.
4. **Payments (Premium, digital products)** — requires the user to set
   up a real payment processor account first (RULE 6: no feature ships
   live without its real API key; Claude does not create financial
   accounts or process real transactions on the user's behalf).
5. **AI-backed features** (AI Writer, AI Fact Check, AI Assistant,
   Premium itinerary enrichment) — requires a real LLM API key from the
   user first, plus the rate-limiting and cost-tracking (`ai_usage`)
   called for in the spec, built before the feature goes live rather
   than after.

Each of these is a separate confirmation point with the user, not a
default to proceed through automatically — see the spec's own STEP-by-
STEP + regression-test discipline (sections 52–55).
