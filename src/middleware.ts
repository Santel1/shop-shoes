import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  if (url.pathname === "/") {
    url.pathname = "/en";
    return NextResponse.redirect(url);
  }
}
// Only the root path redirects to the default en locale.
export const config = {
  matcher: "/",
};
