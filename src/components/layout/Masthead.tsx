"use client";

import { useEffect, useState } from "react";
import { formatAdBadge, formatBsBadge } from "@/lib/dates";
import { ADS } from "@/lib/ads";
import Link from "next/link";

type MastheadProps = {
  domain: string;
};

export function Masthead({ domain }: MastheadProps) {
  const [dates, setDates] = useState({ ad: "—", bs: "—" });
  const [showBs, setShowBs] = useState(true);

  useEffect(() => {
    setDates({ ad: formatAdBadge(), bs: formatBsBadge() });
    const id = window.setInterval(() => setShowBs((v) => !v), 3500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header className="masthead">
      <div className="container masthead__inner">
        <div className="masthead__brand-wrap">
          <Link
            className="brand masthead__brand"
            href="/"
            aria-label="रोजगार मञ्च गृहपृष्ठ"
          >
            <img
              className="logo logo--color"
              src="/images/rojgar-manch-logo.svg"
              alt="रोजगार मञ्च"
              width={283}
              height={87}
              decoding="async"
              fetchPriority="high"
            />
            <img
              className="logo logo--white"
              src="/images/rojgar-manch-whitelogo.svg"
              alt="रोजगार मञ्च"
              width={283}
              height={87}
              decoding="async"
              fetchPriority="high"
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
        <div className="masthead__ads" aria-label="विज्ञापन">
          <picture>
            <source media="(max-width: 767px)" srcSet="/images/mobile-ad.gif" />
            <img
              src={ADS.hbl.src}
              alt={ADS.hbl.alt}
              width={ADS.hbl.width}
              height={ADS.hbl.height}
              decoding="async"
              loading="lazy"
            />
          </picture>
        </div>
      </div>
    </header>
  );
}
