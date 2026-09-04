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
    expect(screen.getByRole('heading', { name: 'No matching game.', level: 2 })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /Clear search/ }))
    expect(screen.getByText(/Showing 6 of 6/)).toBeInTheDocument()
  })
  it('shows our judgment without source links, uncertainty lists or numeric scores', () => {
    renderExplorer()
    const portal = screen.getByRole('article', { name: 'Portal 2' })
    expect(within(portal).getByText('CrossOver · Not for a co-op purchase')).toBeInTheDocument()
    expect(within(portal).queryByRole('meter')).not.toBeInTheDocument()
    expect(within(portal).getAllByRole('link')).toHaveLength(1)
    expect(within(portal).getByRole('link')).toHaveAttribute('href', '/games/620')
  })
  it('does not expose internal decision bands or a classification filter', () => {
    renderExplorer()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.queryByText('Use with conditions')).not.toBeInTheDocument()
    expect(screen.queryByText('Recommended route')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Sekiro: Shadows Die Twice' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Noita' })).toBeInTheDocument()
    expect(screen.getByText(/Showing 6 of 6/)).toBeInTheDocument()
  })
  it('gives a direct Chinese conclusion', () => {
    renderExplorer('zh-CN')
    expect(screen.getByText('CrossOver · 仅限单人')).toBeInTheDocument()
    expect(screen.queryByText('低可信度')).not.toBeInTheDocument()
    expect(screen.queryByText('推荐方案')).not.toBeInTheDocument()
    expect(screen.queryByText('有条件使用')).not.toBeInTheDocument()
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'no match' } })
    expect(screen.getByRole('button', { name: '清空搜索' })).toBeInTheDocument()
    expect(screen.queryByText(/筛选|分类/)).not.toBeInTheDocument()
  })
})
