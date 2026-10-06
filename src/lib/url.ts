const CMS_ORIGIN = new URL(
  process.env.NEXT_PUBLIC_API_URL ?? "https://cms.rojgarmanch.com",
).origin;

function appOrigin(): string {
  if (process.env.NODE_ENV === "development") return "http://localhost:3000";
  return (process.env.NEXT_APP_URL ?? "").replace(/\/+$/, "");
}

/**
 * Converts a backend (CMS) url to a frontend url.
 */
export function toFrontUrl(url: string): string {
  if (!url) return url;
  try {
    const u = new URL(url);
    if (u.origin !== CMS_ORIGIN) return url;
    return `${appOrigin()}${u.pathname}${u.search}${u.hash}`;
  } catch {
    return url;
  }
}
