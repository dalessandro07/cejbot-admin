'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/core/components/ui/accordion'
import { Badge } from '@/core/components/ui/badge'
import type { TLicencia } from '@/core/db'
import useToastState from '@/core/hooks/useToastState'
import { PLANES_DISPLAY } from '@/core/lib/constants'
import type { TPlan } from '@/core/types'
import { actionUpdateEstadoLicencia, actionUpdatePlanLicencia } from '@/features/licencias/actions'
import BtnEliminar from '@/features/licencias/components/item/btn-eliminar'
import EstadoLicencia from '@/features/licencias/components/item/components/estado-licencia'
import LicenciaInfo from '@/features/licencias/components/item/components/licencia-info'
import SelectorPlan from '@/features/licencias/components/item/components/selector-plan'
import useWhatsappMsg from '@/features/licencias/hooks/useWhatsappMsg'
import { useActionState, useState } from 'react'

export default function ItemLicencia ({
  licencia
}: {
  licencia: TLicencia
}) {
  const [state, formAction, isPending] = useActionState(actionUpdateEstadoLicencia, null)
  const [planState, formPlanAction, isPlanPending] = useActionState(actionUpdatePlanLicencia, null)
  const { wspMessage, isActive, setIsActive } = useWhatsappMsg(licencia)
  const [currentPlan, setCurrentPlan] = useState<TPlan>(licencia.plan as TPlan)

  useToastState(state)
  useToastState(planState)

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
            <LicenciaInfo licencia={licencia} wspMessage={wspMessage} />

            <div className="flex flex-wrap items-center justify-between pt-2 gap-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium">Estado:</span>
                <EstadoLicencia
                  id={licencia.id}
                  isActive={isActive}
                  setIsActive={setIsActive}
                  formAction={formAction}
                  isPending={isPending}
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-medium">Plan:</span>
                <SelectorPlan
                  id={licencia.id}
                  currentPlan={currentPlan}
                  setCurrentPlan={setCurrentPlan}
                  formPlanAction={formPlanAction}
                  isPlanPending={isPlanPending}
                />
                <BtnEliminar id={licencia.id} />
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
