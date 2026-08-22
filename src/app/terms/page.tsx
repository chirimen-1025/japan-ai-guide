import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms & Disclaimer",
  description:
    "Terms of use and disclaimer for Japan AI Guide: an independent, unofficial travel resource — verify anything time-sensitive locally.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <p className="jp text-sm font-semibold text-accent">利用規約・免責事項</p>
      <h1 className="disp mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Terms &amp; Disclaimer</h1>
      <p className="mt-3 text-sm text-muted">Last updated 2026-08-22.</p>

      <div className="mt-8 flex flex-col gap-6 text-[15px] leading-7 text-ink">
        <h2 className="disp text-xl font-semibold text-brand-strong">Independent, unofficial resource</h2>
        <p>
          Japan AI Guide is an independent travel resource. It is not affiliated with, endorsed by,
          or operated on behalf of the Japanese government, any prefectural or municipal tourism
          board, JNTO, JR or any rail operator, or any business named or described in these guides.
        </p>

        <h2 className="disp mt-2 text-xl font-semibold text-brand-strong">
          Information changes — verify before you rely on it
        </h2>
        <p>
          Prices, opening hours, transit schedules, festival dates, seasonal closures, and similar
          details change, sometimes without much notice. Articles that mention this kind of detail
          are marked to check it locally — at the official source, the venue, or the relevant transit
          operator — before making a booking or travel decision around it. Treat everything on this
          site as a starting point for research, not a final authority.
        </p>

        <h2 className="disp mt-2 text-xl font-semibold text-brand-strong">How content is produced</h2>
        <p>
          Articles and tool content on this site are researched and drafted with AI assistance and
          then independently fact-checked before publishing, as described on the{" "}
          <a href="/about" className="text-brand underline hover:text-brand-strong">
            About
          </a>{" "}
          page. Despite that process, errors can still slip through at this scale of content. If you
          find one, please report it — see contact details below.
        </p>

        <h2 className="disp mt-2 text-xl font-semibold text-brand-strong">No liability</h2>
        <p>
          This site is provided &ldquo;as is,&rdquo; without warranty of any kind, express or
          implied. To the fullest extent permitted by law, Japan AI Guide and its operator are not
          liable for any loss, expense, missed reservation, travel disruption, or other damage
          arising from reliance on information found here. This is general travel information, not
          professional, legal, medical, or financial advice.
        </p>

        <h2 className="disp mt-2 text-xl font-semibold text-brand-strong">Tools run locally</h2>
        <p>
          The trip planner, budget calculator, phrase generator, and restaurant helper are provided
          for convenience and run entirely in your browser. Their output (itineraries, cost
          estimates, phrases) is a starting point, not a guarantee — double-check anything
          consequential before you depend on it.
        </p>

        <h2 className="disp mt-2 text-xl font-semibold text-brand-strong">Corrections and takedown requests</h2>
        <p>
          If you spot an inaccurate, outdated, or otherwise problematic detail — including anything
          about a business, place, or person that you believe is wrong — contact{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand underline hover:text-brand-strong">
            {CONTACT_EMAIL}
          </a>{" "}
          and it will be looked into.
        </p>

        <h2 className="disp mt-2 text-xl font-semibold text-brand-strong">Changes to these terms</h2>
        <p>
          These terms may be updated as the site grows. The &ldquo;last updated&rdquo; date at the
          top of this page reflects the most recent change.
        </p>
      </div>
    </div>
  );
}
