// Rule-based data for the Transport Helper tool. No AI call, no live
// timetable/pricing API — deliberately limited to general, stable facts
// (which modes exist, roughly how they compare) rather than exact fares
// or schedules, which change and which this tool must not fabricate.

export interface TransportOption {
  method: string;
  description: string;
  approxDuration: string;
  whatToSearch: string;
}

export interface TransportRoute {
  id: string;
  from: string;
  to: string;
  options: TransportOption[];
}

export const TRANSPORT_ROUTES: TransportRoute[] = [
  {
    id: "tokyo-kyoto",
    from: "Tokyo",
    to: "Kyoto",
    options: [
      {
        method: "Shinkansen (bullet train)",
        description:
          "The Tokaido Shinkansen runs directly between Tokyo and Kyoto stations, multiple times per hour.",
        approxDuration: "Roughly 2–3 hours depending on train type (Nozomi is fastest).",
        whatToSearch: "\"Tokyo to Kyoto shinkansen fare\" or the JR Central website for current pricing.",
      },
      {
        method: "Highway bus",
        description: "Overnight and daytime buses run between Tokyo and Kyoto, much cheaper than the Shinkansen but far slower.",
        approxDuration: "Roughly 7–9 hours.",
        whatToSearch: "\"Willer Express Tokyo Kyoto\" or similar highway bus booking sites.",
      },
      {
        method: "Domestic flight",
        description: "Flies into Osaka (Itami or Kansai) rather than Kyoto itself, which has no airport — add train/bus time from there.",
        approxDuration: "Roughly 1 hour flight + 1 hour onward transit.",
        whatToSearch: "\"Haneda to Osaka flights\" — usually only worth it over the Shinkansen for very tight budgets or schedules.",
      },
    ],
  },
  {
    id: "tokyo-osaka",
    from: "Tokyo",
    to: "Osaka",
    options: [
      {
        method: "Shinkansen (bullet train)",
        description: "Direct Tokaido Shinkansen service to Shin-Osaka station.",
        approxDuration: "Roughly 2.5–3 hours.",
        whatToSearch: "\"Tokyo to Shin-Osaka shinkansen fare.\"",
      },
      {
        method: "Domestic flight",
        description: "Flies to Itami or Kansai airport; competitive with the Shinkansen on price if booked ahead.",
        approxDuration: "Roughly 1–1.5 hours flight + airport transit time.",
        whatToSearch: "\"Haneda to Osaka flights\" — compare total door-to-door time against the Shinkansen, not just flight time.",
      },
      {
        method: "Highway bus",
        description: "The cheapest option, including overnight buses that save a hotel night.",
        approxDuration: "Roughly 8–9 hours.",
        whatToSearch: "\"Tokyo to Osaka overnight bus.\"",
      },
    ],
  },
  {
    id: "kyoto-osaka",
    from: "Kyoto",
    to: "Osaka",
    options: [
      {
        method: "Local/rapid train (JR or private rail)",
        description: "Several train lines connect Kyoto and Osaka directly — close enough to be a common day-trip pair.",
        approxDuration: "Roughly 30–45 minutes depending on line and train type.",
        whatToSearch: "\"Kyoto to Osaka train\" in a transit app like Google Maps or Navitime.",
      },
    ],
  },
  {
    id: "tokyo-airport-city",
    from: "Tokyo (Narita/Haneda)",
    to: "Tokyo city center",
    options: [
      {
        method: "Airport train (Narita Express / Keisei Skyliner / Tokyo Monorail / Keikyu)",
        description:
          "From Narita: Narita Express or Keisei Skyliner. From Haneda: Tokyo Monorail or Keikyu Line, both connecting to the JR/subway network.",
        approxDuration: "Narita: roughly 1–1.5 hours. Haneda: roughly 30–45 minutes.",
        whatToSearch: "\"Narita Express\" or \"Haneda monorail\" for current routes and fares.",
      },
      {
        method: "Airport limousine bus",
        description: "Direct bus service to major hotels and stations, no transfers needed but slower in traffic.",
        approxDuration: "Narita: roughly 1.5–2 hours. Haneda: roughly 30–60 minutes.",
        whatToSearch: "\"Airport Limousine Bus Tokyo\" for routes and current fares.",
      },
      {
        method: "Taxi",
        description: "Available but notably expensive from Narita in particular — usually only worth it late at night or with heavy luggage and a group splitting the cost.",
        approxDuration: "Narita: roughly 1–1.5 hours depending on traffic. Haneda: roughly 30–45 minutes.",
        whatToSearch: "Ask hotel staff for a current fare estimate, since it varies by traffic and exact destination.",
      },
    ],
  },
  {
    id: "osaka-airport-city",
    from: "Osaka (Kansai Airport)",
    to: "Osaka city center",
    options: [
      {
        method: "Airport train (JR Kansai Airport Rapid / Nankai Line)",
        description: "Two competing rail lines connect Kansai Airport to central Osaka — JR toward Osaka/Kyoto side, Nankai toward Namba.",
        approxDuration: "Roughly 40–60 minutes depending on line and train type.",
        whatToSearch: "\"Kansai Airport to Osaka train\" — check which line matches your hotel's side of the city.",
      },
      {
        method: "Airport limousine bus",
        description: "Direct bus service to major hotels, useful with a lot of luggage.",
        approxDuration: "Roughly 45–60 minutes depending on traffic and destination.",
        whatToSearch: "\"Kansai Airport limousine bus\" for routes and current fares.",
      },
    ],
  },
  {
    id: "tokyo-hakone",
    from: "Tokyo",
    to: "Hakone",
    options: [
      {
        method: "Odakyu Romancecar (direct express train)",
        description: "A direct, reserved-seat express train from Shinjuku to Hakone-Yumoto — the most common way tourists make this trip.",
        approxDuration: "Roughly 1.5–2 hours.",
        whatToSearch: "\"Odakyu Romancecar\" and \"Hakone Freepass\", which bundles the trip with local Hakone transport and sightseeing discounts.",
      },
      {
        method: "Shinkansen + local transfer",
        description: "Faster to Odawara, but then requires a transfer onto local Hakone transport (bus, train, or ropeway) to reach specific sights.",
        approxDuration: "Roughly 35 minutes to Odawara, plus local transfer time.",
        whatToSearch: "\"Tokyo to Odawara shinkansen\" if going straight to a specific Hakone sight rather than starting from Hakone-Yumoto.",
      },
    ],
  },
  {
    id: "tokyo-nikko",
    from: "Tokyo",
    to: "Nikko",
    options: [
      {
        method: "Tobu Railway (direct or rapid limited express)",
        description: "Direct trains from Asakusa to Tobu-Nikko station — the standard way to reach Nikko from central Tokyo.",
        approxDuration: "Roughly 2 hours on the limited express, longer on slower services.",
        whatToSearch: "\"Tobu Nikko pass\", which bundles the round-trip with local Nikko bus transport at a discount.",
      },
      {
        method: "JR train + transfer",
        description: "JR Shinkansen to Utsunomiya, then a transfer onto a local JR line to Nikko — usually only worth it if a JR Pass already covers most of the fare.",
        approxDuration: "Roughly 2 hours including the transfer.",
        whatToSearch: "\"Tokyo to Nikko JR route\" if you already hold a JR Pass.",
      },
    ],
  },
  {
    id: "tokyo-hiroshima",
    from: "Tokyo",
    to: "Hiroshima",
    options: [
      {
        method: "Shinkansen (bullet train)",
        description: "A long but direct Shinkansen ride, often broken up with a stopover in Kyoto or Osaka along the way.",
        approxDuration: "Roughly 4–5 hours direct.",
        whatToSearch: "\"Tokyo to Hiroshima shinkansen fare\" — a JR Pass often makes this leg noticeably cheaper if your trip includes several long-distance legs.",
      },
      {
        method: "Domestic flight",
        description: "Usually faster overall than the Shinkansen for this specific long distance once airport transit is factored in, though less scenic.",
        approxDuration: "Roughly 1.5 hours flight + airport transit time.",
        whatToSearch: "\"Haneda to Hiroshima flights.\"",
      },
    ],
  },
  {
    id: "osaka-hiroshima",
    from: "Osaka",
    to: "Hiroshima",
    options: [
      {
        method: "Shinkansen (bullet train)",
        description: "Direct Sanyo Shinkansen service from Shin-Osaka to Hiroshima.",
        approxDuration: "Roughly 1.5–2 hours.",
        whatToSearch: "\"Shin-Osaka to Hiroshima shinkansen fare.\"",
      },
      {
        method: "Highway bus",
        description: "Cheaper and much slower — mainly worth it on a tight budget.",
        approxDuration: "Roughly 5–6 hours.",
        whatToSearch: "\"Osaka to Hiroshima highway bus.\"",
      },
    ],
  },
];

// Routes are stored one-directional but treated as bidirectional here —
// the transport options between two cities don't meaningfully change
// with direction, and duplicating every route in reverse would just be
// the same data typed twice.
export function getTransportRoute(from: string, to: string): TransportRoute | undefined {
  return TRANSPORT_ROUTES.find(
    (r) => (r.from === from && r.to === to) || (r.from === to && r.to === from)
  );
}

export const TRANSPORT_CITIES = Array.from(
  new Set(TRANSPORT_ROUTES.flatMap((r) => [r.from, r.to]))
).sort();
