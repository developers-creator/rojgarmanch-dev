import type { Post } from "@/types/content";
import type { NewsCategoryPost, SearchResult } from "@/types/news";
import { decodeEntities } from "@/lib/text";

/** Map a CMS category post to the shared `Post` shape. */
export const toPost = (post: NewsCategoryPost): Post => ({
  id: post.id,
  slug: post.slug,
  title: decodeEntities(post.title),
  excerpt: post.sub_heading ? decodeEntities(post.sub_heading) : undefined,
  href: `/${post.slug}`,
  imageUrl: post.featured_image || undefined,
  dateLabel: post.date || undefined,
});

/** Map a CMS search result to the shared `Post` shape. */
export const searchToPost = (r: SearchResult): Post => ({
  id: r.id,
  slug: r.slug,
  title: decodeEntities(r.title),
  excerpt: r.sub_title ? decodeEntities(r.sub_title) : undefined,
  href: `/${r.slug}`,
  imageUrl: r.featured_image || undefined,
  category: r.category_name,
  author: r.author_name ?? undefined,
  authorAvatar: r.author_image ?? undefined,
});
