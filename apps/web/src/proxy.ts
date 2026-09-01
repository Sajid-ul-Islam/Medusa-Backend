import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";

  // Check if hostname is a raw IP address (e.g. 192.168.68.102 or 127.0.0.1)
  const isIpAddress = /^(\d{1,3}\.){3}\d{1,3}(:\d+)?$/.test(hostname);

  // Define root domains
  const rootDomains = ["localhost:3000", "bookhub.com.bd", "bookhub.vercel.app"];
  const isRootDomain =
    isIpAddress ||
    rootDomains.some(
      (domain) => hostname === domain || hostname === `www.${domain}`
    );

  // Exclude static assets, API, and Next internal files
  const isStatic =
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/icons") ||
    url.pathname.startsWith("/api") ||
    url.pathname.includes(".");

  if (isStatic) {
    return NextResponse.next();
  }

  // Extract potential publisher subdomain (e.g. batighar.bookhub.com.bd or batighar.localhost:3000)
  if (!isRootDomain) {
    const parts = hostname.split(".");
    if (parts.length > (hostname.includes("localhost") ? 1 : 2)) {
      const subdomain = parts[0];
      if (subdomain && subdomain !== "www" && subdomain !== "app") {
        // Rewrite to the publisher's branded tenant storefront
        url.pathname = `/publishers/${subdomain}${url.pathname === "/" ? "" : url.pathname}`;
        const response = NextResponse.rewrite(url);
        response.headers.set("x-tenant-publisher", subdomain);
        return response;
      }
    }
  }

  // Attach standard security headers for SaaS security
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|sw.js).*)",
  ],
};
