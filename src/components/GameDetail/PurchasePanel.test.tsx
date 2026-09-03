import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LocaleProvider } from '../../i18n/LocaleProvider'
import { PurchasePanel } from './PurchasePanel'

describe('purchase route comparison', () => {
  it('keeps missing alternatives distinct from partial CrossOver evidence', () => {
    render(<LocaleProvider initialLocale="en"><PurchasePanel steamUrl="https://store.steampowered.com/app/620/" /></LocaleProvider>)
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
    render(<LocaleProvider initialLocale="zh-CN"><PurchasePanel steamUrl="https://store.steampowered.com/app/620/" /></LocaleProvider>)
    fireEvent.change(screen.getByRole('combobox', { name: '对比非虚拟机运行方案' }), { target: { value: 'native' } })
    expect(screen.getByText(/尚未验证这款游戏在此方案下的表现/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /查看方案官方说明/ })).toHaveAttribute('href', 'https://store.steampowered.com/app/620/')
  })
})
