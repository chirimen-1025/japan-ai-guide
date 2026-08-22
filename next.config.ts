import type { NextConfig } from "next";

// Static export: no server, no DB. Every page is pre-rendered at build time
// to plain HTML/CSS/JS, which is what lets this deploy for free on
// Cloudflare Pages / GitHub Pages with no server cost. See README.md.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
