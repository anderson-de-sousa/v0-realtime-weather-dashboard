"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Map } from "lucide-react"

interface WeatherMapProps {
  latitude: number
  longitude: number
}

export function WeatherMap({ latitude, longitude }: WeatherMapProps) {
  // Construct Google Maps embed URL with the provided coordinates
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d142690.9707632832!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1spt-BR!2sbr!4v1764106500479!5m2!1spt-BR!2sbr`

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Map className="h-5 w-5 text-green-400" />
          Mapa da Localização
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative w-full aspect-video overflow-hidden rounded-b-lg">
          <iframe
            src={mapUrl}
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Mapa mostrando localização: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`}
          />
        </div>
      </CardContent>
    </Card>
  )
}
