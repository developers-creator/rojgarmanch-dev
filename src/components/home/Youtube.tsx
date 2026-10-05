import type { YoutubeBlock, YtShort, YtVideo } from "@/types/content";
import { getReels, getRojgarTV } from "@/lib/api/endpoints";
import { decodeEntities } from "@/lib/text";
import { YoutubeSection } from "./YoutubeSection";

type YoutubeProps = {
  /** Supplies the channel link; videos and reels come from the CMS. */
  data: YoutubeBlock;
};

/** Pull the video id out of youtu.be, watch?v=, embed/ and shorts/ URLs. */
function youtubeId(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1) || null;
    const v = u.searchParams.get("v");
    if (v) return v;
    const m = u.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]+)/);
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

/** रोजगार टिभी and रिल्स — videos and reels from the CMS `rojgar-tv` and `reels` categories */
export async function Youtube({ data }: YoutubeProps) {
  const [res, reelsRes] = await Promise.all([
    getRojgarTV().catch(() => null),
    getReels().catch(() => null),
  ]);
  const category = res?.data?.category;

  const videos = (res?.data?.posts ?? []).flatMap((post): YtVideo[] => {
    const id = youtubeId(post.video_url);
    return id
      ? [{ id: String(post.id), youtubeId: id, title: decodeEntities(post.title) }]
      : [];
  });
  if (!videos.length) return null;

  const shorts = (reelsRes?.data?.posts ?? []).flatMap((post): YtShort[] => {
    const id = youtubeId(post.reel_video_url);
    return id
      ? [{ id: String(post.id), youtubeId: id, title: decodeEntities(post.title) }]
      : [];
  });

  return (
    <YoutubeSection
      title={category?.name ?? "रोजगार टिभी"}
      reelsTitle={reelsRes?.data?.category.name ?? "रिल्स"}
      data={{ ...data, videos, featuredId: videos[0].id, shorts }}
    />
  );
}
