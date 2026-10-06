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

export type NewsCategory = {
  id: number;
  name: string;
  slug: string;
  description: string;
};

export type NewsCategoryPost = {
  id: number;
  title: string;
  slug: string;
  /** The CMS sends `false` (not null) when a post has no image. */
  featured_image: string | false | null;
  video_url?: string | null;
  reel_video_url?: string | null;
  sub_heading: string;
  /** Nepali date label, e.g. "अशोज ९, २०८३". */
  date?: string;
};

export type Pagination = {
  current_page: number;
  per_page: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
};

export type NewsCategoryData = {
  success: boolean;
  message: string;
  data: {
    category: NewsCategory;
    posts: NewsCategoryPost[];
  } | null;
  pagination?: Pagination;
};

export type Publication = {
  id: number;
  title: string;
  sub_title: string | null;
  /** Full CMS URL, e.g. "https://cms.rojgarmanch.com/magazine/year-16-issue-1-2083-shrawan-issue/" */
  slug: string;
  featured_image: string | null;
  date: string;
};

export type PublicationData = {
  success: boolean;
  message: string;
  data: Publication[];
  pagination?: Pagination;
};

export type PublicationDetail = {
  id: number;
  title: string;
  slug: string;
  sub_heading: string | null;
  featured_image: string | null;
  pdf: string | null;
  content: string;
  date: string;
};

export type PublicationDetailData = {
  success: boolean;
  message: string;
  data: PublicationDetail | null;
};

export type Webstory = {
  id: number;
  title: string;
  slug: string;
  featured_image: string | false | null;
  sub_heading: string;
  webstories_detail: WebstoryDetail[];
  webstories_count: number;
};

export type WebstoryDetail = {
  webstory_upload_image: string;
  webstory_title: string;
};
export type WebstoryData = {
  success: boolean;
  message: string;
  data: {
    category: NewsCategory;
    posts: Webstory[];
  } | null;
  pagination?: Pagination;
};

export type SearchResult = {
  id: number;
  title: string;
  sub_title: string;
  slug: string;
  category_name: string;
  featured_image: string | false | null;
  author_name: string | null;
  author_slug: string | null;
  author_image: string | null;
};

export type SearchData = {
  success: boolean;
  message: string;
  data: SearchResult[];
  pagination: Pagination;
};

export type TrendingData = {
  success: boolean;
  message: string;
  data: SearchResult[];
};
