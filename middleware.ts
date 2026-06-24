import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const session =
    req.cookies.get("crm_session");

  if (
    req.nextUrl.pathname.startsWith("/admin") &&
    !session
  ) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};