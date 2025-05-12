import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/core/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/core/components/ui/tabs"
import { getAllAnuncios } from "@/core/db/queries/select"
import FormNuevoAnuncio from "@/features/anuncios/components/forms/form-nuevo-anuncio"
import ListaAnuncios from "@/features/anuncios/components/lista-anuncios"
import { Suspense } from "react"

export default async function AnunciosPage () {
  const anuncios = await getAllAnuncios()
  const anunciosActivos = anuncios.filter(a => a.activo === 1)
  const anunciosInactivos = anuncios.filter(a => a.activo === 0)

  return (
    <main className='flex flex-col gap-5 p-5 pt-12 lg:pt-5 grow'>
      <div className="flex items-center justify-between">
        <h1 className='text-2xl font-bold'>Gestión de Anuncios</h1>
        <FormNuevoAnuncio />
      </div>

      <Suspense fallback={<div>Cargando anuncios...</div>}>
        <Card>
          <CardHeader>
            <CardTitle>Anuncios</CardTitle>
            <CardDescription>
              Administra los anuncios que serán visibles para los clientes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="activos">
              <TabsList className="w-full">
                <TabsTrigger value="activos">
                  Activos ({anunciosActivos.length})
                </TabsTrigger>
                <TabsTrigger value="inactivos">
                  Inactivos ({anunciosInactivos.length})
                </TabsTrigger>
                <TabsTrigger value="todos">
                  Todos ({anuncios.length})
                </TabsTrigger>
              </TabsList>

              <div className="mt-4">
                <TabsContent value="activos">
                  <ListaAnuncios anuncios={anunciosActivos} isAdmin={true} />
                </TabsContent>

                <TabsContent value="inactivos">
                  <ListaAnuncios anuncios={anunciosInactivos} isAdmin={true} />
                </TabsContent>

                <TabsContent value="todos">
                  <ListaAnuncios anuncios={anuncios} isAdmin={true} />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </Suspense>
    </main>
  )
}
