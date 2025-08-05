import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const { pathname } = request.nextUrl

  // Define protected routes
  const protectedRoutes = [
    "/healings",
    "/treatments",
    "/myaccount",
    "/dashboard",
    "/appointmentform",
    "/appointment-for-others",
    "/healing-details",
  ]

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  if (isProtectedRoute) {
    // Check for authentication token in cookies or headers
    const userStatus = request.cookies.get("userStatus")?.value

    if (!userStatus || userStatus === "0") {
      // Store the intended destination
      const redirectUrl = new URL("/login", request.url)
      redirectUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(redirectUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
