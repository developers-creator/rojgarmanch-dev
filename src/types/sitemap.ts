// types/sitemap.ts

export type SitemapItem = {
    slug: string;
    modified: string | null;
  };
  
  export type SitemapData = {
    pages: SitemapItem[];
    posts: SitemapItem[];
    categories: SitemapItem[];
    tags: SitemapItem[];
  };
  
  export type SitemapType = keyof SitemapData;
  
  export type SitemapResponse = {
    success: boolean;
    message: string;
    data: SitemapData;
  };
  
  export type SitemapTypeResponse<T extends SitemapType> = {
    success: boolean;
    message: string;
    data: Pick<SitemapData, T>;
  };
  