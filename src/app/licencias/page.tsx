import LoaderDefault from '@/core/components/ui/loader-default'
import { getAllLicencias } from '@/core/db/queries/select'
import DialogNuevaLicencia from '@/features/licencias/components/forms/dialog-nueva-licencia'
import ListaLicencias from '@/features/licencias/components/lista-licencias'
import { Suspense } from 'react'

export default async function LicenciasPage () {
  const licencias = await getAllLicencias()

  return (
    <main className='flex flex-col gap-5 p-5 pt-12 lg:pt-5 grow'>
      <div className='flex flex-wrap items-center justify-between mb-4'>
        <h1 className='text-2xl font-bold'>Licencias</h1>
        <DialogNuevaLicencia />
      </div>

      <Suspense fallback={<LoaderDefault />}>
        <ListaLicencias licencias={licencias} />
      </Suspense>
    </main>
  )
}
