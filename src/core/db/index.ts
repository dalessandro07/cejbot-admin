import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/libsql'

config({ path: '.env.local' })

const URL = process.env.TURSO_CONNECTION_URL!
const AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN!

if (!URL || !AUTH_TOKEN) {
  throw new Error('No se encontraron las variables de entorno.')
}

export const db = drizzle({
  connection: {
    url: URL,
    authToken: AUTH_TOKEN,
  }
})

export * from './schema'
