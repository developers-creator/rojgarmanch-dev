import type { Post } from "@/types/content";
import type { NewsCategoryPost } from "@/types/news";
import { decodeEntities } from "@/lib/text";

/** Map a CMS category post to the shared `Post` shape. */
export const toPost = (post: NewsCategoryPost): Post => ({
  id: post.id,
  slug: post.slug,
  title: decodeEntities(post.title),
  excerpt: post.sub_heading ? decodeEntities(post.sub_heading) : undefined,
  href: `/${post.slug}`,
  imageUrl: post.featured_image ?? undefined,
});
