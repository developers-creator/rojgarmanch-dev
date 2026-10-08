import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { getHomePageData, getSiteInfo } from "@/data/home";
import { TeamPage } from "@/components/pages/TeamPage";
import { SiteChrome } from "@/components/layout/SiteChrome";

const fallbackMetadata: Metadata = {
  title: "हाम्रो समूह — रोजगार मञ्च",
  description: "रोजगार मञ्चको सम्पादकीय टोली र संवाददाताहरू।",
  alternates: { canonical: "https://rojgarmanch.com/team/" },
};

export const generateMetadata = (): Promise<Metadata> =>
  buildPageMetadata("team", fallbackMetadata);

export default function TeamRoute() {
  const home = getHomePageData();
  const site = getSiteInfo();

  return (
    <SiteChrome
      flashNews={home.flashNews}
      trending={home.trending}
      site={site}
    >
      <TeamPage />
      <JsonLd path="team" />
    </SiteChrome>
  );
}
