import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import Link from "next/link";
import { getFeature } from "@/lib/api/endpoints";
import { toPost } from "@/lib/posts";

/** फिचर — framed photo editorial + related list */
export async function Feature() {
  const res = await getFeature().catch(() => null);
  const category = res?.data?.category;
  const items = (res?.data?.posts ?? []).map(toPost);
  if (!items.length) return null;

  const lead = items[0];
  const list = items.slice(1, 3);

  return (
    <Reveal className="reveal reveal-delay-1">
      <section
        id="feature"
        className="feature-spot"
        aria-labelledby="feature-title"
      >
        <SectionTitle href={`/${category?.slug ?? "feature"}`} more={false}>
          <span id="feature-title">{category?.name}</span>
        </SectionTitle>

        <article className="feature-spot__hero">
          <Link
            className="feature-spot__media"
            href={lead.href}
            tabIndex={-1}
            aria-hidden="true"
          >
            {lead.imageUrl ? (
              <img
                className="feature-spot__cover"
                src={lead.imageUrl}
                alt={lead.title}
                width={900}
                height={560}
                loading="lazy"
              />
            ) : null}
          </Link>

          <div className="feature-spot__body">
            <h3 className="feature-spot__headline">
              <Link href={lead.href}>{lead.title}</Link>
            </h3>
            {lead.excerpt ? (
              <p className="feature-spot__excerpt">{lead.excerpt}</p>
            ) : null}
          </div>
        </article>

        <ul className="feature-spot__list">
          {list.map((item) => (
            <li key={item.id}>
              <Link className="feature-spot__item" href={item.href}>
                {item.imageUrl ? (
                  <span className="feature-spot__thumb">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      width={88}
                      height={66}
                      loading="lazy"
                    />
                  </span>
                ) : null}
                <span className="feature-spot__item-title line-2">
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Reveal>
  );
}
