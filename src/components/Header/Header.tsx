import { useLocale, type Locale } from '../../i18n/locale'

export function Header() {
  const { locale, setLocale, messages } = useLocale()

  return (
    <header className="site-header shell">
      <a className="brand" href="/" aria-label={messages.header.homeLabel}>
        <span className="brand__mark" aria-hidden="true">
          W<span>?</span>
        </span>
        <span className="brand__name">
          What Can My Mac Play<span>?</span>
        </span>
      </a>
      <nav aria-label={messages.header.primaryNavigation}>
        <a href="/#sample-library">{messages.header.sampleLibrary}</a>
      </nav>
      <div className="site-header__actions">
        <label className="language-select">
          <span>{messages.header.language}</span>
          <select
            aria-label={messages.header.language}
            value={locale}
            onChange={(event) => setLocale(event.target.value as Locale)}
          >
            <option value="en">{messages.header.english}</option>
            <option value="zh-CN">{messages.header.chinese}</option>
          </select>
        </label>
      </div>
    </header>
  )
}
