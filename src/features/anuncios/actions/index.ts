'use server'

import { db } from '@/core/db'
import { anunciosTable } from '@/core/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function crearAnuncio (formData: FormData) {
  try {
    const titulo = formData.get('titulo') as string
    const contenido = formData.get('contenido') as string
    const importante = formData.get('importante') === 'on' ? 1 : 0

    if (!titulo || !contenido) {
      return { error: 'El título y el contenido son obligatorios' }
    }

    await db.insert(anunciosTable).values({
      titulo,
      contenido,
      importante
    })

    revalidatePath('/cliente')
    revalidatePath('/cliente/anuncios')
    return { success: true }
  } catch (error) {
    console.error('Error al crear anuncio:', error)
    return { error: 'Error al crear el anuncio' }
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
      return { error: 'Datos incompletos' }
    }

    await db.update(anunciosTable)
      .set({
        titulo,
        contenido,
        importante,
        activo
      })
      .where(eq(anunciosTable.id, id))

    revalidatePath('/cliente')
    revalidatePath('/cliente/anuncios')
    return { success: true }
  } catch (error) {
    console.error('Error al editar anuncio:', error)
    return { error: 'Error al editar el anuncio' }
  }
}

export async function eliminarAnuncio (id: number) {
  try {
    await db.delete(anunciosTable).where(eq(anunciosTable.id, id))

    revalidatePath('/cliente')
    revalidatePath('/cliente/anuncios')
    return { success: true }
  } catch (error) {
    console.error('Error al eliminar anuncio:', error)
    return { error: 'Error al eliminar el anuncio' }
  }
}

export async function cambiarEstadoAnuncio (id: number, activo: boolean) {
  try {
    await db.update(anunciosTable)
      .set({ activo: activo ? 1 : 0 })
      .where(eq(anunciosTable.id, id))

    revalidatePath('/cliente')
    revalidatePath('/cliente/anuncios')
    return { success: true }
  } catch (error) {
    console.error('Error al cambiar estado del anuncio:', error)
    return { error: 'Error al actualizar el anuncio' }
  }
}
