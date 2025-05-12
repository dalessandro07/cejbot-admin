'use client'

import { Button } from '@/core/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/core/components/ui/dialog'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import FormNuevaLicencia from './form-nueva-licencia'

export default function DialogNuevaLicencia () {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          <span className='hidden sm:flex'>
            Nueva licencia
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nueva licencia</DialogTitle>
          <DialogDescription>
            Complete el formulario para crear una nueva licencia
          </DialogDescription>
        </DialogHeader>

        <FormNuevaLicencia onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
