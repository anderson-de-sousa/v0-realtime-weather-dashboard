// Composition Pattern - Display principal do clima
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { WeatherValues } from "../types/weather.types"
import { getWeatherCodeInfo } from "../utils/weather-codes.util"

interface MainWeatherDisplayProps {
  values: WeatherValues
}

export function MainWeatherDisplay({ values }: MainWeatherDisplayProps) {
  const weatherInfo = getWeatherCodeInfo(values.weatherCode)

  return (
    <Card className="lg:col-span-1 bg-gray-900 border-gray-700">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-white">Condição Atual</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="text-6xl">{weatherInfo.icon}</div>
        <div>
          <div className="text-4xl font-bold text-cyan-400">{values.temperature.toFixed(1)}°C</div>
          <div className="text-sm text-gray-400">Sensação: {values.temperatureApparent.toFixed(1)}°C</div>
        </div>
        <Badge variant="secondary" className={`text-sm bg-gray-800 ${weatherInfo.color}`}>
          {weatherInfo.description}
        </Badge>
      </CardContent>
    </Card>
  )
}
