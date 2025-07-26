import type { WeatherCardData, WeatherValues } from "../types/weather.types"
import { getWindDirection, getUVDescription } from "../utils/weather-codes.util"
import { Droplets, Wind, Eye, Gauge, Sun, Snowflake } from "lucide-react"

export interface WeatherCardFactory {
  createCard(data: WeatherValues): WeatherCardData[]
}

export class DetailedWeatherCardFactory implements WeatherCardFactory {
  createCard(data: WeatherValues): WeatherCardData[] {
    return [
      {
        title: "Precipitação",
        icon: <Droplets className="h-5 w-5" />,
        value: `${data.precipitationProbability}%`,
        subtitle: `Chuva: ${data.rainIntensity.toFixed(1)} mm/h`,
        color: "text-blue-400",
      },
      {
        title: "Vento",
        icon: <Wind className="h-5 w-5" />,
        value: `${data.windSpeed.toFixed(1)} m/s`,
        subtitle: `${getWindDirection(data.windDirection)} • Rajadas: ${data.windGust.toFixed(1)} m/s`,
        color: "text-green-400",
      },
      {
        title: "Visibilidade",
        icon: <Eye className="h-5 w-5" />,
        value: `${data.visibility.toFixed(1)} km`,
        color: "text-purple-400",
      },
      {
        title: "Pressão",
        icon: <Gauge className="h-5 w-5" />,
        value: `${data.pressureSeaLevel.toFixed(1)} hPa`,
        subtitle: `Superfície: ${data.pressureSurfaceLevel.toFixed(1)} hPa`,
        color: "text-yellow-400",
      },
      {
        title: "Índice UV",
        icon: <Sun className="h-5 w-5" />,
        value: data.uvIndex.toString(),
        subtitle: getUVDescription(data.uvIndex),
        color: "text-orange-400",
      },
      {
        title: "Neve",
        icon: <Snowflake className="h-5 w-5" />,
        value: `${data.snowIntensity.toFixed(1)} mm/h`,
        subtitle: `Granizo: ${data.sleetIntensity.toFixed(1)} mm/h`,
        color: "text-cyan-400",
      },
    ]
  }
}
