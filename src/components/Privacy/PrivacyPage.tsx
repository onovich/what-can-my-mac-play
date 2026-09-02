import { useState } from 'react'

import { privacyContent } from '../../content/privacy'
import { localeStorageKey, useLocale } from '../../i18n/locale'

export function PrivacyPage() {
  const { locale } = useLocale()
  const content = privacyContent[locale]
  const [preferenceCleared, setPreferenceCleared] = useState(false)

  function clearLanguagePreference() {
    try {
      window.localStorage.removeItem(localeStorageKey)
    } finally {
      setPreferenceCleared(true)
    }
  }

  return (
    <article className="legal-page shell" aria-labelledby="privacy-title">
      <header className="legal-page__header">
        <p className="eyebrow">{content.eyebrow}</p>
        <h1 id="privacy-title">{content.title}</h1>
        <p className="legal-page__summary">{content.summary}</p>
        <time dateTime={content.effectiveDate}>{content.effectiveDateLabel}</time>
      </header>

      <div className="legal-page__layout">
        <nav className="legal-page__toc" aria-label={content.title}>
          <a href="#current-scope">{content.overviewTitle}</a>
          <a href="#data-handled">{content.dataTitle}</a>
          <a href="#steam-data">{content.steamTitle}</a>
          <a href="#data-deletion">{content.deletionTitle}</a>
          <a href="#privacy-questions">{content.contactTitle}</a>
        </nav>

        <div className="legal-page__content">
          <section id="current-scope">
            <h2>{content.overviewTitle}</h2>
            <p>{content.overview}</p>
          </section>

          <section id="data-handled">
            <h2>{content.dataTitle}</h2>
            <div className="legal-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th scope="col">{content.tableLabels.data}</th>
                    <th scope="col">{content.tableLabels.purpose}</th>
                    <th scope="col">{content.tableLabels.retention}</th>
                  </tr>
                </thead>
                <tbody>
                  {content.dataRows.map((row) => (
                    <tr key={row.data}>
                      <th scope="row">{row.data}</th>
                      <td>{row.purpose}</td>
                      <td>{row.retention}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="steam-data">
            <h2>{content.steamTitle}</h2>
            {content.steamParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <section>
            <h2>{content.servicesTitle}</h2>
            <p>{content.servicesParagraph}</p>
            <ul className="legal-page__services">
              {content.services.map((service) => (
                <li key={service.name}>
                  <a href={service.href} target="_blank" rel="noreferrer">
                    {service.name} <span aria-hidden="true">↗</span>
                  </a>
                  <span>{service.purpose}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>{content.choicesTitle}</h2>
            <ul>
              {content.choices.map((choice) => <li key={choice}>{choice}</li>)}
            </ul>
          </section>

          <section id="data-deletion" className="legal-page__action">
            <h2>{content.deletionTitle}</h2>
            <p>{content.deletionIntro}</p>
            <button className="button button--primary" onClick={clearLanguagePreference}>
              {content.clearButton}
            </button>
            <p className="legal-page__status" role="status" aria-live="polite">
              {preferenceCleared ? content.cleared : ''}
            </p>
            <ul>
              {content.deletionSteps.map((step) => <li key={step}>{step}</li>)}
            </ul>
          </section>

          <section id="privacy-questions">
            <h2>{content.contactTitle}</h2>
            <p>{content.contactBody}</p>
            <a
              className="text-link"
              href="https://github.com/onovich/what-can-my-mac-play/issues/new"
              target="_blank"
              rel="noreferrer"
            >
              {content.contactLink} <span aria-hidden="true">↗</span>
            </a>
          </section>

          <section>
            <h2>{content.changesTitle}</h2>
            <p>{content.changesBody}</p>
          </section>
        </div>
      </div>
    </article>
  )
}
