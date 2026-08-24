"use client";

import { useState } from "react";
import { TRANSPORT_CITIES, getTransportRoute } from "@/lib/data/transport";

export function TransportHelperForm() {
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const route = submitted && from && to ? getTransportRoute(from, to) : null;
  const noRouteFound = submitted && from && to && !route;

  return (
    <div>
      <form
        className="flex flex-col gap-3 sm:flex-row sm:items-end"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <label className="flex-1 text-sm font-medium text-ink">
          From
          <select
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              setSubmitted(false);
            }}
            className="mt-1.5 w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink"
          >
            <option value="">Select a city or area</option>
            {TRANSPORT_CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>

        <label className="flex-1 text-sm font-medium text-ink">
          To
          <select
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              setSubmitted(false);
            }}
            className="mt-1.5 w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink"
          >
            <option value="">Select a city or area</option>
            {TRANSPORT_CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          disabled={!from || !to}
          className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Show options
        </button>
      </form>

      {route && (
        <div className="mt-8">
          <p className="disp text-lg font-semibold">
            {route.from} ↔ {route.to}
          </p>
          <div className="mt-4 flex flex-col gap-4">
            {route.options.map((opt) => (
              <div
                key={opt.method}
                className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
              >
                <p className="font-semibold text-ink">{opt.method}</p>
                <p className="mt-1.5 text-sm text-muted">{opt.description}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted">
                  Approx. duration
                </p>
                <p className="mt-1 text-sm text-ink">{opt.approxDuration}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted">
                  For current fares/times
                </p>
                <p className="mt-1 text-sm text-ink">{opt.whatToSearch}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {noRouteFound && (
        <div className="mt-8 rounded-xl border border-border bg-paper px-4 py-3 text-sm text-muted">
          This route isn&apos;t in our list yet. Try searching Google Maps or a Japan transit app
          (like Navitime or Japan Transit Planner) for {from} to {to} directly.
        </div>
      )}

      <div className="mt-8 rounded-xl border border-border bg-paper px-4 py-3 text-xs text-muted">
        Durations are rough estimates and fares change — always confirm current times and prices
        with the linked search or a transit app before you travel.
      </div>
    </div>
  );
}
