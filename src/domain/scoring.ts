import {
  validateCompatibilityReport,
  type CompatibilityAssessment,
  type CompatibilityReport,
  type FeatureName,
} from './compatibility'

export const SCORING_ALGORITHM_VERSION = '0.1.0'
export const DEFAULT_FRESHNESS_HALF_LIFE_DAYS = 180

export type ReportScoringInput = {
  report: CompatibilityReport
  sourceId: string
  independenceKey: string
  sourceReliability: number
  environmentSimilarity: number
  evidenceCompleteness: number
}

export type ScoringInput = {
  gameId: string
  targetEnvironmentId: string
  reports: readonly ReportScoringInput[]
  calculatedAt: string
  freshnessHalfLifeDays?: number
}

export type ConfidenceComponents = {
  sourceDiversity: number
  effectiveSampleSize: number
  freshness: number
  targetEnvironmentCoverage: number
  crossSourceAgreement: number
}

export type ScoringBreakdown = {
  rawReportCount: number
  scoredReportCount: number
  independentEvidenceCount: number
  sourceCount: number
  effectiveReportWeight: number
  conflictDetected: boolean
  conflictPenalty: number
  confidenceComponents: ConfidenceComponents
}

export type ScoringResult = {
  assessment: CompatibilityAssessment
  breakdown: ScoringBreakdown
}

type WeightedObservation = {
  score: number
  weight: number
  freshness: number
  environmentSimilarity: number
  sourceId: string
  independenceKey: string
}

const COMPATIBILITY_PRIOR_SCORE = 50
const COMPATIBILITY_PRIOR_WEIGHT = 0.75
const CONFLICT_SCORE_GAP = 40
const CONFLICT_CONFIDENCE_MULTIPLIER = 0.65

export function calculateCompatibilityAssessment(input: ScoringInput): ScoringResult {
  validateInput(input)

  const calculatedAt = new Date(input.calculatedAt)
  const halfLifeDays = input.freshnessHalfLifeDays ?? DEFAULT_FRESHNESS_HALF_LIFE_DAYS
  const duplicateCounts = countBy(input.reports, (item) => item.independenceKey)
  const observations = input.reports.flatMap((item): WeightedObservation[] => {
    const score = reportCompatibilityValue(item.report)
    if (score === null) return []

    const freshness = item.report.testedAt
      ? freshnessFactor(item.report.testedAt, calculatedAt, halfLifeDays)
      : 0.5
    const independenceFactor = 1 / (duplicateCounts.get(item.independenceKey) ?? 1)
    const weight =
      item.sourceReliability *
      item.environmentSimilarity *
      freshness *
      item.evidenceCompleteness *
      independenceFactor

    if (weight === 0) return []

    return [{
      score,
      weight,
      freshness,
      environmentSimilarity: item.environmentSimilarity,
      sourceId: item.sourceId,
      independenceKey: item.independenceKey,
    }]
  })

  if (observations.length === 0) return emptyResult(input)

  const totalWeight = sum(observations.map((item) => item.weight))
  const compatibilityScore = Math.round(
    (sum(observations.map((item) => item.score * item.weight)) +
      COMPATIBILITY_PRIOR_SCORE * COMPATIBILITY_PRIOR_WEIGHT) /
      (totalWeight + COMPATIBILITY_PRIOR_WEIGHT),
  )

  const sourceCount = new Set(observations.map((item) => item.sourceId)).size
  const independentEvidenceCount = new Set(
    observations.map((item) => item.independenceKey),
  ).size
  const effectiveSourceCount = Math.min(sourceCount, independentEvidenceCount)
  const groupedObservations = groupIndependentObservations(observations)
  const conflictDetected = hasConflict(groupedObservations)
  const conflictPenalty = conflictDetected ? CONFLICT_CONFIDENCE_MULTIPLIER : 1
  const confidenceComponents: ConfidenceComponents = {
    sourceDiversity: clamp01(effectiveSourceCount / 3),
    effectiveSampleSize: clamp01(totalWeight / 3),
    freshness: weightedAverage(observations, (item) => item.freshness),
    targetEnvironmentCoverage: weightedAverage(
      observations,
      (item) => item.environmentSimilarity,
    ),
    crossSourceAgreement:
      effectiveSourceCount >= 2 && groupedObservations.length >= 2
        ? agreementFactor(groupedObservations)
        : 0,
  }
  const confidenceScore = Math.round(
    100 *
      (0.25 * confidenceComponents.sourceDiversity +
        0.2 * confidenceComponents.effectiveSampleSize +
        0.2 * confidenceComponents.freshness +
        0.2 * confidenceComponents.targetEnvironmentCoverage +
        0.15 * confidenceComponents.crossSourceAgreement) *
      conflictPenalty,
  )

  return {
    assessment: {
      gameId: input.gameId,
      targetEnvironmentId: input.targetEnvironmentId,
      compatibilityScore,
      confidenceScore,
      reportIds: input.reports.map((item) => item.report.id),
      calculatedAt: input.calculatedAt,
      algorithmVersion: SCORING_ALGORITHM_VERSION,
    },
    breakdown: {
      rawReportCount: input.reports.length,
      scoredReportCount: observations.length,
      independentEvidenceCount,
      sourceCount,
      effectiveReportWeight: round(totalWeight, 3),
      conflictDetected,
      conflictPenalty,
      confidenceComponents: mapValues(confidenceComponents, (value) => round(value, 3)),
    },
  }
}

