import { db, licenciasTable, pagosTable, TLicenciaInsert, TPagoInsert } from '@/core/db'

//! LICENCIAS

export async function insertLicencia (licencia: TLicenciaInsert) {
  const data = await db
    .insert(licenciasTable)
    .values(licencia)
    .returning()

  return data[0]
}

//! PAGOS

export async function insertPago (pago: TPagoInsert) {
  const data = await db
    .insert(pagosTable)
    .values(pago)
    .returning()

  return data[0]
}
