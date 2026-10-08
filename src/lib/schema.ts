import { SITE_URL, pageUrlFor } from "@/lib/seo";
import { decodeEntities } from "@/lib/text";
import type { Settings } from "@/types/settings";

type Json = Record<string, unknown>;

const FALLBACK_NAME = "रोजगार मञ्च";
const LEGAL_NAME = "Rojgar Media Pvt. Ltd.";
const LOGO_URL = `${SITE_URL}/images/rojgar-manch-logo.png`;
// Gyaneshwor, Kathmandu
const GEO = { latitude: 27.7104045, longitude: 85.3324544 };

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const text = (value: string | null | undefined) =>
  decodeEntities((value ?? "").replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();

const absolute = (url: string | null | undefined) => {
  if (!url) return undefined;
  return url.startsWith("http") ? url : `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
};

const siteName = (s: Settings) => text(s.site_title) || FALLBACK_NAME;

export function organizationSchema(s: Settings): Json {
  const sameAs = s.social_handles.map((h) => h.insert_url).filter(Boolean);
  const telephone = s.phone || s.mobile;
  return {
    "@type": "NewsMediaOrganization",
    "@id": ORGANIZATION_ID,
    name: siteName(s),
    legalName: LEGAL_NAME,
    url: `${SITE_URL}/`,
    logo: { "@type": "ImageObject", url: LOGO_URL },
    ...(s.email && { email: s.email }),
    ...(telephone && { telephone }),
    ...(s.darta_no && { identifier: s.darta_no }),
    address: {
      "@type": "PostalAddress",
      streetAddress: s.location || "Gyaneshwor",
      addressLocality: "Kathmandu",
      addressCountry: "NP",
    },
    location: { "@type": "Place", geo: { "@type": "GeoCoordinates", ...GEO } },
    ...(sameAs.length && { sameAs }),
  };
}

export function websiteSchema(s: Settings): Json {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteName(s),
    url: `${SITE_URL}/`,
    inLanguage: "ne",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export type Crumb = { name: string; path?: string };

export function breadcrumbSchema(crumbs: Crumb[]): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: text(c.name),
      // The last crumb is the current page and carries no link.
      ...(c.path !== undefined && { item: pageUrlFor(c.path) }),
    })),
  };
}

export type NewsArticleInput = {
  path: string;
  title: string;
  description?: string;
  image?: string;
  published?: string | null;
  modified?: string | null;
  author?: string | null;
  authorSlug?: string | null;
  categoryName?: string;
  categorySlug?: string;
};

export function newsArticleSchema(a: NewsArticleInput, s: Settings): Json {
  const url = pageUrlFor(a.path);
  const title = text(a.title);
  return {
    "@type": "NewsArticle",
    "@id": `${url}#article`,
    headline: title,
    ...(text(a.description) && { description: text(a.description) }),
    // Falls back to the logo for posts without a featured image.
    image: [absolute(a.image) ?? LOGO_URL],
    ...(a.published && { datePublished: a.published }),
    ...((a.modified || a.published) && { dateModified: a.modified || a.published }),
    author: a.author
      ? {
          "@type": "Person",
          name: text(a.author),
          ...(a.authorSlug && { url: pageUrlFor(`author/${a.authorSlug}`) }),
        }
      : { "@id": ORGANIZATION_ID },
    publisher: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: siteName(s),
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
    ...(a.categoryName && { articleSection: text(a.categoryName) }),
    inLanguage: "ne",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

/** Wraps nodes in one `@graph` document. */
export const graph = (...nodes: Json[]): Json => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});
