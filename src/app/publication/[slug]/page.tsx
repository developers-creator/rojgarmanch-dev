import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHomePageData, getSiteInfo } from "@/data/home";
import { getPublicationDetail } from "@/lib/api/endpoints";
import { decodeEntities } from "@/lib/text";
import { Flipbook } from "@/components/publication/Flipbook";
import { SiteChrome } from "@/components/layout/SiteChrome";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function loadIssue(rawSlug: string) {
  let slug = rawSlug;
  try {
    slug = decodeURIComponent(rawSlug);
  } catch {}
  const res = await getPublicationDetail(slug).catch(() => null);
  return res?.data ?? null;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const issue = await loadIssue(slug);
  if (!issue) return { title: "प्रकाशन फेला परेन" };

  const title = decodeEntities(issue.title);
  return {
    title: `${title} — फ्लिपबुक`,
    description: [title, issue.sub_heading, issue.date].filter(Boolean).join(" · "),
    alternates: {
      canonical: `https://rojgarmanch.com/publication/${encodeURIComponent(issue.slug)}/`,
    },
  };
}

export default async function PublicationFlipbookPage({ params }: PageProps) {
  const { slug } = await params;
  const issue = await loadIssue(slug);
  if (!issue || !issue.pdf) notFound();

  const home = getHomePageData();
  const site = getSiteInfo();

  return (
    <SiteChrome
      flashNews={home.flashNews}
      trending={home.trending}
      site={site}
    >
      <Flipbook
        issue={{
          slug: issue.slug,
          title: decodeEntities(issue.title),
          date: issue.date,
          pdfHref: issue.pdf,
          pdfSrc: `/api/pdf?url=${encodeURIComponent(issue.pdf)}`,
        }}
      />
    </SiteChrome>
  );
}
