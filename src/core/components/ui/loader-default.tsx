import { Loader2Icon } from 'lucide-react'

export default function LoaderDefault () {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full text-muted-foreground grow animate-pulse'>
      <Loader2Icon className='w-10 h-10 animate-spin' />
      <span>Cargando...</span>
    </div>
  )
}
