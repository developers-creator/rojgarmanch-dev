import { sitemapIndexResponse } from "@/lib/sitemap";

export const revalidate = 3600;

export const GET = () => sitemapIndexResponse(["pages", "posts", "categories"]);
