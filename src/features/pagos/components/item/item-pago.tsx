'use client'

import { Button } from "@/core/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/core/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/core/components/ui/tooltip"
import type { TPago } from "@/core/db"
import { formatCurrency, formatDate } from "@/core/lib/utils"
import { actionEliminarPago } from "@/features/pagos/actions"
import FormEditarPago from '@/features/pagos/components/forms/form-editar-pago'
import { Pencil, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from 'sonner'

interface ItemPagoProps {
  pago: TPago
}

export default function ItemPago ({ pago }: ItemPagoProps) {
  const [openEditDialog, setOpenEditDialog] = useState(false)

  const handleEliminar = async () => {
    if (!confirm('¿Está seguro de eliminar este pago?')) return

    try {
      await actionEliminarPago(pago.id)
      toast.success('Pago eliminado correctamente')
    } catch (error) {
      toast.error('Error al eliminar el pago')
      console.error(error)
    }
  }

  return (
    <div className="flex items-center justify-between">      <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{formatCurrency(pago.monto)}</span>
        <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full dark:bg-gray-800">
          {pago.medioPago}
        </span>
      </div>
      <span className="text-xs text-muted-foreground">{formatDate(pago.fecha!)}</span>
      {pago.notas && (
        <span className="mt-1 text-xs text-muted-foreground">{pago.notas}</span>
      )}
    </div>

      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-8 h-8">
                    <Pencil className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Editar Pago</DialogTitle>
                  </DialogHeader>
                  <FormEditarPago
                    pago={pago}
                  />
                </DialogContent>
              </Dialog>
            </TooltipTrigger>
            <TooltipContent>
              <p>Editar pago</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="w-8 h-8" onClick={handleEliminar}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Eliminar pago</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