export function reportCompatibilityValue(report: CompatibilityReport): number | null {
  let score: number | null

  switch (report.verdict) {
    case 'unknown':
      return null
    case 'unplayable':
      score = failedStageScore(report)
      break
    case 'limited':
      score = 55
      break
    case 'playable':
      score = 80
      break
    case 'excellent':
      score = 95
      break
  }

  const featurePenalty = sum(
    report.features
      .filter((feature) => feature.status === 'fail')
      .map((feature) => failedFeaturePenalty(feature.feature)),
  )
  const completionPenalty = report.completionStatus === 'fail' ? 25 : 0

  return Math.max(0, score - featurePenalty - completionPenalty)
}

function validateInput(input: ScoringInput) {
  if (!input.gameId.trim()) throw new RangeError('gameId is required')
  if (!input.targetEnvironmentId.trim()) throw new RangeError('targetEnvironmentId is required')
  if (Number.isNaN(Date.parse(input.calculatedAt))) {
    throw new RangeError('calculatedAt must be a valid date')
  }

  const halfLifeDays = input.freshnessHalfLifeDays ?? DEFAULT_FRESHNESS_HALF_LIFE_DAYS
  if (!Number.isFinite(halfLifeDays) || halfLifeDays <= 0) {
    throw new RangeError('freshnessHalfLifeDays must be greater than zero')
  }

  const reportIds = new Set<string>()
  for (const item of input.reports) {
    const reportErrors = validateCompatibilityReport(item.report)
    if (reportErrors.length > 0) {
      throw new RangeError(`invalid report ${item.report.id}: ${reportErrors.join(', ')}`)
    }
    if (item.report.gameId !== input.gameId) {
      throw new RangeError(`report ${item.report.id} belongs to a different game`)
    }
    if (reportIds.has(item.report.id)) {
      throw new RangeError(`duplicate report id: ${item.report.id}`)
    }
    reportIds.add(item.report.id)
    if (!item.sourceId.trim()) throw new RangeError('sourceId is required')
    if (!item.independenceKey.trim()) throw new RangeError('independenceKey is required')
    validateFactor('sourceReliability', item.sourceReliability)
    validateFactor('environmentSimilarity', item.environmentSimilarity)
    validateFactor('evidenceCompleteness', item.evidenceCompleteness)
  }
}

