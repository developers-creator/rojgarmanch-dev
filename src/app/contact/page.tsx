import type { Metadata } from "next";
import { getHomePageData, getSiteInfo } from "@/data/home";
import { getContactContent } from "@/data/pages";
import { ContactPage } from "@/components/pages/ContactPage";
import { SiteChrome } from "@/components/layout/SiteChrome";

export const metadata: Metadata = {
  title: "सम्पर्क — रोजगार मञ्च",
  description:
    "रोजगार मञ्चसँग सम्पर्क गर्नुहोस् — ठेगाना, फोन, इमेल र सन्देश फारम।",
  alternates: { canonical: "https://rojgarmanch.com/contact" },
};

export default function ContactRoute() {
  const home = getHomePageData();
  const site = getSiteInfo();
  const content = getContactContent();

  return (
    <SiteChrome
      flashNews={home.flashNews}
      trending={home.trending}
      site={site}
    >
      <ContactPage content={content} site={site} />
    </SiteChrome>
  );
}
