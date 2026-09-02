import { describe, expect, it, vi } from 'vitest'

import { handleRequest } from './index'

function createEnv(
  steamKey: string,
  assetResponse = new Response('asset response'),
): Env {
  return {
    STEAM_WEB_API_KEY: steamKey,
    ASSETS: {
      fetch: vi.fn(async () => assetResponse),
    } as unknown as Fetcher,
  }
}

describe('Worker request handler', () => {
  it('returns a safe unavailable response when the secret is absent', async () => {
    const fetcher = vi.fn()
    const response = await handleRequest(
      new Request('https://example.com/api/steam/apps'),
      createEnv(''),
      fetcher,
    )

    expect(response.status).toBe(503)
    expect(await response.json()).toMatchObject({
      error: { code: 'steam_not_configured' },
    })
    expect(fetcher).not.toHaveBeenCalled()
  })

  it('rejects invalid pagination before calling Steam', async () => {
    const fetcher = vi.fn()
    const response = await handleRequest(
      new Request('https://example.com/api/steam/apps?maxResults=1001'),
      createEnv('server-secret'),
      fetcher,
    )

    expect(response.status).toBe(400)
    expect(fetcher).not.toHaveBeenCalled()
  })

  it('returns normalized catalogue data with public cache headers', async () => {
    const fetcher = vi.fn(async () =>
      Response.json({
        response: {
          apps: [{ appid: 620, name: 'Portal 2' }],
          have_more_results: false,
        },
      }),
    )
    const response = await handleRequest(
      new Request('https://example.com/api/steam/apps?maxResults=1'),
      createEnv('server-secret'),
      fetcher,
    )

    expect(response.status).toBe(200)
    expect(response.headers.get('cache-control')).toBe(
      'public, max-age=300, s-maxage=3600',
    )
    expect(await response.json()).toMatchObject({
      apps: [{ steamAppId: 620, title: 'Portal 2' }],
      page: { hasMore: false },
      source: { id: 'steam-istore-getapplist', attribution: 'Steam' },
    })
  })

  it('preserves the static asset fallback outside the API route', async () => {
    const env = createEnv('server-secret')
    const response = await handleRequest(
      new Request('https://example.com/library'),
      env,
    )

    expect(await response.text()).toBe('asset response')
    expect(env.ASSETS.fetch).toHaveBeenCalledOnce()
  })
})
