/**
 * Middleware: proteksi /admin/* (kecuali /admin/login).
 *
 * Cek apakah ada iron-session cookie "cvku_admin_session".
 * Kalau tidak ada → redirect ke /admin/login?redirect=<path>.
 *
 * Iron-session cookie is encrypted; kita cek presence saja.
 * Full session validation terjadi di /api/feedback route (pakai `requireAdmin()`).
 * Kalau cookie ada tapi invalid, route handler akan throw 401 → client ke /login.
 */
import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIE_NAME = "cvku_admin_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin/* (semua path), KECUALI /admin/login
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname === "/admin/login") return NextResponse.next();

  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);

  if (!sessionCookie || !sessionCookie.value) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
