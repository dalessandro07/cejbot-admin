import { db, licenciasTable } from '@/core/db'

//! LICENCIAS

export async function getAllLicencias () {
  const data = await db.select().from(licenciasTable)
  return data
}
