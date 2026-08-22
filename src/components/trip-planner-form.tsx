"use client";

import { useMemo, useState } from "react";
import { REGIONS, INTERESTS, generateTripPlan, type Interest, type PlanDay } from "@/lib/data/trip-planner";

export function TripPlannerForm() {
  const [days, setDays] = useState(5);
  const [regionIds, setRegionIds] = useState<string[]>(["tokyo"]);
  const [interests, setInterests] = useState<Interest[]>(["culture", "food"]);
  const [plan, setPlan] = useState<PlanDay[] | null>(null);

  function toggleRegion(id: string) {
    setRegionIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // keep at least one
        return prev.filter((r) => r !== id);
      }
      if (prev.length >= 3) return prev; // keep the tool's recommendations focused
      return [...prev, id];
    });
  }

  function toggleInterest(id: Interest) {
    setInterests((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }

  const grouped = useMemo(() => {
    if (!plan) return null;
    const byRegion = new Map<string, PlanDay[]>();
    for (const d of plan) {
      const list = byRegion.get(d.region) ?? [];
      list.push(d);
      byRegion.set(d.region, list);
    }
    return byRegion;
  }, [plan]);

  return (
    <div className="grid gap-8 lg:grid-cols-[380px,1fr]">
      <div className="flex flex-col gap-7 rounded-2xl border border-border bg-surface p-6 shadow-sm lg:sticky lg:top-24 lg:self-start">
        <div>
          <label className="text-sm font-semibold" htmlFor="days">
            How many days?
          </label>
          <div className="mt-2 flex items-center gap-3">
            <input
              id="days"
              type="range"
              min={1}
              max={14}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="flex-1 accent-accent"
            />
            <span className="w-10 text-right font-mono text-sm font-semibold tabular-nums">{days}</span>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold">Where are you going? <span className="font-normal text-muted">(up to 3)</span></p>
          <div className="mt-2 flex flex-wrap gap-2">
            {REGIONS.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => toggleRegion(r.id)}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  regionIds.includes(r.id)
                    ? "border-brand bg-brand text-white"
                    : "border-border bg-paper text-muted hover:border-brand"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold">What are you interested in?</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {INTERESTS.map((i) => (
              <button
                key={i.id}
                type="button"
                onClick={() => toggleInterest(i.id)}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  interests.includes(i.id)
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-paper text-muted hover:border-accent"
                }`}
              >
                {i.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setPlan(generateTripPlan({ days, regionIds, interests }))}
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-accent-strong"
        >
          Generate my itinerary
        </button>
      </div>

      <div>
        {!plan && (
          <div className="flex h-full min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border p-10 text-center text-muted">
            <p className="disp text-lg font-semibold text-ink">Your itinerary will appear here</p>
            <p className="mt-1.5 max-w-sm text-sm">
              Set your days, regions, and interests on the left, then generate a plan.
            </p>
          </div>
        )}

        {plan && grouped && (
          <div className="flex flex-col gap-8">
            {Array.from(grouped.entries()).map(([region, dayList]) => (
              <div key={region}>
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  {dayList[0].regionLabel}
                </p>
                <div className="mt-3 flex flex-col gap-3">
                  {dayList.map((d) => (
                    <div key={d.dayNumber} className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                      <div className="flex items-baseline gap-2.5">
                        <span className="font-mono text-sm font-semibold text-brand">Day {d.dayNumber}</span>
                        <p className="disp text-lg font-semibold">{d.title}</p>
                      </div>
                      <ul className="mt-2.5 flex flex-col gap-1.5 text-sm text-muted">
                        {d.activities.map((act, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-accent">·</span>
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <p className="text-xs text-muted">
              This is a starting point based on your interests, not a fixed schedule — opening
              hours, seasonal events, and travel time between stops aren&apos;t included, so build
              in flexibility.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
