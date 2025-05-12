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
import { TLicencia } from '@/core/db'
import useToastState from '@/core/hooks/useToastState'
import { formatDate } from '@/core/lib/utils'
import { actionRenovarLicenciaHastaFecha } from '@/features/licencias/actions'
import { addMonth } from '@formkit/tempo'
import { CalendarIcon } from 'lucide-react'
import { useActionState, useState } from 'react'

interface DialogRenovarLicenciaProps {
  licencia: TLicencia
}

export default function DialogRenovarLicencia ({ licencia }: DialogRenovarLicenciaProps) {
  const [open, setOpen] = useState(false)
  const [state, formAction, isPending] = useActionState(actionRenovarLicenciaHastaFecha, null)

  useToastState(state, () => setOpen(false))

  const fechaSugerida = formatDate(addMonth(new Date(), 1), 'full')
  const fechaISOdefault = new Date(addMonth(new Date(), 1)).toISOString().split('T')[0]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <CalendarIcon className="w-4 h-4 mr-1" />
          Renovar hasta fecha
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form action={formAction}>
          <input type="hidden" name="id" value={licencia.id} />

          <DialogHeader>
            <DialogTitle>Renovar Licencia</DialogTitle>
            <DialogDescription>
              La licencia de {licencia.cliente} será renovada hasta la fecha seleccionada.
              <br />
              Sugerencia: {fechaSugerida}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Label htmlFor="expiracion">Fecha de expiración</Label>
            <Input
              id="expiracion"
              name="expiracion"
              type="date"
              defaultValue={fechaISOdefault}
              required
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Renovando...' : 'Renovar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
