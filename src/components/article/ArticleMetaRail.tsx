"use client";

import { useCallback } from "react";
import { Icon } from "@/components/ui/Icon";
import { ArticleFontControls } from "./ArticleFontSize";

type ArticleMetaRailProps = {
  author?: string;
  authorAvatar?: string;
  dateLabel?: string;
  dateIso?: string;
  title: string;
  href: string;
  comments?: number;
  shares?: number;
};

export function ArticleMetaRail({
  author,
  authorAvatar,
  dateLabel,
  dateIso,
  title,
  href,
  shares = 0,
}: ArticleMetaRailProps) {
  const name = author || "सम्पादकीय टोली";
  const pageUrl = `https://rojgarmanch.com${href.startsWith("/") ? href : `/${href}`}`;
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(title);

  const onNativeShare = useCallback(async () => {
    const url =
      typeof window !== "undefined" ? window.location.href : pageUrl;
    try {
      if (navigator.share) {
        await navigator.share({ title, text: title, url });
        return;
      }
    } catch {
      /* cancelled */
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* ignore */
    }
  }, [pageUrl, title]);

  return (
    <aside className="article-meta" aria-label="लेखक र सेयर">
      <div className="article-meta__sticky">
        <div className="article-meta__row article-meta__row--author">
          <div className="article-meta__author">
            {authorAvatar ? (
              <img
                className="article-meta__avatar"
                src={authorAvatar}
                alt=""
                width={72}
                height={72}
              />
            ) : (
              <span className="article-meta__avatar article-meta__avatar--empty" aria-hidden="true">
                {name.slice(0, 1)}
              </span>
            )}
            <div className="article-meta__author-copy">
              <p className="article-meta__name">{name}</p>
              {dateLabel ? (
                <time className="article-meta__date" dateTime={dateIso}>
                  <Icon name="clock" size={12} />
                  <span>{dateLabel}</span>
                </time>
              ) : null}
            </div>
          </div>

          <ArticleFontControls />
        </div>

        <div className="article-meta__row article-meta__row--share">
          <div className="article-meta__shares">
            <strong>{shares}</strong>
            <span>Shares</span>
          </div>

          <div className="article-meta__social" aria-label="सेयर गर्नुहोस्">
            <a
              className="article-meta__social-btn article-meta__social-btn--facebook"
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook मा सेयर"
            >
              <Icon name="facebook" size={14} />
            </a>
            <a
              className="article-meta__social-btn article-meta__social-btn--x"
              href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X मा सेयर"
            >
              <Icon name="x" size={14} />
            </a>
            <a
              className="article-meta__social-btn article-meta__social-btn--linkedin"
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn मा सेयर"
            >
              <Icon name="linkedin" size={14} />
            </a>
            <button
              type="button"
              className="article-meta__social-btn article-meta__social-btn--native"
              onClick={onNativeShare}
              aria-label="सेयर गर्नुहोस्"
            >
              <Icon name="share-nodes" size={14} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
