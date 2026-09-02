import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LocaleProvider } from '../../i18n/LocaleProvider'
import type { Locale } from '../../i18n/locale'
import { GameExplorer } from './GameExplorer'

function renderExplorer(locale: Locale = 'en') {
  return render(
    <LocaleProvider initialLocale={locale}>
      <GameExplorer />
    </LocaleProvider>,
  )
}

describe('GameExplorer', () => {
  it('filters sample games by search text', () => {
    renderExplorer()

    fireEvent.change(screen.getByRole('searchbox', { name: /find a sample game/i }), {
      target: { value: 'Portal' },
    })

    expect(screen.getByRole('heading', { name: 'Portal 2' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Noita' })).not.toBeInTheDocument()
    expect(screen.getByText(/showing 1 of 6/i)).toBeInTheDocument()
  })

  it('offers a reset when no sample matches', () => {
    renderExplorer()

    fireEvent.change(screen.getByRole('searchbox', { name: /find a sample game/i }), {
      target: { value: 'not in the sample' },
    })
    fireEvent.click(screen.getByRole('button', { name: /reset samples/i }))

    expect(screen.getByText(/showing 6 of 6/i)).toBeInTheDocument()
  })

  it('shows separate, accessible compatibility and confidence scores', () => {
    renderExplorer()
    const portal = screen.getByRole('article', { name: 'Portal 2' })

    expect(
      within(portal).getByRole('meter', {
        name: 'Compatibility score for Portal 2: 57 out of 100',
      }),
    ).toHaveAttribute('value', '57')
    expect(
      within(portal).getByRole('meter', {
        name: 'Confidence score for Portal 2: 37 out of 100',
      }),
    ).toHaveAttribute('value', '37')
    expect(within(portal).getByText('Low confidence')).toBeInTheDocument()
    expect(within(portal).getByText('Conflict unknown · one source')).toBeInTheDocument()
  })

  it('reveals the evidence base and source without hiding caveats', () => {
    renderExplorer()
    const portal = screen.getByRole('article', { name: 'Portal 2' })

    fireEvent.click(within(portal).getByText('Why this score'))

    expect(within(portal).getByText('1 source · 1 report')).toBeInTheDocument()
    expect(within(portal).getByText('Not reported')).toBeInTheDocument()
    expect(within(portal).getByRole('link', { name: /evidence/i })).toHaveAttribute(
      'href',
      'https://www.codeweavers.com/compatibility/crossover/portal-2',
    )
  })

  it('localizes scoring language in Simplified Chinese', () => {
    renderExplorer('zh-CN')
    const portal = screen.getByRole('article', { name: 'Portal 2' })

    expect(within(portal).getByText('兼容程度')).toBeInTheDocument()
    expect(within(portal).getByText('可信度')).toBeInTheDocument()
    expect(within(portal).getByText('低可信度')).toBeInTheDocument()
    expect(within(portal).getByText('冲突未知 · 仅一个来源')).toBeInTheDocument()
  })
})
