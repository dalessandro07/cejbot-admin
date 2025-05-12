'use client'

import { Switch } from '@/core/components/ui/switch'
import { TLicencia } from '@/core/db'
import useToastState from '@/core/hooks/useToastState'
import { actionUpdateEstadoLicencia } from '@/features/licencias/actions'
import { Loader2 } from 'lucide-react'
import { startTransition, useActionState, useState } from 'react'

interface EstadoLicenciaProps {
  licencia: TLicencia
}

export default function EstadoLicencia ({ licencia }: EstadoLicenciaProps) {
  const [isActive, setIsActive] = useState(licencia.activo === 1)
  const [state, formAction, isPending] = useActionState(actionUpdateEstadoLicencia, null)

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
    <div className="flex items-center gap-2">
      <Switch
        id={`licencia-estado-${licencia.id}`}
        checked={isActive}
        onCheckedChange={handleCheckedChange}
        disabled={isPending}
      />
      <label
        htmlFor={`licencia-estado-${licencia.id}`}
        className="text-sm select-none"
      >
        {isActive ? 'Activa' : 'Inactiva'}
      </label>
      {isPending && <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />}
    </div>
  )
}
