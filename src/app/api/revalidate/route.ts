import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import {
  ADS_TAG,
  CACHE_TAGS,
  MENU_TAGS,
  articleTag,
  authorTag,
  categoryTag,
} from "@/lib/api/endpoints";



// CMS webhook. Send `POST /api/revalidate` with header `x-revalidate-secret` and a
// JSON body:
//   { "type": "post", "slug": "news/2026/09/112895" }  — post added/edited/deleted
//   { "type": "ad" }                                    — ads changed
//   { "type": "menu" }                                  — header/footer/additional menu changed
// `slug` may also be the post's full URL. Add `"listings": false` to a post event when
// only the article body changed. For listing changes, include category slug(s) in
// `category` or `categories` and optionally the author's slug in `author`.

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

const parseTaxonomySlugs = (...values: unknown[]): string[] | null => {
  const slugs = values.flatMap((value) =>
    value == null ? [] : Array.isArray(value) ? value : [value],
  );
  if (!slugs.every((value) => typeof value === "string")) return null;

  const normalized = slugs.map((value) => value.trim().toLowerCase());
  if (
    normalized.some(
      (slug) =>
        slug.length === 0 ||
        slug.length > 200 ||
        !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug),
    )
  ) {
    return null;
  }

  return [...new Set(normalized)];
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
    if (body.listings !== false) {
      const categories = parseTaxonomySlugs(body.category, body.categories);
      const authors = parseTaxonomySlugs(body.author);
      if (!categories || !authors) {
        return Response.json(
          { error: "Category and author values must be valid slugs" },
          { status: 400 },
        );
      }

      tags.push(
        CACHE_TAGS.bannerNews,
        CACHE_TAGS.mainNews,
        CACHE_TAGS.latestNews,
        categoryTag("news"),
        ...categories.map(categoryTag),
        ...authors.map(authorTag),
      );
    }
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
