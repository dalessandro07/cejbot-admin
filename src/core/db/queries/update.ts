import { db, licenciasTable } from '@/core/db'
import { eq } from 'drizzle-orm'

//! LICENCIAS

export async function updateEstadoLicencia (
  id: number,
  activo: number,
): Promise<void> {
  await db
    .update(licenciasTable)
    .set({ activo })
    .where(eq(licenciasTable.id, id))
    .execute()
}
