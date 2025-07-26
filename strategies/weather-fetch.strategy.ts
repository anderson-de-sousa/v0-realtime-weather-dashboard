// Strategy Pattern - Diferentes estratégias de busca
import type { WeatherFetchStrategy, WeatherData, WeatherValues } from "../types/weather.types"
import { WeatherDataBuilder } from "../builders/weather-data.builder"

export class MockWeatherFetchStrategy implements WeatherFetchStrategy {
  async fetchWeather(lat: number, lon: number): Promise<WeatherData> {
    // Simula delay da API
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const values: WeatherValues = {
      altimeterSetting: 1014.13 + (Math.random() - 0.5) * 10,
      cloudBase: 1.4 + (Math.random() - 0.5) * 2,
      cloudCeiling: 1.7 + (Math.random() - 0.5) * 2,
      cloudCover: Math.floor(Math.random() * 100),
      dewPoint: 9.1 + (Math.random() - 0.5) * 10,
      freezingRainIntensity: 0,
      humidity: Math.floor(Math.random() * 100),
      precipitationProbability: Math.floor(Math.random() * 100),
      pressureSeaLevel: 1014.36 + (Math.random() - 0.5) * 20,
      pressureSurfaceLevel: 1011.45 + (Math.random() - 0.5) * 20,
      rainIntensity: Math.random() * 5,
      sleetIntensity: 0,
      snowIntensity: 0,
      temperature: 16.2 + (Math.random() - 0.5) * 20,
      temperatureApparent: 16.2 + (Math.random() - 0.5) * 20,
      uvHealthConcern: Math.floor(Math.random() * 5),
      uvIndex: Math.floor(Math.random() * 11),
      visibility: 16 + (Math.random() - 0.5) * 10,
      weatherCode: [1000, 1100, 1101, 1102, 1001, 4000, 4001][Math.floor(Math.random() * 7)],
      windDirection: Math.floor(Math.random() * 360),
      windGust: Math.random() * 10,
      windSpeed: Math.random() * 15,
    }

    return new WeatherDataBuilder().setLocation(lat, lon).setTime(new Date().toISOString()).setValues(values).build()
  }
}

export class RealWeatherFetchStrategy implements WeatherFetchStrategy {
  constructor(private apiKey: string) {}

  async fetchWeather(lat: number, lon: number): Promise<WeatherData> {
    // Implementação real da API seria aqui
    throw new Error("Real API not implemented yet")
  }
}
