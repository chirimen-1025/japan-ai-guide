import { FEATURE_FLAGS } from "@/lib/feature-flags";
import { getProvidersByCategory, type AffiliateCategory } from "@/lib/data/affiliate-providers";

type Props = {
  category: AffiliateCategory;
  title: string;
};

/**
 * Side-by-side listing of every enabled provider in one category —
 * intended for future hub pages (/hotels, /esim, etc.). Renders nothing
 * if affiliate links are disabled or this category has no enabled
 * provider.
 */
export function ComparisonCard({ category, title }: Props) {
  if (!FEATURE_FLAGS.ENABLE_AFFILIATE) return null;
  const providers = getProvidersByCategory(category);
  if (providers.length === 0) return null;

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
      <p className="disp text-base font-semibold">{title}</p>
      <div className="mt-3 flex flex-col divide-y divide-border">
        {providers.map((p) => (
          <div key={p.id} className="flex items-center justify-between gap-4 py-3">
            <span className="text-sm font-medium">{p.name}</span>
            <a
              href={p.trackingUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              data-affiliate-category={category}
              data-affiliate-provider={p.id}
              className="inline-flex shrink-0 items-center gap-1 rounded-full border border-accent px-3.5 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
            >
              View <span aria-hidden="true">→</span>
            </a>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-muted">
        Affiliate links — we may earn a commission at no extra cost to you.
      </p>
    </div>
  );
}
