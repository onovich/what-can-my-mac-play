import type { Runner } from './compatibility'
import type { Locale } from '../i18n/locale'

// Store listings and installation recipes are context, never performance reports.
export type PurchaseFact = {
  kind: 'store-requirements' | 'installation-recipe'
  edition: 'steam' | 'gog'
  sourceUrl: string
  checkedAt: string
  sourcePublishedAt?: string
  summary: Record<Locale, string>
}

export type GamePurchaseFacts = {
  appId: number
  store: PurchaseFact
  routes: Partial<Record<Runner['kind'], readonly PurchaseFact[]>>
}

export type PurchaseEvidence = 'excluded' | 'historical' | 'partial' | 'missing'

// Historical environments remain representable, but cannot become purchase routes.
export function purchaseEvidence(
  runner: Runner['kind'],
  evidencedRunners: readonly Runner['kind'][],
): PurchaseEvidence {
  if (runner === 'virtual-machine') return 'excluded'
  if (runner === 'whisky') return 'historical'
  return evidencedRunners.includes(runner) ? 'partial' : 'missing'
}
