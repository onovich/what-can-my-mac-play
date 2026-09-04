import { sampleGames } from '../../data/sampleGames'
import { useLocale } from '../../i18n/locale'
import { RecommendationPanel } from './RecommendationPanel'

export function GameDetailPage({ appId }: { appId: number }) {
  const { messages } = useLocale()
  const game = sampleGames.find((candidate) => candidate.appId === appId)
  if (!game) {
    return (
      <section className="game-not-found shell" aria-labelledby="game-not-found-title">
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
          <h1 id="game-detail-title">{game.title}</h1>
        </div>
      </header>
      <RecommendationPanel key={appId} appId={appId} steamUrl={game.steamUrl} />
    </article>
  )
}
