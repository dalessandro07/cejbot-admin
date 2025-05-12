import AppSidebar from '@/core/components/layout/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/core/components/ui/sidebar'
import { Toaster } from '@/core/components/ui/sonner'
import { checkSession, getSessionRole } from '@/features/auth/lib/session'
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Dashboard - CEJBOT",
  description: "Administración de licencias de la extensión CEJBOT",
  robots: {
    follow: false,
    index: false
  }
}

export default async function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isLoggedIn = await checkSession()
  const userRole = await getSessionRole()
  const isAdmin = userRole === 'admin'

  return (
    <html lang="es">
      <body
        className={`${inter.variable}`}
      >
        <div className='flex min-h-dvh'>
          <SidebarProvider>
            {isLoggedIn && isAdmin && <AppSidebar />}
            <div className='flex flex-col flex-1 min-h-dvh'>
              <main className='flex flex-col flex-1'>
                {isLoggedIn && isAdmin && <SidebarTrigger />}
                {children}
              </main>
              <Toaster richColors />
            </div>
          </SidebarProvider>
        </div>
      </body>
    </html>
  )
}
