import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LocaleProvider } from '../../i18n/LocaleProvider'
import { GameDetailPage } from './GameDetailPage'

function renderPage(appId: number, locale: 'en' | 'zh-CN' = 'en') {
  return render(<LocaleProvider initialLocale={locale}><GameDetailPage appId={appId} /></LocaleProvider>)
}

describe('decision-first game details', () => {
  it('gives a preferred route instead of scores and research work', () => {
    renderPage(620)
    expect(screen.getByRole('heading', { name: 'Choose CrossOver, not the legacy Mac route' })).toBeInTheDocument()
    expect(screen.queryByRole('meter')).not.toBeInTheDocument()
    expect(screen.queryByText(/Low confidence|Not reported|First-hand source reports/)).not.toBeInTheDocument()
    for (const link of screen.getAllByRole('link')) {
      expect(link.getAttribute('href')).not.toMatch(/reddit|compatibility\/crossover|api\/appdetails/)
    }
    expect(screen.getByRole('link', { name: /View on Steam/ })).toHaveAttribute('href', 'https://store.steampowered.com/app/620/')
  })
  it('defaults unlisted routes to not supported with a direct alternative', () => {
    renderPage(620, 'zh-CN')
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'rosetta' } })
    expect(screen.getByText('当前清单不支持')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '这款游戏，不推荐走此方案' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '首选方案：CrossOver' }))
    expect(screen.getByRole('heading', { name: '首选 CrossOver，不走旧 Mac 版' })).toBeInTheDocument()
  })
  it('makes the multiplayer purchasing decision instead of listing unknowns', () => {
    renderPage(1245620, 'zh-CN')
    expect(screen.getByText(/不要为了 Mac 联机体验购买/)).toBeInTheDocument()
    expect(screen.queryByText(/Pratik|Finley|未报告/)).not.toBeInTheDocument()
  })
  it('keeps the material external-display condition without quoting the post', () => {
    renderPage(814380, 'zh-CN')
    expect(screen.getByText(/先切到窗口模式再打开图形设置/)).toBeInTheDocument()
    expect(screen.getByText(/不作为所有版本的通用修复/)).toBeInTheDocument()
    expect(screen.queryByText(/oztruwa/)).not.toBeInTheDocument()
  })
  it('does not transfer a GOG recipe to Steam support', () => {
    renderPage(881100)
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'porting-kit' } })
    expect(screen.getByText('Not supported in our catalog')).toBeInTheDocument()
  })
  it('does not invent a recommendation for an unknown game', () => {
    renderPage(999999, 'zh-CN')
    expect(screen.getByRole('heading', { name: '这款游戏不在当前研究预览中。' })).toBeInTheDocument()
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
  })
})
