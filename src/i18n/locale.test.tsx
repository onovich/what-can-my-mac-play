import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { Header } from '../components/Header/Header'
import { LocaleProvider } from './LocaleProvider'
import {
  localeStorageKey,
  matchSupportedLocale,
  resolveInitialLocale,
} from './locale'

describe('locale resolution', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.lang = 'en'
  })

  it('uses the first supported browser language on a first visit', () => {
    expect(resolveInitialLocale({ languages: ['fr-FR', 'zh-CN'] })).toBe('zh-CN')
  })

  it('falls back to English when no browser language is supported', () => {
    expect(matchSupportedLocale(['fr-FR', 'de-DE'])).toBe('en')
  })

  it('prefers the stored locale over the browser language', () => {
    const storage = { getItem: () => 'en' }

    expect(resolveInitialLocale({ storage, languages: ['zh-CN'] })).toBe('en')
  })

  it('persists a language selection for the next visit', () => {
    render(
      <LocaleProvider initialLocale="en">
        <Header />
      </LocaleProvider>,
    )

    fireEvent.change(screen.getByRole('combobox', { name: 'Language' }), {
      target: { value: 'zh-CN' },
    })

    expect(window.localStorage.getItem(localeStorageKey)).toBe('zh-CN')
    expect(document.documentElement.lang).toBe('zh-CN')
    expect(screen.getByRole('link', { name: '查找游戏' })).toBeInTheDocument()
  })
})
