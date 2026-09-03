import { useEffect } from 'react'

import { GameExplorer } from './components/GameExplorer/GameExplorer'
import { GameDetailPage } from './components/GameDetail/GameDetailPage'
import { Header } from './components/Header/Header'
import { LibraryPage } from './components/Library/LibraryPage'
import { Method } from './components/Method/Method'
import { PrivacyPage } from './components/Privacy/PrivacyPage'
import { siteHost, siteUrl } from './config/site'
import { privacyContent } from './content/privacy'
import { libraryContent } from './content/library'
import { sampleGames } from './data/sampleGames'
import { useLocale } from './i18n/locale'
import { resolveAppRoute } from './routes'

export function App() {
  const { locale, messages } = useLocale()
  const route = resolveAppRoute(window.location.pathname)
  const detailGame = route.kind === 'game'
    ? sampleGames.find((game) => game.appId === route.appId)
    : undefined

  useEffect(() => {
    let meta: { title: string; description: string } = messages.meta
    if (route.kind === 'privacy') {
      meta = {
        title: privacyContent[locale].metaTitle,
        description: privacyContent[locale].metaDescription,
      }
    } else if (route.kind === 'library') {
      meta = {
        title: libraryContent[locale].metaTitle,
        description: libraryContent[locale].metaDescription,
      }
    } else if (route.kind === 'game' && detailGame) {
      meta = {
        title: messages.gameDetail.metaTitle(detailGame.title),
        description: messages.gameDetail.metaDescription(detailGame.title),
      }
    } else if (route.kind === 'game' || route.kind === 'not-found') {
      meta = {
        title: `${messages.gameDetail.notFoundTitle} · What Can My Mac Play?`,
        description: messages.gameDetail.notFoundBody,
      }
    }
    document.title = meta.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', meta.description)
  }, [detailGame, locale, messages, route.kind])

  return (
    <>
      <a className="skip-link" href="#main-content">
        {messages.accessibility.skipToContent}
      </a>
      <Header />
      <main id="main-content">
        {route.kind === 'privacy' ? (
          <PrivacyPage />
        ) : route.kind === 'library' ? (
          <LibraryPage />
        ) : route.kind === 'game' ? (
          <GameDetailPage appId={route.appId} />
        ) : route.kind === 'not-found' ? (
          <GameDetailPage appId={0} />
        ) : (
          <>
            <section className="hero shell" aria-labelledby="hero-title">
              <div className="hero__copy">
                <p className="eyebrow">{messages.hero.eyebrow}</p>
                <h1 id="hero-title">
                  {messages.hero.title} <em>{messages.hero.emphasis}</em>
                </h1>
                <p className="hero__lede">{messages.hero.lede}</p>
                <div className="hero__actions">
                  <a className="button button--primary" href="#sample-library">
                    {messages.hero.explore}
                    <span aria-hidden="true">↓</span>
                  </a>
                  <a className="text-link" href="#method">
                    {messages.hero.method}
                  </a>
                </div>
                <p className="hero__note">{messages.hero.note}</p>
              </div>
              <aside className="decision-intro">
                <p className="eyebrow">{messages.method.eyebrow}</p>
                <h2>{messages.method.title}</h2>
                <p>{messages.method.intro}</p>
              </aside>
            </section>

            <GameExplorer />
            <Method />

            <section className="closing shell" aria-labelledby="closing-title">
              <p className="eyebrow">{messages.closing.eyebrow}</p>
              <h2 id="closing-title">{messages.closing.title}</h2>
              <a
                className="button button--light"
                href="https://github.com/onovich/what-can-my-mac-play"
                target="_blank"
                rel="noreferrer"
              >
                {messages.closing.github}
                <span aria-hidden="true">↗</span>
              </a>
            </section>
          </>
        )}
      </main>

      <footer className="site-footer shell">
        <p>
          <strong>What Can My Mac Play?</strong> {messages.footer.statement}
        </p>
        <div className="site-footer__links">
          <a href="/privacy">{messages.footer.privacy}</a>
          <a href="/privacy#data-deletion">{messages.footer.dataDeletion}</a>
          <span>
            {messages.footer.home}{' '}
            <a href={siteUrl} rel="noreferrer">
              {siteHost}
            </a>
          </span>
        </div>
      </footer>
    </>
  )
}
