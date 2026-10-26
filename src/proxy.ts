import { NextResponse, type NextRequest } from "next/server";

// Scanner probes (WordPress, PHP, dotfiles...) would otherwise render the
// catch-all route, miss in the CMS, and have their 404 written to the ISR cache.
const JUNK_PATH =
  /(^|\/)(wp-[^/]*|wordpress|xmlrpc|cgi-bin|phpmyadmin|vendor|\.[^/]+)(\/|$)|\.(php\d?|asp|aspx|jsp|cgi|env|sql|bak|zip|gz|tar|ini|yml|yaml|git)(\/|$)/i;

export function proxy(request: NextRequest) {
  if (JUNK_PATH.test(request.nextUrl.pathname)) {
    return new NextResponse("Not found", { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  // `.well-known` is a dotfile path we must keep serving; skip it with the assets.
  matcher: ["/((?!_next/|api/|\.well-known/|favicon.ico|robots.txt|sitemap).*)"],
};
