import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from './App'
import { LocaleProvider } from './i18n/LocaleProvider'

describe('search-first home', () => {
  it.each(['en', 'zh-CN'] as const)('starts with search, without marketing or unavailable navigation in %s', (locale) => {
    render(<LocaleProvider initialLocale={locale}><App /></LocaleProvider>)
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(document.querySelector('.hero, .decision-intro, #method, .closing')).toBeNull()
    expect(within(screen.getByRole('navigation')).getAllByRole('link')).toHaveLength(1)
    expect(document.querySelector('a[href="/library"]')).toBeNull()
    expect(screen.queryByText(/研究由我们做|We do the research|我们的结论|Our recommendation/)).not.toBeInTheDocument()
  })
})
