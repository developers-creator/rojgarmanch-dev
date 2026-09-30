export type BannerNewsItem = {
  id: number;
  title: string;
  sub_title: string;
  slug: string;
  category_name: string;
  featured_image: string | null;
  author_name: string | null;
  author_slug: string | null;
  author_image: string | null;
};

export type BannerNewsData = {
  success: boolean;
  message: string;
  data: BannerNewsItem[];
};
