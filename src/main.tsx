import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { siteUrl } from './config/site'
import './styles.css'

const canonicalLink = document.createElement('link')
canonicalLink.rel = 'canonical'
canonicalLink.href = siteUrl
document.head.append(canonicalLink)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
