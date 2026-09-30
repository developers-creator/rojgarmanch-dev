import { unsplash as u } from "@/lib/media";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import Link from "next/link";

type LeadListColumnProps = {
  id: string;
  title: string;
  href: string;
  metaByline: string;
  leadTitle: string;
  image: string;
  items: readonly (readonly [string, string])[];
  delay?: number;
};

/** Featured headline + image + text list (अन्तर्वार्ता-style column) */
export function LeadListColumn({
  id,
  title,
  href,
  metaByline,
  leadTitle,
  image,
  items,
  delay = 0,
}: LeadListColumnProps) {
  return (
    <Reveal className={`lead-list${delay ? ` reveal-delay-${delay}` : ""} reveal`}>
      <aside id={id} aria-label={title}>
        <SectionTitle href={href}>{title}</SectionTitle>
        <p className="lead-list__meta">
          <span>{metaByline}</span>
        </p>
        <h3 className="lead-list__lead line-3">
          <Link href="#article">{leadTitle}</Link>
        </h3>
        <Link className="lead-list__media" href="#article" tabIndex={-1} aria-hidden="true">
          <img
            className="img-cover"
            src={u(image, 800, 500)}
            alt=""
            width={640}
            height={400}
            loading="lazy"
          />
        </Link>
        <ul className="lead-list__list">
          {items.map(([itemTitle, author]) => (
            <li className="lead-list__item" key={itemTitle}>
              <h4 className="lead-list__item-title line-2">
                <Link href="#article">{itemTitle}</Link>
              </h4>
              <p className="lead-list__author">{author}</p>
            </li>
          ))}
        </ul>
      </aside>
    </Reveal>
  );
}
