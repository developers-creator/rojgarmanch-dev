import type { Metadata } from "next";
import { buildPageMetadata, loadSeo } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { getHomePageData, getSiteInfo } from "@/data/home";
import { HomePage } from "@/components/home/HomePage";
import { getAds, getBannerNews, getSettingsOrEmpty } from "@/lib/api";
import { SiteChrome } from "@/components/layout/SiteChrome";

// Falls back to the defaults in layout.tsx when the SEO API is unreachable.
export const generateMetadata = (): Promise<Metadata> =>
  buildPageMetadata("/", {});

export default async function Home() {
  const [bannerNews, ads, settings] = await Promise.all([
    getBannerNews().catch(() => undefined),
    getAds()
      .then((res) => res.data)
      .catch(() => null),
    getSettingsOrEmpty(),
    // Warm the memoized SEO request so <JsonLd> doesn't start it after the rest.
    loadSeo("/"),
  ]);
  // console.log("banner-news:", bannerNews);

  const home = getHomePageData();
  const site = getSiteInfo();

  return (
    <SiteChrome
      flashNews={home.flashNews}
      trending={home.trending}
      site={site}
    >
      <JsonLd path="/" />
      <HomePage
        data={home}
        bannerNewsData={bannerNews}
        belowMenuAds={ads?.header_ads.below_menu_home_page}
        highlightAds={ads?.long_ads.long_ads_for_highlight_news}
        longAds={ads?.long_ads}
        siteName={settings.site_title || site.name}
      />
    </SiteChrome>
  );
}
