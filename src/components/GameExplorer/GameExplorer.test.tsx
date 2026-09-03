import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LocaleProvider } from '../../i18n/LocaleProvider'
import { GameExplorer } from './GameExplorer'

function renderExplorer(locale: 'en' | 'zh-CN' = 'en') {
  return render(<LocaleProvider initialLocale={locale}><GameExplorer /></LocaleProvider>)
}

describe('decision-first game list', () => {
  it('filters games by name and resets an empty result', () => {
    renderExplorer()
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'Portal' } })
    expect(screen.getByRole('heading', { name: 'Portal 2' })).toBeInTheDocument()
    expect(screen.getByText(/Showing 1 of 6/)).toBeInTheDocument()
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'no match' } })
    fireEvent.click(screen.getByRole('button', { name: /Reset samples/ }))
    expect(screen.getByText(/Showing 6 of 6/)).toBeInTheDocument()
  })
  it('shows our judgment without source links, uncertainty lists or numeric scores', () => {
    renderExplorer()
    const portal = screen.getByRole('article', { name: 'Portal 2' })
    expect(within(portal).getByText('Choose CrossOver, not the legacy Mac route')).toBeInTheDocument()
    expect(within(portal).queryByRole('meter')).not.toBeInTheDocument()
    expect(within(portal).getAllByRole('link')).toHaveLength(1)
    expect(within(portal).getByRole('link')).toHaveAttribute('href', '/games/620')
  })
  it('filters on the editorial decision, not the legacy signal or confidence score', () => {
    renderExplorer()
    fireEvent.click(screen.getByRole('button', { name: 'Use with conditions' }))
    expect(screen.getByRole('heading', { name: 'Sekiro: Shadows Die Twice' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Noita' })).not.toBeInTheDocument()
    expect(screen.getByText(/Showing 4 of 6/)).toBeInTheDocument()
  })
  it('gives a direct Chinese conclusion', () => {
    renderExplorer('zh-CN')
    expect(screen.getByText('只考虑 CrossOver 单人路线')).toBeInTheDocument()
    expect(screen.queryByText('低可信度')).not.toBeInTheDocument()
  })
})
