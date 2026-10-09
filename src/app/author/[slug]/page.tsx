import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { AuthorView, authorMetadata, authorUrl } from "@/components/author/AuthorRoute";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return authorMetadata(slug, 1);
}

export default async function AuthorRoute({ params, searchParams }: PageProps) {
  const { slug } = await params;
  // `?page=N` links move to the `/page/N/` form.
  const legacy = Number.parseInt((await searchParams).page ?? "", 10);
  if (legacy > 1) permanentRedirect(authorUrl(slug, legacy));

  return <AuthorView slug={slug} page={1} />;
}
