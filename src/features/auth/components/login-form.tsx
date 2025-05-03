'use client'

import { Button } from "@/core/components/ui/button"
import { CardContent, CardFooter } from '@/core/components/ui/card'
import { Input } from "@/core/components/ui/input"
import { Label } from "@/core/components/ui/label"
import useToastState from '@/core/hooks/useToastState'
import { actionLogin } from '@/features/auth/actions'
import Form from 'next/form'
import { useActionState } from 'react'

export default function LoginForm () {
  const [state, formAction, isPending] = useActionState(actionLogin, null)

  useToastState(state)

  return (
    <Form className='flex flex-col gap-4' action={formAction}>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="username">Usuario</Label>
          <Input
            id="username"
            name="username"
            type="text"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
          />
        </div>
      </CardContent>

      <CardFooter>
        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
        >
          {isPending ? "Cargando..." : "Ingresar"}
        </Button>
      </CardFooter>
    </Form>
  )
}
