'use server'

import { db } from '@/core/db'
import { anunciosTable } from '@/core/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function crearAnuncio (initialState: unknown, formData: FormData) {
  try {
    const titulo = formData.get('titulo') as string
    const contenido = formData.get('contenido') as string
    const importante = formData.get('importante') === 'on' ? 1 : 0

    if (!titulo || !contenido) {
      return { success: false, message: 'El título y el contenido son obligatorios' }
    }

    await db.insert(anunciosTable).values({
      titulo,
      contenido,
      importante
    })


    return { success: true, message: 'Anuncio creado correctamente' }
  } catch (error) {
    console.error('Error al crear anuncio:', error)
    return { success: false, message: 'Error al crear el anuncio' }
  } finally {
    revalidatePath('/')
  }
}

export async function editarAnuncio (formData: FormData) {
  try {
    const id = parseInt(formData.get('id') as string)
    const titulo = formData.get('titulo') as string
    const contenido = formData.get('contenido') as string
    const importante = formData.get('importante') === 'on' ? 1 : 0
    const activo = formData.get('activo') === 'on' ? 1 : 0

    if (!id || !titulo || !contenido) {
      return { success: false, message: 'Datos incompletos' }
    }

    await db.update(anunciosTable)
      .set({
        titulo,
        contenido,
        importante,
        activo
      })
      .where(eq(anunciosTable.id, id))


    return { success: true, message: 'Anuncio editado correctamente' }
  } catch (error) {
    console.error('Error al editar anuncio:', error)
    return { success: false, message: 'Error al editar el anuncio' }
  } finally {
    revalidatePath('/')
  }
}

export async function eliminarAnuncio (id: number) {
  try {
    await db.delete(anunciosTable).where(eq(anunciosTable.id, id))

    return { success: true, message: 'Anuncio eliminado correctamente' }
  } catch (error) {
    console.error('Error al eliminar anuncio:', error)
    return { success: false, message: 'Error al eliminar el anuncio' }
  } finally {
    revalidatePath('/')
  }
}

export async function cambiarEstadoAnuncio (id: number, activo: boolean) {
  try {
    await db.update(anunciosTable)
      .set({ activo: activo ? 1 : 0 })
      .where(eq(anunciosTable.id, id))

    return { success: true, message: 'Estado del anuncio cambiado correctamente' }
  } catch (error) {
    console.error('Error al cambiar estado del anuncio:', error)
    return { success: false, message: 'Error al actualizar el anuncio' }
  } finally {
    revalidatePath('/')
  }
}
