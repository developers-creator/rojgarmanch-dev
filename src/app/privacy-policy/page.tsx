import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPrivacyPolicy } from "@/lib/api";
import { LegalPage } from "@/components/pages/LegalPage";
import { SiteChrome } from "@/components/layout/SiteChrome";

const fallbackMetadata: Metadata = {
  title: "गोपनीयता नीति — रोजगार मञ्च",
  description: "रोजगार मञ्चको गोपनीयता नीति।",
  alternates: { canonical: "https://rojgarmanch.com/privacy-policy/" },
};

export const generateMetadata = (): Promise<Metadata> =>
  buildPageMetadata("privacy-policy", fallbackMetadata);

export default function PrivacyPolicyRoute() {
  return (
    <SiteChrome flashNews={[]} trending={[]}>
      <JsonLd path="privacy-policy" />
      <LegalPage eyebrow="Privacy Policy" load={getPrivacyPolicy} />
    </SiteChrome>
  );
}
