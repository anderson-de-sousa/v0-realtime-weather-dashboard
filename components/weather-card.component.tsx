import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { WeatherCardData } from "../types/weather.types"

interface WeatherCardProps {
  data: WeatherCardData
}

export function WeatherCard({ data }: WeatherCardProps) {
  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className={`text-sm flex items-center gap-2 ${data.color}`}>
          <span className="text-lg">{data.icon}</span>
          {data.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${data.color}`}>{data.value}</div>
        {data.subtitle && <div className="text-xs text-gray-400 mt-1">{data.subtitle}</div>}
      </CardContent>
    </Card>
  )
}
