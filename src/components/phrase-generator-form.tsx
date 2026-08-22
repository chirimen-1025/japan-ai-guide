"use client";

import { useState } from "react";
import { searchPhrases, type Phrase } from "@/lib/data/phrases";

const EXAMPLES = ["order ramen", "ask for the bill", "find the train station", "I have an allergy", "no bag please"];

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ja-JP";
  u.rate = 0.9;
  window.speechSynthesis.speak(u);
}

export function PhraseGeneratorForm() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Phrase[] | null>(null);
  const [searched, setSearched] = useState(false);

  function runSearch(q: string) {
    setQuery(q);
    setResults(searchPhrases(q));
    setSearched(true);
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          runSearch(query);
        }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Describe what you need, e.g. "I want to order ramen"'
          className="flex-1 rounded-full border border-border bg-surface px-5 py-3 text-sm focus:border-brand focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-accent-strong"
        >
          Find phrase
        </button>
      </form>

      <div className="mt-3 flex flex-wrap gap-2">
        <span className="text-xs text-muted">Try:</span>
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => runSearch(ex)}
            className="rounded-full border border-border bg-paper px-3 py-1 text-xs text-muted hover:border-brand hover:text-ink"
          >
            {ex}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {searched && (!results || results.length === 0) && (
          <p className="text-sm text-muted">
            No close match yet — try describing the situation differently, or browse the full{" "}
            phrase categories below.
          </p>
        )}

        {results && results.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {results.map((p) => (
              <div key={p.id} className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                <div className="flex items-start justify-between gap-2">
                  <p className="jp text-xl font-semibold">{p.japanese}</p>
                  <button
                    type="button"
                    onClick={() => speak(p.japanese)}
                    aria-label="Play pronunciation"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-brand hover:border-brand"
                  >
                    ▶
                  </button>
                </div>
                <p className="mt-1 text-sm italic text-muted">{p.romaji}</p>
                <p className="mt-1.5 font-medium">{p.english}</p>
                <p className="mt-2 text-xs text-muted">{p.note}</p>
                <span className="mt-3 inline-block rounded-full bg-brand-soft px-2.5 py-0.5 text-[11px] font-semibold text-brand-strong">
                  {p.category}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
