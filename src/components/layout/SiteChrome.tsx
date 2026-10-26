import type { ReactNode } from "react";
import type { Post } from "@/types/content";
import MastheadComponent from "./MastheadComponent";
import SiteNavComponent from "./SiteNavComponent";
import FullscreenMenuComponent from "./FullscreenMenuComponent";
import { SearchOverlay } from "./SearchOverlay";
import { BackToTop } from "./BackToTop";
import FooterComponent from "./FooterComponent";
import { PopupAd } from "./PopupAd";
import { getAds } from "@/lib/api/endpoints";

type SiteChromeProps = {
  children: ReactNode;
  flashNews: Post[];
  trending: Post[];
  /** Pass for pages whose content rarely changes, so they regenerate less often. */
  stable?: boolean;
};

const STABLE_NEWS_REVALIDATE = 86400;

export async function SiteChrome({
  children,
  flashNews,
  trending,
  stable = false,
}: SiteChromeProps) {
  const popupAds = await getAds()
    .then((res) => res.data.popup_ads)
    .catch(() => undefined);

  return (
    <>
      <MastheadComponent />
      <SiteNavComponent
        flashNews={flashNews}
        trending={trending}
        newsRevalidate={stable ? STABLE_NEWS_REVALIDATE : undefined}
      />
      <FullscreenMenuComponent />
      <SearchOverlay />
      {children}
      <FooterComponent />
      <BackToTop />
      <PopupAd ads={popupAds} />
    </>
  );
}
