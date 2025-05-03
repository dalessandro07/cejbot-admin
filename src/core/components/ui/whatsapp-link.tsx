import { MessageCircleIcon } from 'lucide-react'

interface WhatsappLinkProps {
  whatsappNumber?: string | null
  message?: string
}

const CODIGO_PAIS = '51'

export default function WhatsappLink ({
  whatsappNumber = '986307201',
  message = ''
}: WhatsappLinkProps) {
  const whatsappLink = `https://wa.me/${CODIGO_PAIS}${whatsappNumber}?text=${encodeURIComponent(message)}`

  return (
    <a href={whatsappLink} target='_blank' rel='noopener noreferrer' className='flex items-center gap-2 p-2 text-sm hover:underline'>
      <MessageCircleIcon className='size-4' />
      {whatsappNumber}
      <span className="sr-only">Enviar mensaje por WhatsApp</span>
    </a>
  )
}
