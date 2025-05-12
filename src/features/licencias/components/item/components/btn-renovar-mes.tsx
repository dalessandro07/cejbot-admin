'use client'

import { Button } from '@/core/components/ui/button'
import useToastState from '@/core/hooks/useToastState'
import { actionRenovarLicenciaPorMes } from '@/features/licencias/actions'
import { RefreshCwIcon } from 'lucide-react'
import { useActionState } from 'react'

interface BtnRenovarMesProps {
  id: number
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
}

export default function BtnRenovarMes ({
  id,
  variant = 'default',
  size = 'sm',
  className = ''
}: BtnRenovarMesProps) {
  const [state, formAction, isPending] = useActionState(actionRenovarLicenciaPorMes, null)

  useToastState(state)

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <Button
        type="submit"
        disabled={isPending}
        variant={variant}
        size={size}
        className={`flex gap-1 items-center ${className}`}
      >
        <RefreshCwIcon className="h-3.5 w-3.5" />
        <span>Renovar 1 mes</span>
      </Button>
    </form>
  )
}
