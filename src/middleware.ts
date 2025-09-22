// export { auth as middleware } from "@/app/auth";
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (
    req.nextUrl.pathname.startsWith("/favourites") ||
    (req.nextUrl.pathname.startsWith("/movie") && !token)
  ) {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/favourites", "/movie/:path*"],
};
