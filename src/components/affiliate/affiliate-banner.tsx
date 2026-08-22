import { FEATURE_FLAGS } from "@/lib/feature-flags";
import { getProvidersByCategory, type AffiliateCategory } from "@/lib/data/affiliate-providers";

type Props = {
  category: AffiliateCategory;
  headline: string;
  ctaLabel: string;
};

/**
 * A wide, quiet banner CTA for a single category — matches the
 * accent-soft callout box already used elsewhere (e.g. the Trip Planner
 * upsell block). Renders nothing if affiliate links are disabled or this
 * category has no enabled provider.
 */
export function AffiliateBanner({ category, headline, ctaLabel }: Props) {
  if (!FEATURE_FLAGS.ENABLE_AFFILIATE) return null;
  const [provider] = getProvidersByCategory(category);
  if (!provider) return null;

  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl border border-accent/30 bg-accent-soft p-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="disp text-lg font-semibold">{headline}</p>
      <a
        href={provider.trackingUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        data-affiliate-category={category}
        data-affiliate-provider={provider.id}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-strong"
      >
        {ctaLabel}
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
