import { TAnuncio } from "@/core/db/schema"
import ItemAnuncio from "./item/item-anuncio"

interface ListaAnunciosProps {
  anuncios: TAnuncio[]
  isAdmin?: boolean
}

export default function ListaAnuncios ({ anuncios, isAdmin = false }: ListaAnunciosProps) {
  if (anuncios.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No hay anuncios disponibles</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {anuncios.map(anuncio => (
        <ItemAnuncio key={anuncio.id} anuncio={anuncio} isAdmin={isAdmin} />
      ))}
    </div>
  )
}
