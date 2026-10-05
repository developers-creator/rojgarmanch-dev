import { CAREER_PLAYBOOK_ADS } from "@/lib/ads";
import { Reveal } from "@/components/motion/Reveal";
import { AdUnit } from "@/components/ui/AdUnit";
import { SectionTitle } from "@/components/ui/SectionTitle";
import Link from "next/link";
import { decodeEntities } from "@/lib/text";
import { getCareerPlaybookCategories } from "@/lib/api/endpoints";

/** करियर प्लेबुक — tip column + stacked ads */
export async function CareerPlaybook() {
  const res = await getCareerPlaybookCategories().catch(() => null);
  const category = res?.data?.category;
  const posts = res?.data?.posts ?? [];

  return (
    <Reveal className="career-playbook reveal reveal-delay-2">
      <aside>
        <div className="career-playbook__panel">
          <SectionTitle href="#article" more={false}>
            {category?.name}
          </SectionTitle>
          <ul className="career-playbook__list">
            {posts.map((post, index) =>
              index === 0 ? (
                <li
                  key={post.id}
                  className="career-playbook__item career-playbook__item--feature"
                >
                  <Link className="career-playbook__feature" href={`/${post.slug}`}>
                    {post.featured_image ? (
                      <span className="career-playbook__feature-media">
                        <img
                          src={post.featured_image}
                          alt=""
                          width={640}
                          height={360}
                          loading="lazy"
                        />
                      </span>
                    ) : null}
                    <p>{decodeEntities(post.title)}</p>
                  </Link>
                </li>
              ) : (
                <li key={post.id} className="career-playbook__item">
                  <Link href={`/${post.slug}`}>
                    <p>{decodeEntities(post.title)}</p>
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="career-playbook__ads" aria-label="विज्ञापन">
          {CAREER_PLAYBOOK_ADS.map((ad) => (
            <AdUnit
              key={ad.src}
              ad={ad}
              variant="aside"
              useMobileImage={false}
            />
          ))}
        </div>
      </aside>
    </Reveal>
  );
}
