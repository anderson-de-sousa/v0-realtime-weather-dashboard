"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { WeatherData } from "@/types/weather.types"
import { getWeatherCondition, getWindDirection, getUVLevel } from "@/utils/weather-codes.util"

interface WeatherDisplayProps {
  weatherData: WeatherData
}

export function WeatherDisplay({ weatherData }: WeatherDisplayProps) {
  const condition = getWeatherCondition(weatherData.values.weatherCode)
  const windDirection = getWindDirection(weatherData.values.windDirection)
  const uvLevel = getUVLevel(weatherData.values.uvIndex)

  const formatTime = (isoString: string): string => {
    return new Date(isoString).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatCoordinate = (value: number, type: "lat" | "lon"): string => {
    const direction = type === "lat" ? (value >= 0 ? "N" : "S") : value >= 0 ? "L" : "O"
    return `${Math.abs(value).toFixed(4)}°${direction}`
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Condição Principal */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="text-6xl">{condition.icon}</div>
            <div>
              <h2 className="text-3xl font-bold text-white">{weatherData.values.temperature.toFixed(1)}°C</h2>
              <p className={`text-lg ${condition.color}`}>{condition.description}</p>
              <p className="text-gray-400 text-sm">
                Sensação térmica: {weatherData.values.temperatureApparent.toFixed(1)}°C
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400 flex items-center gap-2">💧 Umidade</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-400">{weatherData.values.humidity}%</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400 flex items-center gap-2">💨 Vento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-400">{weatherData.values.windSpeed.toFixed(1)} m/s</p>
            <p className="text-sm text-gray-400">
              {windDirection} • Rajadas: {weatherData.values.windGust.toFixed(1)} m/s
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400 flex items-center gap-2">🌧️ Precipitação</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-400">{weatherData.values.precipitationProbability}%</p>
            <p className="text-sm text-gray-400">Chuva: {weatherData.values.rainIntensity.toFixed(1)} mm/h</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400 flex items-center gap-2">☀️ Índice UV</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${uvLevel.color}`}>{weatherData.values.uvIndex}</p>
            <p className={`text-sm ${uvLevel.color}`}>{uvLevel.level}</p>
          </CardContent>
        </Card>
      </div>

      {/* Dados Detalhados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">🌡️ Dados Atmosféricos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Pressão (nível do mar):</span>
              <span className="text-cyan-400 font-mono">{weatherData.values.pressureSeaLevel.toFixed(1)} hPa</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Pressão (superfície):</span>
              <span className="text-cyan-400 font-mono">{weatherData.values.pressureSurfaceLevel.toFixed(1)} hPa</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Ponto de orvalho:</span>
              <span className="text-cyan-400 font-mono">{weatherData.values.dewPoint.toFixed(1)}°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Visibilidade:</span>
              <span className="text-cyan-400 font-mono">{weatherData.values.visibility.toFixed(1)} km</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">☁️ Dados de Nuvens</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Cobertura de nuvens:</span>
              <span className="text-yellow-400 font-mono">{weatherData.values.cloudCover}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Base das nuvens:</span>
              <span className="text-yellow-400 font-mono">{weatherData.values.cloudBase.toFixed(1)} km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Teto das nuvens:</span>
              <span className="text-yellow-400 font-mono">{weatherData.values.cloudCeiling.toFixed(1)} km</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informações da Consulta */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="pt-4">
          <div className="text-center space-y-2">
            <p className="text-gray-400 text-sm">
              📍 Localização: {formatCoordinate(weatherData.location.lat, "lat")},{" "}
              {formatCoordinate(weatherData.location.lon, "lon")}
            </p>
            <p className="text-gray-400 text-sm">🕒 Última atualização: {formatTime(weatherData.time)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
