import { describe, expect, it } from 'vitest'
import { recommendations } from '../data/recommendations'
import { sampleGames } from '../data/sampleGames'
import { catalogGames } from '../data/catalogGames'
import { getRouteRecommendation, routeSupportStatus } from './recommendation'

describe('closed support catalog', () => {
  it('limits homepage picks to supported CrossOver games without a Mac-edition route', () => {
    const featured = catalogGames.filter((game) => game.featured)
    expect(featured.length).toBeGreaterThan(0)
    for (const game of featured) {
      expect(game.preferredRunner).toBe('crossover')
      expect(routeSupportStatus(recommendations, game.appId, 'crossover')).toBe('recommended')
      expect(routeSupportStatus(recommendations, game.appId, 'native')).toBe('not-supported')
    }
  })
  it('does not transfer official Mac-edition support to another runner', () => {
    for (const appId of [413150, 2379780, 427520, 1145350]) {
      expect(routeSupportStatus(recommendations, appId, 'native')).toBe('recommended')
      for (const runner of ['crossover', 'rosetta', 'porting-kit', 'wine', 'sikarugir', 'whisky', 'virtual-machine'] as const) {
        expect(routeSupportStatus(recommendations, appId, runner)).toBe('not-supported')
      }
    }
  })
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
