import { getHomePageData, getSiteInfo } from "@/data/home";
import { HomePage } from "@/components/home/HomePage";
import { getBannerNews } from "@/lib/api";
import { SiteChrome } from "@/components/layout/SiteChrome";

export default async function Home() {
  const bannerNews = await getBannerNews().catch(() => undefined);
  // console.log("banner-news:", bannerNews);

  const home = getHomePageData();
  const site = getSiteInfo();

  return (
    <SiteChrome
      flashNews={home.flashNews}
      trending={home.trending}
      site={site}
    >
      <HomePage data={home} bannerNewsData={bannerNews} />
    </SiteChrome>
  );
}
