import { sitemapIndexResponse } from "@/lib/sitemap";

export const revalidate = 86400;

export const GET = () => sitemapIndexResponse(["pages", "posts", "categories"]);
