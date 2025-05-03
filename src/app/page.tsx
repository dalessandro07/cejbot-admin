import LoaderDefault from '@/core/components/ui/loader-default'
import { getAllLicencias } from '@/core/db/queries/select'
import FormNuevaLicencia from '@/features/licencias/components/forms/form-nueva-licencia'
import ListaLicencias from '@/features/licencias/components/lista-licencias'
import { Suspense } from 'react'

export default async function Home () {
  const licencias = await getAllLicencias()

  return (
    <main className='flex flex-col gap-5 p-5 grow'>
      <div className='flex flex-col gap-5'>
        <h2 className='font-bold'>Nueva licencia</h2>

        <FormNuevaLicencia />
      </div>

      <Suspense fallback={<LoaderDefault />}>
        <ListaLicencias licencias={licencias} />
      </Suspense>
    </main>
  )
}
