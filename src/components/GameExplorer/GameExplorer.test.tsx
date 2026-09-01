import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LocaleProvider } from '../../i18n/LocaleProvider'
import { GameExplorer } from './GameExplorer'

function renderExplorer() {
  return render(
    <LocaleProvider initialLocale="en">
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
})
