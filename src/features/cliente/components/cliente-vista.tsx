import LoaderDefault from '@/core/components/ui/loader-default'
import type { TAnuncio, TLicencia, TPago } from '@/core/db'
import { APP_NAME } from '@/core/lib/constants'
import ListaAnuncios from '@/features/anuncios/components/lista-anuncios'
import BtnLogout from '@/features/auth/components/btn-logout'
import HistorialPagosCliente from '@/features/pagos/components/historial-pagos-cliente'
import { Suspense } from 'react'
import InfoLicencia from './info-licencia'

type ClienteVistaProps = {
  anuncios: TAnuncio[]
  licencia: TLicencia
  pagos: TPago[]
}

export default function ClienteVista ({ anuncios, licencia, pagos }: ClienteVistaProps) {
  return (
    <main className='flex flex-col gap-5 p-5 pt-12 lg:pt-5 grow'>
      <h1 className='text-2xl font-bold'>Portal de Cliente - {APP_NAME}</h1>

      <Suspense fallback={<LoaderDefault />}>
        {/* Sección de anuncios */}
        <ListaAnuncios anuncios={anuncios} isAdmin={false} />

        {/* Sección de información de licencia y pagos */}
        <section className="space-y-6">
          <InfoLicencia licencia={licencia} />
          <HistorialPagosCliente pagos={pagos} />
        </section>
      </Suspense>

      <BtnLogout />
    </main>
  )
}
