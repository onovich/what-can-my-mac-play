import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LocaleProvider } from '../../i18n/LocaleProvider'
import { purchaseRoutes } from '../../content/purchase'
import { routeName } from '../../content/routeNames'
import { RecommendationPanel } from './RecommendationPanel'

describe('shared route identity', () => {
  it.each(['en', 'zh-CN'] as const)('keeps selector, active route and return action consistent in %s', (locale) => {
    render(<LocaleProvider initialLocale={locale}>
      <RecommendationPanel appId={413150} steamUrl="https://store.steampowered.com/app/413150/" preferredRunner="native" />
    </LocaleProvider>)
    fireEvent.click(screen.getByText(locale === 'en' ? 'Other routes' : '其他方案'))
    const select = screen.getByRole('combobox')
    for (const route of purchaseRoutes) {
      expect(screen.getByRole('option', { name: routeName(route.id, locale) })).toHaveValue(route.id)
    }
    expect(screen.queryByRole('option', { name: /Whisky|Virtual machine|虚拟机/ })).not.toBeInTheDocument()
    const activeLabel = `${locale === 'en' ? 'Route' : '运行方案'}: ${routeName('native', locale)}`
    expect(screen.getByText(activeLabel)).toBeInTheDocument()
    fireEvent.change(select, { target: { value: 'wine' } })
    expect(screen.queryByText(activeLabel)).not.toBeInTheDocument()
    const returnLabel = `${locale === 'en' ? 'Preferred route' : '首选方案'}: ${routeName('native', locale)}`
    fireEvent.click(screen.getByRole('button', { name: returnLabel }))
    expect(select).toHaveValue('native')
    expect(screen.getByText(activeLabel)).toBeInTheDocument()
  })
})
