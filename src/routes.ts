export type AppRoute =
  | { kind: 'home'; canonicalPath: '/' }
  | { kind: 'privacy'; canonicalPath: '/privacy' }
  | { kind: 'library'; canonicalPath: '/library' }
  | { kind: 'game'; appId: number; canonicalPath: `/games/${number}` }
  | { kind: 'not-found'; canonicalPath: '/' }

export function resolveAppRoute(pathname: string): AppRoute {
  const normalized = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')
  if (normalized === '/') return { kind: 'home', canonicalPath: '/' }
  if (normalized === '/privacy') {
    return { kind: 'privacy', canonicalPath: '/privacy' }
  }
  if (normalized === '/library') {
    return { kind: 'library', canonicalPath: '/library' }
  }

  const match = /^\/games\/(\d+)$/.exec(normalized)
  if (match) {
    const appId = Number(match[1])
    if (Number.isSafeInteger(appId) && appId > 0) {
      return { kind: 'game', appId, canonicalPath: `/games/${appId}` }
    }
  }

  return { kind: 'not-found', canonicalPath: '/' }
}
