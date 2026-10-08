import { sitemapIndexResponse } from "@/lib/sitemap";

export const revalidate = 600;

export const GET = () => sitemapIndexResponse(["pages", "posts", "categories"]);
