'use server'

import { signIn, signOut } from '@/features/auth/lib/session'
import { redirect } from 'next/navigation'

export async function actionLogin (initialState: unknown, formData: FormData) {

  const username = formData.get('username') as string
  const password = formData.get('password') as string

  if (!username || !password) {
    return {
      success: false,
      message: "El usuario y la contraseña son requeridos"
    }
  }

  let role: string = 'admin'

  try {
    const result = await signIn(username, password)

    if (!result.success) {
      throw new Error("Usuario o contraseña incorrectos")
    }

    role = result.role || 'admin'

  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido"

    return {
      success: false,
      message
    }
  } finally {
    if (role === 'cliente') {
      redirect('/cliente')
    } else {
      redirect('/')
    }
  }
}

export async function actionLogout () {
  let exito: boolean = false

  try {
    exito = await signOut()

    if (!exito) {
      throw new Error("Error al cerrar sesión")
    }

    return {
      success: true,
      message: "Sesión cerrada correctamente"
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido"
    console.error(message)
    return {
      success: false,
      message
    }
  } finally {
    if (exito) redirect('/login')
  }
}
