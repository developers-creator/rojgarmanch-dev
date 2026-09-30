"use client";

import { useEffect, useRef, useState } from "react";

function measureStickyTop() {
  const nav = document.getElementById("site-nav");
  if (!nav) return 56;
  return Math.ceil(nav.getBoundingClientRect().height);
}

type ArticleStickyTitleProps = {
  title: string;
};

/**
 * Hero sticky (title + byline) until hero ends.
 * Body sticky title shows the same title style once hero is gone.
 */
export function ArticleStickyTitle({ title }: ArticleStickyTitleProps) {
  const [visible, setVisible] = useState(false);
  const stuckIo = useRef<IntersectionObserver | null>(null);
  const heroIo = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const stickyBlock = document.querySelector(".article-hero__sticky");
    const sentinel = document.querySelector(".article-title-sentinel");
    const hero = document.querySelector(".article-hero");
    if (!stickyBlock) return;

    const applyTop = () => {
      const top = measureStickyTop();
      root.style.setProperty("--site-sticky-h", `${top}px`);
      return top;
    };

    let top = applyTop();

    const bindObservers = (offset: number) => {
      stuckIo.current?.disconnect();
      heroIo.current?.disconnect();

      if (sentinel) {
        stuckIo.current = new IntersectionObserver(
          ([entry]) => {
            stickyBlock.classList.toggle("is-stuck", !entry.isIntersecting);
          },
          {
            rootMargin: `-${offset}px 0px 0px 0px`,
            threshold: 0,
          },
        );
        stuckIo.current.observe(sentinel);
      }

      if (hero) {
        heroIo.current = new IntersectionObserver(
          ([entry]) => {
            const show = !entry.isIntersecting;
            setVisible(show);
            stickyBlock.classList.toggle("is-morphed", show);
          },
          {
            rootMargin: `-${offset}px 0px 0px 0px`,
            threshold: 0,
          },
        );
        heroIo.current.observe(hero);
      }
    };

    bindObservers(top);

    const onResize = () => {
      top = applyTop();
      bindObservers(top);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      stuckIo.current?.disconnect();
      heroIo.current?.disconnect();
      stickyBlock.classList.remove("is-morphed", "is-stuck");
    };
  }, []);

  return (
    <div
      className={`article-body__sticky-title${visible ? " is-visible" : ""}`}
      aria-hidden={!visible}
    >
      <p className="article-body__sticky-title-text">{title}</p>
    </div>
  );
}
