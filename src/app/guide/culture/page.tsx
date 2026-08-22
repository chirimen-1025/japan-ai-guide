import Link from "next/link";
import type { Metadata } from "next";
import { CULTURE_ARTICLES } from "@/lib/data/culture";

export const metadata: Metadata = {
  title: "Japanese Culture & Etiquette Guide",
  description:
    "Practical, non-judgmental guides to Japanese etiquette for travelers — bowing, shoes, onsen, shrines, trains, and convenience stores.",
  alternates: { canonical: "/guide/culture" },
};

export default function CultureIndexPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <p className="jp text-sm font-semibold text-accent">文化ガイド</p>
      <h1 className="disp mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Culture &amp; Etiquette</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Short, practical explainers for the situations that actually come up on a trip — not a
        list of rules to memorize, just what to expect and why it matters.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CULTURE_ARTICLES.map((a) => (
          <Link
            key={a.slug}
            href={`/guide/culture/${a.slug}`}
            className="flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="disp text-base font-semibold leading-snug">{a.title}</p>
            <p className="mt-2 line-clamp-3 text-sm text-muted">{a.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
