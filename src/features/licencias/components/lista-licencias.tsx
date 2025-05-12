'use client'

import { Input } from '@/core/components/ui/input'
import type { TLicencia } from '@/core/db'
import ItemLicencia from '@/features/licencias/components/item/item-licencia'
import { useState } from 'react'

export default function ListaLicencias ({
  licencias
}: {
  licencias: TLicencia[]
}) {
  const [searchQuery, setSearchQuery] = useState('')

  // Filtrar licencias por cliente
  const filteredLicencias = licencias.filter((licencia) =>
    licencia.cliente.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className='flex flex-col gap-5'>
      <h2 className='font-bold'>Licencias</h2>

      <div className='mb-4'>
        <Input
          type="text"
          placeholder="Buscar por cliente..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      <div className='flex flex-col gap-2'>
        {filteredLicencias.length > 0 ? (
          filteredLicencias.map((licencia) => (
            <ItemLicencia key={licencia.id} licencia={licencia} />
          ))
        ) : (
          <p className="py-4 text-center text-muted-foreground">No se encontraron licencias</p>
        )}
      </div>
    </div>
  )
}
