import type { AdCreative } from "@/lib/ads";
import Link from "next/link";

type ArticleInlineAdsProps = {
  ads: AdCreative[];
};

export function ArticleInlineAds({ ads }: ArticleInlineAdsProps) {
  if (!ads.length) return null;

  return (
    <aside className="article-ad-break" aria-label="विज्ञापन">
      <p className="article-ad-break__label">Advertisement</p>
      <div className="article-ad-break__grid">
        {ads.map((ad) => (
          <Link className="article-ad-break__slot" href={ad.href} key={ad.src}>
            <img
              src={ad.src}
              alt={ad.alt}
              width={ad.width}
              height={ad.height}
              loading="lazy"
              decoding="async"
            />
          </Link>
        ))}
      </div>
    </aside>
  );
}
