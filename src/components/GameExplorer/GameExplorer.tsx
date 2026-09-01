import { useMemo, useState } from 'react'
import { sampleGames, type SampleGame } from '../../data/sampleGames'
import { useLocale, type Locale } from '../../i18n/locale'

type SignalFilter = 'all' | SampleGame['signal']

export function GameExplorer() {
  const { locale, messages } = useLocale()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<SignalFilter>('all')
  const filters: Array<{ value: SignalFilter; label: string }> = [
    { value: 'all', label: messages.explorer.filters.all },
    { value: 'strong', label: messages.explorer.filters.strong },
    { value: 'caution', label: messages.explorer.filters.caution },
  ]

  const visibleGames = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    return sampleGames.filter((game) => {
      const matchesQuery = game.title.toLocaleLowerCase().includes(normalizedQuery)
      const matchesFilter = filter === 'all' || game.signal === filter
      return matchesQuery && matchesFilter
    })
  }, [filter, query])

  return (
    <section className="explorer" id="sample-library" aria-labelledby="explorer-title">
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{messages.explorer.eyebrow}</p>
            <h2 id="explorer-title">{messages.explorer.title}</h2>
          </div>
          <p>{messages.explorer.intro}</p>
        </div>

        <div className="explorer__toolbar">
          <label className="search-field">
            <span>{messages.explorer.searchLabel}</span>
            <span className="search-field__control">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4 4" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={messages.explorer.searchPlaceholder}
              />
            </span>
          </label>

          <div className="filter-group" aria-label={messages.explorer.filterLabel}>
            {filters.map((item) => (
              <button
                key={item.value}
                type="button"
                aria-pressed={filter === item.value}
                onClick={() => setFilter(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <p className="result-count" role="status" aria-live="polite">
          {messages.explorer.count(visibleGames.length, sampleGames.length)}
        </p>

        {visibleGames.length > 0 ? (
          <div className="game-list">
            {visibleGames.map((game, index) => (
              <GameRow key={game.appId} game={game} index={index + 1} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="empty-state" role="status">
            <span aria-hidden="true">?</span>
            <h3>{messages.explorer.emptyTitle}</h3>
            <p>{messages.explorer.emptyBody}</p>
            <button type="button" onClick={() => { setQuery(''); setFilter('all') }}>
              {messages.explorer.reset}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function GameRow({ game, index, locale }: { game: SampleGame; index: number; locale: Locale }) {
  const { messages } = useLocale()
  const localized = game.localized[locale]

  return (
    <article className="game-row">
      <span className="game-row__index" aria-hidden="true">
        {String(index).padStart(2, '0')}
      </span>
      <div className="game-row__title">
        <p className={`signal-label signal-label--${game.signal}`}>
          <span aria-hidden="true" /> {localized.recommendation}
        </p>
        <h3>{game.title}</h3>
        <p>{messages.explorer.steamAppId} {game.appId}</p>
      </div>
      <dl className="game-row__facts">
        <div>
          <dt>{messages.explorer.steamReviews}</dt>
          <dd>{game.steamScore} {messages.explorer.positive}</dd>
        </div>
        <div>
          <dt>{messages.explorer.sourceRating}</dt>
          <dd>{localized.sourceRating}</dd>
        </div>
      </dl>
      <p className="game-row__evidence">{localized.evidence}</p>
      <div className="game-row__links">
        <a href={game.sourceUrl} target="_blank" rel="noreferrer">
          {messages.explorer.evidence} <span aria-hidden="true">↗</span>
        </a>
        <a href={game.steamUrl} target="_blank" rel="noreferrer">
          Steam <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  )
}
