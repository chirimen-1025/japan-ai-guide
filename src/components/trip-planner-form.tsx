"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import {
  REGIONS,
  INTERESTS,
  generateTripPlan,
  generateGroupTripPlan,
  encodeGroupState,
  decodeGroupState,
  MAX_TRAVELERS,
  type Interest,
  type PlanDay,
  type SharedTraveler,
  type GroupState,
} from "@/lib/data/trip-planner";

function buildShareUrl(state: GroupState): string {
  const encoded = encodeGroupState(state);
  if (typeof window === "undefined") return `?p=${encoded}`;
  return `${window.location.origin}${window.location.pathname}?p=${encoded}`;
}

// Reading window.location.search on mount, the sanctioned way (avoids the
// hydration mismatch / cascading-setState-in-effect problems that a plain
// useEffect + setState would have here — the static export has no "?p="
// on the server-rendered HTML, only the client knows the real URL).
function subscribeToNothing() {
  return () => {};
}
function getUrlSearch() {
  return window.location.search;
}
function getServerUrlSearch() {
  return "";
}

function groupByRegion(plan: PlanDay[]) {
  const byRegion = new Map<string, PlanDay[]>();
  for (const d of plan) {
    const list = byRegion.get(d.region) ?? [];
    list.push(d);
    byRegion.set(d.region, list);
  }
  return byRegion;
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
            // Clipboard API unavailable (or blocked) — the field above is still
            // focusable and select-all's itself, so copying by hand still works.
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

function RegionInterestChips({
  regionIds,
  interests,
  onToggleRegion,
  onToggleInterest,
}: {
  regionIds: string[];
  interests: Interest[];
  onToggleRegion: (id: string) => void;
  onToggleInterest: (id: Interest) => void;
}) {
  return (
    <>
      <div>
        <p className="text-sm font-semibold">
          Where are you going? <span className="font-normal text-muted">(up to 3)</span>
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {REGIONS.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => onToggleRegion(r.id)}
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
              onClick={() => onToggleInterest(i.id)}
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
    </>
  );
}

export function TripPlannerForm() {
  const [days, setDays] = useState(5);
  const [regionIds, setRegionIds] = useState<string[]>(["tokyo"]);
  const [interests, setInterests] = useState<Interest[]>(["culture", "food"]);
  const [plan, setPlan] = useState<PlanDay[] | null>(null);

  const [travelerName, setTravelerName] = useState("");
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  // Group trip state: present only when this page was opened via a shared
  // "?p=" link. See src/lib/data/trip-planner.ts for the (free, rule-based)
  // merge logic and src/lib/url-state.ts for the link encoding.
  const urlSearch = useSyncExternalStore(subscribeToNothing, getUrlSearch, getServerUrlSearch);
  const initialSharedState = useMemo(() => {
    const params = new URLSearchParams(urlSearch);
    const p = params.get("p");
    return p ? decodeGroupState(p) : null;
  }, [urlSearch]);
  // Once the visitor joins (or explicitly starts their own plan), that local
  // choice takes over from whatever the URL said on load.
  const [override, setOverride] = useState<{ kind: "clear" } | { kind: "set"; state: GroupState } | null>(
    null
  );
  const sharedState = override ? (override.kind === "set" ? override.state : null) : initialSharedState;

  const [joinName, setJoinName] = useState("");
  const [joinRegionIds, setJoinRegionIds] = useState<string[]>(["tokyo"]);
  const [joinInterests, setJoinInterests] = useState<Interest[]>(["culture", "food"]);
  const [joinShareUrl, setJoinShareUrl] = useState<string | null>(null);

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

  function toggleJoinRegion(id: string) {
    setJoinRegionIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev;
        return prev.filter((r) => r !== id);
      }
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  }

  function toggleJoinInterest(id: Interest) {
    setJoinInterests((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }

  const grouped = useMemo(() => (plan ? groupByRegion(plan) : null), [plan]);

  const groupResult = useMemo(
    () => (sharedState ? generateGroupTripPlan(sharedState.days, sharedState.travelers) : null),
    [sharedState]
  );
  const groupGrouped = useMemo(() => (groupResult ? groupByRegion(groupResult.plan) : null), [groupResult]);

  function handleShare() {
    const traveler: SharedTraveler = {
      name: travelerName.trim() || "Traveler 1",
      regionIds,
      interests,
    };
    setShareUrl(buildShareUrl({ days, travelers: [traveler] }));
  }

  function handleJoin() {
    if (!sharedState) return;
    const traveler: SharedTraveler = {
      name: joinName.trim() || `Traveler ${sharedState.travelers.length + 1}`,
      regionIds: joinRegionIds,
      interests: joinInterests,
    };
    const nextState: GroupState = {
      days: sharedState.days,
      travelers: [...sharedState.travelers, traveler].slice(0, MAX_TRAVELERS),
    };
    setOverride({ kind: "set", state: nextState });
    setJoinShareUrl(buildShareUrl(nextState));
    setJoinName("");
    // Keep the address bar in sync so a reload or bookmark keeps the group as-is.
    window.history.replaceState(null, "", `?p=${encodeGroupState(nextState)}`);
  }

  // ---- Group trip view (opened via a shared link) -----------------------
  if (sharedState && groupResult && groupGrouped) {
    const travelerCount = sharedState.travelers.length;
    const canJoin = travelerCount < MAX_TRAVELERS;

    return (
      <div className="flex flex-col gap-8">
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="jp text-sm font-semibold text-accent">グループ旅程</p>
              <h2 className="disp mt-1 text-2xl font-semibold">
                A {sharedState.days}-day trip for {travelerCount} {travelerCount === 1 ? "traveler" : "travelers"}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                setOverride({ kind: "clear" });
                setJoinShareUrl(null);
                window.history.replaceState(null, "", window.location.pathname);
              }}
              className="text-sm font-semibold text-muted hover:text-brand"
            >
              Not your trip? Start your own plan
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {sharedState.travelers.map((t, i) => (
              <span key={i} className="rounded-full border border-border bg-paper px-3.5 py-1.5 text-sm font-medium">
                {t.name}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted">
            This plan combines everyone&apos;s picks below — the most-requested regions come first,
            and it covers every interest anyone added.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {Array.from(groupGrouped.entries()).map(([region, dayList]) => (
            <div key={region}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  {dayList[0].regionLabel}
                </p>
                {groupResult.regionRequestedBy[region]?.length ? (
                  <p className="text-xs text-muted">
                    Requested by {groupResult.regionRequestedBy[region].join(", ")}
                  </p>
                ) : null}
              </div>
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
            This is a starting point based on the group&apos;s combined interests, not a fixed
            schedule — opening hours, seasonal events, and travel time between stops aren&apos;t
            included, so build in flexibility.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-accent-soft p-6">
          {canJoin ? (
            <>
              <p className="disp text-lg font-semibold">Add your preferences</p>
              <p className="mt-1 text-sm text-muted">
                Add your own regions and interests — the plan above updates to include them.
              </p>
              <div className="mt-4 flex flex-col gap-5">
                <div>
                  <label className="text-sm font-semibold" htmlFor="join-name">
                    Your name
                  </label>
                  <input
                    id="join-name"
                    type="text"
                    value={joinName}
                    onChange={(e) => setJoinName(e.target.value)}
                    placeholder="e.g. Alex"
                    maxLength={40}
                    className="mt-2 w-full rounded-full border border-border bg-surface px-4 py-2.5 text-sm sm:w-72"
                  />
                </div>
                <RegionInterestChips
                  regionIds={joinRegionIds}
                  interests={joinInterests}
                  onToggleRegion={toggleJoinRegion}
                  onToggleInterest={toggleJoinInterest}
                />
                <button
                  type="button"
                  onClick={handleJoin}
                  className="self-start rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-accent-strong"
                >
                  Add me to the trip
                </button>
              </div>
            </>
          ) : (
            <p className="text-sm text-ink">
              This trip already has the maximum of {MAX_TRAVELERS} travelers.
            </p>
          )}

          {joinShareUrl && (
            <div className="mt-6 border-t border-border pt-5">
              <p className="text-sm font-semibold">You&apos;re in! Share the updated plan</p>
              <p className="mt-1 text-sm text-muted">
                Send this link to the rest of the group so everyone sees the latest version.
              </p>
              <CopyLinkBox url={joinShareUrl} />
            </div>
          )}
        </div>
      </div>
    );
  }

  // ---- Solo planner view (default) ---------------------------------------
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

        <RegionInterestChips
          regionIds={regionIds}
          interests={interests}
          onToggleRegion={toggleRegion}
          onToggleInterest={toggleInterest}
        />

        <button
          type="button"
          onClick={() => {
            setPlan(generateTripPlan({ days, regionIds, interests }));
            setShareUrl(null);
          }}
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

            <div className="rounded-2xl border border-border bg-brand-soft p-6">
              <p className="disp text-lg font-semibold">Share this itinerary with your travel group</p>
              <p className="mt-1 text-sm text-muted">
                Send a link and friends can add their own regions and interests — you&apos;ll get one
                merged plan for the whole group.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
                <div className="flex-1">
                  <label className="text-sm font-semibold" htmlFor="traveler-name">
                    Your name <span className="font-normal text-muted">(shown to friends)</span>
                  </label>
                  <input
                    id="traveler-name"
                    type="text"
                    value={travelerName}
                    onChange={(e) => setTravelerName(e.target.value)}
                    placeholder="e.g. Alex"
                    maxLength={40}
                    className="mt-2 w-full rounded-full border border-border bg-surface px-4 py-2.5 text-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleShare}
                  className="shrink-0 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-strong"
                >
                  Get share link
                </button>
              </div>
              {shareUrl && <CopyLinkBox url={shareUrl} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
