import { FEATURE_FLAGS } from "@/lib/feature-flags";
import { getProvidersByCategory, type AffiliateCategory } from "@/lib/data/affiliate-providers";

type Suggestion = {
  category: AffiliateCategory;
  question: string;
  ctaLabel: string;
};

const DEFAULT_SUGGESTIONS: Suggestion[] = [
  { category: "hotel", question: "Where should you stay?", ctaLabel: "Find hotels" },
  { category: "esim", question: "How will you stay connected?", ctaLabel: "Get a Japan eSIM" },
  { category: "activity", question: "Want to book activities?", ctaLabel: "Explore activities" },
];

/**
 * A quiet set of contextual "next step" recommendations, meant to sit
 * under a generated trip plan and read as planning help rather than an
 * ad unit (see spec section 10). Each row disappears on its own when
 * that category has no enabled provider — so an incomplete affiliate
 * roster degrades gracefully instead of showing gaps or placeholders.
 */
export function RecommendedService({ suggestions = DEFAULT_SUGGESTIONS }: { suggestions?: Suggestion[] }) {
  if (!FEATURE_FLAGS.ENABLE_AFFILIATE) return null;
  const rows = suggestions
    .map((s) => ({ ...s, provider: getProvidersByCategory(s.category)[0] }))
    .filter((s): s is Suggestion & { provider: NonNullable<(typeof s)["provider"]> } => Boolean(s.provider));
  if (rows.length === 0) return null;

  return (
    <div className="mt-8 flex flex-col gap-3 border-t border-border pt-8">
      <p className="text-sm font-semibold text-muted">Planning next steps</p>
      {rows.map((row) => (
        <div
          key={row.category}
          className="flex flex-col items-start gap-2 rounded-xl border border-border bg-surface px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="text-sm font-medium">{row.question}</span>
          <a
            href={row.provider.trackingUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            data-affiliate-category={row.category}
            data-affiliate-provider={row.provider.id}
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-accent hover:text-accent-strong"
          >
            {row.ctaLabel} <span aria-hidden="true">→</span>
          </a>
        </div>
      ))}
    </div>
  );
}
