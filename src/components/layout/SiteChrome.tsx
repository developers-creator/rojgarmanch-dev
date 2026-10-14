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
};

export async function SiteChrome({
  children,
  flashNews,
  trending,
}: SiteChromeProps) {
  const popupAds = await getAds()
    .then((res) => res.data.popup_ads)
    .catch(() => undefined);

  return (
    <>
      <MastheadComponent />
      <SiteNavComponent flashNews={flashNews} trending={trending} />
      <FullscreenMenuComponent />
      <SearchOverlay />
      {children}
      <FooterComponent />
      <BackToTop />
      <PopupAd ads={popupAds} />
    </>
  );
}
