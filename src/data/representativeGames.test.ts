import { describe, expect, it } from 'vitest'
import { validateGame } from '../domain/compatibility'
import {
  representativeGames,
  type EvidenceScenario,
  type ValidationAxis,
} from './representativeGames'

const minimumCoverage: Partial<Record<ValidationAxis, number>> = {
  'native-macos-candidate': 15,
  'dx11-candidate': 15,
  'dx12-candidate': 8,
  'anti-cheat-candidate': 10,
  'third-party-launcher-candidate': 5,
  'low-spec-baseline': 10,
  'high-end-3d': 15,
  'online-multiplayer': 15,
}

const minimumScenarios: Record<EvidenceScenario, number> = {
  'positive-path': 15,
  'failure-path': 10,
  'conflict-path': 10,
}

describe('representative game cohort', () => {
  it('contains exactly 50 valid, uniquely aligned Steam games', () => {
    expect(representativeGames).toHaveLength(50)
    expect(new Set(representativeGames.map((game) => game.steamAppId)).size).toBe(50)
    expect(new Set(representativeGames.map((game) => game.id)).size).toBe(50)
    expect(new Set(representativeGames.map((game) => game.canonicalTitle)).size).toBe(50)

    for (const game of representativeGames) {
      expect(validateGame(game), game.canonicalTitle).toEqual([])
      expect(game.id).toBe(`game:steam:${game.steamAppId}`)
      expect(game.storeUrl).toBe(`https://store.steampowered.com/app/${game.steamAppId}/`)
      expect(game.nativeMacOsAvailable).toBeNull()
    }
  })

  it.each(Object.entries(minimumCoverage))(
    'covers the %s validation axis',
    (axis, minimum) => {
      const count = representativeGames.filter((game) =>
        game.cohort.validationAxes.includes(axis as ValidationAxis),
      ).length

      expect(count).toBeGreaterThanOrEqual(minimum ?? 0)
    },
  )

  it.each(Object.entries(minimumScenarios))(
    'covers the %s evidence scenario without treating it as a verdict',
    (scenario, minimum) => {
      const count = representativeGames.filter(
        (game) => game.cohort.evidenceScenario === scenario,
      ).length

      expect(count).toBeGreaterThanOrEqual(minimum)
    },
  )
})
