import { diffDays, format, type DateInput, type FormatStyle } from '@formkit/tempo'
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//* Fechas

export function formatDate (inputDate?: DateInput | null, dateStyle?: FormatStyle, timeStyle?: FormatStyle) {
  if (!inputDate) return ''
  if (!dateStyle) {
    return format(inputDate, 'YYYY-MM-DD HH:mm:ss')
  }

  return format(inputDate, {
    date: dateStyle,
    time: timeStyle,
  }, 'es-PE')
}

export function formatDistanceToNow (date: Date | string) {
  try {
    if (typeof date === 'string') {
      // Convert from 'YYYY-MM-DD' format
      const parts = date.split('-')
      if (parts.length === 3) {
        const newDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]))
        return diffDays(newDate, new Date())
      }
    }
    return diffDays(date, new Date())
  } catch (error) {
    console.error('Error formatting date distance:', error)
    return ''
  }
}

/**
 * Formatea un monto a moneda peruana (PEN)
 * @param amount Monto a formatear
 * @returns Monto formateado (ej: S/ 100.00)
 */
export function formatCurrency (amount: number): string {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}
