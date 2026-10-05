import type { Post } from "@/types/content";
import { ADS } from "@/lib/ads";
import { Reveal } from "@/components/motion/Reveal";
import { AdUnit } from "@/components/ui/AdUnit";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CareerPlaybook } from "./CareerPlaybook";
import Link from "next/link";
import { getNewsCategories } from "@/lib/api/endpoints";
import { toPost } from "@/lib/posts";

function NewsRow({ items }: { items: Post[] }) {
  if (!items.length) return null;

  return (
    <div className="samachar-board__row">
      {items.map((item, index) => (
        <Reveal
          key={item.id}
          className={`samachar-card${index ? ` reveal-delay-${Math.min(index, 3)}` : ""}`}
        >
          <Link
            className="samachar-card__media"
            href={item.href}
            tabIndex={-1}
            aria-hidden="true"
          >
            {item.imageUrl ? (
              <img
                className="img-cover"
                src={item.imageUrl}
                alt={item.imageAlt || item.title}
                width={400}
                height={240}
                loading="lazy"
              />
            ) : null}
          </Link>
          <h3 className="samachar-card__title line-2">
            <Link href={item.href}>{item.title}</Link>
          </h3>
        </Reveal>
      ))}
    </div>
  );
}

/** समाचार col-8 board + करियर प्लेबुक col-4 */
export async function Samachar() {
  const newsCategories = await getNewsCategories().catch(() => null);
  const category = newsCategories?.data?.category;
  const items = (newsCategories?.data?.posts ?? []).map(toPost);

  const featured = items[0];
  const side = items.slice(1, 3);
  const row = items.slice(3, 6);
  const rowExtra = items.slice(6, 9);

  return (
    <section className="samachar" id="samachar" aria-labelledby="samachar-title">
      <div className="container">
        <div className="samachar__grid">
          <div className="samachar__main">
            <SectionTitle href="/category/news">
              <span id="samachar-title">{category?.name}</span>
            </SectionTitle>

            <div className="samachar-board">
              <div className="samachar-board__top">
                {featured ? (
                  <Reveal className="samachar-feature">
                    <Link className="samachar-feature__link" href={featured.href}>
                      <span className="samachar-feature__media">
                        {featured.imageUrl ? (
                          <img
                            className="img-cover"
                            src={featured.imageUrl}
                            alt={featured.imageAlt || featured.title}
                            width={960}
                            height={540}
                          />
                        ) : null}
                      </span>
                      <span className="samachar-feature__body">
                        <span className="samachar-feature__title">
                          {featured.title}
                        </span>
                        {featured.excerpt ? (
                          <span className="samachar-feature__excerpt">
                            {featured.excerpt}
                          </span>
                        ) : null}
                      </span>
                    </Link>
                  </Reveal>
                ) : null}

                <div className="samachar-side">
                  {side.map((item, index) => (
                    <Reveal
                      key={item.id}
                      className={`samachar-side__item${index ? ` reveal-delay-${index}` : ""}`}
                    >
                      <Link className="samachar-side__media" href={item.href}>
                        {item.imageUrl ? (
                          <img
                            className="img-cover"
                            src={item.imageUrl}
                            alt={item.imageAlt || item.title}
                            width={400}
                            height={240}
                            loading="lazy"
                          />
                        ) : null}
                      </Link>
                      <h3 className="samachar-side__title line-2">
                        <Link href={item.href}>{item.title}</Link>
                      </h3>
                    </Reveal>
                  ))}
                </div>
              </div>

              <NewsRow items={row} />
              <NewsRow items={rowExtra} />
            </div>

            
          </div>

          <CareerPlaybook />
        </div>
      </div>
    </section>
  );
}
