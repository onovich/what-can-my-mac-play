import { describe, expect, it } from 'vitest'
import type { CompatibilityReport } from './compatibility'
import {
  calculateCompatibilityAssessment,
  reportCompatibilityValue,
  type ReportScoringInput,
} from './scoring'

const gameId = 'game:steam:620'
const targetEnvironmentId = 'env:m2-pro:macos-15:crossover-25:d3dmetal'
const calculatedAt = '2026-09-03T00:00:00Z'

function makeReport(
  id: string,
  verdict: CompatibilityReport['verdict'],
  overrides: Partial<CompatibilityReport> = {},
): CompatibilityReport {
  const known = verdict !== 'unknown'
  return {
    id,
    gameId,
    environmentId: targetEnvironmentId,
    evidenceIds: [`evidence:${id}`],
    installStatus: known ? 'pass' : 'unknown',
    launchStatus: known ? 'pass' : 'unknown',
    gameplayStatus:
      verdict === 'playable' || verdict === 'excellent' ? 'pass' : 'unknown',
    completionStatus: 'unknown',
    features: [],
    verdict,
    testedAt: calculatedAt,
    assessedAt: calculatedAt,
    ...overrides,
  }
}

function signal(
  report: CompatibilityReport,
  sourceId = `source:${report.id}`,
  independenceKey = `independent:${report.id}`,
): ReportScoringInput {
  return {
    report,
    sourceId,
    independenceKey,
    sourceReliability: 1,
    environmentSimilarity: 1,
    evidenceCompleteness: 1,
  }
}

function score(reports: readonly ReportScoringInput[]) {
  return calculateCompatibilityAssessment({
    gameId,
    targetEnvironmentId,
    reports,
    calculatedAt,
  })
}

describe('compatibility scoring v0', () => {
  it('returns unknown compatibility and zero confidence without a known outcome', () => {
    const result = score([signal(makeReport('unknown', 'unknown'))])

    expect(result.assessment.compatibilityScore).toBeNull()
    expect(result.assessment.confidenceScore).toBe(0)
    expect(result.breakdown.scoredReportCount).toBe(0)
  })

  it('treats a zero-weight report as unusable evidence', () => {
    const unusable = {
      ...signal(makeReport('unusable', 'excellent')),
      environmentSimilarity: 0,
    }
    const result = score([unusable])

    expect(result.assessment.compatibilityScore).toBeNull()
    expect(result.assessment.confidenceScore).toBe(0)
  })

  it('shrinks one excellent report instead of presenting it as certainty', () => {
    const result = score([signal(makeReport('one', 'excellent'))])

    expect(result.assessment.compatibilityScore).toBe(76)
    expect(result.assessment.confidenceScore).toBe(55)
    expect(result.breakdown.independentEvidenceCount).toBe(1)
  })

  it('raises confidence for consistent, independent, cross-source reports', () => {
    const result = score([
      signal(makeReport('one', 'excellent')),
      signal(makeReport('two', 'excellent')),
      signal(makeReport('three', 'excellent')),
    ])

    expect(result.assessment.compatibilityScore).toBe(86)
    expect(result.assessment.confidenceScore).toBe(100)
    expect(result.breakdown.conflictDetected).toBe(false)
  })

  it('detects major conflicts and lowers confidence', () => {
    const consistent = score([
      signal(makeReport('one', 'playable')),
      signal(makeReport('two', 'playable')),
    ])
    const conflicting = score([
      signal(makeReport('one', 'excellent')),
      signal(
        makeReport('two', 'unplayable', {
          installStatus: 'fail',
          launchStatus: 'not-applicable',
          gameplayStatus: 'not-applicable',
        }),
      ),
    ])

    expect(conflicting.breakdown.conflictDetected).toBe(true)
    expect(conflicting.breakdown.conflictPenalty).toBe(0.65)
    expect(conflicting.assessment.confidenceScore).toBeLessThan(
      consistent.assessment.confidenceScore,
    )
  })

  it('does not let mirrors of one evidence item inflate independent sample size', () => {
    const one = score([signal(makeReport('one', 'excellent'), 'source:a', 'origin:a')])
    const mirrored = score([
      signal(makeReport('one', 'excellent'), 'source:a', 'origin:a'),
      signal(makeReport('mirror', 'excellent'), 'source:b', 'origin:a'),
    ])

    expect(mirrored.assessment.compatibilityScore).toBe(one.assessment.compatibilityScore)
    expect(mirrored.assessment.confidenceScore).toBe(one.assessment.confidenceScore)
    expect(mirrored.breakdown.independentEvidenceCount).toBe(1)
  })

  it('penalizes failed critical features but not an online-only failure', () => {
    const baseline = makeReport('baseline', 'excellent')
    const saveFailure = {
      ...baseline,
      features: [{ feature: 'save', status: 'fail' }] as const,
    }
    const antiCheatFailure = {
      ...baseline,
      features: [{ feature: 'anticheat', status: 'fail' }] as const,
    }

    expect(reportCompatibilityValue(saveFailure)).toBe(70)
    expect(reportCompatibilityValue(antiCheatFailure)).toBe(95)
  })

  it('rejects invalid factors and cross-game reports', () => {
    const invalidFactor = {
      ...signal(makeReport('one', 'playable')),
      sourceReliability: 1.1,
    }
    const wrongGame = signal({
      ...makeReport('two', 'playable'),
      gameId: 'game:steam:999',
    })

    expect(() => score([invalidFactor])).toThrow('sourceReliability must be between 0 and 1')
    expect(() => score([wrongGame])).toThrow('belongs to a different game')
  })

  it('rejects duplicate report identifiers', () => {
    const report = makeReport('duplicate', 'playable')

    expect(() => score([signal(report, 'source:a'), signal(report, 'source:b')])).toThrow(
      'duplicate report id',
    )
  })
})
