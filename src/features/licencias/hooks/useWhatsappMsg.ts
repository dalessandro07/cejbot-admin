import type { TLicencia } from '@/core/db'
import { APP_NAME } from '@/core/lib/constants'
import { formatDate } from '@/core/lib/utils'
import { useState } from 'react'

// Crear diccionario de mensajes según el estado de la licencia
const getWhatsappMessage = (licencia: TLicencia, isActive: boolean) => {
  const nombreCliente = licencia.cliente
  const fechaExpiracion = formatDate(licencia.expiracion!, 'full', 'short')

  // Verificar si la licencia está vencida
  const isExpired = licencia.expiracion ? new Date(licencia.expiracion) < new Date() : false

  // Verificar si está próxima a expirar (7 días)
  const expirationDate = licencia.expiracion ? new Date(licencia.expiracion) : new Date()
  const today = new Date()
  const daysToExpire = Math.ceil((expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  const isAboutToExpire = daysToExpire > 0 && daysToExpire <= 7

  if (!isActive) {
    return `Hola ${nombreCliente}, te escribo para informarte que tu licencia de ${APP_NAME} se encuentra inactiva. Para reactivarla o conocer más detalles, no dudes en contactarnos. ¡Gracias!`
  }

  if (isExpired) {
    return `Hola ${nombreCliente}, te escribo para informarte que tu licencia de ${APP_NAME} ha expirado el ${fechaExpiracion}. Para renovarla y seguir disfrutando del servicio, contáctanos a la brevedad. ¡Gracias!`
  }

  if (isAboutToExpire) {
    return `Hola ${nombreCliente}, te escribo para informarte que tu licencia de ${APP_NAME} está pronta a expirar. Te recordamos que la fecha de expiración es el ${fechaExpiracion}. Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos. ¡Gracias!`
  }

  return `Hola ${nombreCliente}, te escribo del equipo de ${APP_NAME} para saber cómo va todo con tu licencia. Si tienes alguna consulta o necesitas asistencia, estamos para ayudarte. ¡Saludos!`
}

export default function useWhatsappMsg (licencia: TLicencia) {
  const [isActive, setIsActive] = useState(licencia.activo === 1)

  // Reemplazar la declaración actual del mensaje
  const wspMessage = getWhatsappMessage(licencia, isActive)

  return {
    wspMessage,
    isActive,
    setIsActive
  }
}
