import { checkSession, getSession, getSessionRole } from '@/features/auth/lib/session'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware (request: NextRequest) {
  // Verificar si el usuario está autenticado
  const isLoggedIn = await checkSession()
  const isLoginPage = request.nextUrl.pathname.startsWith('/login')

  if (isLoggedIn && isLoginPage) {
    // Si el usuario está autenticado y está intentando acceder a la página de login, redirigir según su rol
    const role = await getSessionRole()
    const redirectUrl = role === 'cliente' ? '/cliente' : '/'
    return NextResponse.redirect(new URL(redirectUrl, request.url))
  }

  // Si el usuario no está autenticado y está intentando acceder a una página que no es la de login, redirigir a la página de login
  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }  // Control de acceso según el rol
  if (isLoggedIn) {
    const session = await getSession()
    const role = session.role || 'admin'

    // Definir las rutas permitidas solo para el rol cliente
    const clienteRoutesAllowed = ['/cliente']

    // Si es cliente, solo puede acceder a sus rutas permitidas
    if (role === 'cliente') {
      // Verificar si la ruta actual está permitida para el cliente
      const isAllowedRoute = clienteRoutesAllowed.some(route =>
        request.nextUrl.pathname === route ||
        request.nextUrl.pathname.startsWith(`${route}/`)
      )

      // Si no es una ruta permitida, redirigir a la página principal del cliente
      if (!isAllowedRoute) {
        return NextResponse.redirect(new URL('/cliente', request.url))
      }
    }

    // El administrador tiene acceso a todas las rutas, no necesita restricciones
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
