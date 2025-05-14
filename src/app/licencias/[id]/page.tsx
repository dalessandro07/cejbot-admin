import { Button } from '@/core/components/ui/button'
import LoaderDefault from '@/core/components/ui/loader-default'
import { Separator } from '@/core/components/ui/separator'
import { getLicenciaById, getPagosByLicenciaId } from '@/core/db/queries/select'
import BtnEliminar from '@/features/licencias/components/item/detail-components/btn-eliminar'
import BtnLimpiarDispositivo from '@/features/licencias/components/item/detail-components/btn-limpiar-dispositivo'
import BtnRenovarMes from '@/features/licencias/components/item/detail-components/btn-renovar-mes'
import DialogRenovarLicencia from '@/features/licencias/components/item/detail-components/dialog-renovar-licencia'
import EstadoLicencia from '@/features/licencias/components/item/detail-components/estado-licencia'
import LicenciaInfoDetail from '@/features/licencias/components/item/detail-components/licencia-info-detail'
import SelectorPlan from '@/features/licencias/components/item/detail-components/selector-plan'
import HistorialPagos from '@/features/pagos/components/historial-pagos'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

interface LicenciaPageProps {
  params: Promise<{ id: string }>
}

export default async function LicenciaPage ({ params }: LicenciaPageProps) {
  const { id } = await params

  if (isNaN(Number(id))) {
    notFound()
  }

  // Obtener licencia por ID
  const licencia = await getLicenciaById(Number(id))

  if (!licencia) {
    notFound()
  }

  // Obtener pagos de la licencia
  const pagos = await getPagosByLicenciaId(Number(id))

  return (
    <main className="flex flex-col gap-5 p-5 pt-12 lg:pt-5 grow">
      <div className="flex flex-col gap-2">
        <Button variant="ghost" size="sm" asChild className="w-max">
          <Link href="/licencias">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Detalles de Licencia</h1>
      </div>

      <Suspense fallback={<LoaderDefault />}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-4 md:col-span-2">
            <LicenciaInfoDetail licencia={licencia} />

            <div className="flex flex-col gap-4 p-4 bg-white border rounded-lg shadow-sm dark:bg-gray-950">
              <h3 className="text-lg font-semibold">Acciones</h3>

              <Separator />

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <span>Estado:</span>
                  <EstadoLicencia licencia={licencia} />
                </div>                <SelectorPlan licencia={licencia} />
                <BtnRenovarMes id={licencia.id} />
                <DialogRenovarLicencia licencia={licencia} />
                <BtnLimpiarDispositivo id={licencia.id} />
                <BtnEliminar id={licencia.id} />
              </div>
            </div>

            <HistorialPagos licencia={licencia} pagos={pagos} />
          </div>
        </div>
      </Suspense>
    </main>
  )
}
