// export { auth as middleware } from "@/app/auth";
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (token) {
    return NextResponse.next();
  }
  const url = new URL("/", req.url);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/favourites", "/movie/:path*"],
};
