import type { Metadata } from "next";
import { getHomePageData, getSiteInfo } from "@/data/home";
import { searchNews } from "@/lib/api/endpoints";
import { searchToPost } from "@/lib/posts";
import { CategoryPage } from "@/components/category/CategoryPage";
import { SiteChrome } from "@/components/layout/SiteChrome";

type PageProps = {
  searchParams: Promise<{ q?: string; page?: string }>;
};

const parsePage = (raw?: string) =>
  Math.max(1, Number.parseInt(raw ?? "1", 10) || 1);

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const q = ((await searchParams).q ?? "").trim();
  return {
    title: q ? `${q} — खोज परिणाम — रोजगार मञ्च` : "खोज — रोजगार मञ्च",
    robots: { index: false },
  };
}

export default async function SearchRoute({ searchParams }: PageProps) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const page = parsePage(sp.page);
  const res = q ? await searchNews(q, page).catch(() => null) : null;

  const home = getHomePageData();
  const site = getSiteInfo();

  return (
    <SiteChrome
      flashNews={home.flashNews}
      trending={home.trending}
      site={site}
    >
      <CategoryPage
        category={{
          id: 0,
          slug: "search",
          description: "",
          name: q ? `खोज परिणाम: ${q}` : "खोज",
        }}
        posts={res?.data.map(searchToPost) ?? []}
        pagination={res?.pagination}
        basePath="/search"
        query={q ? { q } : undefined}
        emptyMessage={
          !q
            ? "खोज्न किवर्ड लेख्नुहोस्।"
            : res
              ? "कुनै नतिजा फेला परेन।"
              : "खोज्न सकिएन, कृपया पुनः प्रयास गर्नुहोस्।"
        }
      />
    </SiteChrome>
  );
}
