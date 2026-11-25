// Article view counter proxy: POST /api/view/ { slug } → forwards to WordPress.
// Not cached, so it never touches the ISR cache. The client doesn't use the
// response, so failures are swallowed.

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const cleanSlug = (value: unknown) => {
  if (typeof value !== "string") return null;
  const slug = value.trim().replace(/^\/+|\/+$/g, "");
  return slug && slug.length <= 300 && /^[\w\-./%]+$/.test(slug) ? slug : null;
};

export async function POST(request: Request) {
  // sendBeacon posts a Blob; parse the text body rather than trusting the header.
  const body = await request.text().then((t) => JSON.parse(t)).catch(() => null);
  const slug = cleanSlug(body?.slug);
  if (!slug) return Response.json({ error: "Invalid slug" }, { status: 400 });
  if (!API_URL) return Response.json({ ok: false });

  try {
    await fetch(`${API_URL}/view`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        // Real visitor IP/UA so WordPress can rate limit and filter bots.
        "X-Forwarded-For": request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for") ?? "",
        "User-Agent": request.headers.get("user-agent") ?? "",
      },
      body: JSON.stringify({ slug }),
    });
  } catch {
    /* ignore */
  }
  return Response.json({ ok: true });
}
