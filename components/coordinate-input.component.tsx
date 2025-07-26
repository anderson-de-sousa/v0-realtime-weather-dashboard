"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MapPin, Cloud, RefreshCw, AlertCircle } from "lucide-react"

interface CoordinateInputProps {
  latitude: string
  longitude: string
  onLatitudeChange: (value: string) => void
  onLongitudeChange: (value: string) => void
  onFetchWeather: () => void
  onRefresh: () => void
  loading: boolean
  error: string | null
  canFetch: boolean
  canRefresh: boolean
  refreshTimer: number
  formatTime: (seconds: number) => string
  hasWeatherData: boolean
}

export function CoordinateInput({
  latitude,
  longitude,
  onLatitudeChange,
  onLongitudeChange,
  onFetchWeather,
  onRefresh,
  loading,
  error,
  canFetch,
  canRefresh,
  refreshTimer,
  formatTime,
  hasWeatherData,
}: CoordinateInputProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <MapPin className="h-5 w-5" />
          Localização
        </CardTitle>
        <CardDescription className="text-gray-300">
          Insira as coordenadas da sua cidade para consultar o clima
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="latitude" className="text-gray-200">
              Latitude
            </Label>
            <Input
              id="latitude"
              type="number"
              placeholder="-23.5505"
              value={latitude}
              onChange={(e) => onLatitudeChange(e.target.value)}
              step="any"
              min="-90"
              max="90"
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="longitude" className="text-gray-200">
              Longitude
            </Label>
            <Input
              id="longitude"
              type="number"
              placeholder="-46.6333"
              value={longitude}
              onChange={(e) => onLongitudeChange(e.target.value)}
              step="any"
              min="-180"
              max="180"
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={onFetchWeather}
            disabled={loading || !canFetch}
            className={`flex-1 ${
              !canFetch
                ? "bg-gray-700 text-gray-500 opacity-50 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Consultando...
              </>
            ) : (
              <>
                <Cloud className="mr-2 h-4 w-4" />
                Consultar Clima
              </>
            )}
          </Button>

          {hasWeatherData && (
            <Button
              onClick={onRefresh}
              disabled={loading || !canRefresh}
              variant="outline"
              className={`flex items-center gap-2 ${
                !canRefresh
                  ? "bg-gray-700 border-gray-600 text-gray-500 opacity-50 cursor-not-allowed"
                  : "bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
              }`}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              {refreshTimer > 0 ? formatTime(refreshTimer) : "Atualizar"}
            </Button>
          )}
        </div>

        {error && (
          <Alert variant="destructive" className="bg-red-900 border-red-700">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-200">{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
