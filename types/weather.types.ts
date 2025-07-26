import type React from "react"
// Interface Segregation Principle - Interfaces específicas
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
  icon: React.ReactNode
  value: string
  subtitle?: string
  color: string
}

export interface TimerState {
  remainingTime: number
  isActive: boolean
}

// Strategy Pattern - Interface para estratégias de busca
export interface WeatherFetchStrategy {
  fetchWeather(lat: number, lon: number): Promise<WeatherData>
}

// Factory Pattern - Interface para criação de cards
export interface WeatherCardFactory {
  createCard(data: WeatherValues): WeatherCardData[]
}
