'use client'

import { Button } from "@/core/components/ui/button"
import { DialogDescription, DialogHeader, DialogTitle } from "@/core/components/ui/dialog"
import { Input } from "@/core/components/ui/input"
import { Label } from "@/core/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/core/components/ui/select"
import { Textarea } from '@/core/components/ui/textarea'
import useToastState from "@/core/hooks/useToastState"
import { actionRegistrarPago } from "@/features/pagos/actions"
import Form from "next/form"
import { useActionState, useState } from "react"

const MEDIOS_PAGO = [
  { id: 'efectivo', nombre: 'Efectivo' },
  { id: 'transferencia', nombre: 'Transferencia' },
  { id: 'deposito', nombre: 'Depósito' },
  { id: 'otro', nombre: 'Otro' }
]

interface FormNuevoPagoProps {
  licenciaId: number
}

export default function FormNuevoPago ({ licenciaId }: FormNuevoPagoProps) {
  const [medioPago, setMedioPago] = useState('efectivo')
  const [state, formAction, isPending] = useActionState(actionRegistrarPago, null)

  useToastState(state)

  return (
    <>
      <DialogHeader>
        <DialogTitle>Registrar Nuevo Pago</DialogTitle>
        <DialogDescription>
          Complete los datos del pago para la licencia
        </DialogDescription>
      </DialogHeader>

      <Form action={formAction} className="flex flex-col gap-4 mt-4">
        <input type="hidden" name="licenciaId" value={licenciaId} />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fecha">Fecha</Label>
            <Input
              id="fecha"
              name="fecha"
              type="date"
              defaultValue={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div>
            <Label htmlFor="monto">Monto</Label>
            <Input
              id="monto"
              name="monto"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="medioPago">Medio de Pago</Label>
          <Select
            name="medioPago"
            value={medioPago}
            onValueChange={setMedioPago}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccione medio de pago" />
            </SelectTrigger>
            <SelectContent>
              {MEDIOS_PAGO.map(medio => (
                <SelectItem key={medio.id} value={medio.id}>
                  {medio.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="notas">Notas (opcional)</Label>
          <Textarea
            id="notas"
            name="notas"
            placeholder="Información adicional sobre el pago"
            className="resize-none"
          />
        </div>

        <Button type="submit" className="w-full mt-2" disabled={isPending}>
          {isPending ? "Guardando..." : "Registrar Pago"}
        </Button>
      </Form>
    </>
  )
}
