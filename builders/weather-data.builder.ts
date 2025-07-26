// Builder Pattern - Construção de dados climáticos
import type { WeatherData, WeatherValues } from "../types/weather.types"

export class WeatherDataBuilder {
  private weatherData: Partial<WeatherData> = {}

  setLocation(lat: number, lon: number): WeatherDataBuilder {
    this.weatherData.location = { lat, lon }
    return this
  }

  setTime(time: string): WeatherDataBuilder {
    if (!this.weatherData.data) {
      this.weatherData.data = { time: "", values: {} as WeatherValues }
    }
    this.weatherData.data.time = time
    return this
  }

  setValues(values: WeatherValues): WeatherDataBuilder {
    if (!this.weatherData.data) {
      this.weatherData.data = { time: "", values: {} as WeatherValues }
    }
    this.weatherData.data.values = values
    return this
  }

  build(): WeatherData {
    if (!this.weatherData.location || !this.weatherData.data) {
      throw new Error("Weather data is incomplete")
    }
    return this.weatherData as WeatherData
  }

  reset(): WeatherDataBuilder {
    this.weatherData = {}
    return this
  }
}
