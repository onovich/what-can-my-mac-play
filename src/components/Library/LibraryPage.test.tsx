import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LocaleProvider } from '../../i18n/LocaleProvider'
import { LibraryPage } from './LibraryPage'

describe('unavailable library', () => {
  it.each(['en', 'zh-CN'] as const)('shows no simulated results in %s', (locale) => {
    render(<LocaleProvider initialLocale={locale}><LibraryPage /></LocaleProvider>)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(locale === 'en' ? 'not available yet' : '暂未开放')
    expect(screen.getByRole('link')).toHaveAttribute('href', '/#sample-library')
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.queryByRole('group')).not.toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(1)
  })
})
