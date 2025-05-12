import { db, licenciasTable } from '@/core/db'
import { eq } from 'drizzle-orm'

export async function deleteLicencia (id: number) {
  const result = await db
    .delete(licenciasTable)
    .where(
      eq(licenciasTable.id, id)
    )

  return result
}
