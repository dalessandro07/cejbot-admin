import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/card'
import LoaderDefault from '@/core/components/ui/loader-default'
import { Separator } from '@/core/components/ui/separator'
import { getAnunciosActivos, getLicenciaByClienteId, getPagosByLicenciaId } from '@/core/db/queries/select'
import { APP_NAME } from '@/core/lib/constants'
import { formatDate, formatDistanceToNow } from '@/core/lib/utils'
import ListaAnuncios from '@/features/anuncios/components/lista-anuncios'
import { getSession } from '@/features/auth/lib/session'
import HistorialPagosCliente from '@/features/pagos/components/historial-pagos-cliente'
import { Suspense } from 'react'

export default async function ClientePage () {
  // Obtener datos del cliente desde la sesión
  const session = await getSession()
  const clienteId = session.clienteId

  const role = session.role || 'cliente'
  const isAdmin = role === 'admin'

  // Obtener anuncios activos para mostrar
  const anuncios = await getAnunciosActivos()

  if (!clienteId && !isAdmin) {
    return (
      <main className='flex flex-col gap-5 p-5 pt-12 lg:pt-5 grow'>
        <h1 className='text-2xl font-bold'>Portal de Cliente - {APP_NAME}</h1>
        <div className="flex flex-col items-center justify-center h-40">
          <p className="text-muted-foreground">No se encontró información de licencia.</p>
        </div>
      </main>
    )
  }

  // Si es administrador viendo la página de cliente, mostrar solo anuncios
  if (isAdmin) {
    return (
      <main className='flex flex-col gap-5 p-5 pt-12 lg:pt-5 grow'>
        <h1 className='text-2xl font-bold'>Portal de Cliente - {APP_NAME}</h1>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Anuncios para Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-muted-foreground">
                Vista previa de los anuncios activos que ven los clientes.
                Para gestionar los anuncios, vaya a la sección
                <a href="/cliente/anuncios" className="ml-1 text-primary hover:underline">Gestión de Anuncios</a>.
              </p>
            </div>
            <ListaAnuncios anuncios={anuncios} isAdmin={true} />
          </CardContent>
        </Card>
      </main>
    )
  }

  // Obtener datos de la licencia para clientes
  const licencia = await getLicenciaByClienteId(clienteId!)

  // Obtener historial de pagos
  const pagos = await getPagosByLicenciaId(licencia.id)

  return (
    <main className='flex flex-col gap-5 p-5 pt-12 lg:pt-5 grow'>
      <h1 className='text-2xl font-bold'>Portal de Cliente - {APP_NAME}</h1>

      <Suspense fallback={<LoaderDefault />}>
        {/* Sección de anuncios */}
        {anuncios.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Anuncios</CardTitle>
            </CardHeader>
            <CardContent>
              <ListaAnuncios anuncios={anuncios} isAdmin={false} />
            </CardContent>
          </Card>
        )}

        {/* Sección de información de licencia */}
        <section className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Mi Licencia</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Cliente</p>
                  <p className="font-medium">{licencia.cliente}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Licencia</p>
                  <p className="font-medium">{licencia.licencia}</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">Plan</p>
                  <p className="font-medium capitalize">{licencia?.plan || 'Básico'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estado</p>
                  <p className={`font-medium ${licencia?.activo === 1 ? 'text-green-600' : 'text-red-600'}`}>
                    {licencia?.activo === 1 ? 'Activo' : 'Inactivo'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expira</p>
                  <p className="font-medium">
                    {formatDate(licencia.expiracion!, 'short', 'short')}
                    {licencia.expiracion && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        ({formatDistanceToNow(new Date(licencia.expiracion))} días)
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <HistorialPagosCliente pagos={pagos} />
        </section>
      </Suspense>
    </main>
  )
}
