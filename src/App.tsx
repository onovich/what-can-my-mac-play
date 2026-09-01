import { GameExplorer } from './components/GameExplorer/GameExplorer'
import { Header } from './components/Header/Header'
import { Method } from './components/Method/Method'
import { ProfilePanel } from './components/ProfilePanel/ProfilePanel'
import { siteHost, siteUrl } from './config/site'

export function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero__copy">
            <p className="eyebrow">Evidence before guesswork</p>
            <h1 id="hero-title">
              Start with the games <em>you already own.</em>
            </h1>
            <p className="hero__lede">
              Match a Mac profile with dated compatibility reports, then see what is likely
              to play—and how much confidence the evidence deserves.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#sample-library">
                Explore sample matches
                <span aria-hidden="true">↓</span>
              </a>
              <a className="text-link" href="#method">
                See how evidence works
              </a>
            </div>
            <p className="hero__note">
              Research preview · No Steam sign-in · No compatibility guarantees
            </p>
          </div>
          <ProfilePanel />
        </section>

        <GameExplorer />
        <Method />

        <section className="closing shell" aria-labelledby="closing-title">
          <p className="eyebrow">Build the useful thing first</p>
          <h2 id="closing-title">A smaller catalog with honest evidence beats a giant vague list.</h2>
          <a
            className="button button--light"
            href="https://github.com/onovich/what-can-my-mac-play"
            target="_blank"
            rel="noreferrer"
          >
            Follow the project on GitHub
            <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>

      <footer className="site-footer shell">
        <p>
          <strong>What Can My Mac Play?</strong> is an independent product research project.
        </p>
        <p>
          Planned MVP home:{' '}
          <a href={siteUrl} rel="noreferrer">
            {siteHost}
          </a>
        </p>
      </footer>
    </>
  )
}
