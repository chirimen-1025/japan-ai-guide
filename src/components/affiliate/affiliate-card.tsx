import { FEATURE_FLAGS } from "@/lib/feature-flags";
import { getProvidersByCategory, type AffiliateCategory } from "@/lib/data/affiliate-providers";

type Props = {
  category: AffiliateCategory;
  title: string;
  description: string;
  ctaLabel: string;
};

/**
 * A boxed single-provider recommendation, styled to match the site's
 * existing content cards (rounded-2xl / border-border / bg-surface).
 * Renders nothing if affiliate links are disabled or this category has
 * no enabled provider.
 */
export function AffiliateCard({ category, title, description, ctaLabel }: Props) {
  if (!FEATURE_FLAGS.ENABLE_AFFILIATE) return null;
  const [provider] = getProvidersByCategory(category);
  if (!provider) return null;

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-border bg-surface p-5 shadow-sm">
      <p className="disp text-base font-semibold">{title}</p>
      <p className="text-sm text-muted">{description}</p>
      <a
        href={provider.trackingUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        data-affiliate-category={category}
        data-affiliate-provider={provider.id}
        className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
      >
        {ctaLabel}
        <span aria-hidden="true">→</span>
      </a>
      <p className="text-[11px] text-muted">
        Affiliate link — we may earn a commission at no extra cost to you.
      </p>
    </div>
  );
}
