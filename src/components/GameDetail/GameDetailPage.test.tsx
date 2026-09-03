import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { LocaleProvider } from '../../i18n/LocaleProvider'
import { GameDetailPage } from './GameDetailPage'

function renderPage(appId: number, locale: 'en' | 'zh-CN' = 'en') {
  return render(
    <LocaleProvider initialLocale={locale}>
      <GameDetailPage appId={appId} />
    </LocaleProvider>,
  )
}

describe('GameDetailPage', () => {
  it('shows scores and retains evidence limitations', () => {
    renderPage(620)

    expect(screen.getByRole('heading', { name: 'Portal 2' })).toBeInTheDocument()
    expect(screen.getByRole('meter', {
      name: 'Compatibility score for Portal 2: 57 out of 100',
    })).toBeInTheDocument()
    expect(screen.getByRole('meter', {
      name: 'Confidence score for Portal 2: 37 out of 100',
    })).toBeInTheDocument()
    expect(screen.getByText('Unknown · no chip-specific claim')).toBeInTheDocument()
    expect(screen.getByText('Cross-source conflict cannot be assessed yet')).toBeInTheDocument()
  })

  it('links to the original evidence and Steam', () => {
    renderPage(620)
    const evidence = screen.getByRole('complementary', { name: 'Evidence record' })

    expect(within(evidence).getByRole('link', { name: /open source evidence/i })).toHaveAttribute(
      'href',
      'https://www.codeweavers.com/compatibility/crossover/portal-2',
    )
    expect(within(evidence).getByRole('link', { name: /view on steam/i })).toHaveAttribute(
      'href',
      'https://store.steampowered.com/app/620/',
    )
  })

  it('renders a localized not-found state for games outside the sample', () => {
    renderPage(999999, 'zh-CN')

    expect(screen.getByRole('heading', { name: '这款游戏不在当前研究预览中。' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '浏览现有样本' })).toHaveAttribute(
      'href',
      '/#sample-library',
    )
  })
  it('shows game-specific store context and keeps stale Mac fields out of support claims', () => {
    renderPage(620, 'zh-CN')
    expect(screen.getByText(/当前 Steam 页面列出 Windows 和 Linux 要求/)).toBeInTheDocument()
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'rosetta' } })
    expect(screen.getByText(/残留字段不能证明当前原生或 Rosetta 支持/)).toBeInTheDocument()
    expect(screen.getByText(/尚未验证这款游戏在此方案下的表现/)).toBeInTheDocument()
  })
})
