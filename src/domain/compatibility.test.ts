import { describe, expect, it } from 'vitest'
import {
  validateCompatibilityAssessment,
  validateCompatibilityReport,
  validateEnvironment,
  validateEvidence,
  validateGame,
  type CompatibilityAssessment,
  type CompatibilityReport,
  type Environment,
  type Evidence,
  type Game,
} from './compatibility'

const game: Game = {
  id: 'game:steam:292030',
  steamAppId: 292030,
  canonicalTitle: 'The Witcher 3: Wild Hunt',
  aliases: [],
  storeUrl: 'https://store.steampowered.com/app/292030/',
  nativeMacOsAvailable: false,
  tags: ['RPG'],
}

const environment: Environment = {
  id: 'env:m2-pro:macos-15:crossover-25:d3dmetal',
  chipFamily: 'apple-silicon',
  chipVariant: 'M2 Pro',
  memoryGb: 16,
  macOsVersion: '15.6',
  runner: { kind: 'crossover', version: '25.1' },
  graphicsBackend: 'd3dmetal',
}

const evidence: Evidence = {
  id: 'evidence:codeweavers:witcher-3:2026-08-30',
  gameId: game.id,
  sourceId: 'source:codeweavers',
  sourceUrl: 'https://www.codeweavers.com/compatibility/crossover/the-witcher-3-wild-hunt',
  observedAt: '2026-08-30T12:00:00Z',
  type: 'official-test',
  claims: [{ field: 'gameplayStatus', value: 'pass' }],
  extractionMethod: 'manual-review',
}

const report: CompatibilityReport = {
  id: 'report:witcher-3:m2-pro:2026-08-30',
  gameId: game.id,
  environmentId: environment.id,
  evidenceIds: [evidence.id],
  fieldEvidence: {
    installStatus: [evidence.id],
    launchStatus: [evidence.id],
    gameplayStatus: [evidence.id],
    verdict: [evidence.id],
  },
  installStatus: 'pass',
  launchStatus: 'pass',
  gameplayStatus: 'pass',
  completionStatus: 'unknown',
  features: [],
  verdict: 'playable',
  assessedAt: '2026-08-30T12:10:00Z',
}

describe('compatibility domain validation', () => {
  it('accepts a traceable environment-specific report', () => {
    expect(validateGame(game)).toEqual([])
    expect(validateEnvironment(environment)).toEqual([])
    expect(validateEvidence(evidence)).toEqual([])
    expect(validateCompatibilityReport(report)).toEqual([])
  })

  it('accepts a partial source environment without inventing hardware details', () => {
    const partialEnvironment: Environment = {
      id: 'env:partial:crossover-25',
      chipFamily: 'unknown',
      runner: { kind: 'crossover', version: '25.0' },
    }

    expect(validateEnvironment(partialEnvironment)).toEqual([])
  })

  it('requires every definitive report field to reference declared evidence', () => {
    expect(validateCompatibilityReport({ ...report, fieldEvidence: {} })).toEqual(
      expect.arrayContaining([
        'report.fieldEvidence.installStatus is required',
        'report.fieldEvidence.launchStatus is required',
        'report.fieldEvidence.gameplayStatus is required',
        'report.fieldEvidence.verdict is required',
      ]),
    )
    expect(
      validateCompatibilityReport({
        ...report,
        fieldEvidence: { ...report.fieldEvidence, verdict: ['evidence:undeclared'] },
      }),
    ).toContain(
      'report.fieldEvidence.verdict references unknown evidence evidence:undeclared',
    )
  })

  it('does not allow unknown to hide a known outcome', () => {
    expect(validateCompatibilityReport({ ...report, verdict: 'unknown' })).toContain(
      'an unknown verdict cannot contain a definitive stage outcome',
    )
  })

  it('requires a failed required stage before calling a game unplayable', () => {
    expect(validateCompatibilityReport({ ...report, verdict: 'unplayable' })).toContain(
      'an unplayable verdict requires a failed install, launch, or gameplay stage',
    )
  })

  it('keeps compatibility unknown when there are no reports', () => {
    const assessment: CompatibilityAssessment = {
      gameId: game.id,
      targetEnvironmentId: environment.id,
      compatibilityScore: null,
      confidenceScore: 0,
      reportIds: [],
      calculatedAt: '2026-09-02T00:00:00Z',
      algorithmVersion: '0.1.0',
    }

    expect(validateCompatibilityAssessment(assessment)).toEqual([])
    expect(
      validateCompatibilityAssessment({ ...assessment, compatibilityScore: 0 }),
    ).toContain('compatibilityScore must be null when there are no reports')
  })
})
