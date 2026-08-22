import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who makes Japan AI Guide, how the content is researched and fact-checked, and why it's free.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <p className="jp text-sm font-semibold text-accent">このサイトについて</p>
      <h1 className="disp mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">About Japan AI Guide</h1>

      <div className="mt-8 flex flex-col gap-6 text-[15px] leading-7 text-ink">
        <p>
          Japan AI Guide is a small, independent project: a set of free browser-based tools (trip
          planner, budget calculator, phrase generator, restaurant helper) plus a growing library of
          travel and culture guides, built for people visiting Japan for the first time. It isn&apos;t
          affiliated with any government tourism board, airline, hotel chain, or booking platform, and
          it doesn&apos;t sell anything.
        </p>

        <h2 className="disp mt-2 text-xl font-semibold text-brand-strong">How the content is made</h2>
        <p>
          The tools and articles on this site are researched and drafted with AI assistance, then
          checked against independent sources before publishing — not generated once and left alone.
          Every travel guide article goes through at least one dedicated fact-checking pass that
          verifies specific claims (production statistics, historical dates, brand names, official
          designations) against outside sources, separate from the pass that wrote the article. Where a
          detail genuinely couldn&apos;t be pinned down with confidence, or where it&apos;s the kind of
          thing that changes over time, the article says so directly rather than guessing.
        </p>
        <p>
          This is a deliberate choice, not a shortcut: the goal is useful, accurate travel information
          at a scale one or two human writers couldn&apos;t cover alone (guides for all 47 prefectures),
          without sacrificing the fact-checking a reader should be able to expect. If you spot something
          wrong, that feedback is genuinely useful — see contact info below.
        </p>

        <h2 className="disp mt-2 text-xl font-semibold text-brand-strong">
          Why articles say &ldquo;verify locally&rdquo;
        </h2>
        <p>
          Prices, opening hours, festival dates, seasonal closures, and similar details change often
          and aren&apos;t always the same source to source. Rather than state a specific number or date
          with false confidence, articles flag these spots and say to double-check before you rely on
          them — at the till, at the station, or on the venue&apos;s own page. Where a currently accurate
          figure or date was confirmed at time of writing, it&apos;s stated plainly; only the genuinely
          time-sensitive details get the hedge.
        </p>

        <h2 className="disp mt-2 text-xl font-semibold text-brand-strong">Why it&apos;s free</h2>
        <p>
          Every tool on this site runs entirely in your browser — nothing you type into the trip
          planner, budget calculator, or phrase generator is sent to a server, because there isn&apos;t
          one. The site itself is static pages with no account system, no paywall, and (currently) no
          ads or affiliate links.
        </p>

        <h2 className="disp mt-2 text-xl font-semibold text-brand-strong">Questions or corrections</h2>
        <p>
          Spotted an error, an outdated detail, or something that doesn&apos;t match what you saw on the
          ground? Corrections are welcome — see the contact details on the{" "}
          <Link href="/terms" className="text-brand underline hover:text-brand-strong">
            Terms &amp; Disclaimer
          </Link>{" "}
          page.
        </p>
      </div>
    </div>
  );
}
