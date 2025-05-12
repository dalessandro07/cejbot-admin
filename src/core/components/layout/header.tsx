import BtnLogout from '@/features/auth/components/btn-logout'

export default function Header () {
  return (
    <header className='sticky top-0 z-50 flex items-center justify-between gap-5 px-5 py-2 shadow bg-background'>
      <p className='text-xs font-bold'>Administración - CEJBOT</p>

      <BtnLogout />
    </header>
  )
}
