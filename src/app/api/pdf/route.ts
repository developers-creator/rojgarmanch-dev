const CMS_HOST = "cms.rojgarmanch.com";

/**
 * Same-origin proxy for CMS PDFs. The CMS sends no CORS headers, so the
 * browser-side pdf.js in the flipbook can't fetch the file directly.
 */
export async function GET(request: Request) {
  const target = new URL(request.url).searchParams.get("url");

  let url: URL;
  try {
    url = new URL(target ?? "");
  } catch {
    return new Response("Invalid url", { status: 400 });
  }
  if (url.protocol !== "https:" || url.hostname !== CMS_HOST || !url.pathname.toLowerCase().endsWith(".pdf")) {
    return new Response("Forbidden", { status: 403 });
  }

  const range = request.headers.get("range");
  const upstream = await fetch(url, {
    headers: range ? { range } : undefined,
  }).catch(() => null);
  if (!upstream || !(upstream.ok || upstream.status === 206)) {
    return new Response("Upstream error", { status: 502 });
  }

  const headers = new Headers({ "content-type": "application/pdf", "cache-control": "public, max-age=3600" });
  for (const name of ["content-length", "content-range", "accept-ranges"]) {
    const value = upstream.headers.get(name);
    if (value) headers.set(name, value);
  }
  return new Response(upstream.body, { status: upstream.status, headers });
}
