import { Card, CardDescription, CardHeader, CardTitle } from "@/core/components/ui/card"
import LoginForm from '@/features/auth/components/login-form'

export default function PaginaLogin () {
  return (
    <div className="flex items-center justify-center grow">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl">
            Bienvenido a CEJBOT
          </CardTitle>
          <CardDescription>
            Ingresa tus credenciales para acceder al panel de administración de CEJBOT.
          </CardDescription>
        </CardHeader>

        <LoginForm />
      </Card>
    </div>
  )
}
