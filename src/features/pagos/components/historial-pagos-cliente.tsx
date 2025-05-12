'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/core/components/ui/card"
import type { TPago } from "@/core/db"
import { formatCurrency, formatDate } from "@/core/lib/utils"

interface HistorialPagosClienteProps {
  pagos: TPago[]
}

export default function HistorialPagosCliente ({ pagos }: HistorialPagosClienteProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Historial de Pagos</CardTitle>
        <CardDescription>
          Registro de todos los pagos realizados por su licencia
        </CardDescription>
      </CardHeader>

      <CardContent>
        {pagos.length === 0 ? (
          <p className="py-4 text-sm text-center text-muted-foreground">
            No hay pagos registrados para esta licencia
          </p>
        ) : (
          <div className="space-y-4">
            {pagos.map(pago => (
              <div key={pago.id} className="pb-3 border-b last:border-0">                <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{formatCurrency(pago.monto)}</span>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full dark:bg-gray-800">
                    {pago.medioPago}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatDate(pago.fecha!)}
                </span>
              </div>
                {pago.notas && (
                  <p className="text-xs text-muted-foreground">{pago.notas}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
