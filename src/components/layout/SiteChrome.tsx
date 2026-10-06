import type { ReactNode } from "react";
import type { Post, SiteInfo } from "@/types/content";
import { Masthead } from "./Masthead";
import { SiteNav } from "./SiteNav";
import { FullscreenMenu } from "./FullscreenMenu";
import { SearchOverlay } from "./SearchOverlay";
import { BackToTop } from "./BackToTop";
import { Footer } from "./Footer";
import Link from "next/link";
import { toFrontUrl } from "@/lib/url";
import type { MenuItem } from "@/types/menu";
import { getAdditionalMenu, getFooterMenu, getHeaderMenu } from "@/lib/api/endpoints";

type SiteChromeProps = {
  children: ReactNode;
  flashNews: Post[];
  trending: Post[];
  site: SiteInfo;
};

const toFrontItem = (item: MenuItem): MenuItem => ({
  ...item,
  url: toFrontUrl(item.url),
  children: item.children.map(toFrontItem),
});

export async function SiteChrome({
  children,
  flashNews,
  trending,
  site,
}: SiteChromeProps) {
  const [headerMenu, additionalMenu, footerMenu] = await Promise.all([
    getHeaderMenu()
      .then((res) => res.data.items.map(toFrontItem))
      .catch(() => []),
    getAdditionalMenu()
      .then((res) => res.data.items.map(toFrontItem))
      .catch(() => []),
    getFooterMenu()
      .then((res) => res.data.items.map(toFrontItem))
      .catch(() => []),
  ]);

  return (
    <>
      <Link className="skip-link" href="#main">
        मुख्य सामग्रीमा जानुहोस्
      </Link>
      <Masthead domain={site.domain} />
      <SiteNav
        flashNews={flashNews}
        trending={trending}
        headerMenu={headerMenu}
      />
      <FullscreenMenu
        headerMenu={headerMenu}
        additionalMenu={additionalMenu}
      />
      <SearchOverlay />
      {children}
      <Footer site={site} footerMenu={footerMenu} />
      <BackToTop />
    </>
  );
}
