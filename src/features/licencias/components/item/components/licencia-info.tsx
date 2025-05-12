'use client'

import { Button } from '@/core/components/ui/button'
import WhatsappLink from '@/core/components/ui/whatsapp-link'
import type { TLicencia } from '@/core/db'
import { formatDate } from '@/core/lib/utils'
import { ClipboardCheckIcon, ClipboardIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

interface LicenciaInfoProps {
  licencia: TLicencia
  wspMessage: string
}

export default function LicenciaInfo ({ licencia, wspMessage }: LicenciaInfoProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyLicense = () => {
    navigator.clipboard.writeText(licencia.licencia)
    setCopied(true)
  }

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [copied])

  return (
    <div className="space-y-2 text-sm">
      <div className="grid grid-cols-2 pb-3 border-b gap-y-2">
        <span className="text-muted-foreground">Teléfono:</span>
        <div className="flex justify-end">
          <WhatsappLink whatsappNumber={licencia.telefono} message={wspMessage} />
        </div>

        <span className="text-muted-foreground">Licencia:</span>
        <div className="flex items-center gap-2 justify-self-end">
          <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded">{licencia.licencia}</span>
          <Button onClick={handleCopyLicense} variant="ghost" size="icon" className="w-6 h-6">
            {copied ? (
              <ClipboardCheckIcon className="w-4 h-4 text-green-500" />
            ) : (
              <ClipboardIcon className="w-4 h-4" />
            )}
            <span className="sr-only">Copiar licencia</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 pt-1 gap-y-2">
        <span className="text-muted-foreground">Creación:</span>
        <span className="justify-self-end">{formatDate(licencia.creacion!, 'full', 'short')}</span>

        <span className="text-muted-foreground">Expiración:</span>
        <span className="justify-self-end">{formatDate(licencia.expiracion!, 'full', 'short')}</span>

        <span className="text-muted-foreground">Id. Dispositivo:</span>
        <span className="justify-self-end">{licencia.dispositivo ?? 'No se ha utilizado aún.'}</span>
      </div>
    </div>
  )
}
