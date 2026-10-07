import { unsplash as u } from "@/lib/media";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import Link from "next/link";
import type { Post } from "@/types/content";

type LeadListColumnProps = {
  id: string;
  title: string;
  href: string;
  /** CMS posts: `lead` is the headline + image, `posts` the list beneath it. */
  lead?: Post;
  posts?: Post[];
  /** Static fallback for columns not yet wired to the CMS. */
  metaByline?: string;
  leadTitle?: string;
  image?: string;
  items?: readonly (readonly [string, string])[];
  delay?: number;
};

type Entry = { title: string; href: string; author?: string };

/** Featured headline + image + text list (अन्तर्वार्ता-style column) */
export function LeadListColumn({
  id,
  title,
  href,
  lead,
  posts,
  metaByline,
  leadTitle,
  image,
  items = [],
  delay = 0,
}: LeadListColumnProps) {
  const headline = lead?.title ?? leadTitle;
  if (!headline) return null;

  const headlineHref = lead?.href ?? "#article";
  const imageSrc = lead ? lead.imageUrl : image && u(image, 800, 500);
  const byline = lead ? lead.author : metaByline;

  const entries: Entry[] = posts
    ? posts.map((post) => ({
        title: post.title,
        href: post.href,
        author: post.author,
      }))
    : items.map(([itemTitle, author]) => ({
        title: itemTitle,
        href: "#article",
        author,
      }));

  return (
    <Reveal className={`lead-list${delay ? ` reveal-delay-${delay}` : ""} reveal`}>
      <aside id={id} aria-label={title}>
        <SectionTitle href={href}>{title}</SectionTitle>
        {byline ? (
          <p className="lead-list__meta">
            <span>{byline}</span>
          </p>
        ) : null}
        <h3 className="lead-list__lead line-3">
          <Link href={headlineHref}>{headline}</Link>
        </h3>
        {imageSrc ? (
          <Link className="lead-list__media" href={headlineHref} tabIndex={-1} aria-hidden="true">
            <img
              className="img-cover"
              src={imageSrc}
              alt={headline}
              width={640}
              height={400}
              loading="lazy"
            />
          </Link>
        ) : null}
        <ul className="lead-list__list">
          {entries.map((entry, index) => (
            <li className="lead-list__item" key={`${entry.href}-${index}`}>
              <h4 className="lead-list__item-title line-2">
                <Link href={entry.href}>{entry.title}</Link>
              </h4>
              {entry.author ? (
                <p className="lead-list__author">{entry.author}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </aside>
    </Reveal>
  );
}
