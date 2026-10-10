import { getSitemap } from "@/lib/api/endpoints";
import type { SitemapItem, SitemapType } from "@/types/sitemap";

export const SITE_URL = "https://rojgarmanch.com";

const XML_HEADERS = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
};

const escapeXml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

const lastmod = (d: string | null | undefined) =>
  d ? `<lastmod>${escapeXml(d)}</lastmod>` : "";

const xml = (body: string) =>
  new Response(`<?xml version="1.0" encoding="UTF-8"?>\n${body}`, { headers: XML_HEADERS });

const urlEntry = (loc: string, modified?: string | null) =>
  `<url><loc>${escapeXml(loc)}</loc>${lastmod(modified)}</url>`;

const toUrl = (i: SitemapItem) =>
  urlEntry(
    `${SITE_URL}/${i.slug.replace(/^\/+|\/+$/g, "").replace(/^category\//, "")}/`,
    i.modified,
  );

/** Child sitemap (<urlset>) for one section of the API sitemap payload. */
export async function sitemapResponse(type: SitemapType) {
  const { data } = await getSitemap();
  const extra = type === "pages" ? urlEntry(`${SITE_URL}/`, new Date().toISOString()) : "";
  return xml(
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${extra}${data[type].map(toUrl).join("")}</urlset>`,
  );
}

/** Sitemap index (<sitemapindex>) pointing at each child sitemap. */
export async function sitemapIndexResponse(types: SitemapType[]) {
  const { data } = await getSitemap();
  const latest = (type: SitemapType) =>
    data[type].map((i) => i.modified).filter((m): m is string => !!m).sort().at(-1);

  const items = types
    .map(
      (t) =>
        `<sitemap><loc>${SITE_URL}/sitemap-${t}.xml</loc>${lastmod(latest(t))}</sitemap>`,
    )
    .join("");
  return xml(`<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}</sitemapindex>`);
}
