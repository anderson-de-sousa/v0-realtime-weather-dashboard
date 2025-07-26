import type { WeatherData, Location } from "../types/weather.types"
import { WeatherApiService } from "../services/weather-api.service"
import { TimerService } from "../services/timer.service"

export class WeatherFacade {
  private weatherApiService: WeatherApiService
  private timerService: TimerService
  private readonly REFRESH_COOLDOWN = 180 // 3 minutos

  constructor() {
    this.weatherApiService = new WeatherApiService()
    this.timerService = TimerService.getInstance()
  }

  async fetchWeatherData(location: Location): Promise<WeatherData> {
    return await this.weatherApiService.fetchWeatherData(location)
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
}
