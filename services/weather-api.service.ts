import type { WeatherData, Location, TomorrowApiResponse } from "../types/weather.types"
import { CircuitBreakerService } from "./circuit-breaker.service"
import { RateLimitService } from "./rate-limit.service"
import { formatTime } from "../utils/weather-codes.util"

export class WeatherApiService {
  private readonly API_KEY = "7TKcc8uv6LNUhPXCwRZuoAkENYMPtlIz"
  private readonly BASE_URL = "https://api.tomorrow.io/v4/weather/realtime"
  private circuitBreaker: CircuitBreakerService
  private rateLimitService: RateLimitService

  constructor() {
    this.circuitBreaker = new CircuitBreakerService({
      failureThreshold: 3,
      recoveryTimeout: 30000, // 30 segundos
    })
    this.rateLimitService = RateLimitService.getInstance()
  }

  async fetchWeatherData(location: Location): Promise<WeatherData> {
    this.validateCoordinates(location)

    const locationKey = `${location.lat},${location.lon}`

    // Verificar rate limit
    if (!this.rateLimitService.canMakeRequest(locationKey)) {
      const remainingTime = this.rateLimitService.getRemainingTime(locationKey)
      throw new Error(`Aguarde ${formatTime(remainingTime)} antes de fazer uma nova consulta para esta localização.`)
    }

    try {
      const result = await this.circuitBreaker.execute(async () => {
        return await this.makeApiRequest(location)
      })

      // Registrar sucesso no rate limit
      this.rateLimitService.recordRequest(locationKey)

      return this.adaptApiResponse(result)
    } catch (error) {
      throw this.handleApiError(error)
    }
  }

  private async makeApiRequest(location: Location): Promise<TomorrowApiResponse> {
    const url = `${this.BASE_URL}?location=${location.lat},${location.lon}&apikey=${this.API_KEY}`

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Muitas requisições. Tente novamente em alguns minutos.")
        }
        if (response.status >= 500) {
          throw new Error("Serviço temporariamente indisponível.")
        }
        throw new Error(`Erro na consulta: ${response.status}`)
      }

      const data = await response.json()

      // Validar estrutura da resposta
      if (!data.data || !data.data.values || !data.location) {
        throw new Error("Dados climáticos indisponíveis")
      }

      return data as TomorrowApiResponse
    } catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new Error("A consulta demorou muito para responder. Tente novamente.")
        }
        throw error
      }

      throw new Error("Erro ao consultar dados climáticos")
    }
  }

  private adaptApiResponse(apiResponse: TomorrowApiResponse): WeatherData {
    const values = apiResponse.data.values

    return {
      data: {
        time: apiResponse.data.time,
        values: {
          temperature: values.temperature ?? 0,
          temperatureApparent: values.temperatureApparent ?? 0,
          humidity: values.humidity ?? 0,
          dewPoint: values.dewPoint ?? 0,
          windSpeed: values.windSpeed ?? 0,
          windGust: values.windGust ?? 0,
          windDirection: values.windDirection ?? 0,
          precipitationProbability: values.precipitationProbability ?? 0,
          rainIntensity: values.rainIntensity ?? 0,
          pressureSeaLevel: values.pressureSeaLevel ?? 1013.25,
          pressureSurfaceLevel: values.pressureSurfaceLevel ?? 1013.25,
          visibility: values.visibility ?? 10,
          uvIndex: values.uvIndex ?? 0,
          uvHealthConcern: values.uvHealthConcern ?? 0,
          cloudCover: values.cloudCover ?? 0,
          cloudBase: values.cloudBase ?? 0,
          cloudCeiling: values.cloudCeiling ?? 0,
          weatherCode: values.weatherCode ?? 1000,
          altimeterSetting: values.altimeterSetting ?? 1013.25,
          freezingRainIntensity: values.freezingRainIntensity ?? 0,
          sleetIntensity: values.sleetIntensity ?? 0,
          snowIntensity: values.snowIntensity ?? 0,
        },
      },
      location: apiResponse.location,
    }
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

  private handleApiError(error: unknown): Error {
    if (error instanceof Error) {
      // Erros de rate limit (manter mensagem específica)
      if (error.message.includes("Aguarde")) {
        return error
      }

      // Simplificar mensagens para o usuário
      if (error.message.includes("temporariamente indisponível")) {
        return new Error("Serviço temporariamente indisponível. Tente novamente em alguns minutos.")
      }

      if (error.message.includes("demorou muito")) {
        return new Error("A consulta demorou muito para responder. Verifique sua conexão.")
      }

      if (error.message.includes("Muitas requisições")) {
        return new Error("Muitas consultas realizadas. Aguarde alguns minutos.")
      }

      // Mensagem genérica para outros erros
      return new Error("Não foi possível obter os dados climáticos. Tente novamente.")
    }

    return new Error("Erro inesperado. Tente novamente.")
  }
}
