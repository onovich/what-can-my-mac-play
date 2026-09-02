import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import { LocaleProvider } from '../../i18n/LocaleProvider'
import { localeStorageKey } from '../../i18n/locale'
import { PrivacyPage } from './PrivacyPage'

describe('PrivacyPage', () => {
  beforeEach(() => window.localStorage.clear())

  it('describes the current data boundary without claiming Steam library access', () => {
    render(
      <LocaleProvider initialLocale="en">
        <PrivacyPage />
      </LocaleProvider>,
    )

    expect(screen.getByRole('heading', { name: 'Privacy and data deletion' })).toBeInTheDocument()
    expect(screen.getByText(/does not retrieve or store a user’s game library/i)).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Retention' })).toBeInTheDocument()
  })

  it('clears the locally stored language preference', () => {
    window.localStorage.setItem(localeStorageKey, 'en')
    render(
      <LocaleProvider initialLocale="en">
        <PrivacyPage />
      </LocaleProvider>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Clear saved language preference' }))

    expect(window.localStorage.getItem(localeStorageKey)).toBeNull()
    expect(screen.getByRole('status')).toHaveTextContent(/preference cleared/i)
  })

  it('renders the Simplified Chinese notice', () => {
    render(
      <LocaleProvider initialLocale="zh-CN">
        <PrivacyPage />
      </LocaleProvider>,
    )

    expect(screen.getByRole('heading', { name: '隐私与数据删除' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '清除已保存的语言偏好' })).toBeInTheDocument()
  })
})
