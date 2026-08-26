"use client";

import { useSyncExternalStore } from "react";
import {
  addToTripMapList,
  getTripMapServerSnapshot,
  getTripMapSnapshot,
  removeFromTripMapList,
  subscribeToTripMapList,
  type TripMapEntry,
} from "@/lib/trip-map";

export function TripMapAddButton({ slug, region, regionLabel, title }: TripMapEntry) {
  // The server snapshot is always an empty list (there's no localStorage to
  // read during SSR), which matches the client's own state before its
  // first sync — no hydration mismatch — and then updates to the real,
  // persisted state right after.
  const list = useSyncExternalStore(subscribeToTripMapList, getTripMapSnapshot, getTripMapServerSnapshot);
  const added = list.some((e) => e.slug === slug);

  function handleClick() {
    if (added) {
      removeFromTripMapList(slug);
    } else {
      addToTripMapList({ slug, region, regionLabel, title });
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
        added
          ? "border-brand bg-brand text-white"
          : "border-border bg-surface text-ink hover:border-brand"
      }`}
    >
      <span aria-hidden>{added ? "✓" : "📍"}</span>
      {added ? "Added to Trip Map" : "Add to Trip Map"}
    </button>
  );
}
