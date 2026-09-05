import type { Runner } from './compatibility'
import type { Locale } from '../i18n/locale'

export type RecommendationStatus = 'recommended' | 'conditional' | 'not-supported'
// Route identity comes from runner; notes contain only game-specific constraints.
export type RecommendationCopy = { note?: string; reason: string; action: string; conditions: readonly string[] }
export type RouteRecommendation = {
  appId: number
  runner: Runner['kind']
  status: RecommendationStatus
  reviewedAt: string
  // Audit references stay internal; they are not a reading assignment for players.
  basisIds: readonly string[]
  copy: Record<Locale, RecommendationCopy>
}

export function getRouteRecommendation(
  catalog: readonly RouteRecommendation[], appId: number, runner: Runner['kind'],
): RouteRecommendation | undefined {
  if (runner === 'virtual-machine' || runner === 'whisky') return undefined
  return catalog.find((item) => item.appId === appId && item.runner === runner)
}

export function routeSupportStatus(
  catalog: readonly RouteRecommendation[], appId: number, runner: Runner['kind'],
): RecommendationStatus {
  return getRouteRecommendation(catalog, appId, runner)?.status ?? 'not-supported'
}
