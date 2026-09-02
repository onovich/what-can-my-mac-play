import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { LocaleProvider } from '../../i18n/LocaleProvider'
import { LibraryPage } from './LibraryPage'

function renderPage(locale: 'en' | 'zh-CN' = 'en') {
  return render(
    <LocaleProvider initialLocale={locale}>
      <LibraryPage />
    </LocaleProvider>,
  )
}

describe('LibraryPage', () => {
  it('labels sample results as a non-live demo', () => {
    renderPage()

    expect(screen.getByRole('heading', { name: 'Steam connection is not active yet.' })).toBeInTheDocument()
    expect(screen.getByText(/this is not your Steam library/i)).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(5)
  })

  it('keeps private and empty outcomes distinct', () => {
    renderPage()
    const tabs = screen.getByRole('group', { name: 'Library result preview' })

    fireEvent.click(within(tabs).getByRole('button', { name: 'Private / unavailable' }))
    expect(screen.getByRole('heading', { name: 'This library cannot be read' })).toBeInTheDocument()
    expect(screen.getByText(/must not imply that the user owns no games/i)).toBeInTheDocument()

    fireEvent.click(within(tabs).getByRole('button', { name: 'No games found' }))
    expect(screen.getByRole('heading', { name: 'No owned games were returned' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'This library cannot be read' })).not.toBeInTheDocument()
  })

  it('localizes the library flow in Simplified Chinese', () => {
    renderPage('zh-CN')

    expect(screen.getByRole('heading', { name: '你的游戏，一份诚实的候选清单。' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '公开游戏库' })).toBeInTheDocument()
  })
})
