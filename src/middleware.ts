// export { auth as middleware } from "@/app/auth";
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("next-auth.session-token"); // or your auth check

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/";

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/favourites/:path*", "/movie/:path*"],
};
