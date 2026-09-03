import { useState } from 'react'
import { recommendations } from '../../data/recommendations'
import { getRouteRecommendation, routeSupportStatus } from '../../domain/recommendation'
import type { Runner } from '../../domain/compatibility'
import { purchaseRoutes } from '../../content/purchase'
import { recommendationCopy } from '../../content/recommendation'
import { useLocale } from '../../i18n/locale'

export function RecommendationPanel({ appId, steamUrl }: { appId: number; steamUrl: string }) {
  const { locale } = useLocale()
  const text = recommendationCopy[locale]
  const [runner, setRunner] = useState<Runner['kind']>('crossover')
  const decision = getRouteRecommendation(recommendations, appId, runner)
  const status = routeSupportStatus(recommendations, appId, runner)
  const copy = decision?.copy[locale]
  return (
    <section className="recommendation-panel" aria-labelledby="recommendation-title">
      <p className="eyebrow">{text.heading}</p>
      <div aria-live="polite" aria-atomic="true">
        <p className={`decision-status decision-status--${status}`}>{text[status]}</p>
        <h2 id="recommendation-title">{copy?.title ?? text.unsupportedTitle}</h2>
        <p className="recommendation-panel__reason">{copy?.reason ?? text.unsupportedReason}</p>
        <div className="recommendation-panel__action">
          <h3>{text.action}</h3>
          <p>{copy?.action ?? text.unsupportedAction}</p>
        </div>
        {copy && copy.conditions.length > 0 && <>
          <h3>{text.conditions}</h3>
          <ul>{copy.conditions.map((condition) => <li key={condition}>{condition}</li>)}</ul>
        </>}
      </div>
      <label className="purchase-panel__select">
        {text.choose}
        <select value={runner} onChange={(event) => setRunner(event.target.value as Runner['kind'])}>
          {purchaseRoutes.map((route) => <option key={route.id} value={route.id}>{route.copy[locale].name}</option>)}
        </select>
      </label>
      <div className="recommendation-panel__links">
        {status === 'not-supported'
          ? <button className="button button--primary" onClick={() => setRunner('crossover')}>{text.preferred}</button>
          : <a className="button button--primary" href="https://www.codeweavers.com/crossover" target="_blank" rel="noreferrer">{text.tool} ↗</a>}
        <a className="button button--outline" href={steamUrl} target="_blank" rel="noreferrer">{text.steam} ↗</a>
      </div>
      <details className="recommendation-panel__scope">
        <summary>{text.scopeTitle}</summary>
        <p>{text.boundary}</p><p>{text.scope}</p>
        {decision && <small>{text.reviewed}: <time dateTime={decision.reviewedAt}>{decision.reviewedAt}</time></small>}
      </details>
    </section>
  )
}
