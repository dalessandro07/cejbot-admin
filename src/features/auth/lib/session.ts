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

export async function signIn (username: string, password: string) {
  const session = await getSession()

  if (username === SITE_USERNAME && password === SITE_PASSWORD) {
    session.isLoggedIn = true
    session.username = username
    await session.save()
    return true
  }

  return false
}

export async function signOut () {
  const session = await getSession()
  session.destroy()
  return true
}
