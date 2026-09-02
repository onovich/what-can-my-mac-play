import { describe, expect, it } from 'vitest'

import { resolveAppRoute } from './routes'

describe('resolveAppRoute', () => {
  it('resolves stable Steam App ID game routes', () => {
    expect(resolveAppRoute('/games/620/')).toEqual({
      kind: 'game',
      appId: 620,
      canonicalPath: '/games/620',
    })
  })

  it('rejects non-positive and non-numeric game identifiers', () => {
    expect(resolveAppRoute('/games/0').kind).toBe('not-found')
    expect(resolveAppRoute('/games/portal-2').kind).toBe('not-found')
  })
})
