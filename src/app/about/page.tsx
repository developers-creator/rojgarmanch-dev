import type { Metadata } from "next";
import { getHomePageData, getSiteInfo } from "@/data/home";
import { getAboutContent } from "@/data/pages";
import { AboutPage } from "@/components/pages/AboutPage";
import { SiteChrome } from "@/components/layout/SiteChrome";

export const metadata: Metadata = {
  title: "हाम्रो बारेमा — रोजगार मञ्च",
  description:
    "रोजगार मञ्चको परिचय, उद्देश्य र मूल्यहरू — नेपाली रोजगार र करियर केन्द्रित डिजिटल पत्रिका।",
  alternates: { canonical: "https://rojgarmanch.com/about" },
};

export default function AboutRoute() {
  const home = getHomePageData();
  const site = getSiteInfo();
  const content = getAboutContent();

  return (
    <SiteChrome
      flashNews={home.flashNews}
      trending={home.trending}
      site={site}
    >
      <AboutPage content={content} />
    </SiteChrome>
  );
}
