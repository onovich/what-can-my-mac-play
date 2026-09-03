import { describe, expect, it } from 'vitest'
import { purchaseEvidence } from './purchase'

describe('purchase evidence boundaries', () => {
  it('does not transfer CrossOver reports to other compatibility layers', () => {
    expect(purchaseEvidence('crossover', ['crossover'])).toBe('partial')
    for (const route of ['native', 'rosetta', 'wine', 'porting-kit', 'sikarugir'] as const) {
      expect(purchaseEvidence(route, ['crossover'])).toBe('missing')
    }
  })
  it('excludes virtual machines even when a positive report exists', () => {
    expect(purchaseEvidence('virtual-machine', ['virtual-machine'])).toBe('excluded')
  })
  it('keeps unmaintained Whisky historical rather than recommending it', () => {
    expect(purchaseEvidence('whisky', ['whisky'])).toBe('historical')
  })
})
