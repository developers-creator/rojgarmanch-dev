import type { CategoryInfo } from "@/data/categories";
import type { Post } from "@/types/content";
import { Reveal } from "@/components/motion/Reveal";
import { AdUnit } from "@/components/ui/AdUnit";
import { Icon } from "@/components/ui/Icon";
import { ADS } from "@/lib/ads";
import { toNepaliDigits } from "@/lib/dates";
import Link from "next/link";

export const CATEGORY_PAGE_SIZE = 7;

type CategoryPageProps = {
  category: CategoryInfo;
  posts: Post[];
  page: number;
  totalPages: number;
};

function AuthorByline({ item }: { item: Post }) {
  if (!item.author && !item.authorAvatar) return null;

  return (
    <span className="category-author">
      {item.authorAvatar ? (
        <img
          className="category-author__avatar"
          src={item.authorAvatar}
          alt=""
          width={36}
          height={36}
        />
      ) : (
        <span className="category-author__avatar category-author__avatar--empty" />
      )}
      {item.author ? (
        <span className="category-author__name">{item.author}</span>
      ) : null}
    </span>
  );
}

function PostCard({
  item,
  delay,
}: {
  item: Post;
  delay?: number;
}) {
  return (
    <Reveal
      className={`category-card${delay ? ` reveal-delay-${delay}` : ""}`}
    >
      <Link className="category-card__link" href={item.href}>
        <span className="category-card__media">
          {item.imageUrl ? (
            <img
              className="img-cover"
              src={item.imageUrl}
              alt={item.imageAlt || item.title}
              width={800}
              height={450}
              loading="lazy"
            />
          ) : null}
        </span>
        <span className="category-card__body">
          <span className="category-card__title">{item.title}</span>
        </span>
      </Link>
    </Reveal>
  );
}

function pageHref(slug: string, page: number) {
  if (page <= 1) return `/category/${slug}`;
  return `/category/${slug}?page=${page}`;
}

function Pagination({
  slug,
  page,
  totalPages,
}: {
  slug: string;
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="category-pagination" aria-label="पृष्ठहरू">
      {page > 1 ? (
        <Link
          className="category-pagination__arrow"
          href={pageHref(slug, page - 1)}
          rel="prev"
          aria-label="अघिल्लो पृष्ठ"
        >
          <Icon name="chevron-left" size={14} />
        </Link>
      ) : (
        <span
          className="category-pagination__arrow is-disabled"
          aria-disabled="true"
        >
          <Icon name="chevron-left" size={14} />
        </span>
      )}

      <ol className="category-pagination__pages">
        {pages.map((n) => (
          <li key={n}>
            {n === page ? (
              <span
                className="category-pagination__num is-current"
                aria-current="page"
              >
                {toNepaliDigits(n)}
              </span>
            ) : (
              <Link className="category-pagination__num" href={pageHref(slug, n)}>
                {toNepaliDigits(n)}
              </Link>
            )}
          </li>
        ))}
      </ol>

      {page < totalPages ? (
        <Link
          className="category-pagination__arrow"
          href={pageHref(slug, page + 1)}
          rel="next"
          aria-label="अर्को पृष्ठ"
        >
          <Icon name="chevron-right" size={14} />
        </Link>
      ) : (
        <span
          className="category-pagination__arrow is-disabled"
          aria-disabled="true"
        >
          <Icon name="chevron-right" size={14} />
        </span>
      )}
    </nav>
  );
}

export function CategoryPage({
  category,
  posts,
  page,
  totalPages,
}: CategoryPageProps) {
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <main id="main" className="category-page">
      <div className="container">
        <header className="category-head">
          <h1 id="category-title">{category.labelNe}</h1>
        </header>

        {featured ? (
          <Reveal className="category-feature">
            <div className="category-feature__copy">
              <h2 className="category-feature__title">
                <Link href={featured.href}>{featured.title}</Link>
              </h2>
              <span className="category-feature__rule" aria-hidden="true" />
              {featured.excerpt ? (
                <p className="category-feature__excerpt">{featured.excerpt}</p>
              ) : null}
              <AuthorByline item={featured} />
            </div>

            <Link
              className="category-feature__media"
              href={featured.href}
              tabIndex={-1}
              aria-hidden="true"
            >
              {featured.imageUrl ? (
                <img
                  className="img-cover"
                  src={featured.imageUrl}
                  alt={featured.imageAlt || featured.title}
                  width={1200}
                  height={675}
                  fetchPriority="high"
                />
              ) : null}
            </Link>
          </Reveal>
        ) : null}

        <AdUnit ad={ADS.belaco} className="category-inline-ad" />

        {rest.length > 0 ? (
          <section className="category-stream" aria-label="थप सामग्री">
            <div className="category-cards">
              {rest.map((item, index) => (
                <PostCard
                  key={item.id}
                  item={item}
                  delay={Math.min((index % 3) + 1, 3)}
                />
              ))}
            </div>
          </section>
        ) : null}

        <Pagination
          slug={category.slug}
          page={page}
          totalPages={totalPages}
        />
      </div>
    </main>
  );
}
