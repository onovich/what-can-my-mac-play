import { GameExplorer } from './components/GameExplorer/GameExplorer'
import { Header } from './components/Header/Header'
import { Method } from './components/Method/Method'
import { ProfilePanel } from './components/ProfilePanel/ProfilePanel'
import { siteHost, siteUrl } from './config/site'
import { useLocale } from './i18n/locale'

export function App() {
  const { messages } = useLocale()

  return (
    <>
      <a className="skip-link" href="#main-content">
        {messages.accessibility.skipToContent}
      </a>
      <Header />
      <main id="main-content">
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
          <ProfilePanel />
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
      </main>

      <footer className="site-footer shell">
        <p>
          <strong>What Can My Mac Play?</strong> {messages.footer.statement}
        </p>
        <p>
          {messages.footer.home}{' '}
          <a href={siteUrl} rel="noreferrer">
            {siteHost}
          </a>
        </p>
      </footer>
    </>
  )
}
