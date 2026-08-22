import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CULTURE_ARTICLES, getCultureArticle } from "@/lib/data/culture";
import { SITE_URL } from "@/lib/site-config";

export function generateStaticParams() {
  return CULTURE_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getCultureArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: `/guide/culture/${slug}` },
  };
}

export default async function CultureArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getCultureArticle(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    // Mirrors dateModified — the site doesn't track a separate original
    // publish date, so this intentionally avoids inventing an earlier one.
    datePublished: article.updatedAt,
    dateModified: article.updatedAt,
    author: { "@type": "Organization", name: "Japan AI Guide", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Japan AI Guide", url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guide/culture/${slug}` },
  };

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="mb-6 text-sm text-muted">
        <Link href="/guide/culture" className="hover:text-ink">Culture &amp; Etiquette</Link> /{" "}
        <span className="text-ink">{article.title}</span>
      </nav>

      <h1 className="disp text-3xl font-semibold tracking-tight sm:text-4xl">{article.title}</h1>
      <p className="mt-3 text-muted">{article.summary}</p>
      <p className="mt-2 text-xs text-muted">Last updated {article.updatedAt}</p>

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

      <div className="mt-12 rounded-2xl border border-accent/30 bg-accent-soft p-6 text-center">
        <p className="disp font-semibold">Need the words for this situation?</p>
        <p className="mt-1 text-sm text-muted">
          The Phrase Generator turns what you&apos;re trying to say into natural Japanese.
        </p>
        <Link
          href="/tools/phrase-generator"
          className="mt-4 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-strong"
        >
          Open Phrase Generator
        </Link>
      </div>
    </div>
  );
}
