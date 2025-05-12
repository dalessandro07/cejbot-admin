'use client'

import { Button } from "@/core/components/ui/button"
import useToastState from "@/core/hooks/useToastState"
import { actionRenovarLicenciaPorMes } from "@/features/licencias/actions"
import { Calendar } from "lucide-react"
import { useActionState } from "react"

interface BtnRenovarMesProps {
  id: number
  variant?: "default" | "outline" | "secondary"
}

export default function BtnRenovarMes ({ id, variant = "default" }: BtnRenovarMesProps) {
  const [state, formAction, isPending] = useActionState(actionRenovarLicenciaPorMes, null)

  useToastState(state)

  const handleClick = () => {
    const formData = new FormData()
    formData.append('id', id.toString())
    formAction(formData)
  }

  return (
    <Button
      variant={variant}
      size="sm"
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? "Procesando..." : (
        <>
          <Calendar className="w-4 h-4 mr-1" />
          Renovar 1 Mes
        </>
      )}
    </Button>
  )
}
