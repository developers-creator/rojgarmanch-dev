import type { Metadata } from "next";
import { getSeo } from "@/lib/api";
import { decodeEntities } from "@/lib/text";
import type { Seo } from "@/types/seo";

export const SITE_URL = "https://rojgarmanch.com";
const CMS_ORIGIN = "https://cms.rojgarmanch.com";

/** Never throws: SEO is an enhancement, pages must render without it. */
export async function loadSeo(path: string): Promise<Seo | null> {
  try {
    const res = await getSeo(path);
    return res.success ? res.data : null;
  } catch {
    return null;
  }
}

function plainText(value: string | undefined) {
  return decodeEntities((value ?? "").replace(/<[^>]*>/g, " "))
    .replace(/\s*\[…\]\s*$/, "…")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * The CMS reports every page as `article`; only real posts (dated paths like
 * /news/2026/09/112895) are articles, the rest are plain websites.
 */
function openGraphType(seo: Seo) {
  const isPost = seo.og_type === "article" && seo.article_published_time;
  if (!isPost) return { type: "website" as const };
  return {
    type: "article" as const,
    publishedTime: seo.article_published_time ?? undefined,
    modifiedTime: seo.article_modified_time ?? undefined,
  };
}

/**
 * Next.js metadata for a CMS page. `fallback` is used when the SEO API is
 * unreachable. Canonical / og:url always use this site's domain (the CMS
 * returns its own host or nothing), and the CMS `robots` value is ignored
 * because the CMS host itself is set to noindex.
 */
export async function buildPageMetadata(
  path: string,
  fallback: Metadata,
  { page = 1 }: { page?: number } = {},
): Promise<Metadata> {
  const seo = await loadSeo(path);
  if (!seo) return fallback;

  const url = `${SITE_URL}/${path.replace(/^\//, "")}`;
  // Paginated listings: each page is its own canonical URL and gets a suffix.
  const pageUrl = page > 1 ? `${url}?page=${page}` : url;
  const pageSuffix = page > 1 ? ` — पृष्ठ ${page}` : "";
  const title = plainText(seo.title) ? plainText(seo.title) + pageSuffix : undefined;
  const description =
    plainText(seo.description) || plainText(seo.og_description) || undefined;
  const ogTitle = (plainText(seo.og_title) && plainText(seo.og_title) + pageSuffix) || title;
  const ogDescription = plainText(seo.og_description) || description;
  const images = (seo.og_image ?? []).map((image) => ({
    url: image.url,
    width: image.width,
    height: image.height,
  }));

  return {
    title: title ? { absolute: title } : fallback.title,
    description: description ?? fallback.description,
    alternates: { canonical: pageUrl },
    openGraph: {
      ...openGraphType(seo),
      url: pageUrl,
      title: ogTitle,
      description: ogDescription,
      siteName: seo.og_site_name || undefined,
      locale: "ne_NP",
      images: images.length ? images : undefined,
    },
    twitter: {
      card: (seo.twitter_card as "summary_large_image") || "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: images.length ? images.map((image) => image.url) : undefined,
    },
  };
}

/** JSON-LD for the page, with CMS URLs rewritten to this site's domain. */
export function schemaJson(seo: Seo | null): string | null {
  if (!seo?.schema) return null;
  return JSON.stringify(seo.schema)
    .split(CMS_ORIGIN)
    .join(SITE_URL)
    .replace(/</g, "\\u003c");
}
