import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { getHomePageData, getSiteInfo } from "@/data/home";
import { getTermsOfUse } from "@/lib/api";
import { LegalPage } from "@/components/pages/LegalPage";
import { SiteChrome } from "@/components/layout/SiteChrome";

const fallbackMetadata: Metadata = {
  title: "प्रयोगका सर्तहरू — रोजगार मञ्च",
  description: "रोजगार मञ्च प्रयोग गर्दा लागू हुने सर्त तथा नियमहरू।",
  alternates: { canonical: "https://rojgarmanch.com/terms-of-use" },
};

export const generateMetadata = (): Promise<Metadata> =>
  buildPageMetadata("terms-of-use", fallbackMetadata);

export default function TermsOfUseRoute() {
  const home = getHomePageData();
  const site = getSiteInfo();

  return (
    <SiteChrome
      flashNews={home.flashNews}
      trending={home.trending}
      site={site}
    >
      <JsonLd path="terms-of-use" />
      <LegalPage eyebrow="Terms of Use" load={getTermsOfUse} />
    </SiteChrome>
  );
}
