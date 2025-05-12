'use client'

import { Button } from '@/core/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/core/components/ui/dialog'
import { Input } from '@/core/components/ui/input'
import { Label } from '@/core/components/ui/label'
import useToastState from '@/core/hooks/useToastState'
import { formatDate } from '@/core/lib/utils'
import { actionRenovarLicenciaHastaFecha } from '@/features/licencias/actions'
import { addMonth } from '@formkit/tempo'
import { CalendarIcon } from 'lucide-react'
import { useActionState, useState } from 'react'

interface DialogRenovarLicenciaProps {
  id: number
  cliente: string
  telefono: string | null
}

export default function DialogRenovarLicencia ({ id, cliente, telefono }: DialogRenovarLicenciaProps) {
  const [open, setOpen] = useState(false)
  const [state, formAction, isPending] = useActionState(actionRenovarLicenciaHastaFecha, null)

  // Calcular la fecha predeterminada de un mes a partir de hoy
  const fechaPredeterminada = formatDate(addMonth(new Date(), 1))

  useToastState(state)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <CalendarIcon className="h-3.5 w-3.5" />
          <span>Renovar hasta...</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Renovar licencia</DialogTitle>
          <DialogDescription>
            Selecciona la fecha hasta la que deseas renovar la licencia para <strong>{cliente} ({telefono})</strong>
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="mt-4">
          <input type="hidden" name="id" value={id} />
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="expiracion">Fecha de expiración</Label>
              <Input
                id="expiracion"
                name="expiracion"
                type="datetime-local"
                defaultValue={fechaPredeterminada}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Renovando...' : 'Renovar licencia'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