function emptyResult(input: ScoringInput): ScoringResult {
  return {
    assessment: {
      gameId: input.gameId,
      targetEnvironmentId: input.targetEnvironmentId,
      compatibilityScore: null,
      confidenceScore: 0,
      reportIds: input.reports.map((item) => item.report.id),
      calculatedAt: input.calculatedAt,
      algorithmVersion: SCORING_ALGORITHM_VERSION,
    },
    breakdown: {
      rawReportCount: input.reports.length,
      scoredReportCount: 0,
      independentEvidenceCount: 0,
      sourceCount: 0,
      effectiveReportWeight: 0,
      conflictDetected: false,
      conflictPenalty: 1,
      confidenceComponents: {
        sourceDiversity: 0,
        effectiveSampleSize: 0,
        freshness: 0,
        targetEnvironmentCoverage: 0,
        crossSourceAgreement: 0,
      },
    },
  }
}

function failedStageScore(report: CompatibilityReport) {
  if (report.installStatus === 'fail') return 0
  if (report.launchStatus === 'fail') return 10
  return 30
}

function failedFeaturePenalty(feature: FeatureName) {
  switch (feature) {
    case 'save':
    case 'video':
      return 25
    case 'launcher':
      return 10
    case 'audio':
    case 'controller':
    case 'mods':
      return 5
    case 'multiplayer':
    case 'anticheat':
      return 0
  }
}

function freshnessFactor(observedAt: string, calculatedAt: Date, halfLifeDays: number) {
  const ageMs = Math.max(0, calculatedAt.getTime() - new Date(observedAt).getTime())
  const ageDays = ageMs / 86_400_000
  return 0.5 ** (ageDays / halfLifeDays)
}

function groupIndependentObservations(observations: readonly WeightedObservation[]) {
  const groups = new Map<string, WeightedObservation[]>()
  for (const observation of observations) {
    const group = groups.get(observation.independenceKey) ?? []
    group.push(observation)
    groups.set(observation.independenceKey, group)
  }

  return [...groups.entries()].map(([independenceKey, group]) => ({
    independenceKey,
    score: weightedAverage(group, (item) => item.score),
    weight: sum(group.map((item) => item.weight)),
  }))
}

function hasConflict(observations: readonly { score: number }[]) {
  for (let left = 0; left < observations.length; left += 1) {
    for (let right = left + 1; right < observations.length; right += 1) {
      if (Math.abs(observations[left].score - observations[right].score) >= CONFLICT_SCORE_GAP) {
        return true
      }
    }
  }
  return false
}

function agreementFactor(observations: readonly { score: number; weight: number }[]) {
  const mean = weightedAverage(observations, (item) => item.score)
  const totalWeight = sum(observations.map((item) => item.weight))
  const variance =
    sum(observations.map((item) => item.weight * (item.score - mean) ** 2)) / totalWeight
  return clamp01(1 - Math.sqrt(variance) / 47.5)
}

function weightedAverage<T extends { weight: number }>(
  values: readonly T[],
  select: (value: T) => number,
) {
  const totalWeight = sum(values.map((value) => value.weight))
  if (totalWeight === 0) return 0
  return sum(values.map((value) => select(value) * value.weight)) / totalWeight
}

function validateFactor(name: string, value: number) {
  if (!Number.isFinite(value) || value < 0 || value > 1) {
    throw new RangeError(`${name} must be between 0 and 1`)
  }
}

function countBy<T>(items: readonly T[], select: (item: T) => string) {
  const counts = new Map<string, number>()
  for (const item of items) {
    const key = select(item)
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  return counts
}

function sum(values: readonly number[]) {
  return values.reduce((total, value) => total + value, 0)
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value))
}

function round(value: number, precision: number) {
  const factor = 10 ** precision
  return Math.round(value * factor) / factor
}

function mapValues<T extends Record<string, number>>(
  values: T,
  transform: (value: number) => number,
): T {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, transform(value)]),
  ) as T
}
