import { APP_NAME } from '@/core/lib/constants'

export default function NoLicenciaInfo () {
  return (
    <main className='flex flex-col gap-5 p-5 pt-12 lg:pt-5 grow'>
      <h1 className='text-2xl font-bold'>Portal de Cliente - {APP_NAME}</h1>
      <div className="flex flex-col items-center justify-center h-40">
        <p className="text-muted-foreground">No se encontró información de licencia.</p>
      </div>
    </main>
  )
}
