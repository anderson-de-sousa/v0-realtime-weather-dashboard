// Factory Method Pattern - Criação de cards
import type { WeatherCardFactory, WeatherCardData, WeatherValues } from "../types/weather.types"
import { getWeatherCodeInfo, getWindDirection } from "../utils/weather-codes.util"
import { Thermometer, Droplets, Wind, Eye, Gauge, Sun } from "lucide-react"

export class MainWeatherCardFactory implements WeatherCardFactory {
  createCard(data: WeatherValues): WeatherCardData[] {
    const weatherInfo = getWeatherCodeInfo(data.weatherCode)

    return [
      {
        title: "Temperatura",
        icon: <Thermometer className="h-6 w-6 text-red-400" />,
        value: `${data.temperature.toFixed(1)}°C`,
        subtitle: `Sensação: ${data.temperatureApparent.toFixed(1)}°C`,
        color: "text-red-400",
      },
    ]
  }
}

export class DetailedWeatherCardFactory implements WeatherCardFactory {
  createCard(data: WeatherValues): WeatherCardData[] {
    return [
      {
        title: "Umidade",
        icon: <Droplets className="h-5 w-5 text-blue-400" />,
        value: `${data.humidity}%`,
        subtitle: `Orvalho: ${data.dewPoint.toFixed(1)}°C`,
        color: "text-blue-400",
      },
      {
        title: "Vento",
        icon: <Wind className="h-5 w-5 text-green-400" />,
        value: `${data.windSpeed.toFixed(1)} m/s`,
        subtitle: `${getWindDirection(data.windDirection)} (${data.windDirection}°)`,
        color: "text-green-400",
      },
      {
        title: "Visibilidade",
        icon: <Eye className="h-5 w-5 text-purple-400" />,
        value: `${data.visibility.toFixed(1)} km`,
        color: "text-purple-400",
      },
      {
        title: "Pressão",
        icon: <Gauge className="h-5 w-5 text-yellow-400" />,
        value: `${data.pressureSeaLevel.toFixed(1)} hPa`,
        subtitle: `Superfície: ${data.pressureSurfaceLevel.toFixed(1)} hPa`,
        color: "text-yellow-400",
      },
      {
        title: "Índice UV",
        icon: <Sun className="h-5 w-5 text-orange-400" />,
        value: data.uvIndex.toString(),
        subtitle: this.getUVDescription(data.uvIndex),
        color: "text-orange-400",
      },
      {
        title: "Precipitação",
        icon: <Droplets className="h-5 w-5 text-cyan-400" />,
        value: `${data.precipitationProbability}%`,
        subtitle: `${data.rainIntensity.toFixed(1)} mm/h`,
        color: "text-cyan-400",
      },
    ]
  }

  private getUVDescription(uvIndex: number): string {
    if (uvIndex <= 2) return "Baixo"
    if (uvIndex <= 5) return "Moderado"
    if (uvIndex <= 7) return "Alto"
    if (uvIndex <= 10) return "Muito Alto"
    return "Extremo"
  }
}
