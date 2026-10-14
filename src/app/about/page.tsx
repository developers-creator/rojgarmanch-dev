import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { AboutPage } from "@/components/pages/AboutPage";
import { SiteChrome } from "@/components/layout/SiteChrome";

const fallbackMetadata: Metadata = {
  title: "हाम्रो बारेमा — रोजगार मञ्च",
  description:
    "रोजगार मञ्चको परिचय, उद्देश्य र मूल्यहरू — नेपाली रोजगार र करियर केन्द्रित डिजिटल पत्रिका।",
  alternates: { canonical: "https://rojgarmanch.com/about/" },
};

export const generateMetadata = (): Promise<Metadata> =>
  buildPageMetadata("about", fallbackMetadata);

export default function AboutRoute() {
  return (
    <SiteChrome flashNews={[]} trending={[]}>
      <AboutPage />
      <JsonLd path="about" />
    </SiteChrome>
  );
}
