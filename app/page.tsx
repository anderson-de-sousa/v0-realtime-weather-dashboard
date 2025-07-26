"use client"

import { useState, useCallback } from "react"
import type { WeatherData, Location } from "../types/weather.types"
import { WeatherFacade } from "../facades/weather.facade"
import { DetailedWeatherCardFactory } from "../factories/weather-card.factory"
import { CoordinateInput } from "../components/coordinate-input.component"
import { MainWeatherDisplay } from "../components/main-weather-display.component"
import { WeatherCard } from "../components/weather-card.component"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MapPin, Clock } from "lucide-react"

export default function WeatherDashboard() {
  // State Management
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [refreshTimer, setRefreshTimer] = useState(0)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  // Dependency Injection
  const weatherFacade = new WeatherFacade()
  const cardFactory = new DetailedWeatherCardFactory()

  // Business Logic
  const handleFetchWeather = useCallback(async () => {
    if (!latitude || !longitude) {
      setError("Por favor, insira latitude e longitude válidas")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const location: Location = {
        lat: Number.parseFloat(latitude),
        lon: Number.parseFloat(longitude),
      }

      const data = await weatherFacade.fetchWeatherData(location)
      setWeatherData(data)
      setLastUpdate(new Date())

      // Start refresh timer
      weatherFacade.startRefreshTimer(
        (remainingTime) => setRefreshTimer(remainingTime),
        () => setRefreshTimer(0),
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao buscar dados do clima")
    } finally {
      setLoading(false)
    }
  }, [latitude, longitude, weatherFacade])

  const handleRefresh = useCallback(async () => {
    if (refreshTimer > 0 || !weatherData) return

    setLoading(true)
    try {
      const data = await weatherFacade.fetchWeatherData(weatherData.location)
      setWeatherData(data)
      setLastUpdate(new Date())

      weatherFacade.startRefreshTimer(
        (remainingTime) => setRefreshTimer(remainingTime),
        () => setRefreshTimer(0),
      )
    } catch (err) {
      setError("Erro ao atualizar dados do clima")
    } finally {
      setLoading(false)
    }
  }, [refreshTimer, weatherData, weatherFacade])

  // Computed Properties
  const canFetch = refreshTimer === 0
  const canRefresh = refreshTimer === 0 && !loading
  const weatherCards = weatherData ? cardFactory.createCard(weatherData.data.values) : []

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-white">Dashboard Climático</h1>
          <p className="text-gray-300">Monitore as condições climáticas em tempo real</p>
        </div>

        {/* Coordinate Input */}
        <CoordinateInput
          latitude={latitude}
          longitude={longitude}
          onLatitudeChange={setLatitude}
          onLongitudeChange={setLongitude}
          onFetchWeather={handleFetchWeather}
          onRefresh={handleRefresh}
          loading={loading}
          error={error}
          canFetch={canFetch}
          canRefresh={canRefresh}
          refreshTimer={refreshTimer}
          formatTime={weatherFacade.formatTime.bind(weatherFacade)}
          hasWeatherData={!!weatherData}
        />

        {/* Weather Data Display */}
        {weatherData && (
          <div className="space-y-6">
            {/* Status Bar */}
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-gray-300">
                      {weatherData.location.lat.toFixed(4)}, {weatherData.location.lon.toFixed(4)}
                    </span>
                  </div>
                  {lastUpdate && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-400" />
                      <span className="text-sm text-gray-300">
                        Última atualização: {lastUpdate.toLocaleTimeString()}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Main Weather Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <MainWeatherDisplay values={weatherData.data.values} />

              {/* Temperature & Humidity */}
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Temperatura</span>
                    <span className="font-semibold text-red-400">
                      {weatherData.data.values.temperature.toFixed(1)}°C
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Sensação Térmica</span>
                    <span className="font-semibold text-red-300">
                      {weatherData.data.values.temperatureApparent.toFixed(1)}°C
                    </span>
                  </div>
                  <Separator className="bg-gray-700" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Umidade</span>
                    <span className="font-semibold text-blue-400">{weatherData.data.values.humidity}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Ponto de Orvalho</span>
                    <span className="font-semibold text-blue-300">{weatherData.data.values.dewPoint.toFixed(1)}°C</span>
                  </div>
                </CardContent>
              </Card>

              {/* Wind Info */}
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Velocidade</span>
                    <span className="font-semibold text-green-400">
                      {weatherData.data.values.windSpeed.toFixed(1)} m/s
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Rajadas</span>
                    <span className="font-semibold text-green-300">
                      {weatherData.data.values.windGust.toFixed(1)} m/s
                    </span>
                  </div>
                  <Separator className="bg-gray-700" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Direção</span>
                    <span className="font-semibold text-green-200">{weatherData.data.values.windDirection}°</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Weather Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {weatherCards.map((cardData, index) => (
                <WeatherCard key={index} data={cardData} />
              ))}
            </div>

            {/* Cloud Coverage */}
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{weatherData.data.values.cloudCover}%</div>
                    <div className="text-sm text-gray-400">Cobertura</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-300">
                      {weatherData.data.values.cloudBase.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-400">Base (km)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-200">
                      {weatherData.data.values.cloudCeiling.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-400">Teto (km)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
