import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LocaleProvider } from '../../i18n/LocaleProvider'
import { PurchasePanel } from './PurchasePanel'
import type { GamePurchaseFacts } from '../../domain/purchase'

const facts: GamePurchaseFacts = {
  appId: 620,
  store: {
    kind: 'store-requirements', edition: 'steam',
    sourceUrl: 'https://store.steampowered.com/app/620/', checkedAt: '2026-09-04',
    summary: { en: 'Store platform listing needs a separate check.', 'zh-CN': '商店平台需要单独核对。' },
  },
  routes: { 'porting-kit': [{
    kind: 'installation-recipe', edition: 'gog',
    sourceUrl: 'https://www.paulthetall.com/portingkit-2/', checkedAt: '2026-09-04',
    summary: { en: 'A GOG recipe does not verify Steam.', 'zh-CN': 'GOG 配方不能验证 Steam 版本。' },
  }] },
}

describe('purchase route comparison', () => {
  it('keeps missing alternatives distinct from partial CrossOver evidence', () => {
    render(<LocaleProvider initialLocale="en"><PurchasePanel steamUrl="https://store.steampowered.com/app/620/" evidencedRunners={['crossover']} /></LocaleProvider>)
    expect(screen.getByRole('heading', { name: 'Not enough evidence for a purchase recommendation yet.' })).toBeInTheDocument()
    expect(screen.getByText(/Partial CrossOver evidence only/)).toBeInTheDocument()
    const select = screen.getByRole('combobox', { name: 'Compare a non-VM route' })
    expect(screen.queryByRole('option', { name: /Whisky|Parallels|VMware|UTM/ })).not.toBeInTheDocument()
    fireEvent.change(select, { target: { value: 'porting-kit' } })
    expect(screen.getByText(/Not verified for this game/)).toBeInTheDocument()
    expect(screen.getByText('Free tool; game purchase separate')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Official route information/ })).toHaveAttribute('href', 'https://www.paulthetall.com/portingkit-2/')
  })
  it('renders the same boundary in Chinese', () => {
    render(<LocaleProvider initialLocale="zh-CN"><PurchasePanel steamUrl="https://store.steampowered.com/app/620/" evidencedRunners={['crossover']} /></LocaleProvider>)
    fireEvent.change(screen.getByRole('combobox', { name: '对比非虚拟机运行方案' }), { target: { value: 'native' } })
    expect(screen.getByText(/尚未验证这款游戏在此方案下的表现/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /查看方案官方说明/ })).toHaveAttribute('href', 'https://store.steampowered.com/app/620/')
  })
  it('does not manufacture CrossOver evidence for a game without reports', () => {
    render(<LocaleProvider initialLocale="en"><PurchasePanel steamUrl="https://store.steampowered.com/app/620/" evidencedRunners={[]} /></LocaleProvider>)
    expect(screen.getByText(/Not verified for this game/)).toBeInTheDocument()
    expect(screen.queryByText(/Partial CrossOver evidence only/)).not.toBeInTheDocument()
    expect(screen.getByText(/Store requirements have not been checked/)).toBeInTheDocument()
  })
  it('keeps store-specific recipes separate from compatibility evidence', () => {
    render(<LocaleProvider initialLocale="en"><PurchasePanel steamUrl="https://store.steampowered.com/app/620/" evidencedRunners={['crossover']} facts={facts} /></LocaleProvider>)
    expect(screen.getByText(/Store platform listing/)).toBeInTheDocument()
    expect(screen.queryByText(/A GOG recipe/)).not.toBeInTheDocument()
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'porting-kit' } })
    expect(screen.getByText(/A GOG recipe does not verify Steam/)).toBeInTheDocument()
    expect(screen.getByText(/Installation recipe · not a performance test · GOG edition/)).toBeInTheDocument()
    expect(screen.getByText(/Not verified for this game/)).toBeInTheDocument()
    expect(screen.getAllByText('2026-09-04')[0]).toHaveAttribute('dateTime', '2026-09-04')
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'native' } })
    expect(screen.queryByText(/A GOG recipe/)).not.toBeInTheDocument()
  })
})
