import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/card'
import { Separator } from '@/core/components/ui/separator'
import type { TLicencia } from '@/core/db'
import { formatDate, formatDistanceToNow } from '@/core/lib/utils'

type InfoLicenciaProps = {
  licencia: TLicencia
}

export default function InfoLicencia ({ licencia }: InfoLicenciaProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Mi Licencia</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Cliente</p>
            <p className="font-medium">{licencia.cliente}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Licencia</p>
            <p className="font-medium">
              {licencia.licencia?.substring(0, licencia.licencia.length - 20)}{"*".repeat(20)}
            </p>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">Plan</p>
            <p className="font-medium capitalize">{licencia?.plan || 'Básico'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Estado</p>
            <p className={`font-medium ${licencia?.activo === 1 ? 'text-green-600' : 'text-red-600'}`}>
              {licencia?.activo === 1 ? 'Activo' : 'Inactivo'}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Expira</p>
            <p className="font-medium">
              {formatDate(licencia.expiracion!, 'short', 'short')}
              {licencia.expiracion && (
                <span className="ml-2 text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(licencia.expiracion))} día(s)
                </span>
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
