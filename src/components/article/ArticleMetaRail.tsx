"use client";

import { useCallback } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";
import { Icon } from "@/components/ui/Icon";
import { AuthorLink } from "@/components/ui/AuthorLink";
import { ArticleFontControls } from "./ArticleFontSize";

const SHARE_ICON_SIZE = 42;

type ArticleMetaRailProps = {
  author?: string;
  authorSlug?: string;
  authorAvatar?: string;
  dateLabel?: string;
  dateIso?: string;
  title: string;
  href: string;
};

export function ArticleMetaRail({
  author,
  authorSlug,
  authorAvatar,
  dateLabel,
  dateIso,
  title,
  href,
}: ArticleMetaRailProps) {
  const name = author || "सम्पादकीय टोली";
  const pageUrl = `https://rojgarmanch.com${href.startsWith("/") ? href : `/${href}`}${href.endsWith("/") ? "" : "/"}`;

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
            <AuthorLink slug={authorSlug} label={name} className="article-meta__avatar-link">
            {authorAvatar ? (
              <img
                className="article-meta__avatar"
                src={authorAvatar}
                alt={name}
                width={72}
                height={72}
              />
            ) : (
              <span className="article-meta__avatar article-meta__avatar--empty" aria-hidden="true">
                {name.slice(0, 1)}
              </span>
            )}
            </AuthorLink>
            <div className="article-meta__author-copy">
              <p className="article-meta__name">
                <AuthorLink slug={authorSlug}>{name}</AuthorLink>
              </p>
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
          <div className="article-meta__social" aria-label="सेयर गर्नुहोस्">
            <FacebookShareButton
              url={pageUrl}
              quote={title}
              aria-label="Facebook मा सेयर"
            >
              <FacebookIcon size={SHARE_ICON_SIZE} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={pageUrl}
              title={title}
              aria-label="X मा सेयर"
            >
              <TwitterIcon size={SHARE_ICON_SIZE} round />
            </TwitterShareButton>
            <LinkedinShareButton url={pageUrl} aria-label="LinkedIn मा सेयर">
              <LinkedinIcon size={SHARE_ICON_SIZE} round />
            </LinkedinShareButton>
            <WhatsappShareButton
              url={pageUrl}
              title={title}
              separator=" - "
              aria-label="WhatsApp मा सेयर"
            >
              <WhatsappIcon size={SHARE_ICON_SIZE} round />
            </WhatsappShareButton>
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
