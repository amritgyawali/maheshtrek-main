import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n";

/**
 * Next 16 calls this file convention "proxy" (formerly "middleware").
 *
 * Every page lives under a locale segment, so any request without one is
 * redirected to a locale. The visitor's `Accept-Language` picks between them,
 * with Nepali as the fallback; the choice is a redirect rather than a rewrite
 * so the URL always shows which language is being served.
 */
const PUBLIC_FILE = /\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|txt|xml|json|webmanifest)$/i;

function detectLocale(request: NextRequest) {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  // "en-US,en;q=0.9,ne;q=0.8" -> ["en-us", "en", "ne"]
  const requested = header
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase())
    .filter(Boolean);

  for (const tag of requested) {
    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }
  return defaultLocale;
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const first = pathname.split("/")[1];
  if (isLocale(first)) return NextResponse.next();

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Metadata files are generated at the app root and must not be rewritten.
  matcher: ["/((?!_next|favicon.ico|icon|apple-icon|robots.txt|sitemap.xml).*)"],
};
