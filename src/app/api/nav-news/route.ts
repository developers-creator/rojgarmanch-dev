import { getLatestNews, getPopularNews } from "@/components/layout/SiteNavComponent";

// Nav "latest"/"trending" news is loaded here instead of during page render, so it
// stays fresh without making every page regenerate. The CDN caches it for 5 minutes.
export async function GET() {
  const [flashNews, trending] = await Promise.all([
    getLatestNews(),
    getPopularNews(),
  ]);

  return Response.json(
    { flashNews, trending },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    },
  );
}
