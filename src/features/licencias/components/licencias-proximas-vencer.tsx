'use client'

import { Badge } from '@/core/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/card'
import type { TLicencia } from '@/core/db'
import { PLANES_DISPLAY } from '@/core/lib/constants'
import { formatDate } from '@/core/lib/utils'
import { AlertTriangleIcon, CalendarIcon } from 'lucide-react'
import Link from 'next/link'

interface LicenciasProximasVencerProps {
  licencias: TLicencia[]
}

export default function LicenciasProximasVencer ({ licencias }: LicenciasProximasVencerProps) {
  if (licencias.length === 0) {
    return (
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CalendarIcon className="w-5 h-5 text-muted-foreground" />
            Licencias próximas a vencer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="p-3 mb-4 border-2 border-green-100 rounded-full bg-green-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <p className="text-muted-foreground">No hay licencias próximas a vencer en los próximos 7 días</p>
          </div>
        </CardContent>
      </Card>
    )
  }
  // Sort licencias by expiration date (closest first)
  const sortedLicencias = [...licencias].sort((a, b) => {
    return (a.expiracion || '').localeCompare(b.expiracion || '')
  })

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertTriangleIcon className="w-5 h-5 text-amber-500" />
          Licencias próximas a vencer ({licencias.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sortedLicencias.map((licencia) => {
            const plan = licencia.plan as keyof typeof PLANES_DISPLAY || 'basico'

            return (
              <div key={licencia.id} className="flex flex-col p-4 transition-all border rounded-lg hover:shadow-md hover:border-primary/30">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium truncate">{licencia.cliente}</h3>
                  <Badge variant={plan === 'prueba' ? 'outline' : plan}>{PLANES_DISPLAY[plan]}</Badge>
                </div>
                <div className="flex flex-col gap-1 mt-auto">
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <CalendarIcon className="w-4 h-4" />
                    <span>Vence el {formatDate(licencia.expiracion!, 'short', 'short')}</span>
                  </div>
                  <Link
                    href="/licencias"
                    className="px-3 py-1.5 mt-2 text-xs text-center text-primary border border-primary/25 rounded-md hover:bg-primary/10 transition-colors"
                  >
                    Ver detalles
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
