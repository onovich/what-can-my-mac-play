import { describe, expect, it } from 'vitest'
import {
  validateCompatibilityAssessment,
  validateCompatibilityReport,
  validateEnvironment,
  validateEvidence,
} from '../domain/compatibility'
import {
  researchReplayCases,
  researchReplayEnvironment,
  researchReplayRanking,
} from './researchReplay'

describe('ten-game research replay', () => {
  it('keeps all ten cases traceable and domain-valid', () => {
    expect(researchReplayCases).toHaveLength(10)
    expect(validateEnvironment(researchReplayEnvironment)).toEqual([])

    for (const replay of researchReplayCases) {
      expect(validateEvidence(replay.evidence), replay.title).toEqual([])
      expect(validateCompatibilityReport(replay.report), replay.title).toEqual([])
      expect(validateCompatibilityAssessment(replay.result.assessment), replay.title).toEqual([])
      expect(replay.report.evidenceIds).toContain(replay.evidence.id)
      expect(replay.evidence.sourceUrl).toMatch(/^https:\/\/www\.codeweavers\.com\//)
    }
  })

  it('keeps confidence low because every game has only one aggregate source', () => {
    for (const replay of researchReplayCases) {
      expect(replay.result.assessment.confidenceScore, replay.title).toBeLessThan(40)
      expect(replay.result.breakdown.sourceCount, replay.title).toBe(1)
      expect(replay.result.breakdown.independentEvidenceCount, replay.title).toBe(1)
    }
  })

  it('does not convert source rank order into false confidence', () => {
    expect(researchReplayRanking[0].result.assessment.confidenceScore).toBeLessThan(40)
    expect(researchReplayRanking.at(-1)?.result.assessment.confidenceScore).toBeLessThan(40)
  })

  it('preserves Elden Ring anti-cheat uncertainty without lowering its single-player score', () => {
    const eldenRing = researchReplayCases.find((replay) => replay.title === 'ELDEN RING')

    expect(eldenRing?.report.features).toContainEqual(
      expect.objectContaining({ feature: 'anticheat', status: 'unknown' }),
    )
    expect(eldenRing?.report.fieldEvidence['feature:anticheat']).toEqual([
      eldenRing?.evidence.id,
    ])
  })

  it('ranks stronger source ratings above otherwise weaker Runs Well cases', () => {
    const runsGreatScores = researchReplayCases
      .filter((replay) => replay.evidence.claims[0]?.value === 'Runs Great')
      .map((replay) => replay.result.assessment.compatibilityScore ?? 0)
    const runsWellScores = researchReplayCases
      .filter((replay) => replay.evidence.claims[0]?.value === 'Runs Well')
      .map((replay) => replay.result.assessment.compatibilityScore ?? 0)

    expect(Math.min(...runsGreatScores)).toBeGreaterThanOrEqual(Math.min(...runsWellScores))
    expect(Math.max(...runsGreatScores)).toBeGreaterThan(Math.max(...runsWellScores))
  })
})
