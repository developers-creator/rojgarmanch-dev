import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/sitemap";
import { BLOCKED_BOTS } from "@/lib/bots";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Search results are noindex and every query is a CMS request; keep crawlers out.
      { userAgent: "*", allow: "/", disallow: "/search" },
      // Crawlers that bring no Nepali search traffic but render thousands of
      // uncached pages (each one an ISR write). Also refused in proxy.ts.
      { userAgent: [...BLOCKED_BOTS], disallow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap_index.xml`,
  };
}
