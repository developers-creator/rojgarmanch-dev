/** खेल / पर्यटन — shared column block */
import { unsplash as u } from "@/lib/media";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import Link from "next/link";
import type { Post } from "@/types/content";

type ColumnItem = {
  title: string;
  imageUrl?: string;
};

type ColumnBlockProps = {
  id: string;
  title: string;
  href: string;
  /** CMS posts: `lead` is the big one, `posts` the list beneath it. */
  lead?: Post;
  posts?: Post[];
  /** Static fallback (Unsplash ids) for columns not yet wired to the CMS. */
  leadImage?: string;
  leadTitle?: string;
  items?: (string | ColumnItem)[];
  delay?: number;
};

type Entry = { title: string; href: string; image?: string };

export function CategoryColumn({
  id,
  title,
  href,
  lead,
  posts,
  leadImage,
  leadTitle,
  items = [],
  delay = 0,
}: ColumnBlockProps) {
  const leadEntry: Entry | null = lead
    ? { title: lead.title, href: lead.href, image: lead.imageUrl }
    : leadTitle
      ? {
          title: leadTitle,
          href: "#article",
          image: leadImage && u(leadImage, 800, 500),
        }
      : null;

  const listEntries: Entry[] = posts
    ? posts.map((post) => ({
        title: post.title,
        href: post.href,
        image: post.imageUrl,
      }))
    : items.map((item) => {
        const obj = typeof item === "string" ? { title: item } : item;
        return {
          title: obj.title,
          href: "#article",
          image: "imageUrl" in obj && obj.imageUrl ? u(obj.imageUrl, 200, 160) : undefined,
        };
      });

  if (!leadEntry) return null;

  return (
    <Reveal
      className={`col-block${delay ? ` reveal-delay-${delay}` : ""}`}
      id={id}
    >
      <SectionTitle href={href}>{title}</SectionTitle>
      <article className="col-block__lead">
        <Link
          className="col-block__lead-media"
          href={leadEntry.href}
          tabIndex={-1}
          aria-hidden="true"
        >
          {leadEntry.image ? (
            <img
              className="img-cover"
              src={leadEntry.image}
              alt={leadEntry.title}
              width={800}
              height={500}
              loading="lazy"
            />
          ) : null}
        </Link>
        <div className="col-block__lead-body">
          <h3 className="col-block__lead-title line-3">
            <Link href={leadEntry.href}>{leadEntry.title}</Link>
          </h3>
        </div>
      </article>
      <ul className="col-block__list">
        {listEntries.map((entry, index) => (
          <li className="col-block__item" key={`${entry.href}-${index}`}>
            {entry.image ? (
              <Link
                className="col-block__item-media"
                href={entry.href}
                tabIndex={-1}
                aria-hidden="true"
              >
                <img
                  className="img-cover"
                  src={entry.image}
                  alt={entry.title}
                  width={120}
                  height={90}
                  loading="lazy"
                />
              </Link>
            ) : null}
            <h4 className="col-block__item-title line-2">
              <Link href={entry.href}>{entry.title}</Link>
            </h4>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
