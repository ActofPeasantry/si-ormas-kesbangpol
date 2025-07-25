import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth/session";

// Static route prefixes
const protectedRoutes = ["/", "/ormas"];
const publicRoutes = ["/login", "/register"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const cookieStore = await cookies();
  const session = await decrypt(cookieStore.get("session")?.value);

  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(route + "/")
  );
  const isPublicRoute = publicRoutes.some(
    (route) => path === route || path.startsWith(route + "/")
  );

  if (isProtectedRoute && !session?.userId)
    return NextResponse.redirect(new URL("/login", req.url));
  if (isPublicRoute && session?.userId)
    return NextResponse.redirect(new URL("/", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/ormas/:path*", // includes /ormas/detail/:id
  ],
};
