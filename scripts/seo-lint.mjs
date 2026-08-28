#!/usr/bin/env node
/**
 * SEO lint — runs in CI on every push to main.
 *
 * Checks src/lib/data/travel-articles.ts and src/lib/data/culture.ts for the
 * on-page SEO conventions established for this site:
 *   - title length <= 60 chars (raw title, before the " | Japan AI Guide" suffix)
 *   - metaDescription / culture summary length between 120 and 160 chars
 *   - every travel article has at least one relatedSlugs entry (no dead ends)
 *   - every travel article is referenced by at least one other article's
 *     relatedSlugs (no orphan pages)
 *   - every relatedSlugs / relatedCultureSlugs entry points at a slug that
 *     actually exists (no broken internal links)
 *
 * This is a plain-Node, regex-based parser (no TS runtime required in CI) —
 * it relies on the consistent field layout the data files already use.
 * Exits non-zero (failing the workflow) if any violation is found.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const TITLE_MAX = 60;
const META_MIN = 120;
const META_MAX = 160;

let violations = [];

function unescape(str) {
  return str.replace(/\\"/g, '"').replace(/\\n/g, "\n");
}

function extractField(chunk, field) {
  // Handles both `field: "value"` and `field:\n      "value"` layouts.
  const re = new RegExp(`${field}:\\s*\\n?\\s*"((?:[^"\\\\]|\\\\.)*)"`, "s");
  const m = chunk.match(re);
  return m ? unescape(m[1]) : null;
}

function extractStringArray(chunk, field) {
  const re = new RegExp(`${field}:\\s*\\[([^\\]]*)\\]`, "s");
  const m = chunk.match(re);
  if (!m) return [];
  const inner = m[1];
  const items = [...inner.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((x) => unescape(x[1]));
  return items;
}

function splitTopLevelObjects(arraySource) {
  // Top-level article/culture objects are each opened by a line that is
  // exactly "  {" (two-space indent) inside the exported array.
  const starts = [];
  const re = /\n  \{\n/g;
  let m;
  while ((m = re.exec(arraySource))) {
    starts.push(m.index + 1); // position of the "  {" line start
  }
  const chunks = [];
  for (let i = 0; i < starts.length; i++) {
    const start = starts[i];
    const end = i + 1 < starts.length ? starts[i + 1] : arraySource.length;
    chunks.push(arraySource.slice(start, end));
  }
  return chunks;
}

// ---- Travel articles ----

const travelSrc = readFileSync(join(ROOT, "src/lib/data/travel-articles.ts"), "utf8");
const travelArrayMatch = travelSrc.match(
  /export const TRAVEL_ARTICLES: TravelArticle\[\] = \[([\s\S]*)\n\];/
);
if (!travelArrayMatch) {
  console.error("seo-lint: could not locate TRAVEL_ARTICLES array — aborting.");
  process.exit(1);
}
const travelChunks = splitTopLevelObjects(travelArrayMatch[1]);

const articles = travelChunks.map((chunk) => ({
  slug: extractField(chunk, "slug"),
  title: extractField(chunk, "title"),
  metaDescription: extractField(chunk, "metaDescription"),
  relatedSlugs: extractStringArray(chunk, "relatedSlugs"),
  relatedCultureSlugs: extractStringArray(chunk, "relatedCultureSlugs"),
}));

const travelSlugs = new Set(articles.map((a) => a.slug));
const inboundCount = new Map(articles.map((a) => [a.slug, 0]));

for (const a of articles) {
  if (!a.slug) continue;

  if (!a.title) {
    violations.push(`[travel:${a.slug}] missing title`);
  } else if (a.title.length > TITLE_MAX) {
    violations.push(`[travel:${a.slug}] title is ${a.title.length} chars (max ${TITLE_MAX}): "${a.title}"`);
  }

  if (!a.metaDescription) {
    violations.push(`[travel:${a.slug}] missing metaDescription`);
  } else if (a.metaDescription.length < META_MIN || a.metaDescription.length > META_MAX) {
    violations.push(
      `[travel:${a.slug}] metaDescription is ${a.metaDescription.length} chars (want ${META_MIN}-${META_MAX})`
    );
  }

  if (a.relatedSlugs.length === 0) {
    violations.push(`[travel:${a.slug}] has no outbound relatedSlugs (dead end)`);
  }

  for (const target of a.relatedSlugs) {
    if (!travelSlugs.has(target)) {
      violations.push(`[travel:${a.slug}] relatedSlugs references unknown slug "${target}"`);
      continue;
    }
    inboundCount.set(target, (inboundCount.get(target) ?? 0) + 1);
  }
}

for (const a of articles) {
  if (!a.slug) continue;
  if ((inboundCount.get(a.slug) ?? 0) === 0) {
    violations.push(`[travel:${a.slug}] is an orphan page (0 inbound relatedSlugs links)`);
  }
}

// ---- Culture articles ----

const cultureSrc = readFileSync(join(ROOT, "src/lib/data/culture.ts"), "utf8");
const cultureArrayMatch = cultureSrc.match(
  /export const CULTURE_ARTICLES: CultureArticle\[\] = \[([\s\S]*)\n\];/
);
if (!cultureArrayMatch) {
  console.error("seo-lint: could not locate CULTURE_ARTICLES array — aborting.");
  process.exit(1);
}
const cultureChunks = splitTopLevelObjects(cultureArrayMatch[1]);
const cultureArticles = cultureChunks.map((chunk) => ({
  slug: extractField(chunk, "slug"),
  title: extractField(chunk, "title"),
  summary: extractField(chunk, "summary"),
}));
const cultureSlugs = new Set(cultureArticles.map((a) => a.slug));

for (const a of cultureArticles) {
  if (!a.slug) continue;
  if (!a.title) {
    violations.push(`[culture:${a.slug}] missing title`);
  } else if (a.title.length > TITLE_MAX) {
    violations.push(`[culture:${a.slug}] title is ${a.title.length} chars (max ${TITLE_MAX}): "${a.title}"`);
  }
  if (!a.summary) {
    violations.push(`[culture:${a.slug}] missing summary`);
  } else if (a.summary.length < META_MIN || a.summary.length > META_MAX) {
    violations.push(`[culture:${a.slug}] summary is ${a.summary.length} chars (want ${META_MIN}-${META_MAX})`);
  }
}

// Cross-check relatedCultureSlugs point at real culture articles.
for (const a of articles) {
  for (const target of a.relatedCultureSlugs) {
    if (!cultureSlugs.has(target)) {
      violations.push(`[travel:${a.slug}] relatedCultureSlugs references unknown culture slug "${target}"`);
    }
  }
}

// ---- Report ----

console.log(`seo-lint: checked ${articles.length} travel articles, ${cultureArticles.length} culture articles.`);

if (violations.length > 0) {
  console.error(`\nseo-lint: ${violations.length} violation(s) found:\n`);
  for (const v of violations) console.error(" - " + v);
  console.error("\nseo-lint FAILED.");
  process.exit(1);
}

console.log("seo-lint: all checks passed.");
