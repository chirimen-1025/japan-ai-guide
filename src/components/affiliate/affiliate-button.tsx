import { FEATURE_FLAGS } from "@/lib/feature-flags";
import { getProvidersByCategory, type AffiliateCategory } from "@/lib/data/affiliate-providers";

type Props = {
  category: AffiliateCategory;
  /** e.g. "Check hotels in Tokyo" */
  label: string;
  className?: string;
};

/**
 * A single inline CTA button linking to the top-priority enabled
 * provider in a category. Renders nothing if affiliate links are
 * disabled globally, or no provider is configured for this category yet
 * — a category with nothing to recommend simply shows no button.
 */
export function AffiliateButton({ category, label, className }: Props) {
  if (!FEATURE_FLAGS.ENABLE_AFFILIATE) return null;
  const [provider] = getProvidersByCategory(category);
  if (!provider) return null;

  return (
    <a
      href={provider.trackingUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      data-affiliate-category={category}
      data-affiliate-provider={provider.id}
      className={
        className ??
        "inline-flex w-fit items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-strong"
      }
    >
      {label}
      <span aria-hidden="true">→</span>
    </a>
  );
}
