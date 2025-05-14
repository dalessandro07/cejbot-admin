'use client'

import { Button } from "@/core/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/core/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/core/components/ui/dialog"
import { Input } from "@/core/components/ui/input"
import { Label } from "@/core/components/ui/label"
import { Switch } from "@/core/components/ui/switch"
import { TAnuncio } from "@/core/db/schema"
import { formatDate } from "@/core/lib/utils"
import DOMPurify from 'dompurify'
import { useState } from "react"
import { toast } from "sonner"
import { cambiarEstadoAnuncio, editarAnuncio, eliminarAnuncio } from "../../actions"
import EditorHTML from "../editor/editor-html"

interface ItemAnuncioProps {
  anuncio: TAnuncio
  isAdmin: boolean
}

export default function ItemAnuncio ({ anuncio, isAdmin }: ItemAnuncioProps) {
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  async function handleDelete () {
    const result = await eliminarAnuncio(anuncio.id)

    if (!result.success) {
      toast.error(result.message)
      return
    }

    toast.success("Anuncio eliminado correctamente")
    setOpenDelete(false)
  }

  async function handleEdit (formData: FormData) {
    const result = await editarAnuncio(formData)

    if (!result.success) {
      toast.error(result.message)
      return
    }

    toast.success("Anuncio actualizado correctamente")
    setOpenEdit(false)
  }

  async function handleToggleEstado () {
    const nuevoEstado = anuncio.activo === 0
    const result = await cambiarEstadoAnuncio(anuncio.id, nuevoEstado)

    if (!result.success) {
      toast.error(result.message)
      return
    }

    toast.success(nuevoEstado ? "Anuncio activado" : "Anuncio desactivado")
  }

  return (
    <Card className={anuncio.importante ? "border-amber-500" : ""}>
      <CardHeader>
        <CardTitle className="flex flex-col gap-2">
          {anuncio.importante === 1 && (
            <span className="text-sm font-bold text-amber-500">¡Importante!</span>
          )}
          <span>{anuncio.titulo}</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Publicado el {formatDate(anuncio.fechaPublicacion, 'short', 'short')}
        </p>
      </CardHeader>      <CardContent>
        <div
          className="anuncio-content"
          style={{ whiteSpace: 'pre-line' }}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(anuncio.contenido) }}
        />
      </CardContent>

      {isAdmin && (
        <CardFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleToggleEstado}
          >
            {anuncio.activo === 1 ? "Desactivar" : "Activar"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpenEdit(true)}
          >
            Editar
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setOpenDelete(true)}
          >
            Eliminar
          </Button>
        </CardFooter>
      )}

      {/* Modal de edición */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar anuncio</DialogTitle>
          </DialogHeader>
          <form action={handleEdit}>
            <input type="hidden" name="id" value={anuncio.id} />
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="titulo">Título</Label>
                <Input
                  id="titulo"
                  name="titulo"
                  defaultValue={anuncio.titulo}
                  required
                />
              </div>              <div className="grid gap-2">
                <Label htmlFor="contenido">Contenido</Label>
                <EditorHTML
                  id="contenido"
                  name="contenido"
                  initialValue={anuncio.contenido}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="importante" name="importante" defaultChecked={anuncio.importante === 1} />
                <Label htmlFor="importante">Marcar como importante</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="activo" name="activo" defaultChecked={anuncio.activo === 1} />
                <Label htmlFor="activo">Activo</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpenEdit(false)}>
                Cancelar
              </Button>
              <Button type="submit">Guardar Cambios</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal de eliminación */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar anuncio</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar este anuncio? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDelete(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
