/** एनआरएन + प्रवास */
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import Link from "next/link";
import { getNRN, getPravas } from "@/lib/api/endpoints";
import { toPost } from "@/lib/posts";
import type { NewsCategoryData } from "@/types/news";

function toRail(res: NewsCategoryData | null) {
  const category = res?.data?.category;
  const items = (res?.data?.posts ?? []).map(toPost);
  if (!category || !items.length) return null;
  return {
    heading: category.name,
    href: `/category/${category.slug}`,
    lead: items[0],
    items: items.slice(1, 4),
  };
}

export async function Pravas() {
  const [nrn, pravas] = await Promise.all([
    getNRN().catch(() => null),
    getPravas().catch(() => null),
  ]);
  const rails = [toRail(nrn), toRail(pravas)].filter(
    (rail): rail is NonNullable<ReturnType<typeof toRail>> => rail !== null,
  );
  if (!rails.length) return null;

  return (
    <section className="duo-rail container" id="pravas" aria-label="एनआरएन र प्रवास">
      <div className="duo-rail__grid">
        {rails.map((rail, index) => (
          <Reveal
            className={`duo-rail__col${index ? " reveal-delay-1" : ""}`}
            key={rail.href}
          >
            <SectionTitle href={rail.href}>{rail.heading}</SectionTitle>
            <div className="duo-rail__body">
              <article className="duo-rail__lead">
                <Link
                  className="duo-rail__lead-media"
                  href={rail.lead.href}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  {rail.lead.imageUrl ? (
                    <img
                      className="img-cover"
                      src={rail.lead.imageUrl}
                      alt={rail.lead.title}
                      width={640}
                      height={420}
                      loading="lazy"
                    />
                  ) : null}
                </Link>
                <h3 className="duo-rail__lead-title line-3">
                  <Link href={rail.lead.href}>{rail.lead.title}</Link>
                </h3>
              </article>
              <ul className="duo-rail__list">
                {rail.items.map((item) => (
                  <li key={item.id}>
                    <Link className="duo-rail__item" href={item.href}>
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          width={72}
                          height={72}
                          loading="lazy"
                        />
                      ) : null}
                      <span className="line-3">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
