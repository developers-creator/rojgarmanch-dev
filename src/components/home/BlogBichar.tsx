/** ब्लग / विचार */
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import Link from "next/link";
import { getOpinion } from "@/lib/api/endpoints";
import { toPost } from "@/lib/posts";

export async function BlogBichar() {
  const res = await getOpinion().catch(() => null);
  const category = res?.data?.category;
  const items = (res?.data?.posts ?? []).map(toPost);
  if (!category || !items.length) return null;

  return (
    <section className="teasers" id="vichar" aria-label="ब्लग / विचार">
      <div className="container">
        <SectionTitle href={`/category/${category.slug}`}>{category.name}</SectionTitle>
        <div className="teasers__grid">
          {items.map((item, index) => (
            <Reveal
              key={item.id}
              className={`teaser${index ? ` reveal-delay-${Math.min(index, 3)}` : ""}`}
            >
              <Link
                className="teaser__thumb"
                href={item.href}
                tabIndex={-1}
                aria-hidden="true"
              >
                {item.imageUrl ? (
                  <img
                    className="img-cover"
                    src={item.imageUrl}
                    alt={item.imageAlt || item.title}
                    width={84}
                    height={64}
                  />
                ) : null}
              </Link>
              <h2 className="teaser__title line-2">
                <Link href={item.href}>{item.title}</Link>
              </h2>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
