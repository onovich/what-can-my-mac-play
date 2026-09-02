import { describe, expect, it, vi } from 'vitest'

import { getSteamAppList } from './getAppList'

describe('getSteamAppList', () => {
  it('maps pagination parameters and returns only approved fields', async () => {
    let requestedUrl: URL | undefined
    const fetcher = vi.fn(async (input: RequestInfo | URL) => {
      requestedUrl = new URL(input instanceof Request ? input.url : String(input))
      return Response.json({
        response: {
          apps: [
            {
              appid: 620,
              name: ' Portal 2 ',
              last_modified: 1_725_000_000,
              price_change_number: 14,
              unapproved_field: 'discard me',
            },
          ],
          have_more_results: true,
          last_appid: 620,
        },
      })
    })

    const result = await getSteamAppList(
      'server-secret',
      { lastAppId: 10, maxResults: 250, ifModifiedSince: 1_700_000_000 },
      fetcher,
    )

    expect(requestedUrl?.searchParams.get('key')).toBe('server-secret')
    expect(requestedUrl?.searchParams.get('last_appid')).toBe('10')
    expect(requestedUrl?.searchParams.get('max_results')).toBe('250')
    expect(requestedUrl?.searchParams.get('if_modified_since')).toBe(
      '1700000000',
    )
    expect(result).toEqual({
      apps: [
        {
          steamAppId: 620,
          title: 'Portal 2',
          lastModified: 1_725_000_000,
          priceChangeNumber: 14,
        },
      ],
      page: { hasMore: true, nextLastAppId: 620 },
    })
  })

  it('rejects malformed upstream records', async () => {
    const fetcher = vi.fn(async () =>
      Response.json({ response: { apps: [{ appid: '620', name: 'Portal 2' }] } }),
    )

    await expect(
      getSteamAppList('server-secret', { maxResults: 10 }, fetcher),
    ).rejects.toMatchObject({
      code: 'invalid_response',
    })
  })

  it('turns non-success statuses into a typed error', async () => {
    const fetcher = vi.fn(async () => new Response(null, { status: 429 }))

    await expect(
      getSteamAppList('server-secret', { maxResults: 10 }, fetcher),
    ).rejects.toMatchObject({
      code: 'bad_status',
      upstreamStatus: 429,
    })
  })
})
