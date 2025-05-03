import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: '.env.local' })

const URL = process.env.TURSO_CONNECTION_URL!
const AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN!

export default defineConfig({
  schema: './src/core/db/schema.ts',
  out: './migrations',
  dialect: 'turso',
  dbCredentials: {
    url: URL,
    authToken: AUTH_TOKEN,
  },
})
