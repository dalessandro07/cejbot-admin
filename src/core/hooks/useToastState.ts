import { useEffect } from 'react'
import { toast } from 'sonner'

type TStateFormAction = {
  success: boolean
  message: string
} | null | undefined

export default function useToastState (state: TStateFormAction) {
  useEffect(() => {
    if (state && state.message) {
      toast[state.success ? "success" : "error"](state.message, {
        id: `id-${state.message}`,
      })
    }
  }, [state])

  return state
}
