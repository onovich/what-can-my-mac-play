import { describe, expect, it } from 'vitest'
import { gamePurchaseFacts } from './gamePurchaseFacts'
import { sampleGames } from './sampleGames'
import { purchaseEvidence } from '../domain/purchase'

describe('curated game purchase facts', () => {
  it('covers each published sample exactly once with dated, bilingual Steam evidence', () => {
    expect(gamePurchaseFacts.map((fact) => fact.appId).sort()).toEqual(sampleGames.map((game) => game.appId).sort())
    for (const entry of gamePurchaseFacts) {
      expect(entry.store.edition).toBe('steam')
      const source = new URL(entry.store.sourceUrl)
      expect(source.hostname).toBe('store.steampowered.com')
      expect(source.pathname === `/app/${entry.appId}/` || source.searchParams.get('appids') === String(entry.appId)).toBe(true)
      for (const fact of [entry.store, ...Object.values(entry.routes).flat()]) {
        expect(fact.sourceUrl).toMatch(/^https:\/\//)
        expect(fact.checkedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
        expect(fact.summary.en.length).toBeGreaterThan(20)
        expect(fact.summary['zh-CN'].length).toBeGreaterThan(10)
      }
      expect(entry.routes['virtual-machine']).toBeUndefined()
      expect(entry.routes.whisky).toBeUndefined()
    }
  })
  it('labels the Noita recipe as historical GOG context, not Steam playability', () => {
    const recipe = gamePurchaseFacts.find((entry) => entry.appId === 881100)!.routes['porting-kit']![0]
    expect(recipe.edition).toBe('gog')
    expect(recipe.sourcePublishedAt).toBe('2023-08-12')
    expect(recipe.summary.en).toContain('not a verified Steam setup')
    expect(purchaseEvidence('porting-kit', ['crossover'])).toBe('missing')
  })
  it('preserves Portal 2 platform conflict without upgrading native or Rosetta evidence', () => {
    const portal = gamePurchaseFacts.find((entry) => entry.appId === 620)!
    expect(portal.routes.native?.[0].summary.en).toContain('false')
    expect(portal.routes.rosetta).toEqual(portal.routes.native)
    expect(purchaseEvidence('native', ['crossover'])).toBe('missing')
    expect(purchaseEvidence('rosetta', ['crossover'])).toBe('missing')
  })
})
