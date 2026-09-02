import { useEffect } from 'react'

import { GameExplorer } from './components/GameExplorer/GameExplorer'
import { Header } from './components/Header/Header'
import { Method } from './components/Method/Method'
import { PrivacyPage } from './components/Privacy/PrivacyPage'
import { ProfilePanel } from './components/ProfilePanel/ProfilePanel'
import { siteHost, siteUrl } from './config/site'
import { privacyContent } from './content/privacy'
import { useLocale } from './i18n/locale'

export function App() {
  const { locale, messages } = useLocale()
  const isPrivacyPage = window.location.pathname.replace(/\/+$/, '') === '/privacy'

  useEffect(() => {
    const meta = isPrivacyPage
      ? {
          title: privacyContent[locale].metaTitle,
          description: privacyContent[locale].metaDescription,
        }
      : messages.meta
    document.title = meta.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', meta.description)
  }, [isPrivacyPage, locale, messages.meta])

  return (
    <>
      <a className="skip-link" href="#main-content">
        {messages.accessibility.skipToContent}
      </a>
      <Header />
      <main id="main-content">
        {isPrivacyPage ? (
          <PrivacyPage />
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
