import Image from "next/image";
import Link from "next/link";
import type { AdImage, UploadedAd } from "@/types/ads";
import { fullSizeUrl } from "@/lib/media";

type CmsImageAdProps = {
  /** Image from the CMS ads API (URL or uploaded-image object); `false`/empty means the slot is unused. */
  src: AdImage | UploadedAd | null | undefined;
  href?: string;
  /** Site name from settings, used as the image alt text. */
  siteName: string;
  /** Size hint only; CSS scales the image to its container. */
  width?: number;
  height?: number;
  variant?: "banner" | "aside";
};

/** An ad whose slot is a plain image URL (not the uploaded-image object). */
export function CmsImageAd({
  src,
  href,
  siteName,
  width = 1100,
  height = 110,
  variant = "banner",
}: CmsImageAdProps) {
  const url = typeof src === "string" ? src : src ? fullSizeUrl(src.url) : "";
  if (!url) return null;

  const image = (
    <Image
      src={url}
      alt={siteName}
      width={width}
      height={height}
      sizes={`(max-width: ${width}px) 100vw, ${width}px`}
      style={{ width: "100%", height: "auto" }}
    />
  );

  return (
    <aside className={`site-ad site-ad--${variant}`} aria-label="विज्ञापन">
      {href ? (
        <Link
          className="site-ad__frame"
          href={href}
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
}
