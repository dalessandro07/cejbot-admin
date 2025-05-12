'use client'

import { Button } from "@/core/components/ui/button"
import { Input } from "@/core/components/ui/input"
import { Label } from "@/core/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/core/components/ui/select"
import { Textarea } from '@/core/components/ui/textarea'
import type { TPago } from "@/core/db"
import useToastState from "@/core/hooks/useToastState"
import { actionEditarPago } from "@/features/pagos/actions"
import Form from "next/form"
import { useActionState, useState } from "react"

const MEDIOS_PAGO = [
  { id: 'efectivo', nombre: 'Efectivo' },
  { id: 'transferencia', nombre: 'Transferencia' },
  { id: 'deposito', nombre: 'Depósito' },
  { id: 'otro', nombre: 'Otro' }
]

interface FormEditarPagoProps {
  pago: TPago
}

export default function FormEditarPago ({ pago }: FormEditarPagoProps) {
  const [medioPago, setMedioPago] = useState(pago.medioPago)
  const [state, formAction, isPending] = useActionState(actionEditarPago, null)

  useToastState(state)

  // Formatear la fecha para el input de tipo date
  const formatDateForInput = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split('-')
      return `${year}-${month}-${day.split(' ')[0]}`
    } catch (error) {
      console.error('Error al formatear la fecha:', error)
      return new Date().toISOString().split('T')[0]
    }
  }

  return (
    <Form action={formAction} className="flex flex-col gap-4 mt-4">
      <input type="hidden" name="id" value={pago.id} />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fecha">Fecha</Label>
          <Input
            id="fecha"
            name="fecha"
            type="date"
            defaultValue={formatDateForInput(pago.fecha!)}
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
            defaultValue={pago.monto}
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
          defaultValue={pago.notas || ""}
        />
      </div>

      <Button type="submit" className="w-full mt-2" disabled={isPending}>
        {isPending ? "Guardando..." : "Actualizar Pago"}
      </Button>
    </Form>
  )
}
