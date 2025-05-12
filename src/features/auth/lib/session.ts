import { APP_COOKIE_NAME } from '@/core/lib/constants'
import type { SessionData } from '@/core/types'
import { getIronSession, type SessionOptions } from 'iron-session'
import { cookies } from 'next/headers'

const SITE_USERNAME = process.env.SITE_USERNAME as string
const SITE_PASSWORD = process.env.SITE_PASSWORD as string

const sessionOptions: SessionOptions = {
  cookieName: APP_COOKIE_NAME,
  password: process.env.SESSION_SECRET as string,
}

export async function getSession () {
  const cookieStore = await cookies()
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions)
  return session
}

export async function checkSession () {
  const session = await getSession()
  return session.isLoggedIn
}

export async function getSessionRole () {
  const session = await getSession()
  return session.role || 'admin'
}

export async function signIn (username: string, password: string) {
  const session = await getSession()

  // Verificar si es admin
  if (username === SITE_USERNAME && password === SITE_PASSWORD) {
    session.isLoggedIn = true
    session.username = username
    session.role = 'admin'
    await session.save()
    return { success: true, role: 'admin' }
  }

  // Verificar si es un cliente (teléfono y licencia)
  const db = (await import('@/core/db')).db
  const licenciasTable = (await import('@/core/db/schema')).licenciasTable
  const { eq, and } = await import('drizzle-orm')

  const cliente = await db.select()
    .from(licenciasTable)
    .where(
      and(
        eq(licenciasTable.telefono, username),
        eq(licenciasTable.licencia, password),
        eq(licenciasTable.activo, 1)
      )
    )
    .limit(1)

  if (cliente && cliente.length > 0) {
    session.isLoggedIn = true
    session.username = cliente[0].cliente
    session.role = 'cliente'
    session.clienteId = cliente[0].id
    await session.save()
    return { success: true, role: 'cliente' }
  }

  return { success: false }
}

export async function signOut () {
  const session = await getSession()
  session.destroy()
  return true
}
