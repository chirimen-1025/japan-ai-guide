import { encodeState, decodeState } from "@/lib/url-state";

export type Interest = "food" | "culture" | "nature" | "shopping" | "anime";

export interface DayTemplate {
  id: string;
  region: string;
  title: string;
  interests: Interest[];
  activities: string[];
}

export const REGIONS: { id: string; label: string }[] = [
  { id: "tokyo", label: "Tokyo" },
  { id: "kyoto", label: "Kyoto" },
  { id: "osaka", label: "Osaka" },
  { id: "hiroshima", label: "Hiroshima" },
  { id: "hokkaido", label: "Hokkaido" },
  { id: "fukuoka", label: "Fukuoka" },
  { id: "nara", label: "Nara" },
  { id: "mt-fuji", label: "Mount Fuji" },
];

export const INTERESTS: { id: Interest; label: string }[] = [
  { id: "food", label: "Food" },
  { id: "culture", label: "Culture & History" },
  { id: "nature", label: "Nature & Outdoors" },
  { id: "shopping", label: "Shopping" },
  { id: "anime", label: "Anime & Pop Culture" },
];

// A small, hand-curated pool of day plans per region, tagged by interest.
// The planner below distributes requested days across the visitor's chosen
// regions and picks templates that best match their stated interests — a
// rule-based recommendation, not an AI call, so it's free to run and its
// reasoning is fully inspectable.
const TEMPLATES: DayTemplate[] = [
  { id: "tokyo-asakusa", region: "tokyo", title: "Asakusa & Ueno", interests: ["culture"], activities: ["Senso-ji temple and Nakamise shopping street", "Ueno Park and its museums"] },
  { id: "tokyo-shibuya", region: "tokyo", title: "Shibuya & Harajuku", interests: ["shopping", "culture"], activities: ["Shibuya Crossing", "Harajuku's Takeshita Street", "Meiji Shrine's forested approach"] },
  { id: "tokyo-akihabara", region: "tokyo", title: "Akihabara & Pop Culture", interests: ["anime", "shopping"], activities: ["Akihabara's electronics and anime shops", "A themed cafe", "Retro arcade browsing"] },
  { id: "tokyo-tsukiji", region: "tokyo", title: "Tsukiji & Ginza Food Walk", interests: ["food"], activities: ["Tsukiji Outer Market for fresh seafood and snacks", "Ginza for a proper sushi lunch"] },
  { id: "tokyo-teamlab", region: "tokyo", title: "Odaiba & Digital Art", interests: ["culture", "anime"], activities: ["A digital art museum", "Odaiba waterfront views"] },

  { id: "kyoto-fushimi", region: "kyoto", title: "Fushimi Inari & Southern Kyoto", interests: ["culture", "nature"], activities: ["Fushimi Inari's torii gate trail (go early)", "A quiet local lunch nearby"] },
  { id: "kyoto-higashiyama", region: "kyoto", title: "Higashiyama Historic District", interests: ["culture", "shopping"], activities: ["Kiyomizu-dera temple", "Sannenzaka and Ninenzaka preserved streets", "Traditional craft shops"] },
  { id: "kyoto-arashiyama", region: "kyoto", title: "Arashiyama Bamboo Grove", interests: ["nature", "culture"], activities: ["The bamboo grove path", "Tenryu-ji temple garden", "A riverside walk"] },
  { id: "kyoto-food", region: "kyoto", title: "Nishiki Market Food Crawl", interests: ["food"], activities: ["Nishiki Market's food stalls", "A kaiseki or tofu-focused lunch"] },

  { id: "osaka-dotonbori", region: "osaka", title: "Dotonbori & Street Food", interests: ["food", "shopping"], activities: ["Dotonbori's neon food street", "Takoyaki and okonomiyaki tasting"] },
  { id: "osaka-castle", region: "osaka", title: "Osaka Castle & Umeda", interests: ["culture", "shopping"], activities: ["Osaka Castle grounds", "Umeda Sky Building views"] },
  { id: "osaka-kuromon", region: "osaka", title: "Kuromon Market Food Walk", interests: ["food"], activities: ["Kuromon Ichiba fresh seafood stalls", "Local sake tasting"] },

  { id: "hiroshima-peace", region: "hiroshima", title: "Peace Memorial Park", interests: ["culture"], activities: ["Peace Memorial Park and Museum", "A quiet reflective afternoon"] },
  { id: "hiroshima-miyajima", region: "hiroshima", title: "Miyajima Island", interests: ["nature", "culture"], activities: ["The ferry to Miyajima", "Itsukushima Shrine's floating torii gate", "A hike up Mount Misen"] },

  { id: "hokkaido-sapporo", region: "hokkaido", title: "Sapporo City & Food", interests: ["food", "culture"], activities: ["Sapporo's central market", "A miso ramen lunch", "Odori Park"] },
  { id: "hokkaido-nature", region: "hokkaido", title: "Hokkaido Nature Day", interests: ["nature"], activities: ["A scenic outdoor area outside the city (seasonal — ski fields in winter, flower fields in summer)"] },

  { id: "fukuoka-food", region: "fukuoka", title: "Hakata Food & Yatai Stalls", interests: ["food"], activities: ["Tonkotsu ramen at a local shop", "Evening yatai food stalls along the river"] },
  { id: "fukuoka-culture", region: "fukuoka", title: "Dazaifu & Local Culture", interests: ["culture", "nature"], activities: ["Dazaifu Tenmangu shrine", "A local sweets shop nearby"] },

  { id: "nara-deer", region: "nara", title: "Nara Park & Todai-ji", interests: ["culture", "nature"], activities: ["Nara Park's free-roaming deer", "Todai-ji temple's Great Buddha Hall"] },

  { id: "fuji-view", region: "mt-fuji", title: "Mount Fuji Views", interests: ["nature"], activities: ["Chureito Pagoda viewpoint", "A walk around Lake Kawaguchiko"] },
];

