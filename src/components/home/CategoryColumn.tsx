/** खेल / पर्यटन — shared column block */
import { unsplash as u } from "@/lib/media";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import Link from "next/link";

type ColumnItem = {
  title: string;
  imageUrl?: string;
};

type ColumnBlockProps = {
  id: string;
  title: string;
  href: string;
  leadImage: string;
  leadTitle: string;
  items: (string | ColumnItem)[];
  delay?: number;
};

export function CategoryColumn({
  id,
  title,
  href,
  leadImage,
  leadTitle,
  items,
  delay = 0,
}: ColumnBlockProps) {
  return (
    <Reveal
      className={`col-block${delay ? ` reveal-delay-${delay}` : ""}`}
      id={id}
    >
      <SectionTitle href={href}>{title}</SectionTitle>
      <article className="col-block__lead">
        <Link
          className="col-block__lead-media"
          href="#article"
          tabIndex={-1}
          aria-hidden="true"
        >
          <img
            className="img-cover"
            src={u(leadImage, 800, 500)}
            alt={leadTitle}
            width={800}
            height={500}
            loading="lazy"
          />
        </Link>
        <div className="col-block__lead-body">
          <h3 className="col-block__lead-title line-3">
            <Link href="#article">{leadTitle}</Link>
          </h3>
        </div>
      </article>
      <ul className="col-block__list">
        {items.map((item) => {
          const itemObj = typeof item === "string" ? { title: item } : item;
          return (
            <li className="col-block__item" key={itemObj.title}>
              {itemObj.imageUrl ? (
                <Link
                  className="col-block__item-media"
                  href="#article"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <img
                    className="img-cover"
                    src={u(itemObj.imageUrl, 200, 160)}
                    alt={itemObj.title}
                    width={120}
                    height={90}
                    loading="lazy"
                  />
                </Link>
              ) : null}
              <h4 className="col-block__item-title line-2">
                <Link href="#article">{itemObj.title}</Link>
              </h4>
            </li>
          );
        })}
      </ul>
    </Reveal>
  );
}
