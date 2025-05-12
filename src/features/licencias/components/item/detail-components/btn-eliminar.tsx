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
import { actionDeleteLicencia } from '@/features/licencias/actions'
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useActionState, useState } from "react"

interface BtnEliminarProps {
  id: number
}

export default function BtnEliminar ({ id }: BtnEliminarProps) {
  const [open, setOpen] = useState(false)
  const [state, formAction, isPending] = useActionState(actionDeleteLicencia, null)
  const router = useRouter()

  useToastState(state, () => {
    setOpen(false)
    router.push('/licencias')
  }
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="w-4 h-4 mr-1" />
          Eliminar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form action={formAction}>
          <input type="hidden" name="id" value={id} />

          <DialogHeader>
            <DialogTitle>Eliminar Licencia</DialogTitle>
            <DialogDescription className="py-2">
              ¿Está seguro que desea eliminar esta licencia?
              <br />
              Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="destructive"
              disabled={isPending}
            >
              {isPending ? "Eliminando..." : "Eliminar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
