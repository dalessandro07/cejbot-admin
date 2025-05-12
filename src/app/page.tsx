import LoaderDefault from '@/core/components/ui/loader-default'
import { getLicenciasProximasAVencer, getMetricasLicencias } from '@/core/db/queries/select'
import { APP_NAME } from '@/core/lib/constants'
import LicenciasProximasVencer from '@/features/licencias/components/licencias-proximas-vencer'
import MetricasLicencias from '@/features/licencias/components/metricas-licencias'
import { Suspense } from 'react'

export default async function Home () {
  const metricas = await getMetricasLicencias()
  const licenciasProximasVencer = await getLicenciasProximasAVencer(7)

  return (
    <main className='flex flex-col gap-5 p-5 pt-12 lg:pt-5 grow'>
      <h1 className='text-2xl font-bold'>{APP_NAME}</h1>

      <Suspense fallback={<LoaderDefault />}>
        <section className="space-y-6">
          <MetricasLicencias metricas={metricas} />

          <LicenciasProximasVencer licencias={licenciasProximasVencer} />
        </section>
      </Suspense>
    </main>
  )
}
