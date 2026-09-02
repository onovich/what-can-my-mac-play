export type EntityId = string

export type Game = {
  id: EntityId
  steamAppId: number
  canonicalTitle: string
  aliases: readonly string[]
  developer?: string
  publisher?: string
  releaseDate?: string
  storeUrl: string
  nativeMacOsAvailable: boolean | null
  tags: readonly string[]
}

export type Runner =
  | { kind: 'native' }
  | { kind: 'crossover' | 'wine' | 'whisky'; version: string }
  | { kind: 'virtual-machine'; name: string; version?: string }

export type Environment = {
  id: EntityId
  deviceModel?: string
  chipFamily: 'apple-silicon' | 'intel' | 'unknown'
  chipVariant?: string
  gpuCores?: number
  memoryGb?: number
  macOsVersion?: string
  runner: Runner
  graphicsBackend?: 'metal' | 'd3dmetal' | 'dxvk' | 'wined3d' | 'unknown'
  resolution?: `${number}x${number}`
  displayMode?: 'windowed' | 'borderless' | 'fullscreen'
}

export type EvidenceClaim = {
  field: string
  value: string | number | boolean | null
}

export type Evidence = {
  id: EntityId
  gameId: EntityId
  sourceId: EntityId
  sourceUrl: string
  sourceRecordId?: string
  observedAt: string
  publishedAt?: string
  contentHash?: string
  type:
    | 'official-test'
    | 'community-report'
    | 'source-aggregate'
    | 'store-metadata'
    | 'editorial'
  claims: readonly EvidenceClaim[]
  extractionMethod: 'structured-api' | 'manual-review' | 'rule-based' | 'model-assisted'
}

export type StageStatus = 'unknown' | 'pass' | 'degraded' | 'fail' | 'not-applicable'

export type FeatureName =
  | 'video'
  | 'audio'
  | 'controller'
  | 'save'
  | 'multiplayer'
  | 'anticheat'
  | 'launcher'
  | 'mods'

export type FeatureStatus = {
  feature: FeatureName
  status: StageStatus
  notes?: string
}

export type CompatibilityReportField =
  | 'gameVersion'
  | 'installStatus'
  | 'launchStatus'
  | 'gameplayStatus'
  | 'completionStatus'
  | 'averageFps'
  | 'lowFps'
  | 'settings'
  | 'verdict'
  | `feature:${FeatureName}`

export type FieldEvidence = Partial<
  Record<CompatibilityReportField, readonly [EntityId, ...EntityId[]]>
>

export type CompatibilityReport = {
  id: EntityId
  gameId: EntityId
  environmentId: EntityId
  evidenceIds: readonly [EntityId, ...EntityId[]]
  fieldEvidence: FieldEvidence
  gameVersion?: string
  installStatus: StageStatus
  launchStatus: StageStatus
  gameplayStatus: StageStatus
  completionStatus: StageStatus
  features: readonly FeatureStatus[]
  averageFps?: number
  lowFps?: number
  settings?: string
  verdict: 'unknown' | 'unplayable' | 'limited' | 'playable' | 'excellent'
  testedAt?: string
  assessedAt: string
}

export type CompatibilityAssessment = {
  gameId: EntityId
  targetEnvironmentId: EntityId
  compatibilityScore: number | null
  confidenceScore: number
  reportIds: readonly EntityId[]
  calculatedAt: string
  algorithmVersion: string
}

const isIsoDate = (value: string) => !Number.isNaN(Date.parse(value))
const isScore = (value: number) => Number.isFinite(value) && value >= 0 && value <= 100

export function validateGame(game: Game): string[] {
  const errors: string[] = []

  if (!game.id.trim()) errors.push('game.id is required')
  if (!Number.isInteger(game.steamAppId) || game.steamAppId <= 0) {
    errors.push('game.steamAppId must be a positive integer')
  }
  if (!game.canonicalTitle.trim()) errors.push('game.canonicalTitle is required')
  if (!isHttpUrl(game.storeUrl)) errors.push('game.storeUrl must be an HTTP(S) URL')

  return errors
}

export function validateEnvironment(environment: Environment): string[] {
  const errors: string[] = []

  if (!environment.id.trim()) errors.push('environment.id is required')
  if (environment.chipFamily !== 'unknown' && !environment.chipVariant?.trim()) {
    errors.push('environment.chipVariant is required when chipFamily is known')
  }
  if (
    environment.memoryGb !== undefined &&
    (!Number.isFinite(environment.memoryGb) || environment.memoryGb <= 0)
  ) {
    errors.push('environment.memoryGb must be greater than zero')
  }
  if (environment.macOsVersion !== undefined && !environment.macOsVersion.trim()) {
    errors.push('environment.macOsVersion must not be empty')
  }
  if (
    (environment.runner.kind === 'crossover' ||
      environment.runner.kind === 'wine' ||
      environment.runner.kind === 'whisky') &&
    !environment.runner.version.trim()
  ) {
    errors.push('environment.runner.version is required for this runner')
  }

  return errors
}

