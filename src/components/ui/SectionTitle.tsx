import type { ReactNode } from "react";
import Link from "next/link";

type SectionTitleProps = {
  children: ReactNode;
  /** Category / archive link for “सबै हेर्नुहोस्”. */
  href?: string;
  moreLabel?: string;
  /** Set false for narrow side columns. Default true. */
  more?: boolean;
};

export function SectionTitle({
  children,
  href = "#",
  moreLabel = "सबै हेर्नुहोस्",
  more = true,
}: SectionTitleProps) {
  return (
    <h2 className="section-title">
      <span className="section-title__text">{children}</span>
      {more ? (
        <Link
          className="section-title__more"
          href={href}
          {...(href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          <span>{moreLabel}</span>
          <svg
  xmlns="http://www.w3.org/2000/svg"
  width="18"
  height="18"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#ef4444" 
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  aria-hidden="true"
  className="inline-block"
>
  <path d="M7 17L17 7" />
  <path d="M7 7h10v10" />
</svg>
        </Link>
      ) : null}
    </h2>
  );
}
