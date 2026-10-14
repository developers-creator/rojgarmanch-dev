"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { formatAdBadge, formatBsBadge } from "@/lib/dates";
import Link from "next/link";
import { useSettings } from "@/components/providers/SettingsProvider";
import { unoptimizedImage } from "@/lib/media";
import { HeaderAds } from "@/types/ads";


type MastheadProps = {
  headerAds?: HeaderAds | null;
};

/** Display size of the header banner (matches the uploaded HBL creative). */
const HEADER_AD_WIDTH = 810;
const HEADER_AD_HEIGHT = 100;

export function Masthead({ headerAds }: MastheadProps) {
  const [dates, setDates] = useState({ ad: "—", bs: "—" });
  const [showBs, setShowBs] = useState(true);

  useEffect(() => {
    setDates({ ad: formatAdBadge(), bs: formatBsBadge() });
    const id = window.setInterval(() => setShowBs((v) => !v), 3500);
    return () => window.clearInterval(id);
  }, []);

  const { dark_logo, white_logo, site_title } = useSettings();
  const rightImage = headerAds?.header_ad_right || null;
  const leftImage = headerAds?.header_ad_left || null;

  const wrapLink = (node: ReactNode, href?: string) =>
    href ? (
      <Link href={href} target="_blank" rel="noopener noreferrer sponsored">
        {node}
      </Link>
    ) : (
      node
    );

  const colorLogo = dark_logo || "/images/rojgar-manch-logo.svg";
  const whiteLogo = white_logo || "/images/rojgar-manch-whitelogo.svg";

  const leftAd = leftImage ? (
    <Image
      src={leftImage}
      alt={site_title}
      width={450}
      height={HEADER_AD_HEIGHT}
      unoptimized={unoptimizedImage(leftImage)}
      style={{ width: "auto", height: HEADER_AD_HEIGHT, maxWidth: "100%" }}
      loading="lazy"
    />
  ) : null;

  const rightAd = rightImage ? (
    <Image
      src={rightImage}
      alt={site_title}
      width={HEADER_AD_WIDTH}
      height={HEADER_AD_HEIGHT}
      unoptimized={unoptimizedImage(rightImage)}
      style={{ width: "auto", height: HEADER_AD_HEIGHT, maxWidth: "100%" }}
      loading="lazy"
    />
  ) : null;

  return (
    <header className="masthead">
      <div className="container masthead__inner">
        <div className="masthead__brand-wrap">
          <Link
            className="brand masthead__brand"
            href="/"
            aria-label="रोजगार मञ्च गृहपृष्ठ"
          >
            <Image
              className="logo logo--color"
              src={colorLogo}
              alt="रोजगार मञ्च"
              width={283}
              height={87}
              unoptimized={unoptimizedImage(colorLogo)}
              preload
            />
            <Image
              className="logo logo--white"
              src={whiteLogo}
              alt="रोजगार मञ्च"
              width={283}
              height={87}
              unoptimized={unoptimizedImage(whiteLogo)}
              preload
            />
          </Link>
          <div className="masthead__dates" aria-label="मिति">
            <div className="masthead-date">
              <div className="masthead-date__track">
                <div className="masthead-date__badge">
                  <span
                    className="masthead-date__sizer"
                    aria-hidden="true"
                  >
                    {dates.bs.length >= dates.ad.length ? dates.bs : dates.ad}
                  </span>
                  <span
                    className={`masthead-date__slide${showBs ? " is-active" : ""}`}
                    aria-hidden={!showBs}
                  >
                    <span className="masthead-date__value">{dates.bs}</span>
                  </span>
                  <span
                    className={`masthead-date__slide${!showBs ? " is-active" : ""}`}
                    aria-hidden={showBs}
                  >
                    <span className="masthead-date__value">{dates.ad}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {leftAd || rightAd ? (
          <div className="masthead__ads" aria-label="विज्ञापन">
            {leftAd ? (
              <div className="masthead__ad masthead__ad--left">
                {wrapLink(leftAd, headerAds?.header_ad_left_link)}
              </div>
            ) : null}
            {rightAd ? (
              <div className="masthead__ad masthead__ad--right">
                {wrapLink(rightAd, headerAds?.header_ad_right_link)}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </header>
  );
}
