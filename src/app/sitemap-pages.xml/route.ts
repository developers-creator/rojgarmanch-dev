import { sitemapResponse } from "@/lib/sitemap";

export const revalidate = 600;

export const GET = () => sitemapResponse("pages");
