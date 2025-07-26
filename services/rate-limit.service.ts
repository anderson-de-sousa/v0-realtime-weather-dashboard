export class RateLimitService {
  private static instance: RateLimitService
  private lastRequestTime: Map<string, number> = new Map()
  private readonly RATE_LIMIT_DURATION = 3 * 60 * 1000 // 3 minutos

  static getInstance(): RateLimitService {
    if (!RateLimitService.instance) {
      RateLimitService.instance = new RateLimitService()
    }
    return RateLimitService.instance
  }

  canMakeRequest(key: string): boolean {
    const lastRequest = this.lastRequestTime.get(key)
    if (!lastRequest) return true
    return Date.now() - lastRequest >= this.RATE_LIMIT_DURATION
  }

  getRemainingTime(key: string): number {
    const lastRequest = this.lastRequestTime.get(key)
    if (!lastRequest) return 0
    const remainingTime = this.RATE_LIMIT_DURATION - (Date.now() - lastRequest)
    return Math.max(0, Math.ceil(remainingTime / 1000))
  }

  recordRequest(key: string): void {
    this.lastRequestTime.set(key, Date.now())
  }
}
