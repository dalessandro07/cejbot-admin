'use client'

import { Button } from "@/core/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/core/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/core/components/ui/dialog"
import { Separator } from "@/core/components/ui/separator"
import type { TLicencia, TPago } from "@/core/db"
import { useState } from "react"
import FormNuevoPago from "./forms/form-nuevo-pago"
import ItemPago from "./item/item-pago"

interface HistorialPagosProps {
  licencia: TLicencia
  pagos: TPago[]
}

export default function HistorialPagos ({ licencia, pagos }: HistorialPagosProps) {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div>
          <CardTitle className="text-xl">Historial de Pagos</CardTitle>
          <CardDescription>
            Historial de todos los pagos registrados para esta licencia
          </CardDescription>
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              Registrar Pago
            </Button>
          </DialogTrigger>
          <DialogContent>
            <FormNuevoPago
              licenciaId={licencia.id}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent className="pt-2">
        {pagos.length === 0 ? (
          <p className="py-4 text-sm text-center text-muted-foreground">
            No hay pagos registrados para esta licencia
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {pagos.map((pago, index) => (
              <div key={pago.id} className="w-full">
                <ItemPago pago={pago} />
                {index < pagos.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
