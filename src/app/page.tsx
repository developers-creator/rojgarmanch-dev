import { getHomePageData, getSiteInfo } from "@/data/home";
import { HomePage } from "@/components/home/HomePage";
import { getAds, getBannerNews, getSettingsOrEmpty } from "@/lib/api";
import { SiteChrome } from "@/components/layout/SiteChrome";

export default async function Home() {
  const [bannerNews, ads, settings] = await Promise.all([
    getBannerNews().catch(() => undefined),
    getAds()
      .then((res) => res.data)
      .catch(() => null),
    getSettingsOrEmpty(),
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
      <HomePage
        data={home}
        bannerNewsData={bannerNews}
        belowMenuAds={ads?.header_ads.below_menu_home_page}
        highlightAds={ads?.long_ads.long_ads_for_highlight_news}
        siteName={settings.site_title || site.name}
      />
    </SiteChrome>
  );
}
