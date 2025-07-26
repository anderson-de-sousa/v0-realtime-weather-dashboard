// Composition Pattern - Composição de componentes
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { WeatherCardData } from "../types/weather.types"

interface WeatherCardProps {
  data: WeatherCardData
  className?: string
}

export function WeatherCard({ data, className = "" }: WeatherCardProps) {
  return (
    <Card className={`bg-gray-900 border-gray-700 hover:border-gray-600 transition-colors ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className={`text-sm flex items-center gap-2 ${data.color}`}>
          {data.icon}
          {data.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className={`text-2xl font-bold ${data.color}`}>{data.value}</div>
          {data.subtitle && <div className="text-xs text-gray-400">{data.subtitle}</div>}
        </div>
      </CardContent>
    </Card>
  )
}
