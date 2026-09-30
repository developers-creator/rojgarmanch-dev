import type { ReactNode } from "react";
import type { Post, SiteInfo } from "@/types/content";
import { Masthead } from "./Masthead";
import { SiteNav } from "./SiteNav";
import { FullscreenMenu } from "./FullscreenMenu";
import { SearchOverlay } from "./SearchOverlay";
import { BackToTop } from "./BackToTop";
import { Footer } from "./Footer";
import Link from "next/link";

type SiteChromeProps = {
  children: ReactNode;
  flashNews: Post[];
  trending: Post[];
  site: SiteInfo;
};

export function SiteChrome({
  children,
  flashNews,
  trending,
  site,
}: SiteChromeProps) {
  return (
    <>
      <Link className="skip-link" href="#main">
        मुख्य सामग्रीमा जानुहोस्
      </Link>
      <Masthead domain={site.domain} />
      <SiteNav flashNews={flashNews} trending={trending} />
      <FullscreenMenu />
      <SearchOverlay />
      {children}
      <Footer site={site} />
      <BackToTop />
    </>
  );
}
