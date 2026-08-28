import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  if (url.pathname === "/") {
    url.pathname = "/ua";
    return NextResponse.redirect(url);
  }
}
// only for the root path, redirect to /ua. For other paths, do nothing and let the request continue.
export const config = {
  matcher: "/",
};
