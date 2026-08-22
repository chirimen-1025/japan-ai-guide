import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What Japan AI Guide does and doesn't collect. Short version: nothing you type is sent anywhere.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <p className="jp text-sm font-semibold text-accent">プライバシーポリシー</p>
      <h1 className="disp mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted">Last updated 2026-08-22.</p>

      <div className="mt-8 flex flex-col gap-6 text-[15px] leading-7 text-ink">
        <h2 className="disp text-xl font-semibold text-brand-strong">The short version</h2>
        <p>
          The trip planner, budget calculator, phrase generator, and restaurant helper all run
          entirely in your browser. What you type into them — your trip dates, budget, dietary
          needs, and so on — stays on your device and is never sent to a server, because this site
          doesn&apos;t have one that processes that data. Nothing is saved between visits either;
          refreshing the page clears whatever you entered.
        </p>

        <h2 className="disp mt-2 text-xl font-semibold text-brand-strong">
          What this site is, technically
        </h2>
        <p>
          Japan AI Guide is a static website: every page is plain HTML/CSS/JavaScript generated
          ahead of time and served as files, with no application server and no database behind it.
          There&apos;s no account system, no login, and no form on this site that submits your
          information anywhere.
        </p>

        <h2 className="disp mt-2 text-xl font-semibold text-brand-strong">Hosting and basic logs</h2>
        <p>
          Like any website, the hosting provider serving these files may automatically log standard
          technical information for security and reliability purposes — things like IP address,
          browser type, and which pages were requested. This is normal web server behavior, not
          something this site adds on top, and this site does not otherwise combine or analyze that
          data.
        </p>

        <h2 className="disp mt-2 text-xl font-semibold text-brand-strong">Cookies and analytics</h2>
        <p>
          This site does not set its own cookies and does not run third-party advertising or
          tracking scripts. If that changes in the future (for example, adding privacy-respecting
          analytics to understand which guides are useful), this page will be updated to say so
          before it happens, not after.
        </p>

        <h2 className="disp mt-2 text-xl font-semibold text-brand-strong">External links</h2>
        <p>
          Articles may link to official sources, government pages, or other outside sites for
          verification. Those sites have their own privacy practices, which this policy doesn&apos;t
          cover.
        </p>

        <h2 className="disp mt-2 text-xl font-semibold text-brand-strong">Questions</h2>
        <p>
          If you have questions about this policy, contact{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand underline hover:text-brand-strong">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
