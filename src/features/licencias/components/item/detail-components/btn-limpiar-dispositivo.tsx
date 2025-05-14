'use client'

import { Button } from "@/core/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/core/components/ui/dialog"
import useToastState from "@/core/hooks/useToastState"
import { actionLimpiarDispositivoLicencia } from '@/features/licencias/actions'
import { BotOffIcon } from 'lucide-react'
import { useRouter } from "next/navigation"
import { useActionState, useState } from "react"

interface BtnLimpiarDispositivoProps {
  id: number
}

export default function BtnLimpiarDispositivo ({ id }: BtnLimpiarDispositivoProps) {
  const [open, setOpen] = useState(false)
  const [state, formAction, isPending] = useActionState(actionLimpiarDispositivoLicencia, null)
  const router = useRouter()

  useToastState(state, () => {
    setOpen(false)
    router.refresh()
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          <BotOffIcon className="w-4 h-4 mr-1" />
          Limpiar dispositivo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form action={formAction}>
          <input type="hidden" name="id" value={id} />

          <DialogHeader>
            <DialogTitle>Limpiar Dispositivo</DialogTitle>
            <DialogDescription className="py-2">
              ¿Está seguro que desea limpiar el dispositivo asociado a esta licencia?
              <br />
              Esta acción permitirá que la licencia sea usada en un nuevo dispositivo.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Limpiando...' : 'Limpiar dispositivo'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
