'use client'

import { Input } from '@/core/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/core/components/ui/tabs'
import type { TLicencia } from '@/core/db'
import ItemLicencia from '@/features/licencias/components/item/item-licencia'
import { useState } from 'react'

export default function ListaLicencias ({
  licencias
}: {
  licencias: TLicencia[]
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [planFilter, setPlanFilter] = useState('todos')

  // Filtrar licencias por cliente y por plan
  const filteredLicencias = licencias.filter((licencia) =>
    licencia.cliente.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (planFilter === 'todos' || licencia.plan === planFilter)
  )
  return (
    <div className='flex flex-col gap-5'>
      <div className='mb-4'>
        <Input
          type="text"
          placeholder="Buscar por cliente..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      <Tabs defaultValue="todos" onValueChange={setPlanFilter}>
        <TabsList className="flex-wrap w-full h-full">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="prueba">Prueba</TabsTrigger>
          <TabsTrigger value="basico">Básico</TabsTrigger>
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="profesional">Profesional</TabsTrigger>
          <TabsTrigger value="max">Max</TabsTrigger>
        </TabsList>

        <TabsContent value={planFilter}>
          <div className='flex flex-col gap-2 mt-4'>
            {filteredLicencias.length > 0 ? (
              filteredLicencias.map((licencia) => (
                <ItemLicencia key={licencia.id} licencia={licencia} />
              ))
            ) : (
              <p className="py-4 text-center text-muted-foreground">No se encontraron licencias</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
