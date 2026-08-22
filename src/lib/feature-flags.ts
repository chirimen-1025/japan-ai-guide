// Central on/off switches for features that depend on external accounts,
// API keys, or paid services this project doesn't have yet.
//
// Rule: a feature gated behind a flag here must stay fully inert while
// its flag is off — no partial behavior, no fabricated data, no dead
// links reaching a visitor. Flip a flag to "true" only after the real
// account/key it depends on actually exists and the feature has been
// verified in a build (see .env.example for the corresponding secrets).
//
// This is a static-export site (see next.config.ts) with no server at
// runtime, so every flag is read from a NEXT_PUBLIC_ env var and baked
// in at build time — the same pattern already used for
// NEXT_PUBLIC_SITE_URL in site-config.ts.

function flag(name: string): boolean {
  return process.env[name] === "true";
}

export const FEATURE_FLAGS = {
  /** Affiliate links/CTAs (hotels, eSIM, activities, transport, etc.). */
  ENABLE_AFFILIATE: flag("NEXT_PUBLIC_ENABLE_AFFILIATE"),
  /** Paid tier of the AI Trip Planner. */
  ENABLE_PREMIUM: flag("NEXT_PUBLIC_ENABLE_PREMIUM"),
  /** AI-assisted article drafting in an (as yet unbuilt) admin tool. */
  ENABLE_AI_WRITER: flag("NEXT_PUBLIC_ENABLE_AI_WRITER"),
  /** On-site "Ask Japan AI" assistant. */
  ENABLE_AI_ASSISTANT: flag("NEXT_PUBLIC_ENABLE_AI_ASSISTANT"),
  /** Email capture / lead automation. */
  ENABLE_EMAIL: flag("NEXT_PUBLIC_ENABLE_EMAIL"),
  /** Display ad units (e.g. AdSense). */
  ENABLE_ADS: flag("NEXT_PUBLIC_ENABLE_ADS"),
  /** Scheduled content re-verification / auto-update pipeline. */
  ENABLE_AUTO_UPDATE: flag("NEXT_PUBLIC_ENABLE_AUTO_UPDATE"),
  /** Revenue/conversion analytics beyond Cloudflare Web Analytics. */
  ENABLE_ANALYTICS: flag("NEXT_PUBLIC_ENABLE_ANALYTICS"),
} as const;

export type FeatureFlagName = keyof typeof FEATURE_FLAGS;
