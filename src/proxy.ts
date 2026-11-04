import { NextResponse, type NextRequest } from "next/server";
import { BLOCKED_BOT_PATTERN } from "@/lib/bots";
import { checkPath } from "@/lib/routes";

// Scanner probes (WordPress, PHP, dotfiles...) would otherwise render the
// catch-all route, miss in the CMS, and have their 404 written to the ISR cache.
const JUNK_PATH =
  /(^|\/)(wp-[^/]*|wordpress|xmlrpc|cgi-bin|phpmyadmin|vendor|\.[^/]+)(\/|$)|\.(php\d?|asp|aspx|jsp|cgi|env|sql|bak|zip|gz|tar|ini|yml|yaml|git)(\/|$)/i;

export function proxy(request: NextRequest) {
  // robots.txt stays reachable (excluded by the matcher) so these bots can read it.
  if (BLOCKED_BOT_PATTERN.test(request.headers.get("user-agent") ?? "")) {
    return new NextResponse("Forbidden", { status: 403 });
  }
  if (JUNK_PATH.test(request.nextUrl.pathname)) {
    return new NextResponse("Not found", { status: 404 });
  }

  // Paths the site can't serve are answered here, before a page render, so they
  // never reach the CMS or leave a cached 404 behind (see lib/routes.ts).
  const check = checkPath(request.nextUrl.pathname);
  if (!check.ok) {
    if (check.redirectTo) {
      const url = request.nextUrl.clone();
      url.pathname = check.redirectTo;
      return NextResponse.redirect(url, 308);
    }
    return new NextResponse("Not found", {
      status: 404,
      // Let the CDN absorb repeat probes of the same bad URL.
      headers: { "Cache-Control": "public, s-maxage=3600" },
    });
  }
  return NextResponse.next();
}

export const config = {
  // `.well-known` is a dotfile path we must keep serving; skip it with the assets.
  matcher: ["/((?!_next/|api/|\.well-known/|favicon.ico|robots.txt|sitemap).*)"],
};
