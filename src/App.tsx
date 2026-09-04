import { useEffect } from 'react'

import { GameExplorer } from './components/GameExplorer/GameExplorer'
import { GameDetailPage } from './components/GameDetail/GameDetailPage'
import { Header } from './components/Header/Header'
import { LibraryPage } from './components/Library/LibraryPage'
import { PrivacyPage } from './components/Privacy/PrivacyPage'
import { privacyContent } from './content/privacy'
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
        title: locale === 'zh-CN' ? 'Steam 游戏库 · What Can My Mac Play?' : 'Steam library · What Can My Mac Play?',
        description: locale === 'zh-CN' ? 'Steam 游戏库暂未开放。' : 'Steam library connection is not available yet.',
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
            <section className="search-intro shell" aria-labelledby="hero-title">
              <h1 id="hero-title">{locale === 'zh-CN' ? '查找 Mac 游戏运行方案' : 'Find a Mac gaming route'}</h1>
            </section>
            <GameExplorer />
          </>
        )}
      </main>

      <footer className="site-footer shell">
        <p>What Can My Mac Play?</p>
        <div className="site-footer__links">
          <a href="/privacy">{messages.footer.privacy}</a>
          <a href="https://github.com/onovich/what-can-my-mac-play" target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </footer>
    </>
  )
}
