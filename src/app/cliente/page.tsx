import { getAnunciosActivos, getLicenciaByClienteId, getPagosByLicenciaId } from '@/core/db/queries/select'
import { getSession } from '@/features/auth/lib/session'
import AdminVista from '@/features/cliente/components/admin-vista'
import ClienteVista from '@/features/cliente/components/cliente-vista'
import NoLicenciaInfo from '@/features/cliente/components/no-licencia-info'

export default async function ClientePage () {
  // Obtener datos del cliente desde la sesión
  const session = await getSession()
  const clienteId = session.clienteId

  const role = session.role || 'cliente'
  const isAdmin = role === 'admin'

  // Obtener anuncios activos para mostrar
  const anuncios = await getAnunciosActivos()

  // Si no hay cliente y no es admin, mostrar mensaje de no información
  if (!clienteId && !isAdmin) {
    return <NoLicenciaInfo />
  }

  // Si es administrador viendo la página de cliente
  if (isAdmin) {
    return <AdminVista anuncios={anuncios} />
  }

  // Obtener datos de la licencia para clientes
  const licencia = await getLicenciaByClienteId(clienteId!)

  // Obtener historial de pagos
  const pagos = await getPagosByLicenciaId(licencia.id)

  // Vista para cliente normal
  return <ClienteVista anuncios={anuncios} licencia={licencia} pagos={pagos} />
}
