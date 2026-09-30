import type { Metadata } from "next";
import { getHomePageData, getSiteInfo } from "@/data/home";
import { getTeamMembers } from "@/data/pages";
import { TeamPage } from "@/components/pages/TeamPage";
import { SiteChrome } from "@/components/layout/SiteChrome";

export const metadata: Metadata = {
  title: "हाम्रो समूह — रोजगार मञ्च",
  description: "रोजगार मञ्चको सम्पादकीय टोली र संवाददाताहरू।",
  alternates: { canonical: "https://rojgarmanch.com/team" },
};

export default function TeamRoute() {
  const home = getHomePageData();
  const site = getSiteInfo();
  const members = getTeamMembers();

  return (
    <SiteChrome
      flashNews={home.flashNews}
      trending={home.trending}
      site={site}
    >
      <TeamPage members={members} />
    </SiteChrome>
  );
}
