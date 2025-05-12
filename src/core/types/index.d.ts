export interface SessionData {
  isLoggedIn?: boolean
  username?: string
  role?: 'admin' | 'cliente'
  clienteId?: number
}

export type TPlan = 'basico' | 'personal' | 'profesional' | 'max'
