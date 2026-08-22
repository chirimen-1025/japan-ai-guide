"use client";

import { useState } from "react";
import { DISHES, DIETARY_PHRASES, type Dish, type DietaryPhrase } from "@/lib/data/restaurant";

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ja-JP";
  u.rate = 0.9;
  window.speechSynthesis.speak(u);
}

function SpeakButton({ text }: { text: string }) {
  return (
    <button
      type="button"
      onClick={() => speak(text)}
      aria-label="Play pronunciation"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-brand hover:border-brand"
    >
      ▶
    </button>
  );
}

export function RestaurantHelperForm() {
  const [openDish, setOpenDish] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  function toggleDietary(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  }

  const selectedPhrases: DietaryPhrase[] = DIETARY_PHRASES.filter((p) => selected.includes(p.id));

  return (
    <div className="flex flex-col gap-14">
      {/* What should I order */}
      <section>
        <h2 className="disp text-xl font-semibold">What should I order?</h2>
        <p className="mt-1.5 text-sm text-muted">
          Tap a dish to see what it actually is, and hear how to say it.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {DISHES.map((d: Dish) => {
            const open = openDish === d.id;
            return (
              <div
                key={d.id}
                className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenDish(open ? null : d.id)}
                  className="flex w-full items-start justify-between gap-3 text-left"
                >
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                      {d.category}
                    </span>
                    <p className="disp mt-1 text-base font-semibold">{d.name}</p>
                    <p className="jp mt-0.5 text-sm text-muted">
                      {d.japanese} · {d.romaji}
                    </p>
                  </div>
                  <span className="mt-1 shrink-0 text-muted">{open ? "−" : "+"}</span>
                </button>
                {open && (
                  <div className="mt-3 flex flex-col gap-3 border-t border-border pt-3 text-sm">
                    <p className="text-ink">{d.description}</p>
                    <p className="text-muted">
                      <span className="font-semibold text-ink">Good for: </span>
                      {d.goodFor}
                    </p>
                    <div className="flex items-center gap-2">
                      <SpeakButton text={d.japanese} />
                      <span className="text-xs text-muted">Hear it said aloud</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Tell the staff */}
      <section>
        <h2 className="disp text-xl font-semibold">Tell the staff about dietary needs</h2>
        <p className="mt-1.5 text-sm text-muted">
          Select what applies to you — you&apos;ll get a card you can show or read aloud to staff.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {DIETARY_PHRASES.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => toggleDietary(p.id)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                selected.includes(p.id)
                  ? "border-brand bg-brand text-white"
                  : "border-border bg-paper text-muted hover:border-brand"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {selectedPhrases.length > 0 && (
          <div className="mt-6 flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Show this to staff, or tap ▶ to say it aloud
            </p>
            {selectedPhrases.map((p) => (
              <div key={p.id} className="rounded-2xl border border-accent/30 bg-accent-soft p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="jp text-2xl font-semibold leading-snug text-ink">{p.japanese}</p>
                  <SpeakButton text={p.japanese} />
                </div>
                <p className="mt-1.5 text-sm italic text-muted">{p.romaji}</p>
                <p className="mt-1 font-medium text-ink">{p.english}</p>
                <p className="mt-2 text-xs text-muted">{p.note}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
