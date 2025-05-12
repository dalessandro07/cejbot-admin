'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/core/components/ui/accordion'
import { Badge } from '@/core/components/ui/badge'
import { Button } from '@/core/components/ui/button'
import type { TLicencia } from '@/core/db'
import { PLANES_DISPLAY } from '@/core/lib/constants'
import { formatDate } from '@/core/lib/utils'
import type { TPlan } from '@/core/types'
import Link from 'next/link'
import { useState } from 'react'

export default function ItemLicencia ({
  licencia
}: {
  licencia: TLicencia
}) {
  const [currentPlan] = useState<TPlan>(licencia.plan as TPlan)
  return (
    <Accordion type="single" collapsible className="w-full mb-4">
      <AccordionItem value={`licencia-${licencia.id}`} className="overflow-hidden border rounded-lg shadow-sm">
        <AccordionTrigger className="px-4 py-2.5 hover:no-underline bg-background">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3 text-left">
              <span className="font-medium">{licencia.cliente}</span>
            </div>
            <Badge variant={currentPlan} className="text-xs font-medium">
              {PLANES_DISPLAY[currentPlan]}
            </Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pt-3 pb-4 bg-gradient-to-b from-background to-muted/20">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Licencia</p>
                <p>{licencia.licencia}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Teléfono</p>
                <p>{licencia.telefono || 'No registrado'}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Expiración</p>
                <p>{formatDate(licencia.expiracion, 'full', 'short')}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Badge variant={licencia.activo ? 'success' : 'destructive'}>
                  {licencia.activo ? 'Activo' : 'Inactivo'}
                </Badge>
              </div>

              <Link href={`/licencias/${licencia.id}`}>
                <Button variant="default" size="sm">
                  Ver Detalles
                </Button>
              </Link>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
