import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHomePageData, getSiteInfo } from "@/data/home";
import {
  getAds,
  getAuthorPosts,
  getSettingsOrEmpty,
} from "@/lib/api/endpoints";
import { pageUrlFor } from "@/lib/seo";
import { SchemaScript } from "@/components/seo/SchemaScript";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { toPost } from "@/lib/posts";
import { decodeEntities } from "@/lib/text";
import { CategoryPage } from "@/components/category/CategoryPage";
import { SiteChrome } from "@/components/layout/SiteChrome";

const plainText = (value: string) =>
  decodeEntities(value.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();

const loadAuthor = (slug: string, page: number) =>
  getAuthorPosts(slug, page).catch(() => null);

/** Page 1 lives at `/author/<slug>/`, later pages at `/author/<slug>/page/N/`. */
export const authorUrl = (slug: string, page = 1) =>
  page > 1 ? `/author/${slug}/page/${page}/` : `/author/${slug}/`;

export async function authorMetadata(slug: string, page: number): Promise<Metadata> {
  const res = await loadAuthor(slug, page);
  const author = res?.data?.author;
  if (!res?.data || !author) return { title: "लेखक फेला परेन", robots: { index: false } };

  const name = decodeEntities(author.name);
  const url = pageUrlFor(authorUrl(author.slug, page));
  const title =
    page > 1
      ? `${name} — पृष्ठ ${page} — रोजगार मञ्च`
      : `${name} — रोजगार मञ्च`;
  const description =
    plainText(author.description) || `${name} का समाचार र लेखहरू — रोजगार मञ्च`;
  // The author's photo, or the first post's image when they have none.
  const image =
    author.profile_image ||
    (res.data.posts.find((p) => p.featured_image)?.featured_image || undefined);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "profile",
      url,
      title,
      description,
      locale: "ne_NP",
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export async function AuthorView({ slug, page }: { slug: string; page: number }) {
  const [res, ads, settings] = await Promise.all([
    loadAuthor(slug, page),
    getAds()
      .then((r) => r.data.category_ads)
      .catch(() => null),
    getSettingsOrEmpty(),
  ]);
  if (!res?.data) notFound();
  // A page past the end of the listing is a 404, not an empty author.
  if (page > 1 && !res.data.posts.length) notFound();

  const { author, posts } = res.data;
  const name = decodeEntities(author.name);
  const description = plainText(author.description);
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
          {
            "@type": "Person",
            "@id": `${pageUrlFor(authorUrl(author.slug))}#person`,
            name,
            url: pageUrlFor(authorUrl(author.slug)),
            ...(author.profile_image && { image: author.profile_image }),
            ...(description && { description }),
          },
          breadcrumbSchema([{ name: "होम", path: "/" }, { name }]),
        )}
      />
      <CategoryPage
        category={{
          id: author.id,
          slug: author.slug,
          name,
          description: author.description,
        }}
        posts={posts.map(toPost)}
        pagination={res.pagination}
        basePath={`/author/${author.slug}`}
        pathStyle
        profile={{ image: author.profile_image, description }}
        emptyMessage="यस लेखकका कुनै समाचार फेला परेनन्।"
        ad={ads}
        siteName={settings.site_title}
      />
    </SiteChrome>
  );
}
