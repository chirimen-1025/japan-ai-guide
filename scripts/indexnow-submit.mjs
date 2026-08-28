#!/usr/bin/env node
/**
 * IndexNow submission — run in CI after a successful build, so Bing/Yandex
 * (and other IndexNow-participating engines) are notified immediately on
 * every push to main, instead of waiting for their next scheduled crawl.
 *
 * Reads the generated static export's sitemap.xml (out/sitemap.xml) for the
 * full URL list, then POSTs it to https://api.indexnow.org/indexnow.
 *
 * The key below is not a secret — IndexNow's whole verification model is a
 * plaintext key file published at the site root (public/<key>.txt), so
 * there's nothing to protect by hiding it in CI secrets.
 */

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const HOST = "japan-ai-guide.pages.dev";
const KEY = "e529b59517bab4458a524a86da78e680";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_PATH = join(ROOT, "out/sitemap.xml");

if (!existsSync(SITEMAP_PATH)) {
  console.error(`indexnow-submit: ${SITEMAP_PATH} not found — did the build run first?`);
  process.exit(1);
}

const sitemapXml = readFileSync(SITEMAP_PATH, "utf8");
const urlList = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (urlList.length === 0) {
  console.error("indexnow-submit: sitemap.xml contained no <loc> entries — aborting.");
  process.exit(1);
}

console.log(`indexnow-submit: submitting ${urlList.length} URLs for host ${HOST}...`);

const body = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList,
};

try {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  // IndexNow returns 200 or 202 on success; it does not return a JSON body.
  if (res.ok || res.status === 202) {
    console.log(`indexnow-submit: submitted successfully (HTTP ${res.status}).`);
  } else {
    const text = await res.text().catch(() => "");
    console.error(`indexnow-submit: non-success response HTTP ${res.status}. ${text}`);
    // Don't fail the whole workflow over a downstream notification hiccup —
    // the site itself built and deployed fine; this is best-effort.
    process.exit(0);
  }
} catch (err) {
  console.error(`indexnow-submit: request failed: ${err.message}`);
  // Best-effort — network hiccups here shouldn't fail CI.
  process.exit(0);
}
