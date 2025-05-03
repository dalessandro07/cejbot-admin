'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/core/components/ui/accordion'
import { Badge } from '@/core/components/ui/badge'
import { Switch } from '@/core/components/ui/switch'
import WhatsappLink from '@/core/components/ui/whatsapp-link'
import type { TLicencia } from '@/core/db'
import useToastState from '@/core/hooks/useToastState'
import { PLANES_DISPLAY } from '@/core/lib/constants'
import { formatDate } from '@/core/lib/utils'
import type { TPlan } from '@/core/types'
import { actionUpdateEstadoLicencia } from '@/features/licencias/actions'
import useWhatsappMsg from '@/features/licencias/hooks/useWhatsappMsg'
import { Loader2 } from 'lucide-react'
import { startTransition, useActionState } from 'react'

export default function ItemLicencia ({
  licencia
}: {
  licencia: TLicencia
}) {
  const [state, formAction, isPending] = useActionState(actionUpdateEstadoLicencia, null)
  const { wspMessage, isActive, setIsActive } = useWhatsappMsg(licencia)

  useToastState(state)

  const handleCheckedChange = (checked: boolean) => {
    setIsActive(checked)

    const formData = new FormData()
    formData.append('id', licencia.id.toString())
    formData.append('estado', checked ? '1' : '0')

    startTransition(() => {
      formAction(formData)
    })
  }

  return (
    <Accordion type="single" collapsible className="w-full mb-4">
      <AccordionItem value={`licencia-${licencia.id}`} className="border rounded-lg shadow-sm">
        <AccordionTrigger className="px-4 py-2 hover:no-underline">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3 text-left">
              <span className="font-medium">{licencia.cliente}</span>
            </div>
            <Badge variant={licencia.plan as TPlan} className="text-sm font-medium">
              {PLANES_DISPLAY[licencia.plan as TPlan]}
            </Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pt-2 pb-4">
          <div className="space-y-4">
            <div className="space-y-1 text-sm">
              <p className="flex justify-between">
                <span className="text-muted-foreground">Teléfono:</span>
                <WhatsappLink whatsappNumber={licencia.telefono} message={wspMessage} />
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Licencia:</span>
                <span>{licencia.licencia}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Creación:</span>
                <span>{formatDate(licencia.creacion!, 'full', 'short')}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Expiración:</span>
                <span>{formatDate(licencia.expiracion!, 'full', 'short')}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Id. Dispositivo:</span>
                <span>{licencia.dispositivo ?? 'No se ha utilizado aún.'}</span>
              </p>
            </div>

            <div className="flex items-center justify-between w-full gap-2 pt-3 border-t">
              <span className="text-sm font-medium">Estado</span>
              <div className="flex items-center gap-2">
                <Switch
                  name='estado'
                  checked={isActive}
                  onCheckedChange={handleCheckedChange}
                  disabled={isPending}
                />
                {isPending ? (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span className="text-sm">
                      {isActive ? 'Activando' : 'Desactivando'}
                    </span>
                  </div>
                ) : (
                  <span className={`text-sm ${isActive ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                    {isActive ? 'Activo' : 'Inactivo'}
                  </span>
                )}
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
