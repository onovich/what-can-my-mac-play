import { describe, expect, it, vi } from 'vitest'

import { handleSteamLibraryRequest } from './libraryRoute'

const REQUEST_ID = 'request-id'

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
      { apiKey: 'server-secret', enabled: true },
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
      { apiKey: 'server-secret', enabled: true },
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
      { apiKey: 'server-secret', enabled: true },
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
      { apiKey: 'server-secret', enabled: true },
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
      libraryRequest(JSON.stringify({ steamId: '76561198000000000' })),
      { apiKey: 'server-secret', enabled: true },
      REQUEST_ID,
      fetcher,
    )

    expect(response.status).toBe(200)
    expect(response.headers.get('cache-control')).toBe('no-store')
    const responseText = await response.text()
    expect(responseText).not.toContain('76561198000000000')
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
})
