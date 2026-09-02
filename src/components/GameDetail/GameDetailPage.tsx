import { researchReplayCases } from '../../data/researchReplay'
import { sampleGames } from '../../data/sampleGames'
import { useLocale } from '../../i18n/locale'
import { ScoreMeter } from '../ScoreMeter/ScoreMeter'

function claimValue(
  claims: readonly { field: string; value: string | number | boolean | null }[],
  field: string,
) {
  return claims.find((claim) => claim.field === field)?.value
}

export function GameDetailPage({ appId }: { appId: number }) {
  const { locale, messages } = useLocale()
  const game = sampleGames.find((candidate) => candidate.appId === appId)
  const replay = researchReplayCases.find((candidate) => candidate.appId === appId)

  if (!game || !replay) {
    return (
      <section className="game-not-found shell" aria-labelledby="game-not-found-title">
        <p className="eyebrow">{messages.gameDetail.notFoundEyebrow}</p>
        <h1 id="game-not-found-title">{messages.gameDetail.notFoundTitle}</h1>
        <p>{messages.gameDetail.notFoundBody}</p>
        <a className="button button--primary" href="/#sample-library">
          {messages.gameDetail.notFoundAction}
        </a>
      </section>
    )
  }

  const localized = game.localized[locale]
  const { assessment, breakdown } = game.scoring
  const latestRunnerVersion = claimValue(replay.evidence.claims, 'latestRunnerVersion')
  const observedAt = new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(
    new Date(replay.evidence.observedAt),
  )

  return (
    <article className="game-detail shell" aria-labelledby="game-detail-title">
      <a className="game-detail__back" href="/#sample-library">
        <span aria-hidden="true">←</span> {messages.gameDetail.back}
      </a>

      <header className="game-detail__hero">
        <div>
          <p className={`signal-label signal-label--${game.signal}`}>
            <span aria-hidden="true" /> {localized.recommendation}
          </p>
          <h1 id="game-detail-title">{game.title}</h1>
          <p className="game-detail__identity">
            {messages.gameDetail.steamAppId} {game.appId} · {messages.gameDetail.researchSnapshot}
          </p>
        </div>
        <div className="game-detail__hero-score" aria-label={messages.gameDetail.decisionTitle}>
          <ScoreMeter
            label={messages.gameDetail.compatibility}
            title={game.title}
            value={assessment.compatibilityScore}
          />
          <ScoreMeter
            label={messages.gameDetail.confidence}
            title={game.title}
            value={assessment.confidenceScore}
            tone="confidence"
          />
        </div>
      </header>

      <div className="game-detail__body">
        <section className="game-detail__decision" aria-labelledby="decision-title">
          <p className="eyebrow">{messages.gameDetail.researchSnapshot}</p>
          <h2 id="decision-title">{messages.gameDetail.decisionTitle}</h2>
          <p className="game-detail__lede">{localized.evidence}</p>
          <p>{messages.gameDetail.decisionIntro}</p>
          <div className="game-detail__badges">
            <span>{messages.explorer.confidenceBand(assessment.confidenceScore)}</span>
            <span>{messages.gameDetail.oneSource}</span>
            <span>{messages.gameDetail.conflictUnknown}</span>
          </div>
        </section>

        <aside className="game-detail__actions" aria-label={messages.gameDetail.evidenceTitle}>
          <a className="button button--primary" href={game.sourceUrl} target="_blank" rel="noreferrer">
            {messages.gameDetail.viewEvidence} <span aria-hidden="true">↗</span>
          </a>
          <a className="button button--outline" href={game.steamUrl} target="_blank" rel="noreferrer">
            {messages.gameDetail.viewSteam} <span aria-hidden="true">↗</span>
          </a>
        </aside>

        <section className="game-detail__panel" aria-labelledby="environment-title">
          <h2 id="environment-title">{messages.gameDetail.environmentTitle}</h2>
          <dl className="game-detail__facts">
            <div>
              <dt>{messages.gameDetail.runner}</dt>
              <dd>{messages.gameDetail.partialEnvironment}</dd>
            </div>
            <div>
              <dt>{messages.gameDetail.latestRunner}</dt>
              <dd>{latestRunnerVersion ?? messages.gameDetail.unknown}</dd>
            </div>
            <div>
              <dt>{messages.gameDetail.chipCoverage}</dt>
              <dd>{messages.gameDetail.unknownChip}</dd>
            </div>
            <div>
              <dt>{messages.gameDetail.upstreamTestDate}</dt>
              <dd>{messages.gameDetail.unknown}</dd>
            </div>
          </dl>
        </section>

        <section className="game-detail__panel" aria-labelledby="evidence-title">
          <h2 id="evidence-title">{messages.gameDetail.evidenceTitle}</h2>
          <dl className="game-detail__facts">
            <div>
              <dt>{messages.gameDetail.source}</dt>
              <dd>CodeWeavers Compatibility Center</dd>
            </div>
            <div>
              <dt>{messages.gameDetail.sourceRating}</dt>
              <dd>{localized.sourceRating}</dd>
            </div>
            <div>
              <dt>{messages.gameDetail.observedAt}</dt>
              <dd>{observedAt}</dd>
            </div>
            <div>
              <dt>{messages.explorer.evidenceBaseLabel}</dt>
              <dd>{messages.explorer.evidenceBase(
                breakdown.sourceCount,
                breakdown.scoredReportCount,
              )}</dd>
            </div>
          </dl>
          <p className="game-detail__model-note">{messages.gameDetail.derived}</p>
        </section>

        <section className="game-detail__caveats" aria-labelledby="caveats-title">
          <h2 id="caveats-title">{messages.gameDetail.caveatsTitle}</h2>
          <ol>
            {messages.gameDetail.caveats.map((caveat, index) => (
              <li key={caveat}>
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <p>{caveat}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  )
}
