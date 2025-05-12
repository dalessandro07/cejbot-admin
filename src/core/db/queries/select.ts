import { anunciosTable, db, licenciasTable, pagosTable } from '@/core/db'
import { formatDate } from '@/core/lib/utils'
import { addDay } from '@formkit/tempo'
import { and, desc, eq, gte, lte } from 'drizzle-orm'

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

export async function getLicenciaByClienteId (id: number) {
  const data = await db
    .select()
    .from(licenciasTable)
    .where(eq(licenciasTable.id, id))
    .limit(1)

  return data[0]
}

export async function getLicenciaById (id: number) {
  const data = await db
    .select()
    .from(licenciasTable)
    .where(eq(licenciasTable.id, id))
    .limit(1)

  return data[0]
}

//! PAGOS

export async function getPagosByLicenciaId (licenciaId: number) {
  const data = await db
    .select()
    .from(pagosTable)
    .where(eq(pagosTable.licenciaId, licenciaId))
    .orderBy(desc(pagosTable.fecha))

  return data
}

export async function getPagoById (id: number) {
  const data = await db
    .select()
    .from(pagosTable)
    .where(eq(pagosTable.id, id))
    .limit(1)

  return data[0]
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

//! ANUNCIOS

export async function getAllAnuncios () {
  const data = await db.select().from(anunciosTable)
    .orderBy(desc(anunciosTable.fechaPublicacion))
  return data
}

export async function getAnunciosActivos () {
  const data = await db.select().from(anunciosTable)
    .where(eq(anunciosTable.activo, 1))
    .orderBy(desc(anunciosTable.fechaPublicacion))
  return data
}

export async function getAnuncioById (id: number) {
  const data = await db.select().from(anunciosTable)
    .where(eq(anunciosTable.id, id))
    .limit(1)
  return data[0]
}
