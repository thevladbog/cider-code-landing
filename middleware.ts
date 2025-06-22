import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Handle static assets with better caching
  if (
    request.nextUrl.pathname.startsWith("/BOTTLE-CODE-LOGO.png") ||
    request.nextUrl.pathname.startsWith("/favicon") ||
    request.nextUrl.pathname.startsWith("/manifest.json")
  ) {
    const response = NextResponse.next();

    // Add cache headers for static assets
    if (
      request.nextUrl.pathname.includes(".png") ||
      request.nextUrl.pathname.includes(".ico")
    ) {
      response.headers.set(
        "Cache-Control",
        "public, max-age=31536000, immutable",
      );
    } else if (request.nextUrl.pathname.includes("manifest.json")) {
      response.headers.set("Cache-Control", "public, max-age=86400");
      response.headers.set("Content-Type", "application/manifest+json");
    }

    // Add security headers
    response.headers.set("X-Content-Type-Options", "nosniff");

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/BOTTLE-CODE-LOGO.png",
    "/favicon.ico",
    "/favicon.png",
    "/manifest.json",
  ],
};
