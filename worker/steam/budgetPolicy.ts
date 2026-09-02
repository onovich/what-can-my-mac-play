export const STEAM_DAILY_REQUEST_BUDGET = 80_000

export function steamBudgetDay(now = new Date()): string {
  return now.toISOString().slice(0, 10)
}

export function secondsUntilNextUtcDay(now = new Date()): number {
  const nextDay = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
  )
  return Math.max(1, Math.ceil((nextDay - now.getTime()) / 1_000))
}
