'use client'

import { Button } from "@/core/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/core/components/ui/dialog"
import { Input } from "@/core/components/ui/input"
import { Label } from "@/core/components/ui/label"
import { Switch } from "@/core/components/ui/switch"
import { crearAnuncio } from '@/features/anuncios/actions'
import { useState } from "react"
import { toast } from "sonner"
import EditorHTML from "../editor/editor-html"

export default function FormNuevoAnuncio () {
  const [open, setOpen] = useState(false)

  async function handleSubmit (formData: FormData) {
    const result = await crearAnuncio(formData)

    if (result.error) {
      toast.error(result.error)
      return
    }

    toast.success("Anuncio publicado correctamente")
    setOpen(false)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Nuevo Anuncio</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Publicar nuevo anuncio</DialogTitle>
            <DialogDescription>
              Crea un anuncio que será visible para todos los clientes
            </DialogDescription>
          </DialogHeader>
          <form action={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="titulo">Título</Label>
                <Input
                  id="titulo"
                  name="titulo"
                  placeholder="Título del anuncio"
                  required
                />
              </div>              <div className="grid gap-2">
                <Label htmlFor="contenido">Contenido</Label>
                <EditorHTML
                  id="contenido"
                  name="contenido"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="importante" name="importante" />
                <Label htmlFor="importante">Marcar como importante</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Publicar Anuncio</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
