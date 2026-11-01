import { sitemapResponse } from "@/lib/sitemap";

export const revalidate = 86400;

export const GET = () => sitemapResponse("categories");
