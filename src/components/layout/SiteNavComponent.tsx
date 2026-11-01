import type { Post } from "@/types/content";
import type { MenuItem } from "@/types/menu";
import { SiteNav } from "./SiteNav";
import { toFrontUrl } from "@/lib/url";
import { searchToPost, toPost } from "@/lib/posts";
import { apiFetch } from "@/lib/api/client";
import { CACHE_TAGS, ENDPOINTS } from "@/lib/api/endpoints";
import type { MenuData } from "@/types/menu";
import type { LatestNewsData, TrendingData } from "@/types/news";

type SiteNavComponentProps = {
  flashNews?: Post[];
  trending?: Post[];
};

export const toFrontItem = (item: MenuItem): MenuItem => ({
  ...item,
  url: toFrontUrl(item.url),
  children: item.children.map(toFrontItem),
});



const SiteNavComponent = async ({
  flashNews = [],
  trending = [],
}: SiteNavComponentProps) => {
  const headerMenu = await getNavMenu();

  return (
    <SiteNav
      flashNews={flashNews}
      trending={trending}
      headerMenu={headerMenu}
    />
  );
};

export default SiteNavComponent;


export const getNavMenu = () =>
    apiFetch<MenuData>(ENDPOINTS.headerMenu, {
      revalidate: false,
      tags: [CACHE_TAGS.headerMenu],
    })
      .then((res) => res.data.items.map(toFrontItem))
      .catch(() => []);
  
// Called from /api/nav-news; post webhooks refresh this listing independently.
export const getLatestNews = () =>
    apiFetch<LatestNewsData>(ENDPOINTS.latestNews, {
      revalidate: 3600,
      tags: [CACHE_TAGS.latestNews],
    })
      .then((res) => (res.data ?? []).map(toPost))
      .catch(() => []);
  
export const getPopularNews = () =>
    apiFetch<TrendingData>(ENDPOINTS.trending, {
      revalidate: 1800,
      tags: [CACHE_TAGS.trending],
    })
      .then((res) => res.data.map(searchToPost))
      .catch(() => []);