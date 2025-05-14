import { formatDate } from '@/core/lib/utils'
import { addMonth } from '@formkit/tempo'
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

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

export const pagosTable = sqliteTable('pagos', {
  id: integer('id').primaryKey(),
  licenciaId: integer('licencia_id').notNull(),
  fecha: text('fecha').$defaultFn(() => formatDate(new Date())),
  monto: real('monto').notNull(),
  medioPago: text('medio_pago').notNull().default('transferencia'),
  notas: text('notas'),
})

export const anunciosTable = sqliteTable('anuncios', {
  id: integer('id').primaryKey(),
  titulo: text('titulo').notNull(),
  contenido: text('contenido').notNull(),
  fechaPublicacion: text('fecha_publicacion').$defaultFn(() => formatDate(new Date())),
  activo: integer('activo').notNull().default(1),
  importante: integer('importante').default(0),
})

export type TLicencia = typeof licenciasTable.$inferSelect
export type TLicenciaInsert = typeof licenciasTable.$inferInsert

export type TPago = typeof pagosTable.$inferSelect
export type TPagoInsert = typeof pagosTable.$inferInsert

export type TAnuncio = typeof anunciosTable.$inferSelect
export type TAnuncioInsert = typeof anunciosTable.$inferInsert
