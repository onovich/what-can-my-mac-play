import {
  getSteamAppList,
  SteamUpstreamError,
  type SteamAppListQuery,
} from './steam/getAppList'
import { jsonResponse, type FetchLike } from './http'
import { handleSteamLibraryRequest } from './steam/libraryRoute'

const DEFAULT_MAX_RESULTS = 250
const MAX_RESULTS_LIMIT = 1_000

function parseOptionalInteger(
  params: URLSearchParams,
  name: string,
  minimum: number,
  maximum: number,
): number | undefined | null {
  const raw = params.get(name)
  if (raw === null) return undefined
  if (!/^\d+$/.test(raw)) return null
  const value = Number(raw)
  if (!Number.isSafeInteger(value) || value < minimum || value > maximum) {
    return null
  }
  return value
}

function parseQuery(params: URLSearchParams): SteamAppListQuery | null {
  const maxResults = parseOptionalInteger(
    params,
    'maxResults',
    1,
    MAX_RESULTS_LIMIT,
  )
  const lastAppId = parseOptionalInteger(
    params,
    'lastAppId',
    0,
    Number.MAX_SAFE_INTEGER,
  )
  const ifModifiedSince = parseOptionalInteger(
    params,
    'ifModifiedSince',
    0,
    4_294_967_295,
  )
  if (maxResults === null || lastAppId === null || ifModifiedSince === null) {
    return null
  }

  const query: SteamAppListQuery = {
    maxResults: maxResults ?? DEFAULT_MAX_RESULTS,
  }
  if (lastAppId !== undefined) query.lastAppId = lastAppId
  if (ifModifiedSince !== undefined) query.ifModifiedSince = ifModifiedSince
  return query
}

function errorStatus(error: SteamUpstreamError): number {
  return error.code === 'timeout' ? 504 : 502
}

export async function handleRequest(
  request: Request,
  env: Env,
  fetcher: FetchLike = fetch,
): Promise<Response> {
  const url = new URL(request.url)
  if (!url.pathname.startsWith('/api/')) {
    return env.ASSETS.fetch(request)
  }

  const requestId = crypto.randomUUID()
  if (url.pathname === '/api/steam/library') {
    return handleSteamLibraryRequest(
      request,
      {
        apiKey: env.STEAM_WEB_API_KEY,
        enabled: Boolean(env.STEAM_LIBRARY_LOOKUP_ENABLED),
        rateLimits: {
          route: async (key) =>
            (
              await env.STEAM_LIBRARY_ROUTE_RATE_LIMITER.limit({ key })
            ).success,
          user: async (key) =>
            (
              await env.STEAM_LIBRARY_USER_RATE_LIMITER.limit({ key })
            ).success,
        },
      },
      requestId,
      fetcher,
    )
  }
  if (url.pathname !== '/api/steam/apps') {
    return jsonResponse(
      { error: { code: 'not_found', requestId } },
      404,
      requestId,
    )
  }

  if (request.method !== 'GET') {
    return jsonResponse(
      { error: { code: 'method_not_allowed', requestId } },
      405,
      requestId,
    )
  }

  const query = parseQuery(url.searchParams)
  if (query === null) {
    return jsonResponse(
      { error: { code: 'invalid_query', requestId } },
      400,
      requestId,
    )
  }

  if (!env.STEAM_WEB_API_KEY) {
    return jsonResponse(
      { error: { code: 'steam_not_configured', requestId } },
      503,
      requestId,
    )
  }

  try {
    const result = await getSteamAppList(
      env.STEAM_WEB_API_KEY,
      query,
      fetcher,
    )
    return jsonResponse(
      {
        ...result,
        source: {
          id: 'steam-istore-getapplist',
          attribution: 'Steam',
        },
        fetchedAt: new Date().toISOString(),
      },
      200,
      requestId,
      'public, max-age=300, s-maxage=3600',
    )
  } catch (error) {
    const upstreamError =
      error instanceof SteamUpstreamError
        ? error
        : new SteamUpstreamError('unavailable')
    console.error(
      JSON.stringify({
        event: 'steam_app_list_failed',
        requestId,
        code: upstreamError.code,
        upstreamStatus: upstreamError.upstreamStatus,
      }),
    )
    return jsonResponse(
      { error: { code: 'steam_upstream_failed', requestId } },
      errorStatus(upstreamError),
      requestId,
    )
  }
}

export default {
  fetch(request, env) {
    return handleRequest(request, env)
  },
} satisfies ExportedHandler<Env>
