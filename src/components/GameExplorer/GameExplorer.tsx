import { useMemo, useState } from 'react'
import { sampleGames, type SampleGame } from '../../data/sampleGames'
import { recommendations } from '../../data/recommendations'
import { getRouteRecommendation } from '../../domain/recommendation'
import { recommendationCopy } from '../../content/recommendation'
import { useLocale, type Locale } from '../../i18n/locale'

type Filter = 'all' | 'recommended' | 'conditional'

export function GameExplorer() {
  const { locale, messages } = useLocale()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const filters: Array<{ value: Filter; label: string }> = [
    { value: 'all', label: messages.explorer.filters.all },
    { value: 'recommended', label: recommendationCopy[locale].recommended },
    { value: 'conditional', label: recommendationCopy[locale].conditional },
  ]
  const visibleGames = useMemo(() => sampleGames.filter((game) => {
    const decision = getRouteRecommendation(recommendations, game.appId, 'crossover')
    return game.title.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()) &&
      (filter === 'all' || decision?.status === filter)
  }), [filter, query])

  return (
    <section className="explorer" id="sample-library" aria-labelledby="explorer-title">
      <div className="shell">
        <div className="section-heading">
          <div><p className="eyebrow">{messages.explorer.eyebrow}</p><h2 id="explorer-title">{messages.explorer.title}</h2></div>
          <p>{messages.explorer.intro}</p>
        </div>
        <div className="explorer__toolbar">
          <label className="search-field">
            <span>{messages.explorer.searchLabel}</span>
            <span className="search-field__control">
              <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg>
              <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={messages.explorer.searchPlaceholder} />
            </span>
          </label>
          <div className="filter-group" aria-label={messages.explorer.filterLabel}>
            {filters.map((item) => <button key={item.value} type="button" aria-pressed={filter === item.value} onClick={() => setFilter(item.value)}>{item.label}</button>)}
          </div>
        </div>
        <p className="result-count" role="status" aria-live="polite">{messages.explorer.count(visibleGames.length, sampleGames.length)}</p>
        {visibleGames.length > 0 ? <div className="game-list">
          {visibleGames.map((game, index) => <GameRow key={game.appId} game={game} index={index + 1} locale={locale} />)}
        </div> : <div className="empty-state" role="status">
          <h3>{messages.explorer.emptyTitle}</h3><p>{messages.explorer.emptyBody}</p>
          <button type="button" onClick={() => { setQuery(''); setFilter('all') }}>{messages.explorer.reset}</button>
        </div>}
      </div>
    </section>
  )
}

function GameRow({ game, index, locale }: { game: SampleGame; index: number; locale: Locale }) {
  const { messages } = useLocale()
  const decision = getRouteRecommendation(recommendations, game.appId, 'crossover')
  const text = recommendationCopy[locale]
  return (
    <article className="game-row game-row--decision" aria-labelledby={`game-${game.appId}-title`}>
      <span className="game-row__index" aria-hidden="true">{String(index).padStart(2, '0')}</span>
      <div className="game-row__title">
        <p className={`decision-status decision-status--${decision?.status ?? 'not-supported'}`}>{text[decision?.status ?? 'not-supported']}</p>
        <h3 id={`game-${game.appId}-title`}>{game.title}</h3>
      </div>
      <div className="game-row__evidence">
        <strong>{decision?.copy[locale].title ?? text.unsupportedTitle}</strong>
        <p>{decision?.copy[locale].action ?? text.unsupportedReason}</p>
      </div>
      <div className="game-row__links"><a href={`/games/${game.appId}`}>{messages.explorer.viewDetails} →</a></div>
    </article>
  )
}
