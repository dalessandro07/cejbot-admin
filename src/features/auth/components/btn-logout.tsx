'use client'

import { Button } from '@/core/components/ui/button'
import useToastState from '@/core/hooks/useToastState'
import { actionLogout } from '@/features/auth/actions'
import Form from 'next/form'
import { useActionState } from 'react'

export default function BtnLogout () {

  const [state, formAction, isPending] = useActionState(actionLogout, null)

  useToastState(state)

  return (
    <Form action={formAction}>
      <Button disabled={isPending} variant='outline'>
        {isPending ? 'Cerrando sesión...' : 'Cerrar sesión'}
      </Button>
    </Form>
  )
}
