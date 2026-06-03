import { NextRequest, NextResponse } from "next/server";

/**
 * Protected routes
 */
const protectedRoutes = ["/profile", "/checkout", "/orders"];

/**
 * Public auth routes
 */
const authRoutes = ["/login", "/register", "/reset-password"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /**
   * Read refresh token
   */
  const refreshToken = request.cookies.get("refreshToken")?.value;

  /**
   * Check protected route
   */
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  /**
   * Check auth route
   */
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  /**
   * User not authenticated
   */
  if (isProtectedRoute && !refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  /**
   * User already logged in
   */
  if (isAuthRoute && refreshToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/checkout/:path*",
    "/orders/:path*",

    "/login",
    "/register",
  ],
};
