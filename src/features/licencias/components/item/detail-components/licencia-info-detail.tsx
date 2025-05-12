import { Card } from "@/core/components/ui/card"
import WhatsappLink from "@/core/components/ui/whatsapp-link"
import type { TLicencia } from "@/core/db"
import { PLANES_DISPLAY } from "@/core/lib/constants"

interface LicenciaInfoDetailProps {
  licencia: TLicencia
}

export default function LicenciaInfoDetail ({ licencia }: LicenciaInfoDetailProps) {
  const wspMessage = `Hola ${licencia.cliente}, tu licencia de CEJBOT está por vencer el ${licencia.expiracion}. ¿Deseas renovarla?`

  return (
    <Card className="p-5">
      <div className="space-y-5">
        <h2 className="text-xl font-semibold">{licencia.cliente}</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Licencia</p>
            <p className="font-medium">{licencia.licencia}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Teléfono</p>
            <div className="flex items-center gap-2">
              <p className="font-medium">{licencia.telefono || 'No registrado'}</p>
              {licencia.telefono && (
                <WhatsappLink whatsappNumber={licencia.telefono} message={wspMessage} />
              )}
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Dispositivo</p>
            <p className="font-medium">{licencia.dispositivo || 'No registrado'}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Plan</p>
            <p className="font-medium capitalize">
              {PLANES_DISPLAY[licencia.plan as keyof typeof PLANES_DISPLAY] || 'Básico'}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Fecha de creación</p>
            <p className="font-medium">{licencia.creacion}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Fecha de renovación</p>
            <p className="font-medium">{licencia.renovacion}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Fecha de expiración</p>
            <p className="font-medium">{licencia.expiracion}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Estado</p>
            <p className={`font-medium ${licencia.activo ? 'text-green-600' : 'text-red-600'}`}>
              {licencia.activo ? 'Activo' : 'Inactivo'}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
