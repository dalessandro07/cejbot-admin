import { db, licenciasTable, pagosTable } from '@/core/db'
import { formatDate } from '@/core/lib/utils'
import { addMonth } from '@formkit/tempo'
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

export async function updatePlanLicencia (
  id: number,
  plan: string,
): Promise<void> {
  await db
    .update(licenciasTable)
    .set({ plan })
    .where(eq(licenciasTable.id, id))
    .execute()
}

export async function updateExpiracionLicencia (
  id: number,
  expiracion: string,
): Promise<void> {
  const hoy = formatDate(new Date())
  await db
    .update(licenciasTable)
    .set({
      expiracion,
      renovacion: hoy,
      activo: 1 // Al renovar siempre activamos la licencia
    })
    .where(eq(licenciasTable.id, id))
    .execute()
}

export async function renovarLicenciaPorMes (
  id: number,
): Promise<void> {
  const hoy = new Date()
  const nuevaExpiracion = formatDate(addMonth(hoy, 1))

  await updateExpiracionLicencia(id, nuevaExpiracion)
}

//! PAGOS

export async function updatePago (
  id: number,
  datos: {
    fecha?: string,
    monto?: number,
    medioPago?: string,
    notas?: string
  },
): Promise<void> {
  await db
    .update(pagosTable)
    .set(datos)
    .where(eq(pagosTable.id, id))
    .execute()
}
