import type { MetadataRoute } from "next";
import { CULTURE_ARTICLES } from "@/lib/data/culture";
import { TRAVEL_ARTICLES } from "@/lib/data/travel-articles";
import { SITE_URL } from "@/lib/site-config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/tools/trip-planner`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/tools/budget-calculator`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/tools/phrase-generator`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/tools/restaurant-helper`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/guide/culture`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/guide/travel`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/about`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const cultureRoutes: MetadataRoute.Sitemap = CULTURE_ARTICLES.map((a) => ({
    url: `${SITE_URL}/guide/culture/${a.slug}`,
    lastModified: a.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const travelRoutes: MetadataRoute.Sitemap = TRAVEL_ARTICLES.map((a) => ({
    url: `${SITE_URL}/guide/travel/${a.slug}`,
    lastModified: a.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...cultureRoutes, ...travelRoutes];
}
