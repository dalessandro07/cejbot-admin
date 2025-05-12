'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/core/components/ui/select'
import { TLicencia } from "@/core/db"
import useToastState from "@/core/hooks/useToastState"
import { PLANES, PLANES_DISPLAY, PLANES_LIST } from "@/core/lib/constants"
import type { TPlan } from "@/core/types"
import { actionUpdatePlanLicencia } from "@/features/licencias/actions"
import { Loader2 } from "lucide-react"
import { useActionState, useState } from "react"

interface SelectorPlanProps {
  licencia: TLicencia
}

export default function SelectorPlan ({ licencia }: SelectorPlanProps) {
  const [currentPlan, setCurrentPlan] = useState<TPlan>(licencia.plan as TPlan || PLANES.BASICO)
  const [state, formAction, isPending] = useActionState(actionUpdatePlanLicencia, null)

  useToastState(state)

  const handlePlanChange = (value: TPlan) => {
    setCurrentPlan(value)

    const formData = new FormData()
    formData.append('id', licencia.id.toString())
    formData.append('plan', value)

    formAction(formData)
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <span className="text-sm">Plan:</span>
        <Select
          defaultValue={currentPlan}
          onValueChange={handlePlanChange}
          disabled={isPending}
        >
          <SelectTrigger className="w-[140px] h-8">
            <SelectValue placeholder="Seleccionar plan" />
          </SelectTrigger>
          <SelectContent>
            {PLANES_LIST.map(plan => (
              <SelectItem key={plan} value={plan}>
                {PLANES_DISPLAY[plan]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {isPending && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
    </div>
  )
}
