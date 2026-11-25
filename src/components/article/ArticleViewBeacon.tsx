"use client";

import { useEffect } from "react";

// Counts one view per visitor per article per browser session. Sent from the
// browser so cached (ISR) pages are still counted; renders nothing, so the
// cached HTML never changes when views do.
const BOT = /bot|crawl|spider|slurp|lighthouse|headless|preview|facebookexternalhit/i;

export function ArticleViewBeacon({ href }: { href: string }) {
  useEffect(() => {
    const slug = href.replace(/^\/+|\/+$/g, "");
    if (!slug || BOT.test(navigator.userAgent)) return;

    const key = `rm-viewed:${slug}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      /* storage blocked: count anyway */
    }

    // Short delay so quick bounces and prefetch-like loads don't count.
    const timer = window.setTimeout(() => {
      const body = JSON.stringify({ slug });
      const url = "/api/view/";
      if (navigator.sendBeacon) {
        navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
      } else {
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
          keepalive: true,
        }).catch(() => {});
      }
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [href]);

  return null;
}
