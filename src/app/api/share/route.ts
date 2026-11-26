// Share counter proxy. The browser talks to this route (same origin, so no CORS
// or Cloudflare bot checks on the CMS) and it forwards to WordPress.
//   GET  /api/share/?slug=news/2026/09/1  → { count }
//   POST /api/share/  { slug }            → { count }
// Route Handlers aren't cached, so counts never touch the ISR cache.

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const cleanSlug = (value: unknown) => {
  if (typeof value !== "string") return null;
  const slug = value.trim().replace(/^\/+|\/+$/g, "");
  return slug && slug.length <= 300 && /^[\w\-./%]+$/.test(slug) ? slug : null;
};

const forward = async (request: Request, init: RequestInit, query = "") => {
  if (!API_URL) return Response.json({ count: 0 });
  try {
    const res = await fetch(`${API_URL}/share${query}`, {
      ...init,
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Real visitor IP so WordPress rate limits per visitor, not per Next server.
        "X-Forwarded-For":
          request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for") ?? "",
      },
    });
    if (!res.ok) return Response.json({ count: 0 });
    const data = await res.json();
    const count = Number(data?.count);
    return Response.json({ count: Number.isFinite(count) && count > 0 ? count : 0 });
  } catch {
    return Response.json({ count: 0 });
  }
};

export async function GET(request: Request) {
  const slug = cleanSlug(new URL(request.url).searchParams.get("slug"));
  if (!slug) return Response.json({ count: 0 });
  const querySlug = encodeURIComponent(slug).replace(/%2F/g, "/");
  return forward(request, { method: "GET" }, `?slug=${querySlug}`);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const slug = cleanSlug(body?.slug);
  if (!slug) return Response.json({ error: "Invalid slug" }, { status: 400 });
  return forward(request, { method: "POST", body: JSON.stringify({ slug }) });
}
