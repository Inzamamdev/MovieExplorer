import { auth } from "./app/auth";

export default auth((req) => {
  // If no session, redirect to home
  if (!req.auth) {
    return Response.redirect(new URL("/", req.url));
  }

  return;
});

export const config = {
  matcher: ["/favourites", "/movie/:path*"],
};
