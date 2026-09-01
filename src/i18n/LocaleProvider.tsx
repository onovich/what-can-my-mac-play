import { useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  LocaleContext,
  localeStorageKey,
  messages,
  resolveInitialLocale,
  type Locale,
} from './locale'

export function LocaleProvider({
  children,
  initialLocale = resolveInitialLocale(),
}: {
  children: ReactNode
  initialLocale?: Locale
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale)

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = messages[locale].meta.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', messages[locale].meta.description)

    try {
      window.localStorage.setItem(localeStorageKey, locale)
    } catch {
      // The page remains usable when storage is blocked.
    }
  }, [locale])

  const value = useMemo(
    () => ({ locale, setLocale, messages: messages[locale] }),
    [locale],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}
