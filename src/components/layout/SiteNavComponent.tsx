import type { Post } from "@/types/content";
import type { MenuItem } from "@/types/menu";
import { SiteNav } from "./SiteNav";
import { toFrontUrl } from "@/lib/url";
import { searchToPost, toPost } from "@/lib/posts";
import { apiFetch } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { MenuData } from "@/types/menu";
import type { NewsCategoryData, TrendingData } from "@/types/news";

type SiteNavComponentProps = {
  flashNews?: Post[];
  trending?: Post[];
  /** Seconds before the nav's latest/trending news refetch; stable pages pass a long one. */
  newsRevalidate?: number;
};

export const toFrontItem = (item: MenuItem): MenuItem => ({
  ...item,
  url: toFrontUrl(item.url),
  children: item.children.map(toFrontItem),
});



const SiteNavComponent = async ({
  flashNews = [],
  trending = [],
  newsRevalidate = 300,
}: SiteNavComponentProps) => {
  const [headerMenu, latest, popular] = await Promise.all([
    getNavMenu(),
    getLatestNews(newsRevalidate),
    getPopularNews(newsRevalidate),
  ]);

  return (
    <SiteNav
      flashNews={latest.length ? latest : flashNews}
      trending={popular.length ? popular : trending}
      headerMenu={headerMenu}
    />
  );
};

export default SiteNavComponent;


export const getNavMenu = () =>
    apiFetch<MenuData>(ENDPOINTS.headerMenu, {
      revalidate: 86400,
      tags: ["header-menu"],
    })
      .then((res) => res.data.items.map(toFrontItem))
      .catch(() => []);
  
export const getLatestNews = (revalidate = 300) =>
    apiFetch<NewsCategoryData>(ENDPOINTS.news, {
      revalidate,
      tags: ["flash-news"],
    })
      .then((res) => (res.data?.posts ?? []).map(toPost))
      .catch(() => []);
  
export const getPopularNews = (revalidate = 300) =>
    apiFetch<TrendingData>(ENDPOINTS.trending, {
      revalidate,
      tags: ["trending"],
    })
      .then((res) => res.data.map(searchToPost))
      .catch(() => []);