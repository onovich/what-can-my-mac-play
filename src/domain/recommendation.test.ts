import { describe, expect, it } from 'vitest'
import { recommendations } from '../data/recommendations'
import { sampleGames } from '../data/sampleGames'
import { getRouteRecommendation, routeSupportStatus } from './recommendation'

describe('closed support catalog', () => {
  it('only supports explicitly admitted game and runner pairs', () => {
    for (const game of sampleGames) {
      expect(routeSupportStatus(recommendations, game.appId, 'crossover')).not.toBe('not-supported')
      for (const runner of ['native', 'rosetta', 'porting-kit', 'wine', 'sikarugir', 'whisky', 'virtual-machine'] as const) {
        expect(routeSupportStatus(recommendations, game.appId, runner)).toBe('not-supported')
      }
    }
    expect(routeSupportStatus(recommendations, 999999, 'crossover')).toBe('not-supported')
  })
  it('keeps VM and unmaintained routes excluded even if erroneously added', () => {
    const record = { ...recommendations[0], runner: 'virtual-machine' as const }
    expect(getRouteRecommendation([record], record.appId, record.runner)).toBeUndefined()
  })
  it('requires a concise reviewed judgment with internal audit references', () => {
    expect(new Set(recommendations.map((item) => `${item.appId}:${item.runner}`)).size).toBe(recommendations.length)
    for (const decision of recommendations) {
      expect(decision.basisIds.length).toBeGreaterThan(0)
      expect(decision.reviewedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      for (const locale of ['en', 'zh-CN'] as const) {
        expect(decision.copy[locale].conditions.length).toBeLessThanOrEqual(2)
        expect(decision.copy[locale].action.length).toBeGreaterThan(10)
        expect(JSON.stringify(decision.copy[locale])).not.toContain('https://')
      }
    }
  })
})
