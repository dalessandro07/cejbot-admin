'use client'

import { Button } from '@/core/components/ui/button'
import { DialogFooter } from '@/core/components/ui/dialog'
import { Input } from '@/core/components/ui/input'
import { Label } from '@/core/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/core/components/ui/select'
import useToastState from '@/core/hooks/useToastState'
import { formatDate } from '@/core/lib/utils'
import { actionInsertLicencia } from '@/features/licencias/actions'
import { addDay, addMonth } from '@formkit/tempo'
import Form from 'next/form'
import { useActionState, useEffect, useState } from 'react'

// Obtener la fecha de hoy y sumarle un mes
const hoy = new Date()
const expiracionEnUnMes = formatDate(addMonth(hoy, 1))
const expiracionEnUnaSemana = formatDate(addDay(hoy, 7))

interface FormNuevaLicenciaProps {
  onSuccess?: () => void
}

export default function FormNuevaLicencia ({ onSuccess }: FormNuevaLicenciaProps) {
  const [state, formAction, isPending] = useActionState(actionInsertLicencia, null)
  useToastState(state)

  const [plan, setPlan] = useState('prueba')
  const [expiracion, setExpiracion] = useState(expiracionEnUnMes)

  const handleExpiracionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpiracion(event.target.value)
  }

  useEffect(() => {
    if (plan === 'prueba') {
      setExpiracion(expiracionEnUnaSemana)
    } else {
      setExpiracion(expiracionEnUnMes)
    }
  }, [plan])
  useEffect(() => {
    if (state?.success && onSuccess) {
      onSuccess()
    }
  }, [state, onSuccess])

  return (
    <Form className='flex flex-col gap-4 py-4' action={formAction}>
      {/* Nombre cliente */}
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="cliente">Cliente</Label>
        <Input type="text" id="cliente" name="cliente" placeholder="Cliente" required />
      </div>

      {/* Teléfono cliente */}
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="telefono">Teléfono</Label>
        <Input type="number" id="telefono" name="telefono" placeholder="Teléfono" required />
      </div>

      {/* Plan */}
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="plan">Plan</Label>
        <Select value={plan} onValueChange={setPlan} name="plan" required>
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
      </div>

      {/* Fecha de expiración */}
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="expiracion">Expiración</Label>
        <Input
          value={expiracion}
          onChange={handleExpiracionChange}
          type="datetime-local"
          id="expiracion"
          name="expiracion"
          placeholder="Expiración"
        />
        <div className='flex flex-wrap items-center gap-2 mt-2'>
          <Button size="sm" variant='outline' type='button' onClick={() => setExpiracion(expiracionEnUnMes)}>
            En un mes
          </Button>
          <Button size="sm" variant='outline' type='button' onClick={() => setExpiracion(expiracionEnUnaSemana)}>
            En una semana
          </Button>
          <Button size="sm" variant='outline' type='button' onClick={() => setExpiracion(formatDate(addDay(hoy, 3)))}>
            En 3 días
          </Button>
          <Button size="sm" variant='outline' type='button' onClick={() => setExpiracion(formatDate(addDay(hoy, 1)))}>
            En 1 día
          </Button>
        </div>
      </div>

      <DialogFooter className="mt-4">
        <Button disabled={isPending} type='submit'>
          {isPending ? 'Creando licencia...' : 'Crear licencia'}
        </Button>
      </DialogFooter>
    </Form>
  )
}
