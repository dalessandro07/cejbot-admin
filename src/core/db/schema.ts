import { formatDate } from '@/core/lib/utils'
import { addMonth } from '@formkit/tempo'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const licenciasTable = sqliteTable('licencias', {
  id: integer('id').primaryKey(),
  licencia: text('licencia').notNull(),
  cliente: text('cliente').notNull(),
  telefono: text('telefono'),
  creacion: text('creacion').$defaultFn(() => formatDate(new Date())),
  renovacion: text('renovacion').$defaultFn(() => formatDate(new Date())),
  expiracion: text('expiracion').$defaultFn(() => formatDate(addMonth(new Date(), 1))),
  activo: integer('activo').notNull().default(1),
  dispositivo: text('dispositivo'),
  plan: text('plan').default('basico'),
})

export type TLicencia = typeof licenciasTable.$inferSelect
export type TLicenciaInsert = typeof licenciasTable.$inferInsert
