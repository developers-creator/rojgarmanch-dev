import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { HomePage } from "@/components/home/HomePage";
import { getBannerNews } from "@/lib/api";
import { SiteChrome } from "@/components/layout/SiteChrome";

export const generateMetadata = (): Promise<Metadata> =>
  buildPageMetadata("/", {});

export default async function Home() {
  const bannerNews = await getBannerNews().catch(() => undefined);

  return (
    <SiteChrome flashNews={[]} trending={[]}>
      <HomePage bannerNewsData={bannerNews} />
    </SiteChrome>
  );
}
