import type { NewsCategoryPost, Pagination } from "@/types/news";

export type Author = {
  id: number;
  name: string;
  slug: string;
  description: string;
  /** `null` when the author has no photo. */
  profile_image: string | null;
};

export type AuthorPostsData = {
  success: boolean;
  message: string;
  /** `null` when no author matches the slug. */
  data: {
    author: Author;
    posts: NewsCategoryPost[];
  } | null;
  pagination?: Pagination;
};
