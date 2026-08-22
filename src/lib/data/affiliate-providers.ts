// Data structure for affiliate partners (hotels, eSIM, transport, etc.).
//
// AFFILIATE_PROVIDERS is intentionally empty: no affiliate program has
// actually been signed up for yet, and this project does not disguise
// placeholder links as real ones (see RULE 7 / RULE 51-禁止7 in the
// monetization spec — never fabricate or fake an affiliate link). Add a
// real entry here only once a provider's actual tracking URL exists.
//
// Until then, every component in src/components/affiliate/ checks
// getProvidersByCategory() and simply renders nothing for a category
// with no enabled provider — so no dead or fake link can ever reach a
// visitor, even if ENABLE_AFFILIATE is turned on early by mistake.

export type AffiliateCategory =
  | "hotel"
  | "esim"
  | "wifi"
  | "transport"
  | "activity"
  | "ticket"
  | "restaurant"
  | "tour"
  | "car-rental"
  | "other";

export type AffiliateProvider = {
  id: string;
  name: string;
  category: AffiliateCategory;
  /** Plain marketing/homepage URL — kept for reference, not linked to directly. */
  url: string;
  /** The actual tracking/affiliate link rendered to visitors. */
  trackingUrl: string;
  enabled: boolean;
  /** Lower number = shown first among providers in the same category. */
  priority: number;
};

// Example shape for when a real affiliate account exists — copy this
// into the array below and fill in real values, don't invent one:
//
// {
//   id: "example-hotel-network",
//   name: "Example Hotel Network",
//   category: "hotel",
//   url: "https://example.com",
//   trackingUrl: "https://example.com/?ref=japan-ai-guide",
//   enabled: true,
//   priority: 1,
// },
export const AFFILIATE_PROVIDERS: AffiliateProvider[] = [];

export function getProvidersByCategory(category: AffiliateCategory): AffiliateProvider[] {
  return AFFILIATE_PROVIDERS.filter((p) => p.enabled && p.category === category).sort(
    (a, b) => a.priority - b.priority
  );
}
