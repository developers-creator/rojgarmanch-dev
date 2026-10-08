const CMS_ORIGIN = new URL(
  process.env.NEXT_PUBLIC_API_URL ?? "https://cms.rojgarmanch.com",
).origin;

/** Adds the trailing slash the site's routes use (`trailingSlash: true`). */
function withTrailingSlash(pathname: string): string {
  return pathname.endsWith("/") || /\.[a-z0-9]+$/i.test(pathname)
    ? pathname
    : `${pathname}/`;
}

/**
 * Converts a backend (CMS) url to a root-relative frontend path, so client
 * navigation stays same-origin and skips the no-slash → slash redirect.
 */
export function toFrontUrl(url: string): string {
  if (!url) return url;
  try {
    const u = new URL(url);
    if (u.origin !== CMS_ORIGIN) return url;
    return `${withTrailingSlash(u.pathname)}${u.search}${u.hash}`;
  } catch {
    return url;
  }
}
