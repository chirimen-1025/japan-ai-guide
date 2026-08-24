"use client";

import { useState } from "react";
import { EMERGENCY_SITUATIONS } from "@/lib/data/emergency";

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ja-JP";
  u.rate = 0.9;
  window.speechSynthesis.speak(u);
}

export function EmergencyAssistantForm() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = EMERGENCY_SITUATIONS.find((s) => s.id === selectedId) ?? null;

  return (
    <div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {EMERGENCY_SITUATIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSelectedId(s.id)}
            className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
              selectedId === s.id
                ? "border-brand bg-brand text-white"
                : "border-border bg-surface hover:border-brand"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {selected && (
        <div className="mt-8 rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <p className="disp text-lg font-semibold">{selected.label}</p>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted">
            What to do
          </p>
          <ol className="mt-2 flex flex-col gap-2 text-sm text-ink">
            {selected.whatToDo.map((step, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="jp shrink-0 font-semibold text-accent">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted">
            Show this to staff, or tap ▶ to say it aloud
          </p>
          <div className="mt-2 rounded-xl border border-accent/30 bg-accent-soft p-5">
            <div className="flex items-start justify-between gap-3">
              <p className="jp text-2xl font-semibold leading-snug text-ink">
                {selected.japanese.japanese}
              </p>
              <button
                type="button"
                onClick={() => speak(selected.japanese.japanese)}
                aria-label="Play pronunciation"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-brand hover:border-brand"
              >
                ▶
              </button>
            </div>
            <p className="mt-1.5 text-sm italic text-muted">{selected.japanese.romaji}</p>
            <p className="mt-1 font-medium text-ink">{selected.japanese.english}</p>
          </div>

          <div className="mt-5 rounded-xl border border-warn/30 bg-surface-2 px-4 py-3 text-sm text-ink">
            <span className="font-semibold text-warn">Important: </span>
            {selected.important}
          </div>
        </div>
      )}

      <div className="mt-8 rounded-xl border border-border bg-paper px-4 py-3 text-xs text-muted">
        For a genuine emergency in progress, call{" "}
        <span className="font-semibold text-ink">110 (police)</span> or{" "}
        <span className="font-semibold text-ink">119 (fire / ambulance)</span> — both are free
        calls from any phone. This tool gives general, practical guidance; it doesn&apos;t replace
        official emergency services, medical advice, or legal advice.
      </div>
    </div>
  );
}