export interface PlanDay {
  dayNumber: number;
  region: string;
  regionLabel: string;
  title: string;
  activities: string[];
}

export function generateTripPlan(opts: {
  days: number;
  regionIds: string[];
  interests: Interest[];
}): PlanDay[] {
  const days = Math.max(1, Math.min(21, Math.round(opts.days)));
  const regionIds = opts.regionIds.length ? opts.regionIds : ["tokyo"];
  const interests = opts.interests;

  // Distribute days evenly across the chosen regions, giving any remainder
  // to the earlier regions in the list (usually the visitor's priority).
  const base = Math.floor(days / regionIds.length);
  const remainder = days % regionIds.length;
  const allocation = regionIds.map((r, i) => ({ region: r, count: base + (i < remainder ? 1 : 0) }));

  const used = new Set<string>();
  const plan: PlanDay[] = [];
  let dayNumber = 1;

  for (const { region, count } of allocation) {
    const pool = TEMPLATES.filter((t) => t.region === region);
    const regionLabel = REGIONS.find((r) => r.id === region)?.label ?? region;

    for (let i = 0; i < count; i++) {
      const candidates = pool.filter((t) => !used.has(t.id));
      const source = candidates.length ? candidates : pool;

      let pick: DayTemplate | undefined;
      if (interests.length) {
        pick = [...source].sort(
          (a, b) =>
            b.interests.filter((x) => interests.includes(x)).length -
            a.interests.filter((x) => interests.includes(x)).length
        )[0];
      } else {
        pick = source[0];
      }
      if (!pick) pick = pool[i % pool.length];
      if (!pick) continue;

      used.add(pick.id);
      plan.push({
        dayNumber,
        region,
        regionLabel,
        title: pick.title,
        activities: pick.activities,
      });
      dayNumber += 1;
    }
  }

  return plan;
}

