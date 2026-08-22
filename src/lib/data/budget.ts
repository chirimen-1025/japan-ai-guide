export interface BudgetTier {
  id: "budget" | "standard" | "luxury";
  label: string;
  description: string;
  perPersonPerDayJpy: [number, number];
  breakdown: { label: string; range: [number, number] }[];
}

// Rough, clearly-labeled per-person daily cost RANGES, not exact prices —
// actual costs vary by season, city, and exchange rate, which is why every
// result screen says to treat this as a planning estimate, not a quote.
export const BUDGET_TIERS: BudgetTier[] = [
  {
    id: "budget",
    label: "Budget",
    description: "Hostels/capsule hotels, convenience stores & casual chains, mostly trains and buses.",
    perPersonPerDayJpy: [8000, 13000],
    breakdown: [
      { label: "Lodging", range: [2500, 5000] },
      { label: "Food", range: [2500, 4000] },
      { label: "Local transport", range: [1000, 2000] },
      { label: "Activities & misc", range: [2000, 2000] },
    ],
  },
  {
    id: "standard",
    label: "Standard",
    description: "Business hotels, a mix of casual and sit-down restaurants, regular sightseeing.",
    perPersonPerDayJpy: [15000, 25000],
    breakdown: [
      { label: "Lodging", range: [6000, 12000] },
      { label: "Food", range: [4000, 6000] },
      { label: "Local transport", range: [1500, 3000] },
      { label: "Activities & misc", range: [3500, 4000] },
    ],
  },
  {
    id: "luxury",
    label: "Luxury",
    description: "4–5 star hotels or ryokan with kaiseki dinners, taxis, premium experiences.",
    perPersonPerDayJpy: [35000, 70000],
    breakdown: [
      { label: "Lodging", range: [18000, 40000] },
      { label: "Food", range: [8000, 15000] },
      { label: "Local transport", range: [3000, 6000] },
      { label: "Activities & misc", range: [6000, 9000] },
    ],
  },
];

export interface BudgetResult {
  tier: BudgetTier;
  lowTotal: number;
  highTotal: number;
}

export function calculateBudget(opts: { days: number; people: number }): BudgetResult[] {
  const days = Math.max(1, Math.min(60, Math.round(opts.days)));
  const people = Math.max(1, Math.min(20, Math.round(opts.people)));

  return BUDGET_TIERS.map((tier) => ({
    tier,
    lowTotal: tier.perPersonPerDayJpy[0] * days * people,
    highTotal: tier.perPersonPerDayJpy[1] * days * people,
  }));
}

export function formatJpy(n: number): string {
  return "¥" + Math.round(n).toLocaleString("en-US");
}
