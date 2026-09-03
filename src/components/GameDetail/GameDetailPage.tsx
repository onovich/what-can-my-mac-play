import { sampleGames } from '../../data/sampleGames'
import { useLocale } from '../../i18n/locale'
import { recommendationCopy } from '../../content/recommendation'
import { RecommendationPanel } from './RecommendationPanel'

export function GameDetailPage({ appId }: { appId: number }) {
  const { locale, messages } = useLocale()
  const game = sampleGames.find((candidate) => candidate.appId === appId)
  if (!game) {
    return (
      <section className="game-not-found shell" aria-labelledby="game-not-found-title">
        <p className="eyebrow">{messages.gameDetail.notFoundEyebrow}</p>
        <h1 id="game-not-found-title">{messages.gameDetail.notFoundTitle}</h1>
        <p>{messages.gameDetail.notFoundBody}</p>
        <a className="button button--primary" href="/#sample-library">{messages.gameDetail.notFoundAction}</a>
      </section>
    )
  }
  return (
    <article className="game-detail shell" aria-labelledby="game-detail-title">
      <a className="game-detail__back" href="/#sample-library">← {messages.gameDetail.back}</a>
      <header className="game-detail__hero game-detail__hero--decision">
        <div>
          <p className="eyebrow">{recommendationCopy[locale].heading}</p>
          <h1 id="game-detail-title">{game.title}</h1>
          <p>{recommendationCopy[locale].note}</p>
        </div>
      </header>
      <RecommendationPanel key={appId} appId={appId} steamUrl={game.steamUrl} />
    </article>
  )
}
