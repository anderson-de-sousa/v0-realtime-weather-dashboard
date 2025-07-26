// Facade Pattern - Interface simplificada
import type { WeatherFetchStrategy, WeatherData, Location } from "../types/weather.types"
import { MockWeatherFetchStrategy } from "../strategies/weather-fetch.strategy"
import { TimerService } from "../services/timer.service"

export class WeatherFacade {
  private strategy: WeatherFetchStrategy
  private timerService: TimerService
  private readonly REFRESH_COOLDOWN = 180 // 3 minutos

  constructor(strategy?: WeatherFetchStrategy) {
    this.strategy = strategy || new MockWeatherFetchStrategy()
    this.timerService = TimerService.getInstance()
  }

  async fetchWeatherData(location: Location): Promise<WeatherData> {
    this.validateCoordinates(location)
    return await this.strategy.fetchWeather(location.lat, location.lon)
  }

  startRefreshTimer(onTick: (remainingTime: number) => void, onComplete?: () => void): void {
    this.timerService.startTimer(
      "weather-refresh",
      this.REFRESH_COOLDOWN,
      (state) => onTick(state.remainingTime),
      onComplete,
    )
  }

  stopRefreshTimer(): void {
    this.timerService.stopTimer("weather-refresh")
  }

  formatTime(seconds: number): string {
    return this.timerService.formatTime(seconds)
  }

  private validateCoordinates(location: Location): void {
    const { lat, lon } = location

    if (isNaN(lat) || isNaN(lon)) {
      throw new Error("Coordenadas devem ser números válidos")
    }

    if (lat < -90 || lat > 90) {
      throw new Error("Latitude deve estar entre -90 e 90")
    }

    if (lon < -180 || lon > 180) {
      throw new Error("Longitude deve estar entre -180 e 180")
    }
  }
}
