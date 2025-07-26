// Single Responsibility Principle - Serviço específico para timer
import type { TimerState } from "../types/weather.types"

export class TimerService {
  private static instance: TimerService
  private timers: Map<string, NodeJS.Timeout> = new Map()
  private callbacks: Map<string, (state: TimerState) => void> = new Map()

  static getInstance(): TimerService {
    if (!TimerService.instance) {
      TimerService.instance = new TimerService()
    }
    return TimerService.instance
  }

  startTimer(id: string, duration: number, onTick: (state: TimerState) => void, onComplete?: () => void): void {
    this.stopTimer(id)

    let remainingTime = duration
    this.callbacks.set(id, onTick)

    const interval = setInterval(() => {
      remainingTime--
      onTick({ remainingTime, isActive: remainingTime > 0 })

      if (remainingTime <= 0) {
        this.stopTimer(id)
        onComplete?.()
      }
    }, 1000)

    this.timers.set(id, interval)
    onTick({ remainingTime, isActive: true })
  }

  stopTimer(id: string): void {
    const timer = this.timers.get(id)
    if (timer) {
      clearInterval(timer)
      this.timers.delete(id)
      this.callbacks.delete(id)
    }
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }
}
