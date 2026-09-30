import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHomePageData, getSiteInfo } from "@/data/home";
import {
  getPublication,
  getPublicationSlugs,
} from "@/data/publications";
import { Flipbook } from "@/components/publication/Flipbook";
import { SiteChrome } from "@/components/layout/SiteChrome";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublicationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const issue = getPublication(slug);
  if (!issue) return { title: "प्रकाशन फेला परेन" };

  return {
    title: `${issue.title} — फ्लिपबुक`,
    description: `${issue.title} · ${issue.kicker} · ${issue.date}`,
    alternates: {
      canonical: `https://rojgarmanch.com/publication/${issue.slug}`,
    },
  };
}

export default async function PublicationFlipbookPage({ params }: PageProps) {
  const { slug } = await params;
  const issue = getPublication(slug);
  if (!issue) notFound();

  const home = getHomePageData();
  const site = getSiteInfo();

  return (
    <SiteChrome
      flashNews={home.flashNews}
      trending={home.trending}
      site={site}
    >
      <Flipbook issue={issue} />
    </SiteChrome>
  );
}
