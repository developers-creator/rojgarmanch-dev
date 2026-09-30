"use client";

import { useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export type AiSummaryItem = {
  title: string;
  text: string;
};

type ArticleAiSummaryProps = {
  teaser?: string;
  items: AiSummaryItem[];
};

const DEFAULT_TEASER =
  " - Summary by AI";

/** Liquid-glass banner that expands into AI summary bullet points */
export function ArticleAiSummary({
  teaser = DEFAULT_TEASER,
  items,
}: ArticleAiSummaryProps) {
  const panelId = useId();
  const [open, setOpen] = useState(false);

  if (!items.length) return null;

  return (
    <aside
      className={`article-ai${open ? " is-open" : ""}`}
      aria-label="AI सारांश"
    >
      <button
        type="button"
        className="article-ai__toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="article-ai__icon" aria-hidden="true">
          <svg viewBox="0 0 32 32" width="28" height="28" fill="#c50010">
            <path d="M12 2.5l2.6 6.6L21.2 12l-6.6 2.6L12 21.2l-2.6-6.6L2.8 12l6.6-2.9L12 2.5z" />
            <path d="M23.5 15.2l1.7 4.2 4.2 1.7-4.2 1.7-1.7 4.2-1.7-4.2-4.2-1.7 4.2-1.7 1.7-4.2z" />
            <path d="M22.2 3.2l1.05 2.55 2.55 1.05-2.55 1.05L22.2 10.4l-1.05-2.55-2.55-1.05 2.55-1.05L22.2 3.2z" />
          </svg>
        </span>
        <span className="article-ai__text">
  <span className="font-bold">News Summary </span>
  {teaser}
</span>
        <Icon
          name={open ? "chevron-up" : "chevron-down"}
          className="article-ai__chevron"
          size={14}
        />
      </button>

      <div id={panelId} className="article-ai__panel" hidden={!open}>
        <ul className="article-ai__list">
          {items.map((item, index) => (
            <li key={`${item.title}-${index}`}>{item.text}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
