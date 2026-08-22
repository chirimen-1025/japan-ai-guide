import type { Metadata } from "next";
import { PhraseGeneratorForm } from "@/components/phrase-generator-form";
import { PHRASES } from "@/lib/data/phrases";

export const metadata: Metadata = {
  title: "Japanese Phrase Generator for Travelers",
  description:
    "Describe what you need in plain English and get the natural Japanese phrase for it, with romaji pronunciation and a native audio button.",
  alternates: { canonical: "/tools/phrase-generator" },
};

export default function PhraseGeneratorPage() {
  const categories = Array.from(new Set(PHRASES.map((p) => p.category)));

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <p className="jp text-sm font-semibold text-accent">フレーズ生成</p>
      <h1 className="disp mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Japanese Phrase Generator</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Type what you&apos;re trying to do — order something, ask for directions, handle an
        emergency — and get the Japanese phrase that fits, with pronunciation you can tap to hear.
      </p>
      <div className="mt-10">
        <PhraseGeneratorForm />
      </div>

      <div className="mt-16 border-t border-border pt-10">
        <p className="text-sm font-semibold text-muted">Or browse by situation</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((c) => (
            <span key={c} className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm">
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
