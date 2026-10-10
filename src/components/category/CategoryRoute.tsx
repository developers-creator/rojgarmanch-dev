import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHomePageData, getSiteInfo } from "@/data/home";
import {
  getAds,
  getCategoryPosts,
  getSettingsOrEmpty,
} from "@/lib/api/endpoints";
import { buildPageMetadata, loadSeo, pageUrlFor } from "@/lib/seo";
import { SchemaScript } from "@/components/seo/SchemaScript";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { toPost } from "@/lib/posts";
import { CategoryPage } from "@/components/category/CategoryPage";
import { WebStories } from "@/components/home/WebStories";
import { SiteChrome } from "@/components/layout/SiteChrome";

export const parsePage = (raw?: string) =>
  Math.max(1, Number.parseInt(raw ?? "1", 10) || 1);

const loadCategory = (slug: string, page: number) =>
  getCategoryPosts(slug, page).catch(() => null);

/** Page 1 lives at `/<slug>/`, later pages at `/<slug>/page/N/`. */
export const categoryUrl = (slug: string, page = 1) =>
  page > 1 ? `/${slug}/page/${page}/` : `/${slug}/`;

export async function categoryMetadata(slug: string, page: number): Promise<Metadata> {
  // Start the SEO request alongside the category instead of after it.
  const [res] = await Promise.all([
    loadCategory(slug, page),
    loadSeo(`category/${slug}`),
  ]);
  const category = res?.data?.category;
  if (!category) return { title: "श्रेणी फेला परेन" };

  return buildPageMetadata(
    `category/${slug}`,
    {
      title:
        page > 1
          ? `${category.name} — पृष्ठ ${page} — रोजगार मञ्च`
          : `${category.name} — रोजगार मञ्च`,
      description: category.description || undefined,
      alternates: { canonical: pageUrlFor(categoryUrl(category.slug, page)) },
    },
    { page },
  );
}

export async function CategoryView({ slug, page }: { slug: string; page: number }) {
  const [res, ads, settings] = await Promise.all([
    loadCategory(slug, page),
    getAds()
      .then((r) => r.data.category_ads)
      .catch(() => null),
    getSettingsOrEmpty(),
  ]);
  if (!res?.data) notFound();
  // A page past the end of the listing is a 404, not an empty category.
  if (page > 1 && !res.data.posts.length) notFound();

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
          breadcrumbSchema([
            { name: "होम", path: "/" },
            { name: res.data.category.name },
          ]),
        )}
      />
      {slug === "webstories" ? (
        <main id="main">
          <WebStories more={false} />
        </main>
      ) : (
        <CategoryPage
          category={res.data.category}
          posts={res.data.posts.map(toPost)}
          pagination={res.pagination}
          ad={ads}
          siteName={settings.site_title}
        />
      )}
    </SiteChrome>
  );
}
