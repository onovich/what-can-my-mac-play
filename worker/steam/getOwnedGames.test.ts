import { describe, expect, it, vi } from 'vitest'

import { getSteamOwnedGames } from './getOwnedGames'

describe('getSteamOwnedGames', () => {
  it('requests minimal fields and returns only approved data', async () => {
    let requestedUrl: URL | undefined
    const fetcher = vi.fn(async (input: RequestInfo | URL) => {
      requestedUrl = new URL(input instanceof Request ? input.url : String(input))
      return Response.json({
        response: {
          game_count: 1,
          games: [
            {
              appid: 620,
              name: 'discard me',
              img_icon_url: 'discard me',
              playtime_forever: 180,
              playtime_mac_forever: 120,
              playtime_2weeks: 30,
              rtime_last_played: 1_725_000_000,
            },
          ],
        },
      })
    })

    const result = await getSteamOwnedGames(
      'server-secret',
      '76561198000000000',
      fetcher,
    )

    expect(requestedUrl?.searchParams.get('key')).toBe('server-secret')
    expect(requestedUrl?.searchParams.get('steamid')).toBe('76561198000000000')
    expect(requestedUrl?.searchParams.get('include_appinfo')).toBe('false')
    expect(requestedUrl?.searchParams.get('include_played_free_games')).toBe(
      'true',
    )
    expect(result).toEqual({
      status: 'public',
      gameCount: 1,
      games: [
        {
          steamAppId: 620,
          playtimeMinutes: 180,
          playtimeMacMinutes: 120,
          playtimeTwoWeeksMinutes: 30,
          lastPlayedAt: 1_725_000_000,
        },
      ],
    })
  })

  it('distinguishes an empty public library', async () => {
    const fetcher = vi.fn(async () =>
      Response.json({ response: { game_count: 0, games: [] } }),
    )

    await expect(
      getSteamOwnedGames('server-secret', '76561198000000000', fetcher),
    ).resolves.toEqual({ status: 'empty', gameCount: 0, games: [] })
  })

  it('treats an empty response object as private or invalid', async () => {
    const fetcher = vi.fn(async () => Response.json({ response: {} }))

    await expect(
      getSteamOwnedGames('server-secret', '76561198000000000', fetcher),
    ).resolves.toEqual({
      status: 'unavailable',
      reason: 'private_or_invalid',
    })
  })

  it('rejects malformed or truncated upstream records', async () => {
    const fetcher = vi.fn(async () =>
      Response.json({
        response: {
          game_count: 1,
          games: [{ appid: 620, playtime_forever: '180' }],
        },
      }),
    )

    await expect(
      getSteamOwnedGames('server-secret', '76561198000000000', fetcher),
    ).rejects.toMatchObject({ code: 'invalid_response' })
  })

  it('rejects an oversized upstream response before parsing it', async () => {
    const fetcher = vi.fn(async () =>
      new Response('{}', { headers: { 'Content-Length': '4194305' } }),
    )

    await expect(
      getSteamOwnedGames('server-secret', '76561198000000000', fetcher),
    ).rejects.toMatchObject({ code: 'invalid_response' })
  })
})
