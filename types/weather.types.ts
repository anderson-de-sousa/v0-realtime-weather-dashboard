export interface WeatherValues {
  altimeterSetting: number
  cloudBase: number
  cloudCeiling: number
  cloudCover: number
  dewPoint: number
  freezingRainIntensity: number
  humidity: number
  precipitationProbability: number
  pressureSeaLevel: number
  pressureSurfaceLevel: number
  rainIntensity: number
  sleetIntensity: number
  snowIntensity: number
  temperature: number
  temperatureApparent: number
  uvHealthConcern: number
  uvIndex: number
  visibility: number
  weatherCode: number
  windDirection: number
  windGust: number
  windSpeed: number
}

export interface Location {
  lat: number
  lon: number
}

export interface WeatherData {
  data: {
    time: string
    values: WeatherValues
  }
  location: Location
}

export interface WeatherCardData {
  title: string
  icon: string
  value: string
  subtitle?: string
  color: string
}

export interface TimerState {
  remainingTime: number
  isActive: boolean
}

// Tipos específicos da API Tomorrow.io
export interface TomorrowApiResponse {
  data: {
    time: string
    values: {
      cloudBase?: number
      cloudCeiling?: number
      cloudCover?: number
      dewPoint?: number
      humidity?: number
      precipitationProbability?: number
      pressureSeaLevel?: number
      rainIntensity?: number
      temperature?: number
      temperatureApparent?: number
      uvHealthConcern?: number
      uvIndex?: number
      visibility?: number
      weatherCode?: number
      windDirection?: number
      windGust?: number
      windSpeed?: number
      altimeterSetting?: number
      freezingRainIntensity?: number
      pressureSurfaceLevel?: number
      sleetIntensity?: number
      snowIntensity?: number
    }
  }
  location: {
    lat: number
    lon: number
  }
}

export enum CircuitBreakerState {
  CLOSED = "CLOSED",
  OPEN = "OPEN",
  HALF_OPEN = "HALF_OPEN",
}
