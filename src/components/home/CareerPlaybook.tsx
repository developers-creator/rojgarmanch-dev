import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import Link from "next/link";
import { decodeEntities } from "@/lib/text";
import {
  getAds,
  getCareerPlaybookCategories,
  getSettingsOrEmpty,
} from "@/lib/api/endpoints";

/** करियर प्लेबुक — tip column + stacked ads */
export async function CareerPlaybook() {
  const [res, sidebarAds, settings] = await Promise.all([
    getCareerPlaybookCategories().catch(() => null),
    getAds()
      .then((r) => r.data.sidebar_ads.top_sidebar_ads)
      .catch(() => []),
    getSettingsOrEmpty(),
  ]);
  const ads = sidebarAds.filter((ad) => ad.top_ads);
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
                          alt={decodeEntities(post.title) || settings.site_title}
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

        {ads.length ? (
          <div className="career-playbook__ads" aria-label="विज्ञापन">
            {ads.map((ad) => {
              const image = (
                <Image
                  src={ad.top_ads}
                  alt={settings.site_title}
                  width={400}
                  height={500}
                  sizes="(max-width: 992px) 100vw, 400px"
                  style={{ width: "100%", height: "auto" }}
                />
              );
              return (
                <aside
                  className="site-ad site-ad--aside"
                  key={`${ad.top_ads}-${ad.top_link}`}
                >
                  {ad.top_link ? (
                    <Link
                      className="site-ad__frame"
                      href={ad.top_link}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                    >
                      {image}
                    </Link>
                  ) : (
                    <span className="site-ad__frame">{image}</span>
                  )}
                </aside>
              );
            })}
          </div>
        ) : null}
      </aside>
    </Reveal>
  );
}
