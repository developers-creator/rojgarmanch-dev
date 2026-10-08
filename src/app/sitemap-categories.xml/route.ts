import { sitemapResponse } from "@/lib/sitemap";

export const revalidate = 60;

export const GET = () => sitemapResponse("categories");
