import {
  type CompatibilityReport,
  type Environment,
  type Evidence,
  type FieldEvidence,
} from '../domain/compatibility'
import {
  calculateCompatibilityAssessment,
  type ReportScoringInput,
  type ScoringResult,
} from '../domain/scoring'

const replayObservedAt = '2026-09-02T00:00:00Z'
const replayCalculatedAt = '2026-09-03T00:00:00Z'

export const researchReplayEnvironment: Environment = {
  id: 'env:partial:crossover-25',
  chipFamily: 'unknown',
  runner: { kind: 'crossover', version: '25.0' },
}

type ReplaySeed = {
  appId: number
  title: string
  sourceSlug: string
  sourceRating: 'Runs Great' | 'Runs Well'
  latestRunnerVersion: string
  environmentSimilarity: number
  evidenceCompleteness: number
  antiCheatUncertainty?: boolean
}

export type ResearchReplayCase = {
  title: string
  evidence: Evidence
  report: CompatibilityReport
  scoringInput: ReportScoringInput
  result: ScoringResult
}

const seeds: readonly ReplaySeed[] = [
  {
    appId: 881100,
    title: 'Noita',
    sourceSlug: 'noita',
    sourceRating: 'Runs Great',
    latestRunnerVersion: '26.3.0',
    environmentSimilarity: 0.85,
    evidenceCompleteness: 0.6,
  },
  {
    appId: 813230,
    title: 'ANIMAL WELL',
    sourceSlug: 'ANIMAL_WELL',
    sourceRating: 'Runs Great',
    latestRunnerVersion: '26.3.0',
    environmentSimilarity: 0.85,
    evidenceCompleteness: 0.6,
  },
  {
    appId: 292030,
    title: 'The Witcher 3: Wild Hunt',
    sourceSlug: 'the-witcher-3-wild-hunt',
    sourceRating: 'Runs Great',
    latestRunnerVersion: '26.3.0',
    environmentSimilarity: 0.9,
    evidenceCompleteness: 0.7,
  },
  {
    appId: 814380,
    title: 'Sekiro: Shadows Die Twice',
    sourceSlug: 'sekiro-shadows-die-twice',
    sourceRating: 'Runs Great',
    latestRunnerVersion: '26.3.0',
    environmentSimilarity: 0.85,
    evidenceCompleteness: 0.65,
  },
  {
    appId: 274170,
    title: 'Hotline Miami 2: Wrong Number',
    sourceSlug: 'hotline-miami-2-wrong-number',
    sourceRating: 'Runs Great',
    latestRunnerVersion: '25.1.1',
    environmentSimilarity: 0.95,
    evidenceCompleteness: 0.6,
  },
  {
    appId: 894020,
    title: "Death's Door",
    sourceSlug: 'deaths-door',
    sourceRating: 'Runs Great',
    latestRunnerVersion: '26.3.0',
    environmentSimilarity: 0.6,
    evidenceCompleteness: 0.5,
  },
  {
    appId: 620,
    title: 'Portal 2',
    sourceSlug: 'portal-2',
    sourceRating: 'Runs Well',
    latestRunnerVersion: '26.3.0',
    environmentSimilarity: 0.85,
    evidenceCompleteness: 0.7,
  },
  {
    appId: 1057090,
    title: 'Ori and the Will of the Wisps',
    sourceSlug: 'ori-and-the-will-of-the-wisps',
    sourceRating: 'Runs Well',
    latestRunnerVersion: '26.3.0',
    environmentSimilarity: 0.65,
    evidenceCompleteness: 0.5,
  },
  {
    appId: 374320,
    title: 'DARK SOULS III',
    sourceSlug: 'dark-souls-iii',
    sourceRating: 'Runs Well',
    latestRunnerVersion: '26.2.0',
    environmentSimilarity: 0.85,
    evidenceCompleteness: 0.65,
  },
  {
    appId: 1245620,
    title: 'ELDEN RING',
    sourceSlug: 'elden-ring',
    sourceRating: 'Runs Great',
    latestRunnerVersion: '26.3.0',
    environmentSimilarity: 0.85,
    evidenceCompleteness: 0.7,
    antiCheatUncertainty: true,
  },
]

export const researchReplayCases: readonly ResearchReplayCase[] = seeds.map(buildReplayCase)

export const researchReplayRanking = [...researchReplayCases].sort((left, right) => {
  const compatibilityDifference =
    (right.result.assessment.compatibilityScore ?? -1) -
    (left.result.assessment.compatibilityScore ?? -1)
  if (compatibilityDifference !== 0) return compatibilityDifference
  return right.result.assessment.confidenceScore - left.result.assessment.confidenceScore
})

function buildReplayCase(seed: ReplaySeed): ResearchReplayCase {
  const gameId = `game:steam:${seed.appId}`
  const evidenceId = `evidence:codeweavers:${seed.appId}:2026-09-02`
  const sourceUrl = `https://www.codeweavers.com/compatibility/crossover/${seed.sourceSlug}`
  const evidence: Evidence = {
    id: evidenceId,
    gameId,
    sourceId: 'source:codeweavers-compatibility-center',
    sourceUrl,
    observedAt: replayObservedAt,
    type: 'source-aggregate',
    claims: [
      { field: 'sourceRating', value: seed.sourceRating },
      { field: 'latestRunnerVersion', value: seed.latestRunnerVersion },
      ...(seed.antiCheatUncertainty
        ? [{ field: 'antiCheatCompatibility', value: null }]
        : []),
    ],
    extractionMethod: 'manual-review',
  }
  const fieldEvidence: FieldEvidence = {
    gameplayStatus: [evidenceId],
    verdict: [evidenceId],
  }
  if (seed.antiCheatUncertainty) fieldEvidence['feature:anticheat'] = [evidenceId]

  const report: CompatibilityReport = {
    id: `report:research-replay:${seed.appId}`,
    gameId,
    environmentId: researchReplayEnvironment.id,
    evidenceIds: [evidenceId],
    fieldEvidence,
    installStatus: 'unknown',
    launchStatus: 'unknown',
    gameplayStatus: 'pass',
    completionStatus: 'unknown',
    features: seed.antiCheatUncertainty
      ? [{
          feature: 'anticheat',
          status: 'unknown',
          notes: 'Online compatibility requires separate evidence.',
        }]
      : [],
    verdict: seed.sourceRating === 'Runs Great' ? 'excellent' : 'playable',
    assessedAt: replayObservedAt,
  }
  const scoringInput: ReportScoringInput = {
    report,
    sourceId: evidence.sourceId,
    independenceKey: evidence.id,
    sourceReliability: 0.7,
    environmentSimilarity: seed.environmentSimilarity,
    evidenceCompleteness: seed.evidenceCompleteness,
  }
  const result = calculateCompatibilityAssessment({
    gameId,
    targetEnvironmentId: researchReplayEnvironment.id,
    reports: [scoringInput],
    calculatedAt: replayCalculatedAt,
  })

  return { title: seed.title, evidence, report, scoringInput, result }
}
