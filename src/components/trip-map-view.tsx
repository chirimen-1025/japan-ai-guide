"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { getRegionCoordinate, REGION_COORDINATES } from "@/lib/data/region-coordinates";
import {
  clearTripMapList,
  decodeTripMapList,
  encodeTripMapList,
  estimateItinerary,
  getTripMapServerSnapshot,
  getTripMapSnapshot,
  moveTripMapEntry,
  removeFromTripMapList,
  replaceTripMapList,
  subscribeToTripMapList,
  type TripMapEntry,
} from "@/lib/trip-map";

// Reading window.location.search on mount, the same sanctioned pattern used
// by the Trip Planner's group-link handling (see trip-planner-form.tsx):
// avoids a hydration mismatch, since the static export has no "?p=" on the
// server-rendered HTML and only the client knows the real URL.
function subscribeToNothing() {
  return () => {};
}
function getUrlSearch() {
  return window.location.search;
}
function getServerUrlSearch() {
  return "";
}

function buildShareUrl(list: TripMapEntry[]): string {
  const encoded = encodeTripMapList(list);
  if (typeof window === "undefined") return `?p=${encoded}`;
  return `${window.location.origin}${window.location.pathname}?p=${encoded}`;
}

function CopyLinkBox({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="mt-3 flex flex-col gap-2 sm:flex-row">
      <input
        readOnly
        value={url}
        onFocus={(e) => e.currentTarget.select()}
        className="flex-1 rounded-full border border-border bg-paper px-4 py-2.5 font-mono text-xs text-muted"
      />
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
          } catch {
            // Clipboard API unavailable/blocked — the field above still
            // select-alls itself on focus, so copying by hand still works.
          }
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="shrink-0 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-strong"
      >
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}

// Schematic (not geographically accurate) map of Japan: every prefecture's
// approximate capital, projected from lat/lng onto a simple rectangle, so
// visitors can see roughly how spread out their picks are. It intentionally
// doesn't attempt a real coastline — that's more likely to look wrong than
// a plain dot plot is.
const MAP_WIDTH = 300;
const MAP_HEIGHT = 460;
const LAT_MIN = 24;
const LAT_MAX = 46;
const LNG_MIN = 122;
const LNG_MAX = 146.5;

function project(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * MAP_WIDTH;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * MAP_HEIGHT;
  return { x, y };
}

function TripMapSvg({ list }: { list: TripMapEntry[] }) {
  const stops = useMemo(
    () =>
      list
        .map((e) => {
          const c = getRegionCoordinate(e.region);
          return c ? { ...e, ...project(c.lat, c.lng) } : null;
        })
        .filter((s): s is TripMapEntry & { x: number; y: number } => s !== null),
    [list]
  );

  const allPrefectures = useMemo(() => {
    // A faint backdrop of every region so the archipelago's shape reads at
    // a glance, even though this isn't a real coastline. Several region
    // keys intentionally share a coordinate (see region-coordinates.ts), so
    // dedupe by lat/lng rather than plotting the same dot twice.
    const seen = new Set<string>();
    const points: { x: number; y: number }[] = [];
    for (const coord of Object.values(REGION_COORDINATES)) {
      const key = `${coord.lat},${coord.lng}`;
      if (seen.has(key)) continue;
      seen.add(key);
      points.push(project(coord.lat, coord.lng));
    }
    return points;
  }, []);

  return (
    <svg
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      className="mx-auto h-auto w-full max-w-xs"
      role="img"
      aria-label="Schematic map of Japan showing your selected trip stops"
    >
      <rect x={0} y={0} width={MAP_WIDTH} height={MAP_HEIGHT} rx={12} className="fill-paper" />
      {allPrefectures.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={1.6} className="fill-border" />
      ))}
      {stops.length > 1 && (
        <polyline
          points={stops.map((s) => `${s.x},${s.y}`).join(" ")}
          fill="none"
          className="stroke-accent"
          strokeWidth={1.5}
          strokeDasharray="4 3"
        />
      )}
      {stops.map((s, i) => (
        <g key={s.slug}>
          <circle cx={s.x} cy={s.y} r={6} className="fill-accent stroke-paper" strokeWidth={1.5} />
          <text
            x={s.x}
            y={s.y}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-white text-[7px] font-bold"
          >
            {i + 1}
          </text>
          <text
            x={s.x + (s.x > MAP_WIDTH - 60 ? -9 : 9)}
            y={s.y}
            textAnchor={s.x > MAP_WIDTH - 60 ? "end" : "start"}
            dominantBaseline="central"
            className="fill-ink text-[8px] font-medium"
          >
            {s.regionLabel}
          </text>
        </g>
      ))}
    </svg>
  );
}

