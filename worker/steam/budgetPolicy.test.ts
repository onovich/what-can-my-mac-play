import { describe, expect, it } from 'vitest'

import { secondsUntilNextUtcDay, steamBudgetDay } from './budgetPolicy'

describe('Steam daily budget policy', () => {
  it('uses a UTC calendar day as the coordination key', () => {
    expect(steamBudgetDay(new Date('2026-09-03T23:59:59.000Z'))).toBe(
      '2026-09-03',
    )
  })

  it('returns the number of seconds until the next UTC day', () => {
    expect(secondsUntilNextUtcDay(new Date('2026-09-03T23:59:59.250Z'))).toBe(
      1,
    )
    expect(secondsUntilNextUtcDay(new Date('2026-09-03T12:00:00.000Z'))).toBe(
      43_200,
    )
  })
})
