import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LocaleProvider } from '../../i18n/LocaleProvider'
import { GameDetailPage } from './GameDetailPage'

function renderPage(appId: number, locale: 'en' | 'zh-CN' = 'en') {
  return render(<LocaleProvider initialLocale={locale}><GameDetailPage appId={appId} /></LocaleProvider>)
}

describe('decision-first game details', () => {
  it('opens Mac games on their own route and returns there from an unsupported alternative', () => {
    renderPage(2379780, 'zh-CN')
    expect(screen.getByRole('heading', { name: '安装 Steam 的 Mac 版即可开始游玩。' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /获取 CrossOver/ })).not.toBeInTheDocument()
    screen.getByText('其他方案').parentElement?.setAttribute('open', '')
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'crossover' } })
    expect(screen.getByRole('heading', { name: '此方案不支持这款游戏' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '首选方案: Mac 版' }))
    expect(screen.getByRole('heading', { name: '安装 Steam 的 Mac 版即可开始游玩。' })).toBeInTheDocument()
  })
  it('retains the Apple silicon requirement for Hades II', () => {
    renderPage(1145350, 'zh-CN')
    expect(screen.getByRole('heading', { name: /M1 或更新 Apple 芯片/ })).toBeInTheDocument()
    expect(screen.getByText(/不支持 Intel Mac/)).toBeInTheDocument()
    expect(screen.getByText(/11 GB/)).toBeInTheDocument()
  })
  it('gives a preferred route instead of scores and research work', () => {
    renderPage(620)
    expect(screen.getByRole('heading', { name: 'Use the Steam Windows edition, not the legacy Mac edition.' })).toBeInTheDocument()
    expect(screen.getByText(/Paid software/)).toBeInTheDocument()
    expect(screen.getByRole('combobox')).not.toBeVisible()
    expect(screen.queryByText(/Our recommendation|What to do|Only the conditions/)).not.toBeInTheDocument()
    expect(screen.queryByRole('meter')).not.toBeInTheDocument()
    expect(screen.queryByText(/Low confidence|Not reported|First-hand source reports/)).not.toBeInTheDocument()
    for (const link of screen.getAllByRole('link')) {
      expect(link.getAttribute('href')).not.toMatch(/reddit|compatibility\/crossover|api\/appdetails/)
    }
    expect(screen.getByRole('link', { name: /View on Steam/ })).toHaveAttribute('href', 'https://store.steampowered.com/app/620/')
  })
  it('defaults unlisted routes to not supported with a direct alternative', () => {
    renderPage(620, 'zh-CN')
    screen.getByText('其他方案').parentElement?.setAttribute('open', '')
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'rosetta' } })
    expect(screen.getByRole('heading', { name: '此方案不支持这款游戏' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '首选方案: CrossOver' }))
    expect(screen.getByRole('heading', { name: '使用 Steam Windows 版，不走旧 Mac 版。' })).toBeInTheDocument()
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
    screen.getByText('Other routes').parentElement?.setAttribute('open', '')
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'porting-kit' } })
    expect(screen.getByRole('heading', { name: 'This route is not supported' })).toBeInTheDocument()
  })
  it('does not invent a recommendation for an unknown game', () => {
    renderPage(999999, 'zh-CN')
    expect(screen.getByRole('heading', { name: '清单中没有这款游戏。' })).toBeInTheDocument()
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
  })
  it('keeps the Witcher purchase hold and update date', () => {
    renderPage(292030, 'zh-CN')
    expect(screen.getByRole('heading', { name: /等待更新复核结果/ })).toBeInTheDocument()
    expect(screen.getByText(/2026 年 9 月 29 日/)).toBeInTheDocument()
    expect(screen.getByText(/不要为了 DX12 或光追/)).toBeInTheDocument()
  })
  it('keeps the Ori version-specific purchase restriction', () => {
    renderPage(1057090, 'zh-CN')
    expect(screen.getByRole('heading', { name: /25.0.1.*25.0.0/ })).toBeInTheDocument()
    expect(screen.getByText(/未经复核的更新版本/)).toBeInTheDocument()
  })
})
