import { useMemo, useState } from 'react'
import { sampleGames, type SampleGame } from '../../data/sampleGames'

type SignalFilter = 'all' | SampleGame['signal']

const filters: Array<{ value: SignalFilter; label: string }> = [
  { value: 'all', label: 'All samples' },
  { value: 'strong', label: 'Stronger evidence' },
  { value: 'caution', label: 'Needs caution' },
]

export function GameExplorer() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<SignalFilter>('all')

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
            <p className="eyebrow">Research snapshot · September 2026</p>
            <h2 id="explorer-title">A sample library, with the caveats left in.</h2>
          </div>
          <p>
            These are static examples from the repository research—not live compatibility
            results. Every conclusion still points back to its source.
          </p>
        </div>

        <div className="explorer__toolbar">
          <label className="search-field">
            <span>Find a sample game</span>
            <span className="search-field__control">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4 4" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try Portal 2"
              />
            </span>
          </label>

          <div className="filter-group" aria-label="Filter evidence signal">
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
          Showing {visibleGames.length} of {sampleGames.length} research samples
        </p>

        {visibleGames.length > 0 ? (
          <div className="game-list">
            {visibleGames.map((game, index) => (
              <GameRow key={game.appId} game={game} index={index + 1} />
            ))}
          </div>
        ) : (
          <div className="empty-state" role="status">
            <span aria-hidden="true">?</span>
            <h3>No sample game matches that search.</h3>
            <p>Clear the search or choose another evidence filter.</p>
            <button type="button" onClick={() => { setQuery(''); setFilter('all') }}>
              Reset samples
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function GameRow({ game, index }: { game: SampleGame; index: number }) {
  return (
    <article className="game-row">
      <span className="game-row__index" aria-hidden="true">
        {String(index).padStart(2, '0')}
      </span>
      <div className="game-row__title">
        <p className={`signal-label signal-label--${game.signal}`}>
          <span aria-hidden="true" /> {game.recommendation}
        </p>
        <h3>{game.title}</h3>
        <p>Steam App ID {game.appId}</p>
      </div>
      <dl className="game-row__facts">
        <div>
          <dt>Steam reviews</dt>
          <dd>{game.steamScore} positive</dd>
        </div>
        <div>
          <dt>Source rating</dt>
          <dd>{game.sourceRating}</dd>
        </div>
      </dl>
      <p className="game-row__evidence">{game.evidence}</p>
      <div className="game-row__links">
        <a href={game.sourceUrl} target="_blank" rel="noreferrer">
          Evidence <span aria-hidden="true">↗</span>
        </a>
        <a href={game.steamUrl} target="_blank" rel="noreferrer">
          Steam <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  )
}
