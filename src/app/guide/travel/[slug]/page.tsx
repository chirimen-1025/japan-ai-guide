import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TRAVEL_ARTICLES, getTravelArticle } from "@/lib/data/travel-articles";
import { getCultureArticle } from "@/lib/data/culture";
import { getRegionImage } from "@/lib/data/region-images";
import { SITE_URL } from "@/lib/site-config";

export function generateStaticParams() {
  return TRAVEL_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getTravelArticle(slug);
  if (!article) return {};
  const regionImage = getRegionImage(article.region);
  return {
    title: article.title,
    description: article.metaDescription,
    alternates: { canonical: `/guide/travel/${slug}` },
    ...(regionImage && {
      openGraph: {
        images: [
          {
            url: regionImage.src,
            width: regionImage.width,
            height: regionImage.height,
            alt: regionImage.alt,
          },
        ],
      },
      twitter: { images: [regionImage.src] },
    }),
  };
}

export default async function TravelArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getTravelArticle(slug);
  if (!article) notFound();

  const relatedArticles = article.relatedSlugs
    .map((s) => getTravelArticle(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const relatedCulture = article.relatedCultureSlugs
    .map((s) => getCultureArticle(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const regionImage = getRegionImage(article.region);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    // The site doesn't track a separate original-publish date from its
    // last-edited date, so datePublished intentionally mirrors
    // dateModified here rather than inventing an earlier date.
    datePublished: article.updatedAt,
    dateModified: article.updatedAt,
    author: { "@type": "Organization", name: "Japan AI Guide", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Japan AI Guide", url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/travel/${slug}` },
    ...(regionImage && { image: `${SITE_URL}${regionImage.src}` }),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Travel Guide", item: "/guide/travel" },
      { "@type": "ListItem", position: 2, name: article.regionLabel, item: "/guide/travel" },
      { "@type": "ListItem", position: 3, name: article.title, item: `/guide/travel/${slug}` },
    ],
  };

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <nav className="mb-6 text-sm text-muted">
        <Link href="/guide/travel" className="hover:text-ink">Travel Guide</Link> /{" "}
        <span className="text-ink">{article.title}</span>
      </nav>

      {regionImage && (
        <div className="mb-6">
          <img
            src={regionImage.src}
            alt={regionImage.alt}
            width={regionImage.width}
            height={regionImage.height}
            loading="eager"
            decoding="async"
            className="aspect-[16/9] w-full rounded-2xl object-cover"
          />
          {regionImage.credit && (
            <p className="mt-1.5 text-right text-[11px] text-muted">
              Photo:{" "}
              <a
                href={regionImage.credit.sourceUrl}
                className="hover:text-ink"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                {regionImage.credit.author}
              </a>{" "}
              / {regionImage.credit.license}
            </p>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-[11px] font-semibold text-brand-strong">
          {article.regionLabel}
        </span>
        <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-semibold text-muted">
          {article.categoryLabel}
        </span>
      </div>

      <h1 className="disp mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{article.title}</h1>
      <p className="mt-3 text-muted">{article.metaDescription}</p>
      <p className="mt-2 text-xs text-muted">Last updated {article.updatedAt}</p>

      {article.needsVerification && (
        <div className="mt-5 rounded-xl border border-accent/30 bg-accent-soft px-4 py-3 text-sm text-ink">
          <span className="font-semibold text-accent">Please verify locally: </span>
          prices, hours, and seasonal details in this article can change — double-check anything
          time- or money-sensitive before you rely on it.
        </div>
      )}

      <div className="mt-10 flex flex-col gap-8">
        {article.sections.map((s) => (
          <div key={s.heading}>
            <h2 className="disp text-xl font-semibold text-brand-strong">{s.heading}</h2>
            <div className="mt-3 flex flex-col gap-3 text-[15px] leading-7 text-ink">
              {s.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-border pt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Useful tools</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href="/tools/phrase-generator"
            className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm font-medium hover:border-brand"
          >
            Phrase Generator
          </Link>
          <Link
            href="/tools/restaurant-helper"
            className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm font-medium hover:border-brand"
          >
            Restaurant Helper
          </Link>
          <Link
            href="/tools/transport"
            className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm font-medium hover:border-brand"
          >
            Transport Helper
          </Link>
          <Link
            href="/tools/menu"
            className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm font-medium hover:border-brand"
          >
            Menu Helper
          </Link>
          <Link
            href="/tools/emergency"
            className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm font-medium hover:border-brand"
          >
            Emergency Assistant
          </Link>
        </div>
      </div>

      {(relatedArticles.length > 0 || relatedCulture.length > 0) && (
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-sm font-semibold text-muted">Related reading</p>
          <div className="mt-3 flex flex-col gap-2">
            {relatedArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/guide/travel/${a.slug}`}
                className="rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium hover:border-brand"
              >
                {a.title}
              </Link>
            ))}
            {relatedCulture.map((a) => (
              <Link
                key={a.slug}
                href={`/guide/culture/${a.slug}`}
                className="rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium hover:border-brand"
              >
                {a.title} <span className="text-muted">— Culture &amp; Etiquette</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 rounded-2xl border border-accent/30 bg-accent-soft p-6 text-center">
        <p className="disp font-semibold">Want a full itinerary, not just one article?</p>
        <p className="mt-1 text-sm text-muted">
          The Trip Planner builds a day-by-day plan around the regions and interests you pick.
        </p>
        <Link
          href="/tools/trip-planner"
          className="mt-4 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-strong"
        >
          Open Trip Planner
        </Link>
      </div>
    </div>
  );
}
