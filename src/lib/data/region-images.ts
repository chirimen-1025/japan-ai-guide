// Real, freely-licensed photography mapped to region keys (see
// TravelArticle["region"] in travel-articles.ts). Only major hub regions
// have a photo so far — the rest of the 47 prefectures will get one
// gradually rather than all at once. An article whose region has no entry
// here simply renders without a hero image; nothing breaks.
export type RegionImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const REGION_IMAGES: Record<string, RegionImage> = {
  tokyo: {
    src: "/photos/meguro-river-sakura.jpg",
    alt: "Cherry blossoms lit up at night along the Meguro River, Tokyo",
    width: 1280,
    height: 854,
  },
  kyoto: {
    src: "/photos/fushimi-inari-torii.jpg",
    alt: "The senbon torii — thousands of vermillion gates — at Fushimi Inari Shrine, Kyoto",
    width: 1280,
    height: 824,
  },
  osaka: {
    src: "/photos/osaka-castle.jpg",
    alt: "Osaka Castle's main tower rising above its stone walls and moat bridge, framed by spring greenery",
    width: 1280,
    height: 854,
  },
  hiroshima: {
    src: "/photos/miyajima-torii.jpg",
    alt: "The vermilion floating torii gate of Itsukushima Shrine standing in the sea at high tide, Miyajima, Hiroshima",
    width: 1280,
    height: 719,
  },
  fukuoka: {
    src: "/photos/fukuoka-canal-city.jpg",
    alt: "The neon-lit skyline around Canal City Hakata reflected in the Naka River at night, Fukuoka",
    width: 1280,
    height: 537,
  },
  hokkaido: {
    src: "/photos/hokkaido-furano-lavender.jpg",
    alt: "Rolling purple lavender fields with visitors walking the path behind, Farm Tomita, Furano, Hokkaido",
    width: 1280,
    height: 856,
  },
  "mt-fuji": {
    src: "/photos/fuji-azalea.jpg",
    alt: "Mount Fuji framed by blooming azaleas near Lake Kawaguchi",
    width: 1152,
    height: 855,
  },
};

export function getRegionImage(region: string): RegionImage | undefined {
  return REGION_IMAGES[region];
}
