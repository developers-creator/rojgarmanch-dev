"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { useSettings } from "@/components/providers/SettingsProvider";
import type { PopupAds } from "@/types/ads";

const SHOW_DELAY_MS = 1200;

type PopupAdProps = {
  ads?: PopupAds | null;
};

type Creative = { src: string; href: string };

/**
 * Popup ads, shown on every visit: mobile ads on small screens (falling back to
 * web ads), web ads otherwise. Closing one shows the next, until none are left.
 */
export function PopupAd({ ads }: PopupAdProps) {
  const { site_title } = useSettings();
  const pathname = usePathname();
  const [queue, setQueue] = useState<Creative[]>([]);
  const [index, setIndex] = useState(0);
  const creative: Creative | undefined = queue[index];

  const homeOnly = ads?.show_popup_on_homepage_only ?? false;
  const hidden = ads?.hide_popup_entirely ?? false;
  const allowed = !hidden && (!homeOnly || pathname === "/");

  useEffect(() => {
    if (!ads || !allowed) return;

    const web: Creative[] = (ads.wen_popup_ads ?? [])
      .filter((a) => a.web)
      .map((a) => ({ src: a.web as string, href: a.web_link }));
    const mobile: Creative[] = (ads.mobile_popup_ads ?? [])
      .filter((a) => a.mobile)
      .map((a) => ({ src: a.mobile as string, href: a.mobile_link }));

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const pool = isMobile && mobile.length ? mobile : web.length ? web : mobile;
    if (!pool.length) return;

    const timer = window.setTimeout(() => {
      setIndex(0);
      setQueue(pool);
    }, SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [ads, allowed]);

  /** Show the next ad, or hide the popup after the last one. */
  const close = () => setIndex((i) => i + 1);
  /** Clicking through an ad dismisses the whole queue. */
  const dismissAll = () => setIndex(queue.length);

  useEffect(() => {
    if (!creative) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [creative]);

  if (!creative || !allowed) return null;
  const image = (
    <Image
      className="popup-ad__img"
      src={creative.src}
      alt={site_title}
      width={800}
      height={800}
      sizes="(max-width: 767px) 92vw, 640px"
      preload
    />
  );

  return (
    <div
      key={index}
      className="popup-ad"
      role="dialog"
      aria-modal="true"
      aria-label="विज्ञापन"
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="popup-ad__box">
        <button
          className="popup-ad__close"
          type="button"
          aria-label="बन्द गर्नुहोस्"
          onClick={close}
          autoFocus
        >
          <Icon name="xmark" size={18} />
        </button>
        {creative.href ? (
          <Link
            href={creative.href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={dismissAll}
          >
            {image}
          </Link>
        ) : (
          image
        )}
      </div>
    </div>
  );
}
