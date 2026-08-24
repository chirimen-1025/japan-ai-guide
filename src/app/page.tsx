import Link from "next/link";
import { CULTURE_ARTICLES } from "@/lib/data/culture";
import { TRAVEL_ARTICLES } from "@/lib/data/travel-articles";
import { HeroSlideshow } from "@/components/hero-slideshow";

const HERO_SLIDES = [
  {
    src: "/photos/fuji-azalea.jpg",
    alt: "Mount Fuji framed by blooming azaleas near Lake Kawaguchi",
  },
  {
    src: "/photos/fushimi-inari-torii.jpg",
    alt: "The senbon torii — thousands of vermillion gates — at Fushimi Inari Shrine, Kyoto",
  },
  {
    src: "/photos/kiyomizudera-autumn.jpg",
    alt: "Kiyomizu-dera temple at sunset, surrounded by autumn foliage, Kyoto",
  },
  {
    src: "/photos/shirakawago-snow.jpg",
    alt: "Snow blanketing the thatched-roof farmhouses of Shirakawa-go",
  },
  {
    src: "/photos/meguro-river-sakura.jpg",
    alt: "Cherry blossoms lit up at night along the Meguro River, Tokyo",
  },
];

const TOOLS = [
  {
    href: "/tools/trip-planner",
    jp: "旅程",
    title: "Trip Planner",
    desc: "Tell it your days, regions, and interests — get a realistic day-by-day itinerary.",
  },
  {
    href: "/tools/budget-calculator",
    jp: "予算",
    title: "Budget Calculator",
    desc: "See Budget, Standard, and Luxury cost estimates for your trip length and group size.",
  },
  {
    href: "/tools/phrase-generator",
    jp: "会話",
    title: "Phrase Generator",
    desc: "Describe what you need in plain English — get the Japanese phrase that actually fits.",
  },
  {
    href: "/tools/restaurant-helper",
    jp: "食事",
    title: "Restaurant Helper",
    desc: "Know what you're ordering, and show staff clear cards for allergies and dietary needs.",
  },
];

const MORE_TOOLS = [
  {
    href: "/tools/emergency",
    jp: "緊急",
    title: "Emergency Assistant",
    desc: "Lost your passport? Missed your train? Get plain steps and a phrase card, fast.",
  },
  {
    href: "/tools/transport",
    jp: "移動",
    title: "Transport Helper",
    desc: "Compare Shinkansen, flights, and buses between popular destinations.",
  },
  {
    href: "/tools/menu",
    jp: "食材",
    title: "Menu Helper",
    desc: "Decode izakaya food, rice bowls, drinks, and menu vocabulary at a glance.",
  },
];

export default function HomePage() {
  const featuredArticles = TRAVEL_ARTICLES.slice(0, 3);
  const featuredCulture = CULTURE_ARTICLES.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate flex min-h-[34rem] items-end overflow-hidden border-b border-border sm:min-h-[38rem]">
        <HeroSlideshow slides={HERO_SLIDES} />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-12 sm:py-16">
          <div className="max-w-2xl">
            <p className="jp mb-3 text-sm font-semibold text-sakura">日本を、もっと身近に。</p>
            <h1 className="disp text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl">
              Free tools to plan a Japan trip that actually fits you.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-white/85">
              A trip planner, a budget calculator, and a Japanese phrase generator — no signup,
              no app, no cost. Built for first-time visitors who want less guesswork.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/tools/trip-planner"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform duration-200 hover:bg-accent-strong hover:scale-105 active:scale-95"
              >
                Plan my trip
              </Link>
              <Link
                href="/tools/phrase-generator"
                className="rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-transform duration-200 hover:bg-white/20 hover:scale-105 active:scale-95"
              >
                Find a phrase
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="disp text-2xl font-semibold">Start with a free tool</h2>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <span className="jp flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-lg font-semibold text-brand-strong transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                {tool.jp}
              </span>
              <p className="disp mt-4 text-lg font-semibold">{tool.title}</p>
              <p className="mt-1.5 text-sm text-muted">{tool.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent group-hover:underline">
                Open tool
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* More tools */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <h2 className="disp text-xl font-semibold">More helpful tools</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {MORE_TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex items-start gap-3 rounded-xl border border-border bg-paper p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="jp flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-sm font-semibold text-brand-strong transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  {tool.jp}
                </span>
                <span>
                  <span className="disp block text-sm font-semibold">{tool.title}</span>
                  <span className="mt-0.5 block text-xs text-muted">{tool.desc}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Travel guide */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="disp text-2xl font-semibold">Travel guides</h2>
            <Link href="/guide/travel" className="text-sm font-semibold text-brand hover:underline">
              See all guides →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {featuredArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/guide/travel/${a.slug}`}
                className="flex flex-col rounded-2xl border border-border bg-paper p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                  {a.regionLabel} · {a.categoryLabel}
                </span>
                <p className="disp mt-2 text-base font-semibold leading-snug">{a.title}</p>
                <p className="mt-2 line-clamp-3 text-sm text-muted">{a.metaDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Culture guide */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="disp text-2xl font-semibold">Culture &amp; etiquette</h2>
          <Link href="/guide/culture" className="text-sm font-semibold text-brand hover:underline">
            See all guides →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {featuredCulture.map((a) => (
            <Link
              key={a.slug}
              href={`/guide/culture/${a.slug}`}
              className="flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <p className="disp text-base font-semibold leading-snug">{a.title}</p>
              <p className="mt-2 line-clamp-3 text-sm text-muted">{a.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-t border-border bg-sakura-soft">
        <div className="mx-auto max-w-6xl px-5 py-10 text-center">
          <p className="text-sm text-ink">
            Every tool on this site runs entirely in your browser — nothing you type is sent
            anywhere. Guides mark anything that changes over time (prices, hours) as{" "}
            <strong>&ldquo;verify locally&rdquo;</strong> instead of guessing a number.
          </p>
        </div>
      </section>
    </div>
  );
}
