export interface WeatherCodeInfo {
  description: string
  icon: string
  color: string
}

export const WEATHER_CODES: Record<number, WeatherCodeInfo> = {
  1000: { description: "Céu Limpo", icon: "☀️", color: "text-yellow-400" },
  1100: { description: "Principalmente Limpo", icon: "🌤️", color: "text-yellow-300" },
  1101: { description: "Parcialmente Nublado", icon: "⛅", color: "text-blue-300" },
  1102: { description: "Principalmente Nublado", icon: "☁️", color: "text-gray-300" },
  1001: { description: "Nublado", icon: "☁️", color: "text-gray-400" },
  2000: { description: "Neblina", icon: "🌫️", color: "text-gray-300" },
  4000: { description: "Chuvisco", icon: "🌦️", color: "text-blue-400" },
  4001: { description: "Chuva", icon: "🌧️", color: "text-blue-500" },
  4200: { description: "Chuva Leve", icon: "🌦️", color: "text-blue-300" },
  4201: { description: "Chuva Pesada", icon: "⛈️", color: "text-purple-400" },
}

export const getWeatherCodeInfo = (code: number): WeatherCodeInfo => {
  return WEATHER_CODES[code] || { description: "Desconhecido", icon: "❓", color: "text-gray-400" }
}

export const getWindDirection = (degrees: number): string => {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ]
  return directions[Math.round(degrees / 22.5) % 16]
}
