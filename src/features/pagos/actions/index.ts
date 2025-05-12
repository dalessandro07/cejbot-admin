'use server'

import { deletePago } from "@/core/db/queries/delete"
import { insertPago } from "@/core/db/queries/insert"
import { updatePago } from "@/core/db/queries/update"
import { revalidatePath } from "next/cache"

export async function actionRegistrarPago (initialState: unknown, formData: FormData) {
  try {
    const licenciaId = Number(formData.get('licenciaId'))
    const fecha = formData.get('fecha') as string
    const monto = Number(formData.get('monto'))
    const medioPago = formData.get('medioPago') as string
    const notas = formData.get('notas') as string || undefined

    if (!licenciaId || isNaN(licenciaId)) {
      throw new Error('ID de licencia inválido')
    }

    if (!fecha) {
      throw new Error('La fecha es requerida')
    }

    if (!monto || isNaN(monto) || monto <= 0) {
      throw new Error('El monto debe ser un valor positivo')
    }

    if (!medioPago) {
      throw new Error('El medio de pago es requerido')
    }

    await insertPago({
      licenciaId,
      fecha,
      monto,
      medioPago,
      notas
    })

    revalidatePath('/licencias')

    return {
      success: true,
      message: 'Pago registrado correctamente'
    }
  } catch (error) {
    console.error('Error al registrar el pago:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al registrar el pago'
    }
  }
}

export async function actionEditarPago (initialState: unknown, formData: FormData) {
  try {
    const id = Number(formData.get('id'))
    const fecha = formData.get('fecha') as string
    const monto = Number(formData.get('monto'))
    const medioPago = formData.get('medioPago') as string
    const notas = formData.get('notas') as string || undefined

    if (!id || isNaN(id)) {
      throw new Error('ID de pago inválido')
    }

    if (!fecha) {
      throw new Error('La fecha es requerida')
    }

    if (!monto || isNaN(monto) || monto <= 0) {
      throw new Error('El monto debe ser un valor positivo')
    }

    if (!medioPago) {
      throw new Error('El medio de pago es requerido')
    }

    await updatePago(id, {
      fecha,
      monto,
      medioPago,
      notas
    })

    revalidatePath('/licencias')

    return {
      success: true,
      message: 'Pago actualizado correctamente'
    }
  } catch (error) {
    console.error('Error al actualizar el pago:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al actualizar el pago'
    }
  }
}

export async function actionEliminarPago (id: number) {
  try {
    await deletePago(id)
    revalidatePath('/licencias')
    return { success: true }
  } catch (error) {
    console.error('Error al eliminar el pago:', error)
    throw error
  }
}
