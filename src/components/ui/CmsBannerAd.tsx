import Image from "next/image";
import Link from "next/link";
import type { UploadedAd } from "@/types/ads";

type CmsBannerAdProps = {
  /** Image object from the CMS ads API. */
  image: UploadedAd | false | null | undefined;
  href?: string;
  /** Site name from settings, used as the image alt text. */
  siteName: string;
};

/** The CMS sends the 150px thumbnail; drop the "-150x100" suffix for the original. */
const fullSizeUrl = (url: string) => url.replace(/-\d+x\d+(?=\.\w+$)/, "");

/** Full-width banner for a CMS ad; renders nothing when the slot is empty. */
export function CmsBannerAd({ image, href, siteName }: CmsBannerAdProps) {
  if (!image || !image.url) return null;

  const picture = (
    <Image
      src={fullSizeUrl(image.url)}
      alt={siteName}
      width={1100}
      height={100}
      sizes="(max-width: 1100px) 100vw, 1100px"
      style={{ width: "100%", height: "auto" }}
    />
  );

  return (
    <div className="ad-band">
      <div className="container">
        <aside className="site-ad site-ad--banner" aria-label="विज्ञापन">
          {href ? (
            <Link
              className="site-ad__frame"
              href={href}
              target="_blank"
              rel="noopener noreferrer sponsored"
            >
              {picture}
            </Link>
          ) : (
            <span className="site-ad__frame">{picture}</span>
          )}
        </aside>
      </div>
    </div>
  );
}
