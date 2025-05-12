'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'

type TStateFormAction = {
  success: boolean
  message: string
} | null | undefined

export default function useToastState (state: TStateFormAction, callback?: (state: TStateFormAction) => void) {
  useEffect(() => {
    if (state && state.message) {
      toast[state.success ? "success" : "error"](state.message, {
        id: `id-${state.message}`,
      })

      // Execute callback if provided
      if (callback && typeof callback === 'function') {
        callback(state)
      }
    }
  }, [state, callback])

  return state
}
