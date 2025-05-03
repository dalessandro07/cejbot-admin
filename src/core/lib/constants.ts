export const APP_NAME = 'AdminCEJBOT'
export const APP_EXTENSION_NAME = 'CEJBOT'
export const APP_DESCRIPTION = `AdminCEJBOT es un dashboard para gestionar las licencias de la extensión ${APP_EXTENSION_NAME}.`

export const APP_COOKIE_NAME = `${APP_NAME}_session`

export const PLANES = {
  PRUEBA: 'prueba',
  BASICO: 'basico',
  PERSONAL: 'personal',
  PROFESIONAL: 'profesional',
  MAX: 'max'
} as const

export const PLANES_LIST = Object.values(PLANES)

export const PLANES_DISPLAY = {
  [PLANES.PRUEBA]: 'Prueba',
  [PLANES.BASICO]: 'Básico',
  [PLANES.PERSONAL]: 'Personal',
  [PLANES.PROFESIONAL]: 'Profesional',
  [PLANES.MAX]: 'Max'
} as const
