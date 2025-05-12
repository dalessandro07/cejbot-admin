import { db, licenciasTable, pagosTable } from '@/core/db'
import { eq } from 'drizzle-orm'

export async function deleteLicencia (id: number) {
  const result = await db
    .delete(licenciasTable)
    .where(
      eq(licenciasTable.id, id)
    )

  return result
}

export async function deletePago (id: number) {
  const result = await db
    .delete(pagosTable)
    .where(
      eq(pagosTable.id, id)
    )

  return result
}
