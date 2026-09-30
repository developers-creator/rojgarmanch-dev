import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllArticleSlugs, getArticle } from "@/data/articles";
import { getHomePageData, getSiteInfo } from "@/data/home";
import { ArticlePage } from "@/components/article/ArticlePage";
import { SiteChrome } from "@/components/layout/SiteChrome";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "लेख फेला परेन" };

  return {
    title: `${article.title} — रोजगार मञ्च`,
    description: article.deck || article.excerpt || article.title,
    alternates: { canonical: `https://rojgarmanch.com/article/${article.slug}` },
  };
}

export default async function ArticleRoute({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const home = getHomePageData();
  const site = getSiteInfo();

  return (
    <SiteChrome
      flashNews={home.flashNews}
      trending={home.trending}
      site={site}
    >
      <ArticlePage article={article} />
    </SiteChrome>
  );
}
