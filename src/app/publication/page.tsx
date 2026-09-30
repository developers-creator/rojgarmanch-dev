import type { Metadata } from "next";
import { getHomePageData, getSiteInfo } from "@/data/home";
import { getPublications } from "@/data/publications";
import { PublicationIndex } from "@/components/publication/PublicationIndex";
import { SiteChrome } from "@/components/layout/SiteChrome";

export const metadata: Metadata = {
  title: "प्रकाशन — रोजगार मञ्च",
  description: "रोजगार मञ्चका सबै मासिक प्रकाशन र फ्लिपबुक अंकहरू।",
  alternates: { canonical: "https://rojgarmanch.com/publication" },
};

export default function PublicationArchivePage() {
  const home = getHomePageData();
  const site = getSiteInfo();
  const issues = getPublications();

  return (
    <SiteChrome
      flashNews={home.flashNews}
      trending={home.trending}
      site={site}
    >
      <PublicationIndex issues={issues} />
    </SiteChrome>
  );
}
