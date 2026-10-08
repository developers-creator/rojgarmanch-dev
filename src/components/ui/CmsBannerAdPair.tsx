import type { UploadedAd } from "@/types/ads";
import { CmsBannerAd } from "./CmsBannerAd";

type AdSlot = {
  image: UploadedAd | false | null | undefined;
  href?: string;
};

type CmsBannerAdPairProps = {
  left: AdSlot;
  right: AdSlot;
  siteName: string;
};

/** Two CMS ads side by side in one band; a lone ad takes the full row. */
export function CmsBannerAdPair({ left, right, siteName }: CmsBannerAdPairProps) {
  const hasLeft = !!left.image && !!left.image.url;
  const hasRight = !!right.image && !!right.image.url;
  if (!hasLeft && !hasRight) return null;

  return (
    <div className="ad-band">
      <div className="container ad-pair">
        {hasLeft ? (
          <CmsBannerAd
            bare
            image={left.image}
            href={left.href}
            siteName={siteName}
            sizes="(max-width: 1100px) 50vw, 550px"
          />
        ) : null}
        {hasRight ? (
          <CmsBannerAd
            bare
            image={right.image}
            href={right.href}
            siteName={siteName}
            sizes="(max-width: 1100px) 50vw, 550px"
          />
        ) : null}
      </div>
    </div>
  );
}
