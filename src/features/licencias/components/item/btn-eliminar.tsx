import { Button } from '@/core/components/ui/button'
import useToastState from '@/core/hooks/useToastState'
import { actionDeleteLicencia } from '@/features/licencias/actions'
import { TrashIcon } from 'lucide-react'
import Form from 'next/form'
import { startTransition, useActionState } from 'react'

export default function BtnEliminar ({ id }: { id: number }) {

  const [state, formAction, isPending] = useActionState(actionDeleteLicencia, null)

  function handleSubmit (formData: FormData) {
    // Confirmación de eliminación
    const confirm = window.confirm('¿Está seguro de que desea eliminar esta licencia?')
    if (!confirm) return

    formData.append('id', id.toString())

    startTransition(() => {
      formAction(formData)
    })
  }

  useToastState(state)

  return (
    <Form action={handleSubmit}>
      <Button type='submit' variant="destructive" disabled={isPending}>
        <TrashIcon className="w-4 h-4" />
        {isPending ? 'Eliminando...' : 'Eliminar'}
      </Button>
    </Form>
  )
}
