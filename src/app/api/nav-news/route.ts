import { getLatestNews, getPopularNews } from "@/components/layout/SiteNavComponent";

// Trending changes as view counts are recorded, so keep this proxy response uncached.
export async function GET() {
  const [flashNews, trending] = await Promise.all([
    getLatestNews(),
    getPopularNews(),
  ]);

  return Response.json(
    { flashNews, trending },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
