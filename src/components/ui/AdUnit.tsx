import type { AdCreative } from "@/lib/ads";
import Link from "next/link";

const MOBILE_STATIC_AD_SRC = "/images/Mob-Banner_710x125_img.jpg.jpeg";

type AdUnitProps = {
  ad: AdCreative;
  variant?: "banner" | "aside";
  className?: string;
  useMobileImage?: boolean;
};

export function AdUnit({
  ad,
  variant = "banner",
  className = "",
  useMobileImage = true,
}: AdUnitProps) {
  const classes = ["site-ad", `site-ad--${variant}`, className]
    .filter(Boolean)
    .join(" ");
  const image = (
    <img
      src={ad.src}
      alt={ad.alt}
      width={ad.width}
      height={ad.height}
      loading="lazy"
      decoding="async"
    />
  );

  return (
    <aside className={classes} aria-label="विज्ञापन">
      <Link className="site-ad__frame" href={ad.href}>
        {useMobileImage ? (
          <picture>
            <source media="(max-width: 767px)" srcSet={MOBILE_STATIC_AD_SRC} />
            {image}
          </picture>
        ) : (
          image
        )}
      </Link>
    </aside>
  );
}
