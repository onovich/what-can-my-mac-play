import type { Runner } from './compatibility'
import type { Locale } from '../i18n/locale'

export const runtimeChecks = ['launch', 'gameplay', 'save', 'completion', 'multiplayer', 'anticheat'] as const
export type RuntimeCheck = typeof runtimeChecks[number]
export type RuntimeCheckStatus = 'reported-working' | 'reported-with-issues' | 'reported-failing' | 'not-reported'
export const unreportedRuntimeChecks: Readonly<Record<RuntimeCheck, RuntimeCheckStatus>> = {
  launch: 'not-reported', gameplay: 'not-reported', save: 'not-reported',
  completion: 'not-reported', multiplayer: 'not-reported', anticheat: 'not-reported',
}

// A first-hand source's account, not a project playtest or scoring input.
export type RuntimeEvidence = {
  id: string
  appId: number
  runner: Runner['kind']
  edition: 'steam' | 'gog' | 'unknown'
  sourceUrl: string
  observedAt: string
  publishedAt: string | null
  testedAt: string | null
  checks: Readonly<Record<RuntimeCheck, RuntimeCheckStatus>>
  environment: {
    chip: string | null
    memoryGb: number | null
    macOs: string | null
    runnerVersion: string | null
    backend: string | null
    gameVersion: string | null
  }
  author: Record<Locale, string>
  finding: Record<Locale, string>
  limits: Record<Locale, string>
}

export function selectRuntimeEvidence(
  reports: readonly RuntimeEvidence[], appId: number, runner: Runner['kind'],
) {
  if (runner === 'virtual-machine' || runner === 'whisky') return []
  return reports.filter((report) => report.appId === appId && report.runner === runner)
}

export function runtimeEvidenceGaps(report: RuntimeEvidence) {
  const gaps: (keyof RuntimeEvidence['environment'] | 'edition' | 'testedAt')[] =
    (Object.keys(report.environment) as (keyof RuntimeEvidence['environment'])[])
      .filter((field) => report.environment[field] === null)
  if (report.edition === 'unknown') gaps.push('edition')
  if (!report.testedAt) gaps.push('testedAt')
  return gaps
}
