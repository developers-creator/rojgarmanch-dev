import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import Link from "next/link";
import { getInterview } from "@/lib/api/endpoints";
import { toPost } from "@/lib/posts";

/** अन्तर्वार्ता — quote hero + 3-up cards */
export async function Antarwarta() {
  const res = await getInterview().catch(() => null);
  const category = res?.data?.category;
  const items = (res?.data?.posts ?? []).map(toPost);

  if (!items.length) return null;

  const lead = items[0];
  const list = items.slice(1, 4);

  return (
    <Reveal className="reveal">
      <section
        id="antarwarta"
        className="iv-board"
        aria-labelledby="antarwarta-title"
      >
        <SectionTitle href={`/${category?.slug ?? "interview"}`}>
          <span id="antarwarta-title">{category?.name}</span>
        </SectionTitle>

        <article className="iv-hero">
          <Link
            className="iv-hero__media"
            href={lead.href}
            tabIndex={-1}
            aria-hidden="true"
          >
            {lead.imageUrl ? (
              <img
                src={lead.imageUrl}
                alt={lead.title}
                width={640}
                height={560}
                loading="lazy"
              />
            ) : null}
          </Link>
          <div className="iv-hero__copy">
            <span className="iv-hero__notch" aria-hidden="true" />
            <span className="iv-hero__quote" aria-hidden="true">
              ”
            </span>
            <h3 className="iv-hero__title">
              <Link href={lead.href}>{lead.title}</Link>
            </h3>
            {lead.excerpt ? (
              <p className="iv-hero__excerpt">{lead.excerpt}</p>
            ) : null}
          </div>
        </article>

        <div className="iv-grid">
          {list.map((item, index) => (
            <article className="iv-card" key={item.id}>
              <Link
                className="iv-card__media"
                href={item.href}
                tabIndex={-1}
                aria-hidden="true"
              >
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    width={320}
                    height={200}
                    loading="lazy"
                  />
                ) : null}
                {index === 1 ? (
                  <span className="iv-card__quote" aria-hidden="true">
                    ”
                  </span>
                ) : null}
              </Link>
              <h3 className="iv-card__title line-2">
                <Link href={item.href}>{item.title}</Link>
              </h3>
            </article>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
