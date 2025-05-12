'use server'

import { deleteLicencia } from '@/core/db/queries/delete'
import { insertLicencia } from '@/core/db/queries/insert'
import { updateEstadoLicencia } from '@/core/db/queries/update'
import { PLANES } from '@/core/lib/constants'
import { revalidatePath } from 'next/cache'

export async function actionInsertLicencia (initialState: unknown, formData: FormData) {
  // Obtener los datos del formulario
  let cliente = formData.get('cliente')?.toString() ?? ''
  const telefono = formData.get('telefono')?.toString() ?? ''
  let plan = formData.get('plan')?.toString() ?? ''
  const expiracion = formData.get('expiracion')?.toString() ?? ''

  // Validar los datos del formulario
  if (!cliente || !plan) {
    return {
      success: false,
      message: 'Faltan datos para crear la licencia.'
    }
  }

  // Si se eligió el plan de prueba, cambiar el nombre del cliente y el plan a básico
  if (plan === PLANES.PRUEBA) {
    cliente = cliente.concat(' (Prueba)')
    plan = PLANES.BASICO
  }

  // Generar la licencia
  const licencia = crypto.randomUUID()

  try {
    await insertLicencia({
      cliente,
      licencia,
      plan,
      expiracion,
      telefono
    })

    return {
      success: true,
      message: 'Licencia creada con éxito.',
      data: {
        cliente,
        plan,
        expiracion
      }
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al crear la licencia'
    return {
      success: false,
      message
    }
  } finally {
    revalidatePath('/')
  }
}

export async function actionUpdateEstadoLicencia (initialState: unknown, formData: FormData) {
  // Obtener los datos del formulario
  const id = formData.get('id')?.toString() ?? ''
  const estado = formData.get('estado')?.toString() ?? ''

  // Validar los datos del formulario
  if (!id || !estado) {
    return {
      success: false,
      message: 'Faltan datos para actualizar la licencia.'
    }
  }

  try {
    await updateEstadoLicencia(Number(id), Number(estado))

    return {
      success: true,
      message: 'Licencia actualizada con éxito.'
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al actualizar la licencia'
    return {
      success: false,
      message
    }
  } finally {
    revalidatePath('/')
  }
}

export async function actionDeleteLicencia (initialState: unknown, formData: FormData) {
  // Obtener los datos del formulario
  const id = formData.get('id')?.toString() ?? ''

  // Validar los datos del formulario
  if (!id) {
    return {
      success: false,
      message: 'Faltan datos para eliminar la licencia.'
    }
  }

  try {
    await deleteLicencia(Number(id))

    return {
      success: true,
      message: 'Licencia eliminada con éxito.'
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al eliminar la licencia'
    return {
      success: false,
      message
    }
  } finally {
    revalidatePath('/')
  }
}
