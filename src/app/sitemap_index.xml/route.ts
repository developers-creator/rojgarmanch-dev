import { sitemapIndexResponse } from "@/lib/sitemap";

export const revalidate = 60;

export const GET = () => sitemapIndexResponse(["pages", "posts", "categories"]);
