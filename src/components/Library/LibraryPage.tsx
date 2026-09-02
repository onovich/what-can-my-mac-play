import { useState } from 'react'

import { libraryContent, type LibraryPreviewState } from '../../content/library'
import { sampleGames } from '../../data/sampleGames'
import { useLocale } from '../../i18n/locale'
import { ScoreMeter } from '../ScoreMeter/ScoreMeter'

const previewStates: readonly LibraryPreviewState[] = ['public', 'private', 'empty']
const demoGames = sampleGames.slice(0, 4)

export function LibraryPage() {
  const { locale } = useLocale()
  const content = libraryContent[locale]
  const [previewState, setPreviewState] = useState<LibraryPreviewState>('public')

  return (
    <article className="library-page" aria-labelledby="library-title">
      <header className="library-hero shell">
        <div>
          <p className="eyebrow">{content.eyebrow}</p>
          <h1 id="library-title">{content.title}</h1>
          <p className="library-hero__lede">{content.lede}</p>
        </div>
        <aside className="library-status" aria-labelledby="library-status-title">
          <p className="utility-label">{content.availabilityLabel}</p>
          <h2 id="library-status-title">{content.availabilityTitle}</h2>
          <p>{content.availabilityBody}</p>
        </aside>
      </header>

      <section className="library-flow shell" aria-labelledby="library-flow-title">
        <h2 id="library-flow-title">{content.flowTitle}</h2>
        <ol>
          {content.flowSteps.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <p>{step.token}</p>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="library-preview" aria-labelledby="library-preview-title">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{content.previewEyebrow}</p>
              <h2 id="library-preview-title">{content.previewTitle}</h2>
            </div>
            <p>{content.previewBody}</p>
          </div>

          <div className="library-preview__tabs" role="group" aria-label={content.previewLabel}>
            {previewStates.map((state) => (
              <button
                key={state}
                type="button"
                aria-pressed={previewState === state}
                onClick={() => setPreviewState(state)}
              >
                {content.previewTabs[state]}
              </button>
            ))}
          </div>

          <div
            className="library-preview__panel"
            role="region"
            aria-live="polite"
            aria-label={content.previewTabs[previewState]}
          >
            {previewState === 'public' ? (
              <PublicLibraryPreview content={content} />
            ) : previewState === 'private' ? (
              <LibraryMessage
                symbol="!"
                title={content.privateTitle}
                body={content.privateBody}
                steps={content.privateSteps}
              />
            ) : (
              <LibraryMessage
                symbol="0"
                title={content.emptyTitle}
                body={content.emptyBody}
              />
            )}
          </div>
        </div>
      </section>

      <section className="library-privacy shell" aria-labelledby="library-privacy-title">
        <div>
          <p className="eyebrow">Privacy by design</p>
          <h2 id="library-privacy-title">{content.privacyTitle}</h2>
        </div>
        <ul>
          {content.privacyItems.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>
    </article>
  )
}

function PublicLibraryPreview({ content }: { content: (typeof libraryContent)['en'] | (typeof libraryContent)['zh-CN'] }) {
  return (
    <div className="library-public">
      <header>
        <div>
          <h3>{content.publicTitle}</h3>
          <p>{content.publicBody}</p>
        </div>
        <span>{content.publicCount(demoGames.length)}</span>
      </header>
      <div className="library-public__list">
        {demoGames.map((game, index) => (
          <article key={game.appId} aria-labelledby={`library-game-${game.appId}`}>
            <span className="library-public__rank">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h4 id={`library-game-${game.appId}`}>{game.title}</h4>
              <p>Steam App ID {game.appId}</p>
            </div>
            <div className="library-public__scores">
              <ScoreMeter
                label={content.compatibility}
                title={game.title}
                value={game.scoring.assessment.compatibilityScore}
              />
              <ScoreMeter
                label={content.confidence}
                title={game.title}
                value={game.scoring.assessment.confidenceScore}
                tone="confidence"
              />
            </div>
            <a href={`/games/${game.appId}`}>
              {content.viewGame} <span aria-hidden="true">→</span>
            </a>
          </article>
        ))}
      </div>
    </div>
  )
}

function LibraryMessage({
  symbol,
  title,
  body,
  steps,
}: {
  symbol: string
  title: string
  body: string
  steps?: readonly string[]
}) {
  const { locale } = useLocale()
  const content = libraryContent[locale]

  return (
    <div className="library-message">
      <span aria-hidden="true">{symbol}</span>
      <div>
        <h3>{title}</h3>
        <p>{body}</p>
        {steps ? <ul>{steps.map((step) => <li key={step}>{step}</li>)}</ul> : null}
        <a className="text-link" href="/#sample-library">{content.browseSamples} →</a>
      </div>
    </div>
  )
}