// ---------------------------------------------------------------------
// Group trip planning: share a link, everyone adds their own regions and
// interests, and the plan above regenerates from the combined group. This
// is a rule-based merge (see mergeTravelerPreferences), not an AI call —
// deliberately, so it stays free to run and its logic stays inspectable,
// consistent with every other tool on this site. The whole group's state
// lives in the share link itself (via url-state.ts) — no account, no
// database, no server.
// ---------------------------------------------------------------------

export interface SharedTraveler {
  name: string;
  regionIds: string[];
  interests: Interest[];
}

export interface GroupState {
  days: number;
  travelers: SharedTraveler[];
}

// Keeps the trip focused (matches the solo planner's own "up to 3 regions"
// guidance) and keeps the share link from growing without bound.
export const MAX_GROUP_REGIONS = 4;
export const MAX_TRAVELERS = 6;

export interface GroupMergeResult {
  regionIds: string[];
  interests: Interest[];
  // Which travelers asked for each region, for the "requested by" note in
  // the UI — this is what makes the merge feel like it actually listened,
  // rather than just silently mixing everyone together.
  regionRequestedBy: Record<string, string[]>;
}

export function mergeTravelerPreferences(travelers: SharedTraveler[]): GroupMergeResult {
  const regionCount = new Map<string, number>();
  const regionRequestedBy: Record<string, string[]> = {};
  const interestSet = new Set<Interest>();

  for (const t of travelers) {
    for (const r of t.regionIds) {
      regionCount.set(r, (regionCount.get(r) ?? 0) + 1);
      (regionRequestedBy[r] ??= []).push(t.name);
    }
    for (const i of t.interests) interestSet.add(i);
  }

  // Most-requested regions first (ties keep first-requested order), capped
  // so a big group doesn't spread a short trip across too many cities.
  const regionIds = [...regionCount.keys()]
    .sort((a, b) => (regionCount.get(b) ?? 0) - (regionCount.get(a) ?? 0))
    .slice(0, MAX_GROUP_REGIONS);

  return {
    regionIds: regionIds.length ? regionIds : ["tokyo"],
    interests: [...interestSet],
    regionRequestedBy,
  };
}

export interface GroupPlanResult extends GroupMergeResult {
  plan: PlanDay[];
}

export function generateGroupTripPlan(days: number, travelers: SharedTraveler[]): GroupPlanResult {
  const merged = mergeTravelerPreferences(travelers);
  const plan = generateTripPlan({ days, regionIds: merged.regionIds, interests: merged.interests });
  return { ...merged, plan };
}

// Wire format uses short keys purely to keep the shared URL shorter —
// "d"/"t"/"n"/"r"/"i" rather than "days"/"travelers"/"name"/... The rest of
// the app never sees this shape; encodeGroupState/decodeGroupState are the
// only places it exists.
interface GroupStateWire {
  d: number;
  t: { n: string; r: string[]; i: string[] }[];
}

export function encodeGroupState(state: GroupState): string {
  const wire: GroupStateWire = {
    d: state.days,
    t: state.travelers.map((tr) => ({ n: tr.name, r: tr.regionIds, i: tr.interests })),
  };
  return encodeState(wire);
}

export function decodeGroupState(encoded: string): GroupState | null {
  const wire = decodeState<GroupStateWire>(encoded);
  if (!wire || typeof wire.d !== "number" || !Array.isArray(wire.t)) return null;
  const days = Math.max(1, Math.min(21, Math.round(wire.d)));
  const travelers: SharedTraveler[] = wire.t
    .filter((t) => t && Array.isArray(t.r) && Array.isArray(t.i))
    .slice(0, MAX_TRAVELERS)
    .map((t, i) => ({
      name: typeof t.n === "string" && t.n.trim() ? t.n.trim().slice(0, 40) : `Traveler ${i + 1}`,
      regionIds: t.r.filter((r): r is string => typeof r === "string" && REGIONS.some((rg) => rg.id === r)),
      interests: t.i.filter((x): x is Interest => INTERESTS.some((it) => it.id === x)),
    }));
  if (!travelers.length) return null;
  return { days, travelers };
}
