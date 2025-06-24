// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

// Define protected routes (adjust as needed)
const protectedRoutes = ['/dashboard', '/documents', '/profile', '/qa', '/admin', '/upload']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtected && !token) {
    const loginUrl = new URL('/', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}
