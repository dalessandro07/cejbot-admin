'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/core/components/ui/select'
import { PLANES, PLANES_DISPLAY } from '@/core/lib/constants'
import { TPlan } from '@/core/types'
import { Loader2 } from 'lucide-react'
import { startTransition } from 'react'

interface SelectorPlanProps {
  id: number
  currentPlan: TPlan
  setCurrentPlan: (plan: TPlan) => void
  formPlanAction: (formData: FormData) => void
  isPlanPending: boolean
}

export default function SelectorPlan ({
  id,
  currentPlan,
  setCurrentPlan,
  formPlanAction,
  isPlanPending
}: SelectorPlanProps) {

  const handlePlanChange = (value: TPlan) => {
    setCurrentPlan(value)

    const formData = new FormData()
    formData.append('id', id.toString())
    formData.append('plan', value)

    startTransition(() => {
      formPlanAction(formData)
    })
  }

  return (
    <div className="flex items-center gap-2 bg-background/50 px-3 py-1.5 rounded-md">
      <Select value={currentPlan} onValueChange={handlePlanChange} disabled={isPlanPending}>
        <SelectTrigger>
          <SelectValue placeholder="Plan">
            {isPlanPending ? (
              <div className="flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span className="text-xs">Cambiando...</span>
              </div>
            ) : (
              PLANES_DISPLAY[currentPlan]
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={PLANES.BASICO} className="text-xs">Básico</SelectItem>
          <SelectItem value={PLANES.PERSONAL} className="text-xs">Personal</SelectItem>
          <SelectItem value={PLANES.PROFESIONAL} className="text-xs">Profesional</SelectItem>
          <SelectItem value={PLANES.MAX} className="text-xs">Max</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
