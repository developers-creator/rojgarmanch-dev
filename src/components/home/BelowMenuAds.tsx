import Image from "next/image";
import Link from "next/link";
import type { BelowMenuHomeAd } from "@/types/ads";

type BelowMenuAdsProps = {
  ads?: BelowMenuHomeAd[];
  /** Site name from settings, used as the image alt text. */
  siteName: string;
};

/** CMS banners shown right below the main menu on the homepage; one per row. */
export function BelowMenuAds({ ads = [], siteName }: BelowMenuAdsProps) {
  const items = ads.filter((ad) => ad.image);
  if (!items.length) return null;

  return (
    <div className="ad-band below-menu-ads">
      <div className="container">
        {items.map((ad, index) => {
          const image = (
            <Image
              src={ad.image}
              alt={siteName}
              width={1100}
              height={100}
              sizes="(max-width: 1100px) 100vw, 1100px"
              style={{ width: "100%", height: "auto" }}
              preload={index === 0}
            />
          );
          return (
            <aside
              className="site-ad site-ad--banner"
              aria-label="विज्ञापन"
              key={`${ad.image}-${ad.link}`}
            >
              {ad.link ? (
                <Link
                  className="site-ad__frame"
                  href={ad.link}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                >
                  {image}
                </Link>
              ) : (
                <span className="site-ad__frame">{image}</span>
              )}
            </aside>
          );
        })}
      </div>
    </div>
  );
}
