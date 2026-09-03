import { useState } from 'react'
import { purchaseCopy, purchaseRoutes } from '../../content/purchase'
import { purchaseEvidence, type GamePurchaseFacts } from '../../domain/purchase'
import type { Runner } from '../../domain/compatibility'
import { useLocale } from '../../i18n/locale'
import { PurchaseFactList } from './PurchaseFactList'

export function PurchasePanel({ steamUrl, evidencedRunners, facts }: {
  steamUrl: string
  evidencedRunners: readonly Runner['kind'][]
  facts?: GamePurchaseFacts
}) {
  const { locale } = useLocale()
  const copy = purchaseCopy[locale]
  const [selected, setSelected] = useState('crossover')
  const route = purchaseRoutes.find((item) => item.id === selected) ?? purchaseRoutes[0]
  const routeCopy = route.copy[locale]
  const evidence = purchaseEvidence(route.id, evidencedRunners)
  const routeFacts = facts?.routes[route.id] ?? []

  return (
    <section className="purchase-panel" aria-labelledby="purchase-title">
      <p className="eyebrow">{copy.title}</p>
      <h2 id="purchase-title">{copy.verdict}</h2>
      <p>{copy.intro}</p>
      <h3>{copy.storeTitle}</h3>
      {facts ? <PurchaseFactList facts={[facts.store]} /> : <p>{copy.storeUnknown}</p>}
      <p>{copy.factsBoundary}</p>
      <label className="purchase-panel__select">
        {copy.choose}
        <select value={selected} onChange={(event) => setSelected(event.target.value)}>
          {purchaseRoutes.map((item) => <option key={item.id} value={item.id}>{item.copy[locale].name}</option>)}
        </select>
      </label>
      <div aria-live="polite" aria-atomic="true">
        <h3>{routeCopy.name}</h3>
        <dl className="game-detail__facts">
          <div><dt>{copy.cost}</dt><dd>{routeCopy.cost}</dd></div>
          <div><dt>{copy.setup}</dt><dd>{routeCopy.setup}</dd></div>
          <div><dt>{copy.evidence}</dt><dd>{evidence === 'partial' ? copy.partial : copy.missing}</dd></div>
        </dl>
        {routeFacts.length > 0 && <PurchaseFactList facts={routeFacts} />}
        <a href={route.url ?? steamUrl} target="_blank" rel="noreferrer">{copy.source} ↗</a>
      </div>
      <h3>{copy.checklist}</h3>
      <ul>{copy.checks.map((check) => <li key={check}>{check}</li>)}</ul>
      <p className="purchase-panel__scope">{copy.scope}</p>
      <small>{copy.reviewed}</small>
    </section>
  )
}
