import Header from '@/core/components/layout/header'
import { Toaster } from '@/core/components/ui/sonner'
import { checkSession } from '@/features/auth/lib/session'
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

  return (
    <html lang="es">
      <body
        className={`${inter.variable}`}
      >
        <div className='flex flex-col max-w-2xl mx-auto min-h-dvh'>
          {isLoggedIn ? <Header /> : null}

          {children}
          <Toaster richColors />
        </div>
      </body>
    </html>
  )
}
