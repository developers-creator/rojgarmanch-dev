import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import {
  CategoryView,
  categoryMetadata,
  categoryUrl,
  parsePage,
} from "@/components/category/CategoryRoute";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return categoryMetadata(slug, 1);
}

export default async function CategoryRoute({ params, searchParams }: PageProps) {
  const { slug } = await params;
  // Old `?page=N` links move to the `/page/N/` form.
  const legacyPage = parsePage((await searchParams).page);
  if (legacyPage > 1) permanentRedirect(categoryUrl(slug, legacyPage));

  return <CategoryView slug={slug} page={1} />;
}