function EntryRow({
  entry,
  index,
  total,
  onRemove,
  onMove,
}: {
  entry: TripMapEntry;
  index: number;
  total: number;
  onRemove: () => void;
  onMove: (direction: -1 | 1) => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-bold text-accent">
        {index + 1}
      </span>
      <div className="min-w-0 flex-1">
        <Link href={`/guide/travel/${entry.slug}`} className="block truncate text-sm font-semibold hover:text-brand">
          {entry.title}
        </Link>
        <p className="text-xs text-muted">{entry.regionLabel}</p>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          disabled={index === 0}
          onClick={() => onMove(-1)}
          aria-label="Move up"
          className="rounded-full border border-border p-1.5 text-xs text-muted hover:border-brand hover:text-brand disabled:opacity-30"
        >
          ↑
        </button>
        <button
          type="button"
          disabled={index === total - 1}
          onClick={() => onMove(1)}
          aria-label="Move down"
          className="rounded-full border border-border p-1.5 text-xs text-muted hover:border-brand hover:text-brand disabled:opacity-30"
        >
          ↓
        </button>
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove"
          className="rounded-full border border-border p-1.5 text-xs text-muted hover:border-red-400 hover:text-red-500"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export function TripMapView() {
  const list = useSyncExternalStore(subscribeToTripMapList, getTripMapSnapshot, getTripMapServerSnapshot);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const urlSearch = useSyncExternalStore(subscribeToNothing, getUrlSearch, getServerUrlSearch);
  const sharedList = useMemo(() => {
    const params = new URLSearchParams(urlSearch);
    const p = params.get("p");
    return p ? decodeTripMapList(p) : null;
  }, [urlSearch]);
  const [dismissedShared, setDismissedShared] = useState(false);

  const displayList = sharedList && !dismissedShared ? sharedList : list;
  const itinerary = useMemo(
    () => estimateItinerary(displayList.map((e) => ({ label: e.regionLabel, region: e.region }))),
    [displayList]
  );

  // ---- Viewing someone else's shared list --------------------------------
  if (sharedList && !dismissedShared) {
    return (
      <div className="flex flex-col gap-8">
        <div className="rounded-2xl border border-brand bg-brand-soft p-6 shadow-sm">
          <p className="jp text-sm font-semibold text-accent">共有された行き先リスト</p>
          <h2 className="disp mt-1 text-xl font-semibold">
            Someone shared a trip map with {sharedList.length} {sharedList.length === 1 ? "stop" : "stops"}
          </h2>
          <p className="mt-2 text-sm text-muted">
            Save it to make it your own list on this device, or dismiss it to see your own list instead.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                replaceTripMapList(sharedList);
                setDismissedShared(true);
                window.history.replaceState(null, "", window.location.pathname);
              }}
              className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-strong"
            >
              Save to my Trip Map
            </button>
            <button
              type="button"
              onClick={() => setDismissedShared(true)}
              className="rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium hover:border-brand"
            >
              Not mine — show my own list
            </button>
          </div>
        </div>
        <TripMapBody list={sharedList} itinerary={itinerary} readOnly />
      </div>
    );
  }

  // ---- Normal (this device's own list) view ------------------------------
  return (
    <div className="flex flex-col gap-8">
      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border p-12 text-center text-muted">
          <p className="disp text-lg font-semibold text-ink">Your trip map is empty</p>
          <p className="mt-1.5 max-w-sm text-sm">
            Open any travel guide article and click &ldquo;Add to Trip Map&rdquo; to start building a
            list of places you want to visit.
          </p>
          <Link
            href="/guide/travel"
            className="mt-5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-strong"
          >
            Browse the Travel Guide
          </Link>
        </div>
      ) : (
        <>
          <TripMapBody
            list={list}
            itinerary={itinerary}
            onRemove={(slug) => removeFromTripMapList(slug)}
            onMove={(index, direction) => moveTripMapEntry(index, direction)}
          />

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Remove every stop from your Trip Map?")) {
                  clearTripMapList();
                  setShareUrl(null);
                }
              }}
              className="text-sm font-semibold text-muted hover:text-red-500"
            >
              Clear all
            </button>
            <button
              type="button"
              onClick={() => setShareUrl(buildShareUrl(list))}
              className="rounded-full border border-brand px-5 py-2.5 text-sm font-semibold text-brand hover:bg-brand-soft"
            >
              Get a shareable link
            </button>
          </div>
          {shareUrl && (
            <div className="rounded-2xl border border-border bg-surface p-5">
              <p className="text-sm font-semibold">Share this trip map</p>
              <p className="mt-1 text-sm text-muted">
                Anyone who opens this link sees the same stops (they can save their own copy from
                there — it won&apos;t change what you see).
              </p>
              <CopyLinkBox url={shareUrl} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

function TripMapBody({
  list,
  itinerary,
  onRemove,
  onMove,
  readOnly,
}: {
  list: TripMapEntry[];
  itinerary: ReturnType<typeof estimateItinerary>;
  onRemove?: (slug: string) => void;
  onMove?: (index: number, direction: -1 | 1) => void;
  readOnly?: boolean;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-sm font-semibold">
            Your stops, in visit order <span className="font-normal text-muted">({list.length})</span>
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {list.map((entry, i) => (
              <EntryRow
                key={entry.slug}
                entry={entry}
                index={i}
                total={list.length}
                onRemove={() => onRemove?.(entry.slug)}
                onMove={(direction) => onMove?.(i, direction)}
              />
            ))}
          </div>
          {readOnly && (
            <p className="mt-2 text-xs text-muted">
              This is a shared, read-only list — reordering and removing are disabled until you save
              it to your own Trip Map.
            </p>
          )}
        </div>

        {itinerary && itinerary.stopCount > 1 && (
          <div className="rounded-2xl border border-border bg-surface p-6">
            <p className="disp text-lg font-semibold">
              Roughly {itinerary.totalDays} {itinerary.totalDays === 1 ? "day" : "days"} for a
              comfortable trip
            </p>
            <p className="mt-1 text-sm text-muted">
              {itinerary.sightseeingDays} sightseeing {itinerary.sightseeingDays === 1 ? "day" : "days"}{" "}
              (about one per stop){itinerary.travelDays > 0 && (
                <>
                  {" "}
                  + {itinerary.travelDays} travel {itinerary.travelDays === 1 ? "day" : "days"} for the
                  longer hops between stops
                </>
              )}
              . You could rush it into fewer days back-to-back, but this gives each stop room to
              breathe.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              {itinerary.hops.map((hop, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 rounded-xl bg-paper px-3.5 py-2.5 text-sm"
                >
                  <span className="min-w-0 truncate">
                    {hop.fromLabel} → {hop.toLabel}
                  </span>
                  <span className="shrink-0 whitespace-nowrap font-mono text-xs text-muted">
                    ~{hop.km}km · ~{hop.hours}h{hop.eatsOwnDay ? " · own day" : ""}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted">
              This is a rough, straight-line-distance estimate, not a real route search — actual
              train and flight times depend on the specific connections available. Treat it as a
              starting point and check current timetables before booking.
            </p>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5 lg:sticky lg:top-24 lg:self-start">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Trip map</p>
        <div className="mt-3">
          <TripMapSvg list={list} />
        </div>
        <p className="mt-3 text-center text-xs text-muted">
          A schematic layout, not an exact map — for a sense of distance and direction only.
        </p>
      </div>
    </div>
  );
}
