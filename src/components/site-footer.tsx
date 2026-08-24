import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="disp text-base font-semibold">Japan AI Guide</p>
          <p className="mt-2 text-sm text-muted">
            Free tools and honest guides for travelers heading to Japan — before, during, and after
            the trip.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Tools</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li><Link href="/tools/trip-planner" className="hover:text-brand">Trip Planner</Link></li>
            <li><Link href="/tools/budget-calculator" className="hover:text-brand">Budget Calculator</Link></li>
            <li><Link href="/tools/phrase-generator" className="hover:text-brand">Phrase Generator</Link></li>
            <li><Link href="/tools/restaurant-helper" className="hover:text-brand">Restaurant Helper</Link></li>
            <li><Link href="/tools/emergency" className="hover:text-brand">Emergency Assistant</Link></li>
            <li><Link href="/tools/transport" className="hover:text-brand">Transport Helper</Link></li>
            <li><Link href="/tools/menu" className="hover:text-brand">Menu Helper</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Guides</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li><Link href="/guide/culture" className="hover:text-brand">Culture &amp; Etiquette</Link></li>
            <li><Link href="/guide/travel" className="hover:text-brand">Travel Guide</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Site</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li><Link href="/about" className="hover:text-brand">About</Link></li>
            <li><Link href="/privacy" className="hover:text-brand">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-brand">Terms &amp; Disclaimer</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-5 py-5 text-center text-xs text-muted">
        Prices, hours, and other details change — always double-check anything marked
        &ldquo;verify locally&rdquo; before you rely on it. Japan AI Guide is an independent
        travel resource, not affiliated with any government tourism board.
      </div>
    </footer>
  );
}
