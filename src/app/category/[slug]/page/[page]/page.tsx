import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import {
  CategoryView,
  categoryMetadata,
  categoryUrl,
} from "@/components/category/CategoryRoute";

type PageProps = {
  params: Promise<{ slug: string; page: string }>;
};

/** `/category/<slug>/page/N/` — only whole numbers from 2 up are valid. */
const pageNumber = (raw: string) => (/^\d+$/.test(raw) ? Number(raw) : 0);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, page } = await params;
  const n = pageNumber(page);
  return n > 1 ? categoryMetadata(slug, n) : { title: "श्रेणी फेला परेन" };
}

export default async function CategoryPageRoute({ params }: PageProps) {
  const { slug, page } = await params;
  const n = pageNumber(page);
  if (n < 1) notFound();
  if (n === 1) permanentRedirect(categoryUrl(slug));

  return <CategoryView slug={slug} page={n} />;
}
