import type { Runner } from './compatibility'

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
