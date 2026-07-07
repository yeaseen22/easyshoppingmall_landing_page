import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
const privateRoute = ["/dashboard"];

export async function proxy(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    // secureCookie: process.env.NODE_ENV === 'production'
  });

  const reqUrl = req.nextUrl.pathname;
  const isPrivate = privateRoute.some((route) => reqUrl.startsWith(route));

  if (!token && isPrivate) {
    return NextResponse.redirect(new URL(`/login`, req.url));
  }

  if (token && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL(`/`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
