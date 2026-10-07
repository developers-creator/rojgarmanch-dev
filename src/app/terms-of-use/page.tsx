import type { Metadata } from "next";
import { getHomePageData, getSiteInfo } from "@/data/home";
import { getTermsOfUse } from "@/lib/api";
import { LegalPage } from "@/components/pages/LegalPage";
import { SiteChrome } from "@/components/layout/SiteChrome";

export const metadata: Metadata = {
  title: "प्रयोगका सर्तहरू — रोजगार मञ्च",
  description: "रोजगार मञ्च प्रयोग गर्दा लागू हुने सर्त तथा नियमहरू।",
  alternates: { canonical: "https://rojgarmanch.com/terms-of-use" },
};

export default function TermsOfUseRoute() {
  const home = getHomePageData();
  const site = getSiteInfo();

  return (
    <SiteChrome
      flashNews={home.flashNews}
      trending={home.trending}
      site={site}
    >
      <LegalPage eyebrow="Terms of Use" load={getTermsOfUse} />
    </SiteChrome>
  );
}
