import { NextResponse } from "next/server";
import { rateLimiter, byIP } from "./lib/rateLimiter";

export async function middleware(req) {
  // Apply to all API routes
  if (req.nextUrl.pathname.startsWith("/api/")) {
    const ip = byIP(req);
    const { success, limit, remaining, reset } = await rateLimiter.limit(ip);

    if (!success) {
      const response = NextResponse.json(
        { message: "Too many requests. Please try again later." },
        { status: 429 }
      );
      response.headers.set("X-RateLimit-Limit", limit.toString());
      response.headers.set("X-RateLimit-Remaining", remaining.toString());
      response.headers.set("X-RateLimit-Reset", reset.toString());
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*", // Matches /api/*, including nested routes like /api/password/reset-password
};
