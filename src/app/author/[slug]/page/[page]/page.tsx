import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { AuthorView, authorMetadata, authorUrl } from "@/components/author/AuthorRoute";

type PageProps = {
  params: Promise<{ slug: string; page: string }>;
};

/** `/author/<slug>/page/N/` — only whole numbers from 2 up are valid. */
const pageNumber = (raw: string) => (/^\d+$/.test(raw) ? Number(raw) : 0);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, page } = await params;
  const n = pageNumber(page);
  return n > 1 ? authorMetadata(slug, n) : { title: "लेखक फेला परेन" };
}

export default async function AuthorPageRoute({ params }: PageProps) {
  const { slug, page } = await params;
  const n = pageNumber(page);
  if (n < 1) notFound();
  if (n === 1) permanentRedirect(authorUrl(slug));

  return <AuthorView slug={slug} page={n} />;
}
