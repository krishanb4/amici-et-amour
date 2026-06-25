import { NextResponse, type NextRequest } from "next/server"
import { SESSION_COOKIE, verifySession } from "@/lib/session"

/**
 * Gate the /admin area (Next 16 proxy convention). Unauthenticated visitors are
 * bounced to /admin/login; already-authenticated visitors hitting the login page
 * are sent to the panel. Runs on the edge — only jose-based verification here.
 */
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get(SESSION_COOKIE)?.value
  const session = await verifySession(token)
  const isLogin = pathname === "/admin/login"

  if (!session && !isLogin) {
    const url = req.nextUrl.clone()
    url.pathname = "/admin/login"
    url.searchParams.set("from", pathname)
    return NextResponse.redirect(url)
  }

  if (session && isLogin) {
    const url = req.nextUrl.clone()
    url.pathname = "/admin"
    url.search = ""
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  // Match the bare /admin as well as any nested path.
  matcher: ["/admin", "/admin/:path*"],
}
