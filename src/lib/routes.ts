// Which URL paths this site can actually serve. Anything else is rejected in
// proxy.ts (and again in the catch-all route) before it reaches the CMS, so a
// made-up URL costs neither a CMS request nor a cached 404 page (an ISR write).

/**
 * Category archive slugs (`/<slug>/`), from the CMS sitemap's `categories`.
 * When a category is added in WordPress, add its slug here too.
 */
export const CATEGORY_SLUGS: ReadonlySet<string> = new Set([
  "news",
  "employment",
  "rojgar-tv",
  "interview",
  "business",
  "nrn",
  "abroad",
  "opinion",
  "feature",
  "art",
  "literature",
  "society",
  "tourism",
  "sport",
  "fun-world",
  "world",
  "english-headline",
  "opportunity",
  "career-playbook",
  "reels",
]);

/** Article path: `<section>/<year>/<month>/<id>`, e.g. `news/2026/09/112895`. */
const ARTICLE_PATH = /^[a-z0-9-]+\/\d{4}\/(?:0[1-9]|1[0-2])\/\d+$/;
const PAGE_NUMBER = /^[1-9]\d{0,3}$/;

/** True when the segments are an article, a known category, or a category page. */
export function isCatchAllPath(segments: string[]): boolean {
  switch (segments.length) {
    case 1:
      return CATEGORY_SLUGS.has(segments[0]);
    case 3:
      // `/<category>/page/N/`
      return (
        CATEGORY_SLUGS.has(segments[0]) &&
        segments[1] === "page" &&
        PAGE_NUMBER.test(segments[2])
      );
    case 4:
      return ARTICLE_PATH.test(segments.join("/"));
    default:
      return false;
  }
}

/** Top-level routes that exist as their own pages, with the segment counts they accept. */
const STATIC_ROUTES: Record<string, readonly number[]> = {
  about: [1],
  contact: [1],
  team: [1],
  "privacy-policy": [1],
  "terms-of-use": [1],
  search: [1],
  publication: [1, 2], // /publication/ and /publication/<slug>/
  author: [2, 4], // /author/<slug>/ and /author/<slug>/page/N/
  category: [1, 2, 3, 4], // legacy URLs, redirected by next.config.ts
};

/** Folders and files in `public/` (plus the `app/icon.png` route) — proxy.ts runs before they are served. */
const PUBLIC_PREFIXES = new Set(["images", "publications"]);
const PUBLIC_FILES = new Set(["llms.txt", "pdf.worker.min.mjs", "icon.png"]);

export type PathCheck =
  | { ok: true }
  | { ok: false; redirectTo?: string };

/** Validates a request pathname. Invalid paths get a `redirectTo` when only the case is wrong. */
export function checkPath(pathname: string): PathCheck {
  const path = pathname.replace(/^\/+|\/+$/g, "");
  if (!path) return { ok: true };

  const segments = path.split("/");
  const [first] = segments;

  if (PUBLIC_PREFIXES.has(first) || PUBLIC_FILES.has(path)) return { ok: true };
  // Any other file-like path (`/foo.png`, `/ads.txt`) does not exist.
  if (/\.[a-z0-9]+$/i.test(segments[segments.length - 1])) return { ok: false };

  const counts = STATIC_ROUTES[first];
  if (counts) return counts.includes(segments.length) ? { ok: true } : { ok: false };

  if (isCatchAllPath(segments)) return { ok: true };

  // `/News/` would otherwise render a duplicate of `/news/`; send it to the canonical URL.
  const lower = path.toLowerCase();
  if (lower !== path && isCatchAllPath(lower.split("/"))) {
    return { ok: false, redirectTo: `/${lower}/` };
  }
  return { ok: false };
}
