import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { ADS_TAG, MENU_TAGS, NEWS_TAG, articleTag } from "@/lib/api/endpoints";

// CMS webhook. Send `POST /api/revalidate` with header `x-revalidate-secret` and a
// JSON body:
//   { "type": "post", "slug": "news/2026/09/112895" }  — post added/edited/deleted
//   { "type": "ad" }                                    — ads changed
//   { "type": "menu" }                                  — header/footer/additional menu changed
// `slug` may also be the post's full URL.

const secretMatches = (given: string | null) => {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
};

/** "https://rojgarmanch.com/news/2026/09/1/" or "/news/2026/09/1" → "news/2026/09/1" */
const toSlug = (value: unknown) => {
  if (typeof value !== "string" || !value.trim()) return null;
  let path = value.trim();
  try {
    path = new URL(path, "https://x").pathname;
  } catch {}
  return path.replace(/^\/+|\/+$/g, "") || null;
};

export async function POST(request: Request) {
  if (!secretMatches(request.headers.get("x-revalidate-secret"))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const type = body?.type;

  // `expire: 0` makes the next visit rebuild the page right away.
  const expire = (tag: string) => revalidateTag(tag, { expire: 0 });
  const tags: string[] = [];

  if (type === "post") {
    tags.push(NEWS_TAG);
    const slug = toSlug(body.slug);
    if (slug) tags.push(articleTag(slug));
  } else if (type === "ad") {
    tags.push(ADS_TAG);
  } else if (type === "menu") {
    tags.push(...MENU_TAGS);
  } else {
    return Response.json({ error: "Unknown type" }, { status: 400 });
  }

  [...new Set(tags)].forEach(expire);
  return Response.json({ revalidated: tags });
}
