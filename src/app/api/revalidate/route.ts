import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import {
  ADS_TAG,
  CACHE_TAGS,
  PUBLICATION_TAG,
  SITEMAP_TAG,
  articleTag,
  authorTag,
  categoryTag,
} from "@/lib/api/endpoints";


const secretMatches = (given: string | null) => {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
};


const toSlug = (value: unknown) => {
  if (typeof value !== "string" || !value.trim()) return null;
  let path = value.trim();
  try {
    path = new URL(path, "https://x").pathname;
  } catch {}
  return path.replace(/^\/+|\/+$/g, "") || null;
};

const VALID_TAXONOMY_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Keep valid lowercase ASCII slugs; ignore empty/non-ASCII values instead of failing the webhook. */
const parseTaxonomySlugs = (...values: unknown[]): string[] | null => {
  const slugs = values.flatMap((value) =>
    value == null ? [] : Array.isArray(value) ? value : [value],
  );
  if (!slugs.every((value) => typeof value === "string")) return null;

  const normalized = slugs
    .map((value) => value.trim().toLowerCase())
    .filter((slug) => slug.length > 0 && slug.length <= 200 && VALID_TAXONOMY_SLUG.test(slug));

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
  const paths: string[] = [];
  let revalidateLayout = false;

  if (type === "post") {
    tags.push(SITEMAP_TAG);
    const categories = parseTaxonomySlugs(body.category, body.categories);
    const authors = parseTaxonomySlugs(body.author);
    if (!categories || !authors) {
      return Response.json(
        { error: "Category and author values must be strings" },
        { status: 400 },
      );
    }

    tags.push(
      CACHE_TAGS.home,
      CACHE_TAGS.bannerNews,
      CACHE_TAGS.mainNews,
      CACHE_TAGS.latestNews,
      categoryTag("news"),
      ...categories.map(categoryTag),
      ...authors.map(authorTag),
    );
    paths.push(
      "/",
      "/news",
      ...categories.map((category) => `/${category}`),
      ...authors.map((author) => `/author/${author}`),
    );

    const slug = toSlug(body.slug);
    if (slug) {
      tags.push(articleTag(slug));
      paths.push(`/${slug}`);
    }
  } else if (type === "category") {
    const categories = parseTaxonomySlugs(body.category, body.categories);
    if (!categories?.length) {
      return Response.json(
        { error: "category or categories must contain valid slugs" },
        { status: 400 },
      );
    }
    tags.push(CACHE_TAGS.home, ...categories.map(categoryTag));
    paths.push("/", ...categories.map((category) => `/${category}`));
  } else if (type === "ad") {
    tags.push(ADS_TAG);
    paths.push("/");
    revalidateLayout = true;
  } else if (type === "publication" || type === "magazine") {
    tags.push(CACHE_TAGS.home, PUBLICATION_TAG);
    paths.push("/", "/publication");
  } else {
    return Response.json({ error: "Unknown type" }, { status: 400 });
  }

  [...new Set(tags)].forEach(expire);
  [...new Set(paths)].forEach((path) => revalidatePath(path));
  if (revalidateLayout) revalidatePath("/", "layout");

  return Response.json({ revalidated: [...new Set(tags)] });
}
