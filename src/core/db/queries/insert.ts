import { db, licenciasTable, TLicenciaInsert } from '@/core/db'

//! LICENCIAS

export async function insertLicencia (licencia: TLicenciaInsert) {
  const data = await db
    .insert(licenciasTable)
    .values(licencia)
    .returning()

  return data[0]
}
