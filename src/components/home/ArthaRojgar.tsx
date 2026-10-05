import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import Link from "next/link";
import { getArthaRojgarCategories } from "@/lib/api/endpoints";
import { toPost } from "@/lib/posts";

/** अर्थ र रोजगार */
export async function ArthaRojgar() {
  const arthaRojgarCategories = await getArthaRojgarCategories().catch(() => null);
  const category = arthaRojgarCategories?.data?.category;
  const items = (arthaRojgarCategories?.data?.posts ?? []).map(toPost);
  const lead = items[0];
  const list = items.slice(1, 5);

  return (
    <section className="spotlight" id="artha-rojgar" aria-labelledby="artha-rojgar-title">
      <SectionTitle href="/category/employment">
        <span id="artha-rojgar-title">{category?.name}</span>
      </SectionTitle>
      <div className="spotlight__grid">
        {lead ? (
          <Reveal className="spotlight__lead reveal">
            <div className="spotlight__lead-bg" aria-hidden="true" />
            <div className="spotlight__lead-inner">
              <Link
                className="spotlight__lead-media"
                href={lead.href}
                tabIndex={-1}
                aria-hidden="true"
              >
                {lead.imageUrl ? (
                  <img
                    className="img-cover"
                    src={lead.imageUrl}
                    alt={lead.title}
                    width={800}
                    height={520}
                    loading="lazy"
                  />
                ) : null}
              </Link>
              <h3 className="spotlight__lead-title">
                <Link href={lead.href}>{lead.title}</Link>
              </h3>
              {lead.excerpt ? (
                <p className="spotlight__lead-excerpt">{lead.excerpt}</p>
              ) : null}
            </div>
          </Reveal>
        ) : null}
        <Reveal className="spotlight__list reveal reveal-delay-1">
          <ul>
            {list.map((item) => (
              <li key={item.id}>
                <Link className="spotlight__item" href={item.href}>
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      width={100}
                      height={80}
                      loading="lazy"
                    />
                  ) : null}
                  <span>
                    <strong className="line-2">{item.title}</strong>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
