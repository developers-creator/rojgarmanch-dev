export type NewsLink = {
  id: number;
  title: string;
  featured_image: string | null;
  slug: string;
};

export type NewsDetail = {
  id: number;
  title: string;
  slug: string;
  featured_image: string | null;
  excerpt: string;
  content: string;
  /** Keys are sparse ("0", "2", "3"), so treat as a record, not an array. */
  summary_points: Record<string, string> | null;
  date: string;
  author_name: string | null;
  author_slug: string | null;
  author_image: string | null;
  related_posts: NewsLink[];
  see_also: NewsLink[];
};

export type NewsDetailData = {
  success: boolean;
  message: string;
  data: NewsDetail | null;
};
