import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCategorySlugs,
  getCategory,
  getCategoryPosts,
} from "@/data/categories";
import { getHomePageData, getSiteInfo } from "@/data/home";
import {
  CATEGORY_PAGE_SIZE,
  CategoryPage,
} from "@/components/category/CategoryPage";
import { SiteChrome } from "@/components/layout/SiteChrome";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { page: pageRaw } = await searchParams;
  const category = getCategory(slug);
  if (!category) return { title: "श्रेणी फेला परेन" };

  const page = Math.max(1, Number.parseInt(pageRaw ?? "1", 10) || 1);
  const title =
    page > 1
      ? `${category.labelNe} — पृष्ठ ${page} — रोजगार मञ्च`
      : `${category.labelNe} — रोजगार मञ्च`;

  return {
    title,
    description: category.description,
    alternates: {
      canonical: `https://rojgarmanch.com/category/${category.slug}${
        page > 1 ? `?page=${page}` : ""
      }`,
    },
  };
}

export default async function CategoryRoute({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const { page: pageRaw } = await searchParams;
  const category = getCategory(slug);
  if (!category) notFound();

  const allPosts = getCategoryPosts(slug);
  const totalPages = Math.max(
    1,
    Math.ceil(allPosts.length / CATEGORY_PAGE_SIZE),
  );
  const requested = Math.max(1, Number.parseInt(pageRaw ?? "1", 10) || 1);
  const page = Math.min(requested, totalPages);
  const start = (page - 1) * CATEGORY_PAGE_SIZE;
  const posts = allPosts.slice(start, start + CATEGORY_PAGE_SIZE);

  const home = getHomePageData();
  const site = getSiteInfo();

  return (
    <SiteChrome
      flashNews={home.flashNews}
      trending={home.trending}
      site={site}
    >
      <CategoryPage
        category={category}
        posts={posts}
        page={page}
        totalPages={totalPages}
      />
    </SiteChrome>
  );
}
