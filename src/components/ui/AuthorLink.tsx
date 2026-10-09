import type { ReactNode } from "react";
import Link from "next/link";

type AuthorLinkProps = {
  /** CMS author slug; without one the children render unlinked. */
  slug?: string | null;
  /** Accessible name for the link, useful when the children are only an image. */
  label?: string;
  className?: string;
  children: ReactNode;
};

/** Links to the author archive (`/author/<slug>/`) when the author has a slug. */
export function AuthorLink({ slug, label, className, children }: AuthorLinkProps) {
  if (!slug) return <>{children}</>;

  return (
    <Link
      className={`author-link${className ? ` ${className}` : ""}`}
      href={`/author/${slug}/`}
      aria-label={label}
    >
      {children}
    </Link>
  );
}
