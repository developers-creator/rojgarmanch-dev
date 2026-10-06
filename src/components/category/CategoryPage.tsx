import type { Post } from "@/types/content";
import type { NewsCategory, Pagination as PaginationData } from "@/types/news";
import { Reveal } from "@/components/motion/Reveal";
import { AdUnit } from "@/components/ui/AdUnit";
import { Pagination } from "@/components/ui/Pagination";
import { ADS } from "@/lib/ads";
import Link from "next/link";

type CategoryPageProps = {
  category: NewsCategory;
  posts: Post[];
  pagination?: PaginationData;
  /** Overrides `/category/<slug>` for pagination links (used by search). */
  basePath?: string;
  /** Query params kept on pagination links. */
  query?: Record<string, string>;
  /** Shown instead of the post grid when there are no posts. */
  emptyMessage?: string;
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

export function CategoryPage({
  category,
  posts,
  pagination,
  basePath,
  query,
  emptyMessage,
}: CategoryPageProps) {
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <main id="main" className="category-page">
      <div className="container">
        <header className="category-head">
          <h1 id="category-title">{category.name}</h1>
        </header>

        {!featured && emptyMessage ? (
          <p className="category-empty">{emptyMessage}</p>
        ) : null}

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
          pagination={pagination}
          basePath={basePath ?? `/category/${category.slug}`}
          query={query}
        />
      </div>
    </main>
  );
}
