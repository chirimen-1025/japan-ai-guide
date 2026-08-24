"use client";

import { useMemo, useState } from "react";
import { MENU_ITEMS, MENU_CATEGORIES, type MenuItem } from "@/lib/data/menu";

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

export function MenuHelperForm() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MENU_ITEMS.filter((item: MenuItem) => {
      const matchesCategory = !category || item.category === category;
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.japanese.includes(q) ||
        item.romaji.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name, romaji, or 日本語..."
        className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink"
      />

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory(null)}
          className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
            category === null
              ? "border-brand bg-brand text-white"
              : "border-border bg-paper text-muted hover:border-brand"
          }`}
        >
          All
        </button>
        {MENU_CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              category === c
                ? "border-brand bg-brand text-white"
                : "border-border bg-paper text-muted hover:border-brand"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {filtered.map((item) => {
          const open = openId === item.id;
          return (
            <div key={item.id} className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
              <button
                type="button"
                onClick={() => setOpenId(open ? null : item.id)}
                className="flex w-full items-start justify-between gap-3 text-left"
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                    {item.category}
                  </span>
                  <p className="disp mt-1 text-base font-semibold">{item.name}</p>
                  <p className="jp mt-0.5 text-sm text-muted">
                    {item.japanese} · {item.romaji}
                  </p>
                </div>
                <span className="mt-1 shrink-0 text-muted">{open ? "−" : "+"}</span>
              </button>
              {open && (
                <div className="mt-3 flex flex-col gap-3 border-t border-border pt-3 text-sm">
                  <p className="text-ink">{item.description}</p>
                  <p className="text-muted">
                    <span className="font-semibold text-ink">Common ingredients: </span>
                    {item.commonIngredients.join(", ")}
                  </p>
                  {item.usefulPhrase && (
                    <p className="text-muted">
                      <span className="font-semibold text-ink">Useful phrase: </span>
                      {item.usefulPhrase}
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    <SpeakButton text={item.japanese} />
                    <span className="text-xs text-muted">Hear it said aloud</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 text-sm text-muted">No matches — try a different search or category.</p>
      )}
    </div>
  );
}
