import { encodeState, decodeState } from "@/lib/url-state";
import { getRegionCoordinate } from "@/lib/data/region-coordinates";

// A visitor's saved "places I want to go" list for the Trip Map tool. It's
// built up one "Add to Trip Map" click at a time across however many
// article pages a visitor browses, so — unlike the rest of this site's
// state, which lives in a shareable link — it needs to persist across
// separate page loads on its own. localStorage is the right tool for that
// (a per-browser cart), and the Trip Map page additionally offers a
// shareable link (via the same encodeState/decodeState every other "share
// this" link on the site uses) for sending the list to someone else.

export interface TripMapEntry {
  slug: string;
  region: string;
  regionLabel: string;
  title: string;
}

const STORAGE_KEY = "japan-ai-guide:trip-map";
const MAX_ENTRIES = 20;
export const TRIP_MAP_CHANGE_EVENT = "trip-map:change";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function isTripMapEntry(value: unknown): value is TripMapEntry {
  if (!value || typeof value !== "object") return false;
  const e = value as Record<string, unknown>;
  return (
    typeof e.slug === "string" &&
    typeof e.region === "string" &&
    typeof e.regionLabel === "string" &&
    typeof e.title === "string"
  );
}

function readTripMapListFromStorage(): TripMapEntry[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isTripMapEntry);
  } catch {
    // Malformed storage, or storage unavailable (private browsing, quota,
    // a browser extension blocking it) — treat it as an empty list.
    return [];
  }
}

// A cached snapshot for useSyncExternalStore: it requires getSnapshot to
// return a referentially stable value between calls when nothing has
// changed (readTripMapListFromStorage's own array would otherwise look
// "new" on every render and cause an infinite re-render loop). The cache is
// refreshed only when writeTripMapList runs or an external "storage" event
// (another tab) fires.
const EMPTY_LIST: TripMapEntry[] = [];
let cachedList: TripMapEntry[] | null = null;

export function readTripMapList(): TripMapEntry[] {
  if (cachedList === null) cachedList = readTripMapListFromStorage();
  return cachedList;
}

export function getTripMapSnapshot(): TripMapEntry[] {
  return readTripMapList();
}

export function getTripMapServerSnapshot(): TripMapEntry[] {
  return EMPTY_LIST;
}

export function subscribeToTripMapList(callback: () => void): () => void {
  function handleChange() {
    cachedList = readTripMapListFromStorage();
    callback();
  }
  window.addEventListener(TRIP_MAP_CHANGE_EVENT, handleChange);
  window.addEventListener("storage", handleChange);
  return () => {
    window.removeEventListener(TRIP_MAP_CHANGE_EVENT, handleChange);
    window.removeEventListener("storage", handleChange);
  };
}

function writeTripMapList(list: TripMapEntry[]): TripMapEntry[] {
  const next = list.slice(0, MAX_ENTRIES);
  cachedList = next;
  if (isBrowser()) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Couldn't persist — the in-memory cache above still reflects the
      // change for this page view, it just won't survive navigation.
    }
    // "storage" events only fire in other tabs, not the one that made the
    // change, so a custom event lets any Trip Map view open in this same
    // tab update immediately after an Add/Remove button click elsewhere.
    window.dispatchEvent(new Event(TRIP_MAP_CHANGE_EVENT));
  }
  return next;
}

export function addToTripMapList(entry: TripMapEntry): TripMapEntry[] {
  const list = readTripMapList();
  if (list.some((e) => e.slug === entry.slug)) return list;
  return writeTripMapList([...list, entry]);
}

export function removeFromTripMapList(slug: string): TripMapEntry[] {
  return writeTripMapList(readTripMapList().filter((e) => e.slug !== slug));
}

export function moveTripMapEntry(index: number, direction: -1 | 1): TripMapEntry[] {
  const list = readTripMapList();
  const target = index + direction;
  if (index < 0 || index >= list.length || target < 0 || target >= list.length) return list;
  const next = [...list];
  [next[index], next[target]] = [next[target], next[index]];
  return writeTripMapList(next);
}

export function clearTripMapList(): TripMapEntry[] {
  return writeTripMapList([]);
}

export function replaceTripMapList(list: TripMapEntry[]): TripMapEntry[] {
  return writeTripMapList(list.filter(isTripMapEntry));
}

export function encodeTripMapList(list: TripMapEntry[]): string {
  return encodeState(list);
}

export function decodeTripMapList(encoded: string): TripMapEntry[] | null {
  const parsed = decodeState<unknown>(encoded);
  if (!Array.isArray(parsed)) return null;
  const list = parsed.filter(isTripMapEntry).slice(0, MAX_ENTRIES);
  return list.length ? list : null;
}

// ---------------------------------------------------------------------
// Distance & rough day-count estimate.
//
// This is a straight-line (haversine) distance converted into a rough
// travel-time bucket, not a real routing engine — deliberately, in keeping
// with every other tool on this site: free to run, no API key or external
// service, and its reasoning is fully inspectable rather than a black-box
// call. Treat the result as a starting point for planning, not a booked
// itinerary — actual train/flight times depend on the specific route and
// connections available.
// ---------------------------------------------------------------------

function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

// Rough one-way travel time for a hop of this straight-line distance,
// assuming a realistic mix of transport for Japan (local trains for short
// hops, Shinkansen or a domestic flight for longer ones), including a fixed
// overhead for stations/airports and transfers.
function estimateHopHours(km: number): number {
  if (km < 60) return 1.5;
  if (km < 200) return 2.5;
  if (km < 450) return 4;
  if (km < 800) return 5;
  return 6.5; // e.g. mainland <-> Hokkaido/Okinawa — effectively a flight day
}

// A hop long enough that it realistically can't share a day with full
// sightseeing at both ends gets counted as its own dedicated travel day;
// shorter hops are assumed to fit alongside a sightseeing day at one end.
const HOP_EATS_OWN_DAY_THRESHOLD_HOURS = 4;

export interface ItineraryHop {
  fromLabel: string;
  toLabel: string;
  km: number;
  hours: number;
  eatsOwnDay: boolean;
}

export interface ItineraryEstimate {
  stopCount: number;
  sightseeingDays: number;
  travelDays: number;
  totalDays: number;
  hops: ItineraryHop[];
}

export function estimateItinerary(
  points: { label: string; region: string }[]
): ItineraryEstimate | null {
  const coords = points
    .map((p) => {
      const c = getRegionCoordinate(p.region);
      return c ? { ...p, ...c } : null;
    })
    .filter((p): p is { label: string; region: string; lat: number; lng: number } => p !== null);

  if (coords.length === 0) return null;

  const hops: ItineraryHop[] = [];
  let travelDays = 0;
  for (let i = 0; i < coords.length - 1; i++) {
    const a = coords[i];
    const b = coords[i + 1];
    const km = haversineKm(a, b);
    const hours = estimateHopHours(km);
    const eatsOwnDay = hours >= HOP_EATS_OWN_DAY_THRESHOLD_HOURS;
    if (eatsOwnDay) travelDays += 1;
    hops.push({ fromLabel: a.label, toLabel: b.label, km: Math.round(km), hours, eatsOwnDay });
  }

  const sightseeingDays = coords.length; // a full day per stop, at minimum
  return {
    stopCount: coords.length,
    sightseeingDays,
    travelDays,
    totalDays: sightseeingDays + travelDays,
    hops,
  };
}
