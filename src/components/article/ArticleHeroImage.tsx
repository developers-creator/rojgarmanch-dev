"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/ui/Icon";

type ArticleHeroImageProps = {
  src: string;
  alt: string;
};

export function ArticleHeroImage({ src, alt }: ArticleHeroImageProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <div className="article-hero__media">
        <img
          src={src}
          alt={alt}
          width={900}
          height={720}
          fetchPriority="high"
        />
        <button
          type="button"
          className="article-hero__zoom"
          aria-label="पूर्ण स्क्रिनमा हेर्नुहोस्"
          onClick={() => setOpen(true)}
        >
          <Icon name="expand" size={16} />
        </button>
      </div>

      {mounted && open
        ? createPortal(
            <div
              className="article-lightbox"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              onClick={(event) => {
                if (event.target === event.currentTarget) setOpen(false);
              }}
            >
              <p className="sr-only" id={titleId}>
                {alt || "तस्बिर पूर्वावलोकन"}
              </p>
              <button
                type="button"
                className="article-lightbox__close"
                aria-label="बन्द गर्नुहोस्"
                onClick={() => setOpen(false)}
              >
                <Icon name="xmark" size={20} />
              </button>
              <img
                className="article-lightbox__img"
                src={src}
                alt={alt}
                width={1600}
                height={1200}
              />
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
