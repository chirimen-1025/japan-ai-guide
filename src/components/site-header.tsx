import Link from "next/link";

const NAV = [
  { href: "/tools/trip-planner", label: "Trip Planner" },
  { href: "/tools/trip-map", label: "Trip Map" },
  { href: "/tools/budget-calculator", label: "Budget" },
  { href: "/tools/phrase-generator", label: "Phrases" },
  { href: "/tools/restaurant-helper", label: "Restaurant" },
  { href: "/guide/culture", label: "Culture" },
  { href: "/guide/travel", label: "Travel Guide" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
        <Link href="/" className="disp flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span className="jp text-accent">案内</span>
          <span>Japan AI Guide</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted hover:bg-surface-2 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/tools/trip-planner"
          className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent-strong md:hidden"
        >
          Plan my trip
        </Link>
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-border px-4 py-2 md:hidden">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
