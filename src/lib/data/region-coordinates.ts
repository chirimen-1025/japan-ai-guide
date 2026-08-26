// Approximate coordinates for every "region" key used across the travel
// guide, at prefectural-capital precision. These power the Trip Map tool's
// straight-line distance and rough day-count estimates — they are meant to
// place a region on a small schematic map and compare how far apart two
// stops are, not to pinpoint the exact attraction a given article describes.
//
// The 47 prefectures (plus the standalone "mt-fuji" region already used
// elsewhere on the site) use their prefectural capital's coordinates. The
// handful of nationwide/seasonal "regions" below that aren't tied to a
// single prefecture each reuse the coordinate of the prefecture behind their
// hero photo in region-images.ts — the same already-chosen representative
// place, rather than an arbitrary center of Japan.

export interface RegionCoordinate {
  lat: number;
  lng: number;
}

export const REGION_COORDINATES: Record<string, RegionCoordinate> = {
  // Prefectures (and Tokyo/Hokkaido/Okinawa, which aren't technically
  // "prefectures" in the strictest legal sense but are treated the same way
  // as every other region key on this site).
  tokyo: { lat: 35.6762, lng: 139.6503 },
  kyoto: { lat: 35.0116, lng: 135.7681 },
  osaka: { lat: 34.6937, lng: 135.5023 },
  nara: { lat: 34.6851, lng: 135.8048 },
  hiroshima: { lat: 34.3853, lng: 132.4553 },
  fukuoka: { lat: 33.5904, lng: 130.4017 },
  hokkaido: { lat: 43.0618, lng: 141.3545 },
  "mt-fuji": { lat: 35.3606, lng: 138.7274 },
  aomori: { lat: 40.8244, lng: 140.74 },
  iwate: { lat: 39.7036, lng: 141.1527 },
  miyagi: { lat: 38.2682, lng: 140.8694 },
  akita: { lat: 39.7186, lng: 140.1024 },
  yamagata: { lat: 38.2404, lng: 140.3633 },
  fukushima: { lat: 37.7503, lng: 140.4676 },
  ibaraki: { lat: 36.3418, lng: 140.4468 },
  tochigi: { lat: 36.5658, lng: 139.8836 },
  gunma: { lat: 36.3906, lng: 139.0604 },
  saitama: { lat: 35.8617, lng: 139.6455 },
  chiba: { lat: 35.6074, lng: 140.1065 },
  kanagawa: { lat: 35.4437, lng: 139.638 },
  niigata: { lat: 37.9026, lng: 139.0231 },
  toyama: { lat: 36.6953, lng: 137.2113 },
  ishikawa: { lat: 36.5613, lng: 136.6562 },
  fukui: { lat: 36.0652, lng: 136.2216 },
  yamanashi: { lat: 35.6642, lng: 138.5683 },
  nagano: { lat: 36.6513, lng: 138.181 },
  gifu: { lat: 35.3912, lng: 136.7223 },
  shizuoka: { lat: 34.9756, lng: 138.3828 },
  aichi: { lat: 35.1815, lng: 136.9066 },
  mie: { lat: 34.7303, lng: 136.5086 },
  shiga: { lat: 35.0045, lng: 135.8686 },
  hyogo: { lat: 34.6913, lng: 135.183 },
  wakayama: { lat: 34.2306, lng: 135.1708 },
  tottori: { lat: 35.5039, lng: 134.2377 },
  shimane: { lat: 35.4723, lng: 133.0505 },
  okayama: { lat: 34.6551, lng: 133.9195 },
  yamaguchi: { lat: 34.1858, lng: 131.4714 },
  tokushima: { lat: 34.0658, lng: 134.5593 },
  kagawa: { lat: 34.3401, lng: 134.0434 },
  ehime: { lat: 33.8416, lng: 132.7657 },
  kochi: { lat: 33.5597, lng: 133.5311 },
  saga: { lat: 33.2494, lng: 130.2988 },
  nagasaki: { lat: 32.7448, lng: 129.8737 },
  kumamoto: { lat: 32.7898, lng: 130.7417 },
  oita: { lat: 33.2382, lng: 131.6126 },
  miyazaki: { lat: 31.9111, lng: 131.4239 },
  kagoshima: { lat: 31.5966, lng: 130.5571 },
  okinawa: { lat: 26.2124, lng: 127.6809 },

  // Nationwide/seasonal guides aren't tied to a single place — each reuses
  // the coordinate of the prefecture behind its hero photo (see
  // region-images.ts) so the point shown is at least a real, already-chosen
  // representative location rather than an arbitrary pick.
  "sakura-season": { lat: 35.6642, lng: 138.5683 }, // Yamanashi (Chureito Pagoda)
  "autumn-leaves-season": { lat: 38.2404, lng: 140.3633 }, // Yamagata (Yamadera)
  "winter-travel": { lat: 35.3912, lng: 136.7223 }, // Gifu (Shirakawa-go)
  "new-year-in-japan": { lat: 35.6074, lng: 140.1065 }, // Chiba (Naritasan)
  "winter-illuminations": { lat: 43.0618, lng: 141.3545 }, // Hokkaido (Sapporo)
  "hatsumode-crowds": { lat: 35.0116, lng: 135.7681 }, // Kyoto (Fushimi Inari)
  "plum-blossom-season": { lat: 36.3418, lng: 140.4468 }, // Ibaraki (Kairakuen)
  "typhoon-season-travel": { lat: 26.2124, lng: 127.6809 }, // Okinawa (Kabira Bay)
  "ski-snowboard-season": { lat: 36.6513, lng: 138.181 }, // Nagano (Jigokudani)
  "coming-of-age-day": { lat: 35.0116, lng: 135.7681 }, // Kyoto (Fushimi Inari)
  "great-night-views": { lat: 43.0618, lng: 141.3545 }, // Hokkaido (Sapporo)
  "scenic-beauty-spots": { lat: 36.5613, lng: 136.6562 }, // Ishikawa (Kenrokuen)
  "ad-famous-scenic-spots": { lat: 34.1858, lng: 131.4714 }, // Yamaguchi (Motonosumi)
};

export function getRegionCoordinate(region: string): RegionCoordinate | undefined {
  return REGION_COORDINATES[region];
}
