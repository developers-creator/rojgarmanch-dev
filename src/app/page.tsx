import { getHomePageData, getSiteInfo } from "@/data/home";
import { HomePage } from "@/components/home/HomePage";
import { SiteChrome } from "@/components/layout/SiteChrome";

export default function Home() {
  const home = getHomePageData();
  const site = getSiteInfo();

  return (
    <SiteChrome
      flashNews={home.flashNews}
      trending={home.trending}
      site={site}
    >
      <HomePage data={home} />
    </SiteChrome>
  );
}
