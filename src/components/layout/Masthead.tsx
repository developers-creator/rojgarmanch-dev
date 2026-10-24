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

const FALLBACK_HEADER_AD_LEFT =
  "/images/Classic-Tech-450x200.jpg";
const FALLBACK_HEADER_AD_RIGHT =
  "/images/IME_ONLINE.jpg";

export function Masthead({ headerAds }: MastheadProps) {
  const [dates, setDates] = useState({ ad: "—", bs: "—" });
  const [showBs, setShowBs] = useState(true);

  useEffect(() => {
    setDates({ ad: formatAdBadge(), bs: formatBsBadge() });
    const id = window.setInterval(() => setShowBs((v) => !v), 3500);
    return () => window.clearInterval(id);
  }, []);

  const { dark_logo, white_logo, site_title } = useSettings();
  const leftImage = headerAds?.header_ad_left || FALLBACK_HEADER_AD_LEFT;
  const rightImage = headerAds?.header_ad_right || FALLBACK_HEADER_AD_RIGHT;
  const [leftAdFailed, setLeftAdFailed] = useState(false);
  const [rightAdFailed, setRightAdFailed] = useState(false);

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
  const [colorLogoFailed, setColorLogoFailed] = useState(false);
  const [whiteLogoFailed, setWhiteLogoFailed] = useState(false);
  const colorLogoSrc = colorLogoFailed ? "/images/rojgar-manch-logo.svg" : colorLogo;
  const whiteLogoSrc = whiteLogoFailed
    ? "/images/rojgar-manch-whitelogo.svg"
    : whiteLogo;

  const leftAd = leftImage ? (
    <Image
      src={leftAdFailed ? FALLBACK_HEADER_AD_LEFT : leftImage}
      alt={site_title}
      width={450}
      height={200}
      unoptimized={unoptimizedImage(leftAdFailed ? FALLBACK_HEADER_AD_LEFT : leftImage)}
      onError={() => setLeftAdFailed(true)}
      loading="lazy"
    />
  ) : null;

  const rightAd = rightImage ? (
    <Image
      src={rightAdFailed ? FALLBACK_HEADER_AD_RIGHT : rightImage}
      alt={site_title}
      width={350}
      height={200}
      unoptimized={unoptimizedImage(rightAdFailed ? FALLBACK_HEADER_AD_RIGHT : rightImage)}
      onError={() => setRightAdFailed(true)}
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
              src={colorLogoSrc}
              alt="रोजगार मञ्च"
              width={283}
              height={87}
              unoptimized={unoptimizedImage(colorLogoSrc)}
              onError={() => setColorLogoFailed(true)}
              preload
            />
            <Image
              className="logo logo--white"
              src={whiteLogoSrc}
              alt="रोजगार मञ्च"
              width={283}
              height={87}
              unoptimized={unoptimizedImage(whiteLogoSrc)}
              onError={() => setWhiteLogoFailed(true)}
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
