import { NextResponse } from "next/server";
import { allPaths } from "./lib/paths";

export function middleware(req) {
  const hasPath = req.nextUrl.searchParams.has("path");
  if (!allPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  } else if (req.nextUrl.pathname === "/home" && !hasPath) {
    return NextResponse.redirect(new URL("/home?path=accueil", req.url));
  } else if (req.nextUrl.pathname === "/auth" && !hasPath) {
    return NextResponse.redirect(new URL("/auth?path=login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|fonts|images|favicon.ico).*)"],
};
