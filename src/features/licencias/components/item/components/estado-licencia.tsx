'use client'

import { Switch } from '@/core/components/ui/switch'
import { Loader2 } from 'lucide-react'
import { startTransition } from 'react'

interface EstadoLicenciaProps {
  id: number
  isActive: boolean
  setIsActive: (active: boolean) => void
  formAction: (formData: FormData) => void
  isPending: boolean
}

export default function EstadoLicencia ({
  id,
  isActive,
  setIsActive,
  formAction,
  isPending
}: EstadoLicenciaProps) {

  const handleCheckedChange = (checked: boolean) => {
    setIsActive(checked)

    const formData = new FormData()
    formData.append('id', id.toString())
    formData.append('estado', checked ? '1' : '0')

    startTransition(() => {
      formAction(formData)
    })
  }

  return (
    <div className="flex items-center gap-2 bg-background/50 px-3 py-1.5 rounded-md">
      <Switch
        name='estado'
        checked={isActive}
        onCheckedChange={handleCheckedChange}
        disabled={isPending}
        className="data-[state=checked]:bg-green-500"
      />
      {isPending ? (
        <div className="flex items-center gap-1 text-muted-foreground">
          <Loader2 className="w-3 h-3 animate-spin" />
          <span className="text-xs">
            {isActive ? 'Activando' : 'Desactivando'}
          </span>
        </div>
      ) : (
        <span className={`text-xs font-medium ${isActive ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
          {isActive ? 'Activo' : 'Inactivo'}
        </span>
      )}
    </div>
  )
}
