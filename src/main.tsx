import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { siteUrl } from './config/site'
import { LocaleProvider } from './i18n/LocaleProvider'
import { resolveInitialLocale } from './i18n/locale'
import './styles.css'

const canonicalLink = document.createElement('link')
canonicalLink.rel = 'canonical'
const canonicalPath = window.location.pathname.replace(/\/+$/, '') === '/privacy'
  ? '/privacy'
  : '/'
canonicalLink.href = new URL(canonicalPath, siteUrl).href
document.head.append(canonicalLink)

const initialLocale = resolveInitialLocale()
document.documentElement.lang = initialLocale

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocaleProvider initialLocale={initialLocale}>
      <App />
    </LocaleProvider>
  </StrictMode>,
)
