// Single source of truth for the site's public URL.
//
// Deploy target: Cloudflare Pages (free tier), starting on a free
// *.pages.dev subdomain rather than a custom domain. Cloudflare only
// assigns the final <project-name>.pages.dev URL once the Pages project
// is created, so this can't be hardcoded correctly ahead of time.
//
// Set NEXT_PUBLIC_SITE_URL in the Cloudflare Pages project's build
// environment variables (Settings -> Environment variables) once you know
// the assigned URL, e.g. "https://japan-ai-guide.pages.dev", then trigger
// a redeploy. Every canonical URL, the sitemap, robots.txt, and OGP tags
// all read from this one constant, so setting it there is the only change
// needed. See README.md for the full deploy walkthrough.
//
// The fallback below is deliberately obvious/unusable so a forgotten env
// var is easy to spot rather than silently shipping a plausible-looking
// wrong domain.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://SET-NEXT_PUBLIC_SITE_URL-IN-DEPLOY-ENV.example";

// Contact address shown on the About/Privacy/Terms pages for corrections,
// takedown requests, etc. No real inbox was set up for this project yet —
// replace this with a real address you control before publishing. Using a
// fake or unmonitored address here would be worse than omitting it.
export const CONTACT_EMAIL = "REPLACE-WITH-A-REAL-CONTACT-EMAIL@example.com";