export function validateEvidence(evidence: Evidence): string[] {
  const errors: string[] = []

  if (!evidence.id.trim()) errors.push('evidence.id is required')
  if (!evidence.gameId.trim()) errors.push('evidence.gameId is required')
  if (!evidence.sourceId.trim()) errors.push('evidence.sourceId is required')
  if (!isHttpUrl(evidence.sourceUrl)) errors.push('evidence.sourceUrl must be an HTTP(S) URL')
  if (!isIsoDate(evidence.observedAt)) errors.push('evidence.observedAt must be a valid date')
  if (evidence.publishedAt && !isIsoDate(evidence.publishedAt)) {
    errors.push('evidence.publishedAt must be a valid date')
  }
  if (evidence.claims.length === 0) errors.push('evidence.claims must not be empty')

  return errors
}

export function validateCompatibilityReport(report: CompatibilityReport): string[] {
  const errors: string[] = []
  const evidenceIds = new Set(report.evidenceIds)

  if (!report.id.trim()) errors.push('report.id is required')
  if (!report.gameId.trim()) errors.push('report.gameId is required')
  if (!report.environmentId.trim()) errors.push('report.environmentId is required')
  if (evidenceIds.size !== report.evidenceIds.length) {
    errors.push('report.evidenceIds must not contain duplicates')
  }
  validateFieldEvidence(report, evidenceIds, errors)
  if (!isIsoDate(report.assessedAt)) errors.push('report.assessedAt must be a valid date')
  if (report.testedAt && !isIsoDate(report.testedAt)) {
    errors.push('report.testedAt must be a valid date')
  }
  if (report.averageFps !== undefined && report.averageFps < 0) {
    errors.push('report.averageFps must not be negative')
  }
  if (report.lowFps !== undefined && report.lowFps < 0) {
    errors.push('report.lowFps must not be negative')
  }
  if (report.verdict === 'unknown' && hasDefinitiveOutcome(report)) {
    errors.push('an unknown verdict cannot contain a definitive stage outcome')
  }
  if (report.verdict === 'unplayable' && !hasFailedRequiredStage(report)) {
    errors.push('an unplayable verdict requires a failed install, launch, or gameplay stage')
  }
  if (report.verdict === 'playable' || report.verdict === 'excellent') {
    if (report.gameplayStatus !== 'pass') {
      errors.push(`${report.verdict} requires gameplayStatus to be pass`)
    }
  }

  return errors
}

function validateFieldEvidence(
  report: CompatibilityReport,
  evidenceIds: ReadonlySet<EntityId>,
  errors: string[],
) {
  const requiredFields: CompatibilityReportField[] = []

  if (report.gameVersion) requiredFields.push('gameVersion')
  if (isDefinitiveStatus(report.installStatus)) requiredFields.push('installStatus')
  if (isDefinitiveStatus(report.launchStatus)) requiredFields.push('launchStatus')
  if (isDefinitiveStatus(report.gameplayStatus)) requiredFields.push('gameplayStatus')
  if (isDefinitiveStatus(report.completionStatus)) requiredFields.push('completionStatus')
  if (report.averageFps !== undefined) requiredFields.push('averageFps')
  if (report.lowFps !== undefined) requiredFields.push('lowFps')
  if (report.settings) requiredFields.push('settings')
  if (report.verdict !== 'unknown') requiredFields.push('verdict')
  for (const feature of report.features) requiredFields.push(`feature:${feature.feature}`)

  for (const field of requiredFields) {
    if (!report.fieldEvidence[field]?.length) {
      errors.push(`report.fieldEvidence.${field} is required`)
    }
  }

  for (const [field, fieldEvidenceIds] of Object.entries(report.fieldEvidence)) {
    for (const evidenceId of fieldEvidenceIds ?? []) {
      if (!evidenceIds.has(evidenceId)) {
        errors.push(`report.fieldEvidence.${field} references unknown evidence ${evidenceId}`)
      }
    }
  }
}

function isDefinitiveStatus(status: StageStatus) {
  return status === 'pass' || status === 'degraded' || status === 'fail'
}

export function validateCompatibilityAssessment(assessment: CompatibilityAssessment): string[] {
  const errors: string[] = []

  if (assessment.compatibilityScore !== null && !isScore(assessment.compatibilityScore)) {
    errors.push('assessment.compatibilityScore must be null or between 0 and 100')
  }
  if (!isScore(assessment.confidenceScore)) {
    errors.push('assessment.confidenceScore must be between 0 and 100')
  }
  if (assessment.reportIds.length === 0 && assessment.compatibilityScore !== null) {
    errors.push('compatibilityScore must be null when there are no reports')
  }
  if (!isIsoDate(assessment.calculatedAt)) {
    errors.push('assessment.calculatedAt must be a valid date')
  }

  return errors
}

function hasDefinitiveOutcome(report: CompatibilityReport) {
  return [report.installStatus, report.launchStatus, report.gameplayStatus].some(
    (status) => status === 'pass' || status === 'degraded' || status === 'fail',
  )
}

function hasFailedRequiredStage(report: CompatibilityReport) {
  return [report.installStatus, report.launchStatus, report.gameplayStatus].includes('fail')
}

function isHttpUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}
