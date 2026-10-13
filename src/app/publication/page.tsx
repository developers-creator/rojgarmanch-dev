import type { Metadata } from "next";
import { getSiteInfo } from "@/data/home";
import { getPublications } from "@/lib/api/endpoints";
import { PublicationIndex } from "@/components/publication/PublicationIndex";
import { SiteChrome } from "@/components/layout/SiteChrome";

export const metadata: Metadata = {
  title: "प्रकाशन — रोजगार मञ्च",
  description: "रोजगार मञ्चका सबै मासिक प्रकाशन र फ्लिपबुक अंकहरू।",
  alternates: { canonical: "https://rojgarmanch.com/publication/" },
};

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function PublicationArchivePage({ searchParams }: PageProps) {
  const { page: pageRaw } = await searchParams;
  const page = Math.max(1, Number.parseInt(pageRaw ?? "1", 10) || 1);
  const site = getSiteInfo();
  const issues = await getPublications(page).catch(() => null);
  const data = issues?.data ?? [];
  const pagination = issues?.pagination;

  return (
    <SiteChrome
      flashNews={[]}
      trending={[]}
      site={site}
    >
      <PublicationIndex issues={data} pagination={pagination} />
    </SiteChrome>
  );
}
