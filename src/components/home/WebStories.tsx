import type { IgStory, IgStorySlide } from "@/types/content";
import type { Webstory } from "@/types/news";
import { getWebstories } from "@/lib/api/endpoints";
import { decodeEntities } from "@/lib/text";
import { WebStoriesRail } from "./WebStoriesRail";

function imageUrl(value: string | false | null | undefined): string | undefined {
  return typeof value === "string" && value ? value : undefined;
}

function toStory(post: Webstory): IgStory | null {
  const slides: IgStorySlide[] = (post.webstories_detail ?? []).flatMap((slide) => {
    const image = imageUrl(slide.webstory_upload_image);
    if (!image) return [];
    const title = slide.webstory_title
      ? decodeEntities(slide.webstory_title)
      : undefined;
    return [
      {
        imageUrl: image,
        title,
        href: `/${post.slug}`,
      },
    ];
  });

  const cover = imageUrl(post.featured_image) ?? slides[0]?.imageUrl;
  if (!cover) return null;
  if (!slides.length) {
    slides.push({
      imageUrl: cover,
      title: decodeEntities(post.title),
      href: `/${post.slug}`,
    });
  }

  return {
    id: String(post.id),
    label: decodeEntities(post.title),
    avatarUrl: cover,
    slides,
  };
}

type WebStoriesProps = {
  /** Hide “see all” when this section is already the category page. */
  more?: boolean;
};

/** वेबस्टोरिज — stories from the CMS `webstories` category */
export async function WebStories({ more = true }: WebStoriesProps = {}) {
  const res = await getWebstories().catch(() => null);
  const items = (res?.data?.posts ?? [])
    .map(toStory)
    .filter((item): item is IgStory => item !== null)
    .slice(0, 5);

  if (!items.length) return null;

  const slug = res?.data?.category.slug;

  return (
    <WebStoriesRail
      title={res?.data?.category.name || "वेबस्टोरिज"}
      href={more && slug ? `/category/${slug}` : undefined}
      items={items}
    />
  );
}
