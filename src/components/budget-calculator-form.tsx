"use client";

import { useState } from "react";
import { calculateBudget, formatJpy, type BudgetResult } from "@/lib/data/budget";

export function BudgetCalculatorForm() {
  const [days, setDays] = useState(7);
  const [people, setPeople] = useState(1);
  const [results, setResults] = useState<BudgetResult[] | null>(null);

  function calculate() {
    setResults(calculateBudget({ days, people }));
  }

  return (
    <div>
      <div className="grid gap-6 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold" htmlFor="days">
            Trip length (days)
          </label>
          <div className="mt-2 flex items-center gap-3">
            <input
              id="days"
              type="range"
              min={1}
              max={30}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="flex-1 accent-accent"
            />
            <span className="w-10 text-right font-mono text-sm font-semibold tabular-nums">{days}</span>
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold" htmlFor="people">
            Travelers
          </label>
          <div className="mt-2 flex items-center gap-3">
            <input
              id="people"
              type="range"
              min={1}
              max={8}
              value={people}
              onChange={(e) => setPeople(Number(e.target.value))}
              className="flex-1 accent-accent"
            />
            <span className="w-10 text-right font-mono text-sm font-semibold tabular-nums">{people}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={calculate}
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-accent-strong sm:col-span-2 sm:w-fit"
        >
          Estimate my budget
        </button>
      </div>

      {results && (
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {results.map(({ tier, lowTotal, highTotal }) => (
            <div key={tier.id} className="flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <p className="disp text-lg font-semibold">{tier.label}</p>
              <p className="mt-1 text-sm text-muted">{tier.description}</p>
              <p className="mt-4 font-mono text-xl font-semibold tabular-nums text-brand">
                {formatJpy(lowTotal)}–{formatJpy(highTotal)}
              </p>
              <p className="text-xs text-muted">total for the trip</p>
              <div className="mt-4 flex flex-col gap-1.5 border-t border-border pt-4 text-xs text-muted">
                {tier.breakdown.map((b) => (
                  <div key={b.label} className="flex justify-between">
                    <span>{b.label}</span>
                    <span className="font-mono tabular-nums">
                      {formatJpy(b.range[0])}–{formatJpy(b.range[1])}/day
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="mt-6 text-xs text-muted">
        These are rough planning ranges based on typical costs, not live prices — actual costs
        vary by season, city, and exchange rate. Always verify current prices for flights,
        accommodation, and any Japan Rail Pass before booking.
      </p>
    </div>
  );
}
