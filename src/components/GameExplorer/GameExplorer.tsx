import { useMemo, useState } from 'react'
import { sampleGames, type SampleGame } from '../../data/sampleGames'
import { recommendations } from '../../data/recommendations'
import { getRouteRecommendation } from '../../domain/recommendation'
import { recommendationCopy } from '../../content/recommendation'
import { useLocale, type Locale } from '../../i18n/locale'

export function GameExplorer() {
  const { locale, messages } = useLocale()
  const [query, setQuery] = useState('')
  const visibleGames = useMemo(() => sampleGames.filter((game) =>
    game.title.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()),
  ), [query])

  return (
    <section className="explorer explorer--compact" id="sample-library" aria-label={messages.explorer.searchLabel}>
      <div className="shell">
        <div className="explorer__toolbar">
          <label className="search-field">
            <span>{messages.explorer.searchLabel}</span>
            <span className="search-field__control">
              <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg>
              <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={messages.explorer.searchPlaceholder} />
            </span>
          </label>
        </div>
        <p className="result-count" role="status" aria-live="polite">{messages.explorer.count(visibleGames.length, sampleGames.length)}</p>
        {visibleGames.length > 0 ? <div className="game-list">
          {visibleGames.map((game, index) => <GameRow key={game.appId} game={game} index={index + 1} locale={locale} />)}
        </div> : <div className="empty-state" role="status">
          <h2>{messages.explorer.emptyTitle}</h2><p>{messages.explorer.emptyBody}</p>
          <button type="button" onClick={() => setQuery('')}>{messages.explorer.reset}</button>
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
        <h2 id={`game-${game.appId}-title`}>{game.title}</h2>
      </div>
      <div className="game-row__evidence">
        <strong>{decision?.copy[locale].title ?? text.unsupportedTitle}</strong>
      </div>
      <div className="game-row__links"><a href={`/games/${game.appId}`}>{messages.explorer.viewDetails} →</a></div>
    </article>
  )
}
