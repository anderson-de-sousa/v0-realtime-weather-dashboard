import type { WeatherCardData, WeatherValues } from "../types/weather.types"
import { getWindDirection, getUVDescription } from "../utils/weather-codes.util"

export interface WeatherCardFactory {
  createCard(data: WeatherValues): WeatherCardData[]
}

export class DetailedWeatherCardFactory implements WeatherCardFactory {
  createCard(data: WeatherValues): WeatherCardData[] {
    return [
      {
        title: "Precipitação",
        icon: "💧",
        value: `${data.precipitationProbability}%`,
        subtitle: `Chuva: ${data.rainIntensity.toFixed(1)} mm/h`,
        color: "text-blue-400",
      },
      {
        title: "Vento",
        icon: "💨",
        value: `${data.windSpeed.toFixed(1)} m/s`,
        subtitle: `${getWindDirection(data.windDirection)} • Rajadas: ${data.windGust.toFixed(1)} m/s`,
        color: "text-green-400",
      },
      {
        title: "Visibilidade",
        icon: "👁️",
        value: `${data.visibility.toFixed(1)} km`,
        color: "text-purple-400",
      },
      {
        title: "Pressão",
        icon: "📊",
        value: `${data.pressureSeaLevel.toFixed(1)} hPa`,
        subtitle: `Superfície: ${data.pressureSurfaceLevel.toFixed(1)} hPa`,
        color: "text-yellow-400",
      },
      {
        title: "Índice UV",
        icon: "☀️",
        value: data.uvIndex.toString(),
        subtitle: getUVDescription(data.uvIndex),
        color: "text-orange-400",
      },
      {
        title: "Neve",
        icon: "❄️",
        value: `${data.snowIntensity.toFixed(1)} mm/h`,
        subtitle: `Granizo: ${data.sleetIntensity.toFixed(1)} mm/h`,
        color: "text-cyan-400",
      },
    ]
  }
}
