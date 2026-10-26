import { getLatestNews, getPopularNews } from "@/components/layout/SiteNavComponent";

// Nav "latest"/"trending" news is loaded here instead of during page render, so it
// stays fresh without making every page regenerate. The data is tagged `news`, so a
// publish refreshes it; the CDN holds the response for at most a minute.
export async function GET() {
  const [flashNews, trending] = await Promise.all([
    getLatestNews(),
    getPopularNews(),
  ]);

  return Response.json(
    { flashNews, trending },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    },
  );
}
