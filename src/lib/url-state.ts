// Generic, URL-safe encode/decode for small pieces of JSON state carried in
// a query string — the mechanism behind every "share this" link on the
// site. No backend, no database: the shared state round-trips entirely
// through the link itself, so it works on a static export with zero
// server cost. Not for anything large or sensitive — it's plainly
// readable by anyone with the link (base64, not encryption), and very
// long state will make an unwieldy URL.

export function encodeState(value: unknown): string {
  const json = JSON.stringify(value);
  const base64 =
    typeof window === "undefined"
      ? Buffer.from(json, "utf-8").toString("base64")
      : btoa(unescape(encodeURIComponent(json)));
  // Base64url: query-string-safe, no padding.
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeState<T>(encoded: string): T | null {
  try {
    const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "===".slice((base64.length + 3) % 4);
    const json =
      typeof window === "undefined"
        ? Buffer.from(padded, "base64").toString("utf-8")
        : decodeURIComponent(escape(atob(padded)));
    return JSON.parse(json) as T;
  } catch {
    // Malformed or tampered link — callers treat this as "no shared state".
    return null;
  }
}
