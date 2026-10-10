import { decodeEntities } from "@/lib/text";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import type { Article, ArticleLink } from "@/data/articles";
import type { NewsLink } from "@/types/news";
import { getHomePageData, getSiteInfo } from "@/data/home";
import { getAds, getNews, getSettingsOrEmpty } from "@/lib/api";
import { buildPageMetadata, loadSeo, pageUrlFor } from "@/lib/seo";
import { SchemaScript } from "@/components/seo/SchemaScript";
import { breadcrumbSchema, graph, newsArticleSchema } from "@/lib/schema";
import { unwrapCmsWrappers } from "@/lib/cmsHtml";
import { ArticlePage } from "@/components/article/ArticlePage";
import { SiteChrome } from "@/components/layout/SiteChrome";
import {
  CategoryView,
  categoryMetadata,
  categoryUrl,
  parsePage,
} from "@/components/category/CategoryRoute";

// Always rendered per request so edits show up right away; data fetches
// still cache for a few seconds (apiFetch).
export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ page?: string }>;
};

/** `/<category>/page/N/` — N is a whole number; returns the category slug and page. */
function categoryPagePath(segments: string[]) {
  if (segments.length !== 3 || segments[1] !== "page") return null;
  if (!/^\d+$/.test(segments[2])) return null;
  return { slug: segments[0], page: Number(segments[2]) };
}

const toLink = (item: NewsLink): ArticleLink => ({
  title: decodeEntities(item.title.trim()),
  href: `/${item.slug}`,
  imageUrl: item.featured_image ?? undefined,
});

/** Any path not matched by a static route is looked up in the CMS by its slug. */
async function loadArticle(segments: string[]): Promise<Article | null> {
  try {
    const res = await getNews(segments.join("/"));
    const news = res.data;
    if (!res.success || !news) return null;

    return {
      id: news.id,
      slug: news.slug,
      title: decodeEntities(news.title),
      excerpt: news.excerpt,
      href: `/${news.slug}`,
      imageUrl: news.featured_image ?? undefined,
      imageAlt: decodeEntities(news.title),
      author: news.author_name ?? undefined,
      authorSlug: news.author_slug ?? undefined,
      authorAvatar: news.author_image ?? undefined,
      dateLabel: news.date,
      category: news.category_name,
      categorySlug: news.category_slug,
      readMinutes: 3,
      topics: [],
      body: [{ type: "html", html: unwrapCmsWrappers(news.content) }],
      summaryPoints: Object.entries(news.summary_points ?? {})
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([, text]) => text)
        .filter(Boolean),
      relatedPosts: (news.related_posts ?? []).map(toLink),
      seeAlso: (news.see_also ?? []).map(toLink),
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const paged = categoryPagePath(slug);
  if (paged) {
    return paged.page > 1
      ? categoryMetadata(paged.slug, paged.page)
      : { title: "श्रेणी फेला परेन" };
  }
  const path = slug.join("/");
  // Start the SEO request alongside the article instead of after it.
  const [article] = await Promise.all([loadArticle(slug), loadSeo(path)]);
  if (!article) {
    // A single segment that is not an article may be a category (`/news/`).
    return slug.length === 1
      ? categoryMetadata(slug[0], 1)
      : { title: "लेख फेला परेन" };
  }

  return buildPageMetadata(path, {
    title: `${article.title} — रोजगार मञ्च`,
    description: article.deck || article.excerpt || article.title,
    alternates: { canonical: pageUrlFor(article.href) },
  });
}

export default async function ArticleRoute({ params, searchParams }: PageProps) {
  const { slug } = await params;

  const paged = categoryPagePath(slug);
  if (paged) {
    if (paged.page < 1) notFound();
    if (paged.page === 1) permanentRedirect(categoryUrl(paged.slug));
    return <CategoryView slug={paged.slug} page={paged.page} />;
  }

  const [article, ads, settings, seo] = await Promise.all([
    loadArticle(slug),
    getAds()
      .then((res) => res.data.sidebar_ads)
      .catch(() => null),
    getSettingsOrEmpty(),
    // Memoized with generateMetadata; supplies the ISO publish/modify times.
    loadSeo(slug.join("/")),
  ]);
  if (!article) {
    if (slug.length !== 1) notFound();
    // Old `?page=N` links move to the `/page/N/` form.
    const legacyPage = parsePage((await searchParams).page);
    if (legacyPage > 1) permanentRedirect(categoryUrl(slug[0], legacyPage));
    return <CategoryView slug={slug[0]} page={1} />;
  }

  const home = getHomePageData();
  const site = getSiteInfo();

  return (
    <SiteChrome
      flashNews={home.flashNews}
      trending={home.trending}
      site={site}
    >
      <SchemaScript
        data={graph(
          newsArticleSchema(
            {
              path: slug.join("/"),
              title: article.title,
              description: article.excerpt,
              image: article.imageUrl,
              published: seo?.article_published_time,
              modified: seo?.article_modified_time,
              author: article.author,
              authorSlug: article.authorSlug,
              categoryName: article.category,
            },
            settings,
          ),
          breadcrumbSchema([
            { name: "होम", path: "/" },
            ...(article.category && article.categorySlug
              ? [{ name: article.category, path: `category/${article.categorySlug}` }]
              : []),
            { name: article.title },
          ]),
        )}
      />
      <ArticlePage
        article={article}
        ads={ads}
        siteName={settings.site_title}
      />
    </SiteChrome>
  );
}
