import { describe, expect, it, vi } from 'vitest'

import { handleSteamLibraryRequest } from './libraryRoute'

const REQUEST_ID = 'request-id'
const STEAM_ID = '76561198000000000'

function createBindings(overrides?: {
  enabled?: boolean
  routeAllowed?: boolean
  userAllowed?: boolean
  dailyAllowed?: boolean
}) {
  return {
    apiKey: 'server-secret',
    enabled: overrides?.enabled ?? true,
    rateLimits: {
      route: vi.fn(async (key: string) => {
        void key
        return overrides?.routeAllowed ?? true
      }),
      user: vi.fn(async (key: string) => {
        void key
        return overrides?.userAllowed ?? true
      }),
    },
    dailyBudget: vi.fn(async () => overrides?.dailyAllowed ?? true),
  }
}

function libraryRequest(body: string, contentType = 'application/json'): Request {
  return new Request('https://example.com/api/steam/library', {
    method: 'POST',
    headers: { 'Content-Type': contentType },
    body,
  })
}

describe('handleSteamLibraryRequest', () => {
  it('allows only POST requests', async () => {
    const response = await handleSteamLibraryRequest(
      new Request('https://example.com/api/steam/library'),
      createBindings(),
      REQUEST_ID,
    )

    expect(response.status).toBe(405)
    expect(await response.json()).toMatchObject({
      error: { code: 'method_not_allowed' },
    })
  })

  it('requires a JSON content type', async () => {
    const fetcher = vi.fn()
    const response = await handleSteamLibraryRequest(
      libraryRequest('{}', 'text/plain'),
      createBindings(),
      REQUEST_ID,
      fetcher,
    )

    expect(response.status).toBe(415)
    expect(fetcher).not.toHaveBeenCalled()
  })

  it('validates SteamID64 before calling Steam', async () => {
    const fetcher = vi.fn()
    const response = await handleSteamLibraryRequest(
      libraryRequest(JSON.stringify({ steamId: 'not-a-steam-id' })),
      createBindings(),
      REQUEST_ID,
      fetcher,
    )

    expect(response.status).toBe(400)
    expect(await response.json()).toMatchObject({
      error: { code: 'invalid_steam_id' },
    })
    expect(fetcher).not.toHaveBeenCalled()
  })

  it('rejects oversized request bodies', async () => {
    const fetcher = vi.fn()
    const request = libraryRequest('{}')
    request.headers.set('Content-Length', '1025')
    const response = await handleSteamLibraryRequest(
      request,
      createBindings(),
      REQUEST_ID,
      fetcher,
    )

    expect(response.status).toBe(413)
    expect(await response.json()).toMatchObject({
      error: { code: 'request_body_too_large' },
    })
    expect(fetcher).not.toHaveBeenCalled()
  })

  it('returns normalized owned games without echoing the SteamID64', async () => {
    const fetcher = vi.fn(async () =>
      Response.json({
        response: {
          game_count: 1,
          games: [{ appid: 620, playtime_forever: 180 }],
        },
      }),
    )
    const response = await handleSteamLibraryRequest(
      libraryRequest(JSON.stringify({ steamId: STEAM_ID })),
      createBindings(),
      REQUEST_ID,
      fetcher,
    )

    expect(response.status).toBe(200)
    expect(response.headers.get('cache-control')).toBe('no-store')
    const responseText = await response.text()
    expect(responseText).not.toContain(STEAM_ID)
    expect(JSON.parse(responseText)).toMatchObject({
      status: 'public',
      gameCount: 1,
      games: [{ steamAppId: 620, playtimeMinutes: 180 }],
      source: {
        id: 'steam-iplayer-getownedgames',
        attribution: 'Steam',
      },
    })
  })

  it('applies route-wide and pseudonymous per-user limits before Steam', async () => {
    const fetcher = vi.fn(async () =>
      Response.json({ response: { game_count: 0, games: [] } }),
    )
    const bindings = createBindings()

    const response = await handleSteamLibraryRequest(
      libraryRequest(JSON.stringify({ steamId: STEAM_ID })),
      bindings,
      REQUEST_ID,
      fetcher,
    )

    expect(response.status).toBe(200)
    expect(bindings.rateLimits.route).toHaveBeenCalledWith('steam-library')
    expect(bindings.rateLimits.user).toHaveBeenCalledOnce()
    expect(bindings.dailyBudget).toHaveBeenCalledOnce()
    const userKey = bindings.rateLimits.user.mock.calls[0]?.[0]
    expect(userKey).toMatch(/^[a-f0-9]{64}$/)
    expect(userKey).not.toBe(STEAM_ID)
    expect(fetcher).toHaveBeenCalledOnce()
  })

  it('stops before hashing or calling Steam when the route limit is exceeded', async () => {
    const fetcher = vi.fn()
    const bindings = createBindings({ routeAllowed: false })

    const response = await handleSteamLibraryRequest(
      libraryRequest(JSON.stringify({ steamId: STEAM_ID })),
      bindings,
      REQUEST_ID,
      fetcher,
    )

    expect(response.status).toBe(429)
    expect(response.headers.get('retry-after')).toBe('60')
    expect(await response.json()).toMatchObject({
      error: { code: 'rate_limit_exceeded' },
    })
    expect(bindings.rateLimits.user).not.toHaveBeenCalled()
    expect(bindings.dailyBudget).not.toHaveBeenCalled()
    expect(fetcher).not.toHaveBeenCalled()
  })

  it('stops before Steam when the per-user limit is exceeded', async () => {
    const fetcher = vi.fn()
    const bindings = createBindings({ userAllowed: false })

    const response = await handleSteamLibraryRequest(
      libraryRequest(JSON.stringify({ steamId: STEAM_ID })),
      bindings,
      REQUEST_ID,
      fetcher,
    )

    expect(response.status).toBe(429)
    expect(response.headers.get('retry-after')).toBe('60')
    expect(bindings.dailyBudget).not.toHaveBeenCalled()
    expect(fetcher).not.toHaveBeenCalled()
  })

  it('stops before Steam when the global daily budget is exhausted', async () => {
    const fetcher = vi.fn()
    const bindings = createBindings({ dailyAllowed: false })

    const response = await handleSteamLibraryRequest(
      libraryRequest(JSON.stringify({ steamId: STEAM_ID })),
      bindings,
      REQUEST_ID,
      fetcher,
    )

    expect(response.status).toBe(429)
    expect(Number(response.headers.get('retry-after'))).toBeGreaterThan(0)
    expect(await response.json()).toMatchObject({
      error: { code: 'daily_budget_exhausted' },
    })
    expect(fetcher).not.toHaveBeenCalled()
  })

  it('fails closed when a rate-limit binding is unavailable', async () => {
    const fetcher = vi.fn()
    const bindings = createBindings()
    bindings.rateLimits.route.mockRejectedValueOnce(new Error('unavailable'))

    const response = await handleSteamLibraryRequest(
      libraryRequest(JSON.stringify({ steamId: STEAM_ID })),
      bindings,
      REQUEST_ID,
      fetcher,
    )

    expect(response.status).toBe(503)
    expect(await response.json()).toMatchObject({
      error: { code: 'request_control_unavailable' },
    })
    expect(fetcher).not.toHaveBeenCalled()
  })

  it('does not consume a rate-limit token while the feature is disabled', async () => {
    const bindings = createBindings({ enabled: false })

    const response = await handleSteamLibraryRequest(
      libraryRequest(JSON.stringify({ steamId: STEAM_ID })),
      bindings,
      REQUEST_ID,
    )

    expect(response.status).toBe(503)
    expect(bindings.rateLimits.route).not.toHaveBeenCalled()
    expect(bindings.rateLimits.user).not.toHaveBeenCalled()
    expect(bindings.dailyBudget).not.toHaveBeenCalled()
  })
})
