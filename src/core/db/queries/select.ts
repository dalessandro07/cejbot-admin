import { db, licenciasTable } from '@/core/db'
import { formatDate } from '@/core/lib/utils'
import { addDay } from '@formkit/tempo'
import { and, eq, gte, lte } from 'drizzle-orm'

//! LICENCIAS

export async function getAllLicencias () {
  const data = await db.select().from(licenciasTable)
  return data
}

export async function getLicenciasProximasAVencer (diasLimite = 7) {
  const hoy = new Date()
  // Add days one by one using addDay
  let limiteFecha = new Date(hoy)

  for (let i = 0; i < diasLimite; i++) {
    limiteFecha = addDay(limiteFecha)
  }

  const data = await db
    .select()
    .from(licenciasTable)
    .where(
      and(
        eq(licenciasTable.activo, 1),
        lte(licenciasTable.expiracion, formatDate(limiteFecha)),
        gte(licenciasTable.expiracion, formatDate(hoy))
      )
    )

  return data
}

export async function getMetricasLicencias () {
  const licencias = await getAllLicencias()

  // Total de licencias
  const total = licencias.length

  // Licencias activas
  const activas = licencias.filter(lic => lic.activo === 1).length

  // Licencias por plan
  const porPlan = licencias.reduce((acc, lic) => {
    const plan = lic.plan || 'basico'
    acc[plan] = (acc[plan] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return {
    total,
    activas,
    porPlan
  }
}
