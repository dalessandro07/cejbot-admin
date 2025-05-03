import { format, type DateInput, type FormatStyle } from '@formkit/tempo'
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//* Fechas

export function formatDate (inputDate: DateInput, dateStyle?: FormatStyle, timeStyle?: FormatStyle) {
  if (!inputDate) return ''
  if (!dateStyle) {
    return format(inputDate, 'YYYY-MM-DD HH:mm:ss')
  }

  return format(inputDate, {
    date: dateStyle,
    time: timeStyle,
  })
}
