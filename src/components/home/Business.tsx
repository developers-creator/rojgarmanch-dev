import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import Link from "next/link";
import { getBusiness } from "@/lib/api/endpoints";
import { toPost } from "@/lib/posts";

/** बिजनेस — image + solid red headline, then 2-col list */
export async function Business() {
  const res = await getBusiness().catch(() => null);
  const category = res?.data?.category;
  const items = (res?.data?.posts ?? []).map(toPost);
  const lead = items[0];
  const list = items.slice(1, 7);
  if (!lead) return null;

  return (
    <Reveal className="reveal">
      <section
        id="business"
        className="biz-board"
        aria-labelledby="business-title"
      >
        <SectionTitle href="/category/business">
          <span id="business-title">{category?.name}</span>
        </SectionTitle>

        <article className="biz-hero">
          <Link
            className="biz-hero__media"
            href={lead.href}
            tabIndex={-1}
            aria-hidden="true"
          >
            {lead.imageUrl ? (
              <img
                src={lead.imageUrl}
                alt=""
                width={640}
                height={440}
                loading="lazy"
              />
            ) : null}
          </Link>
          <div className="biz-hero__panel">
            <h3 className="biz-hero__title">
              <Link href={lead.href}>{lead.title}</Link>
            </h3>
          </div>
        </article>

        <ul className="biz-grid">
          {list.map((item) => (
            <li key={item.id}>
              <Link className="biz-item" href={item.href}>
                {item.imageUrl ? (
                  <span className="biz-item__thumb">
                    <img
                      src={item.imageUrl}
                      alt=""
                      width={120}
                      height={80}
                      loading="lazy"
                    />
                  </span>
                ) : null}
                <span className="biz-item__title line-2">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Reveal>
  );
}
