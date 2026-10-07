import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHomePageData, getSiteInfo } from "@/data/home";
import {
  getAds,
  getCategoryPosts,
  getSettingsOrEmpty,
} from "@/lib/api/endpoints";
import { buildPageMetadata, loadSeo } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { toPost } from "@/lib/posts";
import { CategoryPage } from "@/components/category/CategoryPage";
import { WebStories } from "@/components/home/WebStories";
import { SiteChrome } from "@/components/layout/SiteChrome";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

const parsePage = (raw?: string) =>
  Math.max(1, Number.parseInt(raw ?? "1", 10) || 1);

const loadCategory = (slug: string, page: number) =>
  getCategoryPosts(slug, page).catch(() => null);

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = parsePage((await searchParams).page);
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
      alternates: {
        canonical: `https://rojgarmanch.com/category/${category.slug}${
          page > 1 ? `?page=${page}` : ""
        }`,
      },
    },
    { page },
  );
}

export default async function CategoryRoute({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const page = parsePage((await searchParams).page);
  const [res, ads, settings] = await Promise.all([
    loadCategory(slug, page),
    getAds()
      .then((r) => r.data.category_ads)
      .catch(() => null),
    getSettingsOrEmpty(),
    // Warm the memoized SEO request so <JsonLd> doesn't start it after the rest.
    loadSeo(`category/${slug}`),
  ]);
  if (!res?.data) notFound();

  const home = getHomePageData();
  const site = getSiteInfo();

  return (
    <SiteChrome
      flashNews={home.flashNews}
      trending={home.trending}
      site={site}
    >
      <JsonLd path={`category/${slug}`} />
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
