import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/card'
import type { TAnuncio } from '@/core/db'
import { APP_NAME } from '@/core/lib/constants'
import ListaAnuncios from '@/features/anuncios/components/lista-anuncios'

type AdminVistaProps = {
  anuncios: TAnuncio[]
}

export default function AdminVista ({ anuncios }: AdminVistaProps) {
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
