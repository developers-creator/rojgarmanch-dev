import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/sitemap";

export default function robots(): MetadataRoute.Robots {
  return {
    // Search results are noindex and every query is a CMS request; keep crawlers out.
    rules: { userAgent: "*", allow: "/", disallow: "/search" },
    sitemap: `${SITE_URL}/sitemap_index.xml`,
  };
}
