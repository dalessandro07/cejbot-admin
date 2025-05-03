'use client'

import { Button } from '@/core/components/ui/button'
import { Input } from '@/core/components/ui/input'
import { Label } from '@/core/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/core/components/ui/select'
import useToastState from '@/core/hooks/useToastState'
import { formatDate } from '@/core/lib/utils'
import { actionInsertLicencia } from '@/features/licencias/actions'
import { addMonth } from '@formkit/tempo'
import Form from 'next/form'
import { useActionState } from 'react'

export default function FormNuevaLicencia () {
  const [state, formAction, isPending] = useActionState(actionInsertLicencia, null)
  useToastState(state)

  // Obtener la fecha de hoy y sumarle un mes
  const hoy = new Date()
  const expiracionEnUnMes = formatDate(addMonth(hoy, 1))

  return (
    <Form className='flex flex-col gap-2' action={formAction}>
      {/* Nombre cliente */}
      <Label htmlFor="cliente">Cliente</Label>
      <Input type="text" name="cliente" placeholder="Cliente" required />

      {/* Plan */}
      <Label htmlFor="plan">Plan</Label>
      <Select defaultValue='basico' name="plan" required>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder="Plan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="prueba">Prueba</SelectItem>
          <SelectItem value="basico">Básico</SelectItem>
          <SelectItem value="personal">Personal</SelectItem>
          <SelectItem value="profesional">Profesional</SelectItem>
          <SelectItem value="max">Max</SelectItem>
        </SelectContent>
      </Select>

      {/* Fecha de expiración */}
      <Label htmlFor="expiracion">Expiración</Label>
      <Input defaultValue={expiracionEnUnMes} type="datetime-local" name="expiracion" placeholder="Expiración" />

      <Button disabled={isPending} type='submit'>
        {isPending ? 'Creando licencia...' : 'Crear licencia'}
      </Button>
    </Form>
  )
}
