import { sitemapResponse } from "@/lib/sitemap";

export const revalidate = 3600;

export const GET = () => sitemapResponse("pages");
