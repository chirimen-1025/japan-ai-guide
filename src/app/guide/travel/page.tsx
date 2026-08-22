import Link from "next/link";
import type { Metadata } from "next";
import { TRAVEL_ARTICLES, listRegions } from "@/lib/data/travel-articles";

export const metadata: Metadata = {
  title: "Japan Travel Guide — By Region",
  description:
    "Practical, region-by-region Japan travel guides: Tokyo, Kyoto, Osaka, Hiroshima, Hokkaido, Fukuoka, Nara, and Mount Fuji.",
  alternates: { canonical: "/guide/travel" },
};

export default function TravelGuideIndexPage() {
  const regions = listRegions();

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <p className="jp text-sm font-semibold text-accent">旅行ガイド</p>
      <h1 className="disp mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Travel Guide</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Region-by-region guides covering food, transportation, attractions, and more — written for
        first-time visitors, not locals.
      </p>

      <div className="mt-10 flex flex-col gap-10">
        {regions.map(({ region, regionLabel }) => {
          const articles = TRAVEL_ARTICLES.filter((a) => a.region === region);
          return (
            <div key={region}>
              <h2 className="disp text-xl font-semibold">{regionLabel}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {articles.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/guide/travel/${a.slug}`}
                    className="flex flex-col rounded-2xl border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                      {a.categoryLabel}
                    </span>
                    <p className="disp mt-1.5 text-base font-semibold leading-snug">{a.title}</p>
                    <p className="mt-2 line-clamp-2 text-sm text-muted">{a.metaDescription}</p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
