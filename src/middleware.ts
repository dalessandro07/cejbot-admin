import { checkSession } from '@/features/auth/lib/session'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware (request: NextRequest) {
  // Verificar si el usuario está autenticado
  const isLoggedIn = await checkSession()
  const isLoginPage = request.nextUrl.pathname.startsWith('/login')

  if (isLoggedIn && isLoginPage) {
    // Si el usuario está autenticado y está intentando acceder a la página de login, redirigir a la página de inicio
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Si el usuario no está autenticado y está intentando acceder a una página que no es la de login, redirigir a la página de login
  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
