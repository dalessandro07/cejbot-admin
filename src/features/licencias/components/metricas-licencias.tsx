'use client'

import { Badge } from '@/core/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/card'
import { PLANES_DISPLAY } from '@/core/lib/constants'

interface MetricasLicenciasProps {
  metricas: {
    total: number
    activas: number
    porPlan: Record<string, number>
  }
}

export default function MetricasLicencias ({ metricas }: MetricasLicenciasProps) {
  const { total, activas, porPlan } = metricas

  const PLAN_ICONS = {
    'prueba': '🧪',
    'basico': '🌱',
    'personal': '👤',
    'profesional': '💼',
    'max': '⭐',
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Licencias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{total}</span>
            {activas < total && (
              <Badge variant="outline" className="ml-1">
                {activas} activas
              </Badge>
            )}
          </div>
          <div className="mt-2">
            <div className="w-full h-2 mt-1 overflow-hidden bg-gray-200 rounded-full">
              <div
                className="h-full bg-primary"
                style={{ width: `${Math.round((activas / total) * 100) || 0}%` }}
              ></div>
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              {Math.round((activas / total) * 100) || 0}% activas
            </p>
          </div>
        </CardContent>
      </Card>

      {Object.entries(PLANES_DISPLAY).map(([plan, nombre]) => (
        <Card key={plan}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              <span className="mr-1">{PLAN_ICONS[plan as keyof typeof PLAN_ICONS]}</span>
              Plan {nombre}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{porPlan[plan] || 0}</div>
            <div className="mt-2">
              <div className="w-full h-2 mt-1 overflow-hidden bg-gray-200 rounded-full">
                <div
                  className={`h-full ${plan === 'basico' ? 'bg-emerald-600' :
                    plan === 'personal' ? 'bg-blue-600' :
                      plan === 'profesional' ? 'bg-amber-600' :
                        plan === 'max' ? 'bg-indigo-600' : 'bg-gray-500'}`}
                  style={{ width: `${Math.round(((porPlan[plan] || 0) / total) * 100) || 0}%` }}
                ></div>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">
                {Math.round(((porPlan[plan] || 0) / total) * 100) || 0}% del total
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
